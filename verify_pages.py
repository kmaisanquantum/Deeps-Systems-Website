import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={'width': 1280, 'height': 800})

        pages = [
            ("/", "home.png"),
            ("/solutions", "solutions.png"),
            ("/advantage", "advantage.png"),
            ("/insights", "insights.png")
        ]

        for url_path, filename in pages:
            print(f"Capturing {url_path}...")
            await page.goto(f"http://localhost:3000{url_path}")
            await page.wait_for_timeout(2000) # wait for animations
            await page.screenshot(path=f"verification/{filename}", full_page=True)
            print(f"Saved verification/{filename}")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
