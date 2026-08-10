import asyncio
import os
from playwright.async_api import async_playwright

async def verify_mobile():
    async with async_playwright() as p:
        browser = await p.chromium.launch()

        viewports = [
            {'width': 375, 'height': 812, 'name': '375px_phone'},
            {'width': 390, 'height': 844, 'name': '390px_phone'},
            {'width': 768, 'height': 1024, 'name': '768px_tablet'},
            {'width': 1024, 'height': 768, 'name': '1024px_desktop_sm'},
            {'width': 1440, 'height': 900, 'name': '1440px_desktop_lg'}
        ]

        os.makedirs("verification", exist_ok=True)

        for vp in viewports:
            print(f"Verifying viewport {vp['name']} ({vp['width']}x{vp['height']})...")
            context = await browser.new_context(viewport={'width': vp['width'], 'height': vp['height']})
            page = await context.new_page()

            # Navigate to shop page
            await page.goto("http://localhost:3000/shop")
            await page.wait_for_timeout(1000)

            # Check horizontal scroll
            has_h_scroll = await page.evaluate("document.body.scrollWidth > window.innerWidth")
            print(f"  Horizontal scrollbar detected: {has_h_scroll}")

            # Take full page screenshot of shop
            await page.screenshot(path=f"verification/shop_{vp['name']}.png", full_page=True)

            # Check if mobile menu works at small screens
            if vp['width'] <= 768:
                await page.goto("http://localhost:3000/")
                await page.wait_for_timeout(1000)
                try:
                    await page.click('button:has(svg.lucide-menu)', timeout=2000)
                    await page.wait_for_timeout(500)
                    await page.screenshot(path=f"verification/mobile_menu_{vp['name']}.png")
                    print("  Mobile menu open captured.")
                except Exception as e:
                    print(f"  Could not open mobile menu: {e}")

            await context.close()

        print("Verification completed successfully for all viewports.")
        await browser.close()

if __name__ == "__main__":
    asyncio.run(verify_mobile())
