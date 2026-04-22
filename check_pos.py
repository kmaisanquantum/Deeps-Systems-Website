import asyncio
from playwright.async_api import async_playwright

async def check_pos():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={'width': 1280, 'height': 720})
        await page.goto("http://localhost:3000/")
        await page.wait_for_timeout(2000)

        btn = page.locator('button[aria-label="Open support chat"]')
        box = await btn.bounding_box()
        print(f"Desktop Button position: {box}")

        await page.evaluate("window.scrollTo(0, 500)")
        await page.wait_for_timeout(1000)
        scroll_btn = page.locator('button[aria-label="Scroll to top"]')
        box_scroll = await scroll_btn.bounding_box()
        print(f"Desktop Scroll button position: {box_scroll}")

        # Mobile
        await page.set_viewport_size({'width': 390, 'height': 844})
        await page.wait_for_timeout(1000)
        box_mobile = await btn.bounding_box()
        print(f"Mobile Button position: {box_mobile}")
        box_scroll_mobile = await scroll_btn.bounding_box()
        print(f"Mobile Scroll button position: {box_scroll_mobile}")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(check_pos())
