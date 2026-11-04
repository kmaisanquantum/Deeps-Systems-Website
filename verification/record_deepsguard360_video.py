import argparse
import asyncio
import shutil
import socket
import subprocess
import tempfile
import time
from pathlib import Path
from urllib.request import urlopen

from playwright.async_api import async_playwright

# Actual demo sections in the requested walkthrough order.
SCENES = [
    ("discovery", "Landing"),
    ("registration", "Registration"),
    ("subscription", "Subscription"),
    ("overview", "Dashboard"),
    ("guards", "Guard management"),
    ("workforce", "Scheduling"),
    ("mobile", "Guard mobile app"),
    ("map", "GPS and patrol map"),
    ("control", "Control room"),
    ("cctv", "CCTV"),
    ("incidents", "Incidents"),
    ("client", "Client portal"),
    ("reports", "Reports"),
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
        raise SystemExit(f"Site unavailable at {base_url}. Start Vite or omit --no-start-server.")
    if shutil.which("npm") is None:
        raise SystemExit("npm was not found. Install Node.js/npm or start the site yourself.")

    port = 3000
    try:
        port = int(base_url.rsplit(":", 1)[1].split("/", 1)[0])
    except (IndexError, ValueError):
        pass
    process = subprocess.Popen(
        ["npm", "run", "dev", "--", "--host", "127.0.0.1", "--port", str(port), "--strictPort"],
        cwd=repo_root,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.STDOUT,
    )
    for _ in range(60):
        if process.poll() is not None:
            raise SystemExit("Vite exited before it became available. Check npm dependencies and project scripts.")
        if site_is_ready(base_url):
            print(f"Started Vite at {base_url}")
            return process
        time.sleep(1)
    process.terminate()
    raise SystemExit(f"Timed out waiting for Vite at {base_url}.")


async def capture(base_url: str, output_dir: Path, headed: bool) -> list[Path]:
    screenshots = output_dir / "deepsguard360-promo-frames"
    screenshots.mkdir(parents=True, exist_ok=True)
    captured: list[Path] = []

    async with async_playwright() as playwright:
        browser = await playwright.chromium.launch(headless=not headed)
        page = await browser.new_page(
            viewport={"width": 1920, "height": 1080},
            device_scale_factor=1,
            color_scheme="dark",
        )
        await page.goto(f"{base_url.rstrip('/')}/deepsguard360/demo", wait_until="domcontentloaded", timeout=60000)
        await page.locator("#discovery").wait_for(state="visible", timeout=30000)
        await page.wait_for_timeout(1200)

        for index, (section_id, label) in enumerate(SCENES, start=1):
            section = page.locator(f"#{section_id}")
            await section.scroll_into_view_if_needed(timeout=15000)
            await page.wait_for_timeout(650)

            # Play the demo's scripted controls where they are available.
            if section_id == "control":
                action = page.get_by_role("button", name="Assign response")
                if await action.count() and await action.first.is_visible():
                    await action.first.click()
                    await page.wait_for_timeout(450)
            elif section_id == "mobile":
                action = page.get_by_role("button", name="Clock in")
                if await action.count() and await action.first.is_visible():
                    await action.first.click()
                    await page.wait_for_timeout(350)
            elif section_id == "incidents":
                action = page.get_by_role("button", name="Resolve incident")
                if await action.count() and await action.first.is_visible():
                    await action.first.click()
                    await page.wait_for_timeout(450)

            frame = screenshots / f"scene-{index:02d}-{section_id}.png"
            await page.screenshot(path=str(frame), animations="disabled")
            captured.append(frame)
            print(f"Captured {index:02d}/{len(SCENES)}: {label}")

        await browser.close()
    return captured


def create_concat_file(frames: list[Path], destination: Path, duration: float) -> None:
    # 14 scenes share 30 seconds equally (~2.14 seconds per screen).
    lines: list[str] = []
    for frame in frames:
        escaped = str(frame.resolve()).replace("'", "'\\''")
        lines.extend((f"file '{escaped}'", f"duration {duration:.6f}"))
    escaped_last = str(frames[-1].resolve()).replace("'", "'\\''")
    lines.append(f"file '{escaped_last}'")
    destination.write_text("\n".join(lines) + "\n", encoding="utf-8")


def encode_promo(frames: list[Path], output_dir: Path) -> Path:
    if not frames:
        raise SystemExit("No demo screenshots were captured.")
    if shutil.which("ffmpeg") is None:
        raise SystemExit("ffmpeg was not found. Install ffmpeg and rerun the script.")

    output = output_dir / "deepsguard360-promo-30s.mp4"
    with tempfile.TemporaryDirectory(prefix="deepsguard360-ffmpeg-") as temporary:
        concat = Path(temporary) / "frames.txt"
        create_concat_file(frames, concat, 30.0 / len(frames))
        subprocess.run(
            [
                "ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", str(concat),
                "-vf", "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2,format=yuv420p",
                "-r", "30", "-c:v", "libx264", "-preset", "medium", "-crf", "24",
                "-movflags", "+faststart", "-an", str(output),
            ],
            check=True,
        )
    return output


def main() -> None:
    parser = argparse.ArgumentParser(description="Capture DeepsGuard360 demo sections and create a 30-second silent MP4 promo.")
    parser.add_argument("--base-url", default="http://127.0.0.1:3000", help="Local Vite site URL")
    parser.add_argument("--output-dir", type=Path, default=Path("public/videos"))
    parser.add_argument("--headed", action="store_true", help="Show Chromium while capturing")
    parser.add_argument("--no-start-server", action="store_true", help="Do not start Vite automatically")
    args = parser.parse_args()

    repo_root = Path(__file__).resolve().parents[1]
    args.output_dir.mkdir(parents=True, exist_ok=True)
    server = start_vite(repo_root, args.base_url, enabled=not args.no_start_server)
    try:
        frames = asyncio.run(capture(args.base_url, args.output_dir, args.headed))
        video = encode_promo(frames, args.output_dir)
        print(f"Created {video} ({video.stat().st_size:,} bytes).")
        print("This is a silent screenshot montage; no narration or music is included. The existing VTT captions file is left unchanged.")
    finally:
        if server is not None:
            server.terminate()
            try:
                server.wait(timeout=10)
            except subprocess.TimeoutExpired:
                server.kill()


if __name__ == "__main__":
    main()
