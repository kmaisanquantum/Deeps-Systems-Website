import asyncio
from playwright.async_api import async_playwright

async def verify():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={'width': 1280, 'height': 800})
        try:
            # 1. Contact Page
            print("Navigating to Contact Page...")
            await page.goto("http://localhost:3000/contact", timeout=60000)
            await page.wait_for_timeout(2000)
            await page.screenshot(path="verification/contact_page_check.png")
            print("Saved contact page screenshot")

            # 2. Quantum Assistant check
            print("Clicking Quantum Assistant Toggle Button...")
            # Toggle is at bottom-right
            toggle = page.locator("button[aria-label='Open support chat']")
            await toggle.click(force=True)
            await page.wait_for_timeout(1000)

            # Chat input text and send
            print("Sending a dummy chat message...")
            input_box = page.locator("input[aria-label='Message for support']")
            await input_box.fill("I want to consult digital transformation.")
            send_btn = page.locator("button[aria-label='Send message']")
            await send_btn.click(force=True)
            await page.wait_for_timeout(2000)

            # Screenshot of the chat overlay
            await page.screenshot(path="verification/assistant_chat_check.png")
            print("Saved assistant chat screenshot")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            await browser.close()

if __name__ == "__main__":
    asyncio.run(verify())
