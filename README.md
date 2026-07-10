# Cartly Store

A modern storefront demo built with React and Vite. It includes a navbar, product search, add-to-cart actions, a live cart summary, and checkout confirmation.

## How to run the project

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open the app in your browser at:
   ```text
   http://127.0.0.1:3000/
   ```
4. To stop the server, press Ctrl+C in the terminal.

## Build for production

```bash
npm run build
```

## Project structure

- [index.html](index.html) — Vite HTML entry point.
- [styles.css](styles.css) — shared styling and responsive layout.
- [src/main.jsx](src/main.jsx) — React bootstrap entry.
- [src/App.jsx](src/App.jsx) — main app layout and orchestration.
- [src/components/ProductGrid.jsx](src/components/ProductGrid.jsx) — product card list UI.
- [src/components/CartPanel.jsx](src/components/CartPanel.jsx) — cart summary and checkout UI.
- [src/hooks/useCart.js](src/hooks/useCart.js) — custom hook for cart state and totals.
- [src/data/products.js](src/data/products.js) — dummy product dataset.

## End-to-end app flow

1. The app loads and renders the product catalog from the dummy dataset.
2. The search box filters products in real time.
3. Clicking Add places the selected product into cart state.
4. The cart panel updates the item count and subtotal.
5. Clicking Checkout clears the cart and shows a success message.

## Included features

- Navbar
- Product search
- Add to cart
- Cart summary and subtotal
- Checkout confirmation toast
- Modular React structure with a custom hook
