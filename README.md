# Cartly Store

A lightweight storefront demo built with plain HTML, CSS, and JavaScript modules. It includes a navbar, product search, add-to-cart actions, and checkout confirmation.

## How to run the project

No build step or package installation is required.

1. Open a terminal in the project folder.
2. Start a local web server:
   ```bash
   python3 -m http.server 3000
   ```
3. Open the app in your browser at:
   ```text
   http://127.0.0.1:3000/
   ```
4. To stop the server, press Ctrl+C in the terminal.

## Project structure

- [index.html](index.html) — app shell with the navbar, product area, and cart panel.
- [styles.css](styles.css) — all visual styling and responsive layout rules.
- [src/app.js](src/app.js) — app state, event handling, and render flow.
- [src/components/productGrid.js](src/components/productGrid.js) — renders the searchable product list and add buttons.
- [src/components/cartPanel.js](src/components/cartPanel.js) — renders the cart items, totals, and checkout button.
- [src/data/products.js](src/data/products.js) — dummy product dataset used by the app.

## End-to-end app flow

1. The page loads and renders the product catalog from the dummy dataset.
2. The search box filters products in real time.
3. Clicking Add places the product into the cart state.
4. The cart panel updates the item count and subtotal.
5. Clicking Checkout clears the cart and shows a success message.

## Included features

- Navbar
- Product search
- Add to cart
- Cart summary and subtotal
- Checkout confirmation toast
