# Cartly Store

A lightweight storefront demo with a product listing page, live search, add-to-cart actions, and checkout confirmation.

## End-to-end code structure

1. Entry page: [index.html](index.html)
   - Provides the layout shell with the navbar, product area, and cart panel.
2. Styling: [styles.css](styles.css)
   - Defines the visual system for the storefront experience.
3. Product data: [src/data/products.js](src/data/products.js)
   - Supplies the dummy product dataset used by the UI.
4. Product UI: [src/components/productGrid.js](src/components/productGrid.js)
   - Renders the searchable product list and add-to-cart controls.
5. Cart UI: [src/components/cartPanel.js](src/components/cartPanel.js)
   - Renders the cart state, totals, and checkout button.
6. App orchestration: [src/app.js](src/app.js)
   - Connects state, events, and rendering so the experience flows from search to checkout.

## User flow

- The page loads and renders the product catalog.
- The search box filters products in real time.
- Clicking Add puts the selected item into the cart state.
- The checkout button clears the cart and shows a success message.
