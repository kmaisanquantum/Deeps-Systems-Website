import argparse
import asyncio
import shutil
import subprocess
import tempfile
from pathlib import Path

from playwright.async_api import async_playwright

# Sections in the requested explainer order. The screenshots are captured from
# the actual interactive demo and contain only its fictional demo data.
SCENES = [
    ("discovery", "One platform. Complete security operations."),
    ("registration", "Register a company and create a private workspace."),
    ("subscription", "Starter 50 · Growth 150 · Professional 300 · Enterprise custom."),
    ("overview", "See guards, sites, patrols, incidents and performance at a glance."),
    ("guards", "Manage guard profiles, documents and site assignments."),
    ("workforce", "Build rosters, assign shifts and track attendance."),
    ("mobile", "Mobile duties, clock-in, patrols, incidents and offline sync."),
    ("map", "Monitor patrol routes and checkpoints on the Papua New Guinea map."),
    ("control", "Review the simulated Commercial Site A emergency alert."),
    ("cctv", "CCTV status panels are clearly marked simulations."),
    ("incidents", "Track classification, response, resolution and history."),
    ("client", "Give clients restricted access to their own sites and reports."),
    ("reports", "Turn security operations into useful reports and analytics."),
    ("master", "Manage multiple companies with isolated workspaces."),
]


def run(command: list[str]) -> None:
    if not shutil.which(command[0]):
        raise SystemExit(f"Required tool not found: {command[0]}")
    subprocess.run(command, check=True)


async def capture(base_url: str, output_dir: Path, headed: bool) -> list[Path]:
    screenshots = output_dir / "screenshots"
    screenshots.mkdir(parents=True, exist_ok=True)
    results: list[Path] = []

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=not headed)
        page = await browser.new_page(viewport={"width": 1920, "height": 1080}, device_scale_factor=1, color_scheme="dark")
        await page.goto(f"{base_url.rstrip('/')}/deepsguard360/demo", wait_until="networkidle")
        await page.wait_for_timeout(1200)

        for index, (section_id, _caption) in enumerate(SCENES, start=1):
            section = page.locator(f"#{section_id}")
            await section.scroll_into_view_if_needed()
            await page.wait_for_timeout(700)
            if section_id == "control":
                assign = page.get_by_role("button", name="Assign response")
                if await assign.count() and await assign.first.is_visible():
                    await assign.first.click()
                    await page.wait_for_timeout(350)
            elif section_id == "mobile":
                clock_in = page.get_by_role("button", name="Clock in")
                if await clock_in.count() and await clock_in.first.is_visible():
                    await clock_in.first.click()
                    await page.wait_for_timeout(300)
            elif section_id == "incidents":
                resolve = page.get_by_role("button", name="Resolve incident")
                if await resolve.count() and await resolve.first.is_visible():
                    await resolve.first.click()
                    await page.wait_for_timeout(350)
            target = screenshots / f"scene-{index:02d}-{section_id}.png"
            await page.screenshot(path=str(target), animations="disabled")
            results.append(target)

        await browser.close()
    return results


def write_concat_list(images: list[Path], durations: list[float], output: Path) -> None:
    # ffmpeg concat demuxer uses a final repeated frame to honor the last duration.
    lines = []
    for image, duration in zip(images, durations):
        safe = str(image.resolve()).replace("'", "'\\''")
        lines.extend([f"file '{safe}'", f"duration {duration:.6f}"])
    safe_last = str(images[-1].resolve()).replace("'", "'\\''")
    lines.append(f"file '{safe_last}'")
    output.write_text("\n".join(lines) + "\n", encoding="utf-8")


def encode(images: list[Path], output_dir: Path, captions_path: Path) -> None:
    # Make the 30-second cut a visual montage of all 14 parts rather than the
    # first 30 seconds of the much longer walkthrough. Captions remain a VTT
    # sidecar so the existing HTML5 track can be used without burning text in.
    with tempfile.TemporaryDirectory(prefix="deepsguard360-video-") as temp_dir:
        temp = Path(temp_dir)
        promo_concat = temp / "promo.txt"
        full_concat = temp / "full.txt"
        write_concat_list(images, [30.0 / len(images)] * len(images), promo_concat)
        write_concat_list(images, [12.0] * len(images), full_concat)

        video_args = ["-vsync", "vfr", "-vf", "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2,format=yuv420p", "-c:v", "libx264", "-preset", "medium", "-crf", "24", "-movflags", "+faststart"]
        run(["ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", str(promo_concat), *video_args, str(output_dir / "deepsguard360-promo-30s.mp4")])
        run(["ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", str(full_concat), *video_args, str(output_dir / "deepsguard360-demo-full.mp4")])

        # Provide a contact-sheet-like poster from the opening scene. The SVG
        # poster already used by the page is preserved and remains unchanged.
        if not captions_path.is_file():
            raise SystemExit(f"Expected existing captions file: {captions_path}")


def main() -> None:
    parser = argparse.ArgumentParser(description="Capture DeepsGuard360 demo screens and encode silent MP4 walkthroughs.")
    parser.add_argument("--base-url", default="http://127.0.0.1:3000", help="Base URL for the locally running Vite site")
    parser.add_argument("--output-dir", type=Path, default=Path("public/videos"))
    parser.add_argument("--headed", action="store_true", help="Show Chromium while capturing screens")
    args = parser.parse_args()

    if not shutil.which("ffmpeg"):
        raise SystemExit("Install ffmpeg, start the Vite site, then rerun this script.")
    args.output_dir.mkdir(parents=True, exist_ok=True)
    images = asyncio.run(capture(args.base_url, args.output_dir, args.headed))
    encode(images, args.output_dir, args.output_dir / "deepsguard360-promo-30s.vtt")
    print("Wrote silent 1920x1080 review MP4s to public/videos/.")
    print("They contain demo-screen captures and no narration/music. Add approved audio before campaign release.")


if __name__ == "__main__":
    main()
