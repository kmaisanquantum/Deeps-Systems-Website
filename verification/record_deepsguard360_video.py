import argparse
import asyncio
import shutil
import subprocess
from pathlib import Path

from playwright.async_api import async_playwright

SCENES = [
    ("discovery", 12),
    ("registration", 18),
    ("subscription", 14),
    ("overview", 14),
    ("guards", 14),
    ("workforce", 12),
    ("mobile", 18),
    ("map", 16),
    ("control", 18),
    ("cctv", 12),
    ("incidents", 14),
    ("client", 12),
    ("reports", 14),
    ("master", 14),
]


def run_ffmpeg(args: list[str]) -> None:
    if not shutil.which("ffmpeg"):
        raise SystemExit("ffmpeg is required to encode MP4 deliverables; install ffmpeg and rerun.")
    subprocess.run(["ffmpeg", "-y", *args], check=True)


async def record(base_url: str, output_dir: Path, headless: bool) -> Path:
    raw_dir = output_dir / "raw"
    raw_dir.mkdir(parents=True, exist_ok=True)
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=headless)
        context = await browser.new_context(
            viewport={"width": 1920, "height": 1080},
            record_video_dir=str(raw_dir),
            record_video_size={"width": 1920, "height": 1080},
            color_scheme="dark",
        )
        page = await context.new_page()
        await page.goto(f"{base_url.rstrip('/')}/deepsguard360/demo", wait_until="networkidle")
        await page.wait_for_timeout(1200)

        # Progress through the simulated onboarding to show the workspace-ready state.
        for _ in range(6):
            button = page.get_by_role("button", name="Continue").or_(page.get_by_role("button", name="Verify email")).or_(page.get_by_role("button", name="Create workspace"))
            if await button.count() and await button.first.is_visible():
                await button.first.click()
                await page.wait_for_timeout(350)

        # Run through the actual demo sections in the intended story order.
        for section_id, seconds in SCENES:
            section = page.locator(f"#{section_id}")
            await section.scroll_into_view_if_needed()
            await page.wait_for_timeout(seconds * 1000)
            if section_id == "control":
                assign = page.get_by_role("button", name="Assign response")
                if await assign.count():
                    await assign.click()
                    await page.wait_for_timeout(900)
            elif section_id == "mobile":
                clock = page.get_by_role("button", name="Clock in")
                if await clock.count():
                    await clock.click()
                    await page.wait_for_timeout(600)
            elif section_id == "incidents":
                resolve = page.get_by_role("button", name="Resolve incident")
                if await resolve.count():
                    await resolve.click()
                    await page.wait_for_timeout(900)

        video = page.video
        await context.close()
        await browser.close()
        if video is None:
            raise SystemExit("Playwright did not create a browser recording.")
        webm = Path(await video.path())
        destination = output_dir / "deepsguard360-full-demo.webm"
        shutil.copy2(webm, destination)
        return destination


def encode_assets(webm: Path, output_dir: Path) -> None:
    full_mp4 = output_dir / "deepsguard360-full-demo.mp4"
    run_ffmpeg(["-i", str(webm), "-vf", "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2", "-c:v", "libx264", "-preset", "medium", "-crf", "24", "-pix_fmt", "yuv420p", "-movflags", "+faststart", str(full_mp4)])

    # These are initial duration-based promo edits for review. Replace the cuts
    # with a human-edited selection/voice-over/music mix before public campaign use.
    for seconds, name in [(60, "deepsguard360-promo-60s.mp4"), (30, "deepsguard360-promo-30s.mp4")]:
        run_ffmpeg(["-i", str(full_mp4), "-t", str(seconds), "-c:v", "libx264", "-preset", "medium", "-crf", "25", "-pix_fmt", "yuv420p", "-an", "-movflags", "+faststart", str(output_dir / name)])


def main() -> None:
    parser = argparse.ArgumentParser(description="Record a fictional DeepsGuard360 demo walkthrough and encode review MP4 cuts.")
    parser.add_argument("--base-url", default="http://127.0.0.1:3000", help="URL of the running Vite site")
    parser.add_argument("--output-dir", default="public/videos", type=Path)
    parser.add_argument("--headed", action="store_true", help="Show the browser while recording")
    args = parser.parse_args()
    args.output_dir.mkdir(parents=True, exist_ok=True)
    webm = asyncio.run(record(args.base_url, args.output_dir, headless=not args.headed))
    encode_assets(webm, args.output_dir)
    print(f"Recorded {webm}; MP4 cuts are in {args.output_dir}.")
    print("Note: cuts are silent review edits. Add human-reviewed narration, captions timing, and licensed music before publishing.")


if __name__ == "__main__":
    main()
