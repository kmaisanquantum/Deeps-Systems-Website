#!/usr/bin/env python3
"""Capture the DeepsFleet360 demo screens and stitch a voiced 30s MP4 montage.

Usage from the repository root:
  python -m pip install playwright edge-tts
  python -m playwright install chromium
  python verification/record_deepsfleet360_video.py

ffmpeg and Node/npm must also be installed. The script starts the Vite server
if the configured URL is not already responding, then stops only the server it
started itself. Screenshots are saved under verification/deepsfleet360-frames/.
The narration is generated from public/videos/deepsfleet360-promo-30s.vtt.
"""

import argparse
import asyncio
import os
import shutil
import subprocess
import tempfile
import time
from pathlib import Path
from urllib.request import urlopen

from playwright.async_api import async_playwright

SCENES = [
    ("discovery", "Landing"),
    ("registration", "Company registration"),
    ("subscription", "Subscription plans"),
    ("dashboard", "Fleet dashboard"),
    ("fleet", "Fleet management"),
    ("drivers", "Driver management"),
    ("routes", "Route planner"),
    ("tracking", "Live tracking map"),
    ("maintenance", "Maintenance log"),
    ("fuel", "Fuel log"),
    ("portal", "Client portal preview"),
    ("reports", "Reports & multi-company SaaS"),
]

# Twelve scenes of 2.3 seconds plus a 2.4 second end hold gives a 30 second cut.
SECONDS_PER_SCREEN = 2.3
END_HOLD_SECONDS = 2.4
TOTAL_SECONDS = 30


def site_is_ready(url: str) -> bool:
    try:
        with urlopen(url, timeout=2) as response:
            return response.status < 500
    except Exception:
        return False


def start_vite(repo_root: Path, base_url: str, enabled: bool) -> subprocess.Popen | None:
    if site_is_ready(base_url):
        print(f"Using running site at {base_url}")
        return None
    if not enabled:
        raise SystemExit(f"No Vite site is responding at {base_url}.")
    if shutil.which("npm") is None:
        raise SystemExit("npm was not found. Install Node.js/npm or start the site yourself.")

    port = 3000
    try:
        port = int(base_url.split(":")[-1].split("/", 1)[0])
    except ValueError:
        pass

    process = subprocess.Popen(
        ["npm", "run", "dev", "--", "--host", "127.0.0.1", "--port", str(port), "--strictPort"],
        cwd=repo_root,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.STDOUT,
    )
    for _ in range(60):
        if process.poll() is not None:
            raise SystemExit("Vite stopped before startup. Check npm install and the project scripts.")
        if site_is_ready(base_url):
            print(f"Started Vite at {base_url}")
            return process
        time.sleep(1)
    process.terminate()
    raise SystemExit(f"Timed out waiting for Vite at {base_url}.")


async def capture_screenshots(base_url: str, screenshot_dir: Path, headed: bool) -> list[Path]:
    screenshot_dir.mkdir(parents=True, exist_ok=True)
    frames: list[Path] = []

    async with async_playwright() as playwright:
        browser = await playwright.chromium.launch(headless=not headed)
        page = await browser.new_page(
            viewport={"width": 1920, "height": 1080},
            device_scale_factor=1,
            color_scheme="dark",
        )
        await page.goto(f"{base_url.rstrip('/')}/deepsfleet360/demo", wait_until="domcontentloaded", timeout=60000)
        await page.locator("#discovery").wait_for(state="visible", timeout=30000)
        # Load the fictional company so the captured screens show real data.
        # The global site navbar overlays the demo header, so dispatch the click
        # directly to avoid pointer-event interception.
        load_sample = page.get_by_role("button", name="Load sample data")
        if await load_sample.count():
            await load_sample.first.evaluate("element => element.click()")
        await page.wait_for_timeout(1000)

        for number, (section_id, label) in enumerate(SCENES, start=1):
            section = page.locator(f"#{section_id}")
            if await section.count() == 0:
                raise RuntimeError(f"Expected demo section #{section_id} was not found")
            await section.evaluate("element => window.scrollTo({ top: element.getBoundingClientRect().top + window.scrollY - 92, behavior: 'instant' })")
            await page.wait_for_timeout(450)

            # Illustrate a scripted action where present; this is an interaction
            # with the fictional front-end simulation only.
            if section_id == "routes":
                for action in ("Dispatch", "Complete"):
                    button = page.get_by_role("button", name=action)
                    if await button.count() and await button.first.is_visible():
                        await button.first.evaluate("element => element.click()")
                        await page.wait_for_timeout(300)
                        break

            frame = screenshot_dir / f"scene-{number:02d}-{section_id}.png"
            await page.screenshot(path=str(frame), animations="disabled")
            frames.append(frame)
            print(f"Captured {number:02d}/{len(SCENES)}: {label}")

        await browser.close()
    return frames


def make_concat_list(frames: list[Path], concat_path: Path, seconds_per_screen: float) -> None:
    lines: list[str] = []
    for frame in frames:
        safe_path = str(frame.resolve()).replace("'", "'\\''")
        lines.extend((f"file '{safe_path}'", f"duration {seconds_per_screen:.6f}"))
    last_path = str(frames[-1].resolve()).replace("'", "'\\''")
    lines.extend((f"file '{last_path}'", f"duration {END_HOLD_SECONDS:.6f}", f"file '{last_path}'"))
    concat_path.write_text("\n".join(lines) + "\n", encoding="utf-8")


def narration_from_vtt(vtt_path: Path) -> str:
    # Keep caption text verbatim while excluding the WebVTT header and cue times.
    captions = [
        line for line in vtt_path.read_text(encoding="utf-8").splitlines()
        if line.strip() and line.strip() != "WEBVTT" and "-->" not in line
    ]
    if not captions:
        raise SystemExit(f"No caption text found in {vtt_path}.")
    return "\n".join(captions)


def synthesize_narration(narration_path: Path, audio_path: Path) -> str:
    """Render the narration script to an audio file.

    Prefers edge-tts (a natural neural voice) and falls back to the offline
    espeak-ng synthesiser when the network or the TTS endpoint is unavailable.
    """
    command = [
        "python", "-m", "edge_tts", "--voice", "en-AU-NatashaNeural",
        "--rate=-5%",
        "--pitch=+3Hz",
        "--file", str(narration_path), "--write-media", str(audio_path),
    ]
    # Honour a proxy when the environment provides one (edge-tts does not read
    # the proxy environment variables on its own).
    proxy = (
        os.environ.get("HTTPS_PROXY") or os.environ.get("https_proxy")
        or os.environ.get("HTTP_PROXY") or os.environ.get("http_proxy")
    )
    if proxy:
        command.extend(["--proxy", proxy])
    try:
        subprocess.run(command, check=True)
    except subprocess.CalledProcessError:
        pass
    if audio_path.exists() and audio_path.stat().st_size > 0:
        return "edge-tts (en-AU-NatashaNeural)"

    if shutil.which("espeak-ng") is None:
        raise SystemExit(
            "Narration generation failed and espeak-ng is not installed. "
            "Install edge-tts with 'python -m pip install edge-tts' or install espeak-ng."
        )
    print("edge-tts unavailable; using the offline espeak-ng voice instead.")
    subprocess.run(
        ["espeak-ng", "-v", "en-us+f3", "-s", "150", "-p", "45", "-f", str(narration_path), "-w", str(audio_path)],
        check=True,
    )
    return "espeak-ng (offline)"


def encode_video(frames: list[Path], output_path: Path, captions_path: Path) -> None:
    if shutil.which("ffmpeg") is None:
        raise SystemExit("ffmpeg was not found. Install it and rerun the script.")
    if not frames:
        raise SystemExit("No screenshots were captured.")
    if shutil.which("python") is None:
        raise SystemExit("python was not found. Install Python and rerun the script.")

    output_path.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix="deepsfleet360-") as temp_dir:
        temp_path = Path(temp_dir)
        concat_path = temp_path / "screenshots.txt"
        silent_video_path = temp_path / "silent.mp4"
        narration_path = temp_path / "narration.txt"
        audio_path = temp_path / "narration.mp3"
        voiced_video_path = temp_path / "voiced.mp4"
        narration_path.write_text(narration_from_vtt(captions_path), encoding="utf-8")
        make_concat_list(frames, concat_path, SECONDS_PER_SCREEN)

        voice = synthesize_narration(narration_path, audio_path)
        print(f"Narration synthesised with {voice}.")

        subprocess.run(
            [
                "ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", str(concat_path),
                "-vf", "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2,format=yuv420p",
                "-r", "30", "-t", str(TOTAL_SECONDS), "-c:v", "libx264", "-preset", "medium", "-crf", "24",
                "-movflags", "+faststart", str(silent_video_path),
            ],
            check=True,
        )
        subprocess.run(
            [
                "ffmpeg", "-y", "-i", str(silent_video_path), "-i", str(audio_path),
                "-filter_complex", "[1:a]apad[a]", "-map", "0:v", "-map", "[a]",
                "-c:v", "copy", "-c:a", "aac", "-t", str(TOTAL_SECONDS),
                "-movflags", "+faststart", str(voiced_video_path),
            ],
            check=True,
        )
        # shutil.move (rather than Path.replace) so this works when the temp
        # directory and the output live on different filesystems.
        shutil.move(str(voiced_video_path), str(output_path))


def main() -> None:
    parser = argparse.ArgumentParser(description="Capture the DeepsFleet360 demo screens and create its voiced 30-second promo MP4.")
    parser.add_argument("--base-url", default="http://127.0.0.1:3000", help="Local Vite URL (default: %(default)s)")
    parser.add_argument("--headed", action="store_true", help="Show Chromium while it captures")
    parser.add_argument("--no-start-server", action="store_true", help="Require the Vite site to already be running")
    args = parser.parse_args()

    repo_root = Path(__file__).resolve().parents[1]
    output_path = repo_root / "public" / "videos" / "deepsfleet360-promo-30s.mp4"
    captions_path = repo_root / "public" / "videos" / "deepsfleet360-promo-30s.vtt"
    screenshot_dir = repo_root / "verification" / "deepsfleet360-frames"
    server = start_vite(repo_root, args.base_url, enabled=not args.no_start_server)
    try:
        frames = asyncio.run(capture_screenshots(args.base_url, screenshot_dir, args.headed))
        encode_video(frames, output_path, captions_path)
        print(f"Created voiced video {output_path} ({output_path.stat().st_size:,} bytes).")
    finally:
        if server is not None:
            server.terminate()
            try:
                server.wait(timeout=10)
            except subprocess.TimeoutExpired:
                server.kill()


if __name__ == "__main__":
    main()
