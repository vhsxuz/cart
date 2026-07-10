import { useMemo, useState } from 'react';
import { products } from './data/products.js';
import { ProductGrid } from './components/ProductGrid.jsx';
import { CartPanel } from './components/CartPanel.jsx';
import { useCart } from './hooks/useCart.js';

function App() {
  const [search, setSearch] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const { cart, addToCart, checkout, itemCount, subtotal } = useCart();

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return products;

    return products.filter((product) => {
      const haystack = `${product.name} ${product.category} ${product.description}`.toLowerCase();
      return haystack.includes(query);
    });
  }, [search]);

  const handleAddToCart = (productId) => {
    const product = products.find((item) => item.id === productId);
    if (!product) return;

    addToCart(product);
    setToastMessage(`${product.name} added to cart`);
    window.clearTimeout(handleAddToCart.timeoutId);
    handleAddToCart.timeoutId = window.setTimeout(() => setToastMessage(''), 1800);
  };

  const handleCheckout = () => {
    if (!cart.length) {
      setToastMessage('Your cart is empty.');
      return;
    }

    checkout();
    setToastMessage('Checkout successful! 🎉');
    window.clearTimeout(handleCheckout.timeoutId);
    handleCheckout.timeoutId = window.setTimeout(() => setToastMessage(''), 1800);
  };

  return (
    <>
      <nav className="navbar">
        <div className="brand">Cartly</div>
        <div className="nav-links">
          <a href="#products">Products</a>
          <a href="#cart">
            Cart <span id="cart-count">{itemCount}</span>
          </a>
        </div>
      </nav>

      <header className="hero">
        <div>
          <p className="eyebrow">Curated essentials</p>
          <h1>Shop smarter with a faster cart.</h1>
          <p className="hero-copy">
            Browse a polished product catalog, search instantly, and add your favorites to the cart.
          </p>
        </div>
        <div className="search-card">
          <label htmlFor="search-input">Search products</label>
          <input
            id="search-input"
            type="search"
            placeholder="Try “lamp” or “desk”"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
      </header>

      <main className="main-layout">
        <section id="products" className="products-section">
          <div className="section-heading">
            <h2>Featured products</h2>
            <p>Pick from a small premium collection.</p>
          </div>
          <ProductGrid products={filteredProducts} onAddToCart={handleAddToCart} />
        </section>

        <aside id="cart" className="cart-panel">
          <CartPanel cart={cart} itemCount={itemCount} subtotal={subtotal} onCheckout={handleCheckout} />
        </aside>
      </main>

      <div className={`toast ${toastMessage ? 'show' : ''}`} aria-live="polite">
        {toastMessage}
      </div>
    </>
  );
}

export default App;
