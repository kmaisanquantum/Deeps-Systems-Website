import asyncio
from playwright.async_api import async_playwright

async def verify():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={'width': 1280, 'height': 720})
        try:
            await page.goto("http://localhost:3000/", timeout=60000)
            await page.wait_for_timeout(2000)
            await page.screenshot(path="verification/assistant_desktop.png")

            # Mobile
            mobile_context = await browser.new_context(viewport={'width': 390, 'height': 844})
            mobile_page = await mobile_context.new_page()
            await mobile_page.goto("http://localhost:3000/", timeout=60000)
            await mobile_page.wait_for_timeout(2000)
            await mobile_page.screenshot(path="verification/assistant_mobile.png")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            await browser.close()

if __name__ == "__main__":
    asyncio.run(verify())
