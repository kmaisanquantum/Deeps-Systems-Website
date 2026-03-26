import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={'width': 1280, 'height': 800})

        print("Navigating to home page...")
        await page.goto("http://localhost:3000/")
        await page.wait_for_timeout(2000)

        # Scroll to footer
        await page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        await page.wait_for_timeout(1000)

        # Check for phone number text
        content = await page.content()
        if "+675 79452732" in content:
            print("FAILURE: Phone number still present on page!")
        else:
            print("SUCCESS: Phone number not found on page.")

        # Take screenshot of footer
        footer = page.locator("footer")
        await footer.screenshot(path="verification/footer_check.png")
        print("Footer screenshot saved to verification/footer_check.png")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
