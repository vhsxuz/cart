function formatCurrency(value) {
  return `$${value.toFixed(2)}`;
}

export function renderProductGrid(container, { products, onAddToCart }) {
  if (!products.length) {
    container.innerHTML = '<div class="empty-state">No products match your search.</div>';
    return;
  }

  container.innerHTML = products
    .map(
      (product) => `
        <article class="product-card">
          <div class="product-icon">${product.icon}</div>
          <span class="product-category">${product.category}</span>
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <div class="price-row">
            <span class="price">${formatCurrency(product.price)}</span>
            <button class="add-button" data-product-id="${product.id}">Add</button>
          </div>
        </article>
      `
    )
    .join("");

  container.querySelectorAll("button[data-product-id]").forEach((button) => {
    button.addEventListener("click", () => onAddToCart(Number(button.dataset.productId)));
  });
}
