const formatCurrency = (value) => `$${value.toFixed(2)}`;

export function ProductGrid({ products, onAddToCart }) {
  if (!products.length) {
    return <div className="empty-state">No products match your search.</div>;
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <article className="product-card" key={product.id}>
          <div className="product-icon">{product.icon}</div>
          <span className="product-category">{product.category}</span>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <div className="price-row">
            <span className="price">{formatCurrency(product.price)}</span>
            <button className="add-button" onClick={() => onAddToCart(product.id)}>
              Add
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
