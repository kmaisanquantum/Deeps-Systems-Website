import asyncio
from playwright.async_api import async_playwright

async def verify_shop():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={'width': 1280, 'height': 800})

        try:
            print("Navigating to shop...")
            await page.goto("http://localhost:3000/shop")
            await page.wait_for_timeout(3000) # wait for dynamic products to fetch and load

            # Verify Starlink Standard Kit card exists
            content = await page.content()
            if "Starlink Standard Kit" in content:
                print("SUCCESS: Starlink products fetched and rendered on the page.")
            else:
                print("FAILURE: Starlink products NOT found!")

            # Verify price of Starlink Standard Kit is formatted as expected
            if "K2500.00" in content:
                print("SUCCESS: Starlink price rendered correctly as K2500.00.")
            else:
                print("FAILURE: Price formatting not correct!")

            # Take screenshot of Shop page
            await page.screenshot(path="verification/shop_products_catalog.png", full_page=True)
            print("Saved verification/shop_products_catalog.png")

            # Add Starlink Standard Kit to cart by targeting the card
            print("Adding Starlink Standard Kit to cart...")
            starlink_card = page.locator("div.group:has-text('Starlink Standard Kit')")
            add_btn = starlink_card.locator("button:has-text('Add to Cart')").first
            await add_btn.scroll_into_view_if_needed()
            await add_btn.click()
            await page.wait_for_timeout(2000)

            # Check if Cart Drawer is open
            drawer_content = await page.content()
            if "YOUR BASKET" in drawer_content.upper():
                print("SUCCESS: Cart drawer opened automatically upon adding item.")
            else:
                print("FAILURE: Cart drawer did not open! Attempting manual open via header basket icon...")
                # Try clicking the basket button in the header
                basket_icon = page.locator("button[aria-label='Open basket']").first
                await basket_icon.click()
                await page.wait_for_timeout(2000)
                drawer_content_after_click = await page.content()
                if "YOUR BASKET" in drawer_content_after_click.upper():
                    print("SUCCESS: Cart drawer opened via manual click.")
                else:
                    print("FAILURE: Manual basket click failed to open drawer.")

            # Fill out cart checkout details
            print("Filling out checkout details...")
            await page.fill("input[placeholder='John Doe']", "Jane Doe")
            await page.fill("input[placeholder='e.g. PNG SME Ltd']", "SME Logistics Ltd")
            await page.fill("input[placeholder='john@example.com']", "jane@smelogistics.tech")
            await page.fill("textarea[placeholder='Add special instructions or query info...']", "Please provision ASAP.")

            # Take screenshot of filled checkout drawer
            await page.screenshot(path="verification/shop_checkout_filled.png")
            print("Saved verification/shop_checkout_filled.png")

            # Submit order by clicking the submit button with force=True
            print("Submitting order...")
            submit_btn = page.locator("button:has-text('Submit Inquiry & Order')")
            await submit_btn.click(force=True)
            await page.wait_for_timeout(5000)

            # Verify order success modal is shown
            post_submit_content = await page.content()
            if "ORDER SENT!" in post_submit_content.upper():
                print("SUCCESS: Order submitted successfully!")
            else:
                print("FAILURE: Order success state was not shown!")

            # Take screenshot of order success modal
            await page.screenshot(path="verification/shop_order_success.png")
            print("Saved verification/shop_order_success.png")

        except Exception as e:
            print(f"Error during verification: {e}")
        finally:
            await browser.close()

if __name__ == "__main__":
    asyncio.run(verify_shop())
