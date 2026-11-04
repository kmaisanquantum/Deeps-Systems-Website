#!/usr/bin/env python3
"""Capture the DeepsGuard360 demo screens and stitch a 30s MP4 montage.

Usage from the repository root:
  python -m pip install playwright
  python -m playwright install chromium
  python verification/record_deepsguard360_video.py

ffmpeg and Node/npm must also be installed. The script starts the Vite server
if the configured URL is not already responding, then stops only the server it
started itself. Screenshots are saved under verification/deepsguard360-frames/.
"""

import argparse
import asyncio
import shutil
import subprocess
import time
from pathlib import Path
from urllib.request import urlopen

from playwright.async_api import async_playwright

SCENES = [
    ("discovery", "Landing"),
    ("registration", "Company registration"),
    ("subscription", "Subscription plans"),
    ("overview", "Admin dashboard"),
    ("guards", "Guard management"),
    ("workforce", "Scheduling"),
    ("mobile", "Guard mobile app"),
    ("map", "GPS and patrol map"),
    ("control", "Control room"),
    ("cctv", "CCTV integration"),
    ("incidents", "Incident management"),
    ("client", "Client portal"),
    ("reports", "Reports and analytics"),
    ("master", "Multi-company administration"),
]


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
        await page.goto(f"{base_url.rstrip('/')}/deepsguard360/demo", wait_until="domcontentloaded", timeout=60000)
        await page.locator("#discovery").wait_for(state="visible", timeout=30000)
        await page.wait_for_timeout(1000)

        for number, (section_id, label) in enumerate(SCENES, start=1):
            section = page.locator(f"#{section_id}")
            if await section.count() == 0:
                raise RuntimeError(f"Expected demo section #{section_id} was not found")
            await section.evaluate("element => window.scrollTo({ top: element.getBoundingClientRect().top + window.scrollY - 92, behavior: 'instant' })")
            await page.wait_for_timeout(500)

            # Illustrate the scripted response/actions where present; these are
            # interactions with the fictional front-end simulation only.
            if section_id == "control":
                button = page.get_by_role("button", name="Assign response")
                if await button.count() and await button.first.is_visible():
                    await button.first.click()
                    await page.wait_for_timeout(300)
            elif section_id == "mobile":
                button = page.get_by_role("button", name="Clock in")
                if await button.count() and await button.first.is_visible():
                    await button.first.click()
                    await page.wait_for_timeout(250)
            elif section_id == "incidents":
                button = page.get_by_role("button", name="Resolve incident")
                if await button.count() and await button.first.is_visible():
                    await button.first.click()
                    await page.wait_for_timeout(300)

            frame = screenshot_dir / f"scene-{number:02d}-{section_id}.png"
            await page.screenshot(path=str(frame), animations="disabled")
            frames.append(frame)
            print(f"Captured {number:02d}/{len(SCENES)}: {label}")

        await browser.close()
    return frames


def make_concat_list(frames: list[Path], concat_path: Path, seconds_per_screen: float) -> None:
    # Fourteen 2-second scenes plus a 2-second end hold gives a 30-second cut.
    lines: list[str] = []
    for frame in frames:
        safe_path = str(frame.resolve()).replace("'", "'\\''")
        lines.extend((f"file '{safe_path}'", f"duration {seconds_per_screen:.6f}"))
    last_path = str(frames[-1].resolve()).replace("'", "'\\''")
    lines.extend((f"file '{last_path}'", "duration 2.000000", f"file '{last_path}'"))
    concat_path.write_text("\n".join(lines) + "\n", encoding="utf-8")


def encode_video(frames: list[Path], output_path: Path) -> None:
    if shutil.which("ffmpeg") is None:
        raise SystemExit("ffmpeg was not found. Install it and rerun the script.")
    if not frames:
        raise SystemExit("No screenshots were captured.")

    with __import__("tempfile").TemporaryDirectory(prefix="deepsguard360-") as temp_dir:
        concat_path = Path(temp_dir) / "screenshots.txt"
        make_concat_list(frames, concat_path, 2.0)
        subprocess.run(
            [
                "ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", str(concat_path),
                "-vf", "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2,format=yuv420p",
                "-r", "30", "-t", "30", "-c:v", "libx264", "-preset", "medium", "-crf", "24",
                "-movflags", "+faststart", "-an", str(output_path),
            ],
            check=True,
        )


def main() -> None:
    parser = argparse.ArgumentParser(description="Capture DeepsGuard360 demo screens and create its 30-second promo MP4.")
    parser.add_argument("--base-url", default="http://127.0.0.1:3000", help="Local Vite URL (default: %(default)s)")
    parser.add_argument("--headed", action="store_true", help="Show Chromium while it captures")
    parser.add_argument("--no-start-server", action="store_true", help="Require the Vite site to already be running")
    args = parser.parse_args()

    repo_root = Path(__file__).resolve().parents[1]
    output_path = repo_root / "public" / "videos" / "deepsguard360-promo-30s.mp4"
    screenshot_dir = repo_root / "verification" / "deepsguard360-frames"
    server = start_vite(repo_root, args.base_url, enabled=not args.no_start_server)
    try:
        frames = asyncio.run(capture_screenshots(args.base_url, screenshot_dir, args.headed))
        encode_video(frames, output_path)
        print(f"Created {output_path} ({output_path.stat().st_size:,} bytes).")
        print("The montage is silent; the existing captions file and video markup were not changed.")
    finally:
        if server is not None:
            server.terminate()
            try:
                server.wait(timeout=10)
            except subprocess.TimeoutExpired:
                server.kill()


if __name__ == "__main__":
    main()
