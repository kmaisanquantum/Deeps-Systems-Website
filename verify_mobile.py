import asyncio
from playwright.async_api import async_playwright

async def verify_mobile():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        # iPhone 12 viewport
        context = await browser.new_context(
            viewport={'width': 390, 'height': 844},
            user_agent='Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1'
        )
        page = await context.new_page()

        print("Checking mobile view...")
        await page.goto("http://localhost:3000/")
        await page.wait_for_timeout(2000)

        # Open mobile menu
        await page.click('button:has(svg.lucide-menu)')
        await page.wait_for_timeout(1000)
        await page.screenshot(path="verification/mobile_menu_open_check.png")

        content = await page.content()
        if "+675" in content or "7945" in content:
            print("FAILURE: Phone number found in mobile menu!")
        else:
            print("SUCCESS: Phone number not found in mobile menu.")

        # Scroll to footer
        await page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        await page.wait_for_timeout(1000)
        await page.screenshot(path="verification/mobile_footer_check.png")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(verify_mobile())
