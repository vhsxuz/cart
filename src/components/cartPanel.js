function formatCurrency(value) {
  return `$${value.toFixed(2)}`;
}

export function renderCartPanel(container, { cart, onCheckout, cartCount, cartTotal, subtotal, checkoutButton }) {
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  cartCount.textContent = itemCount;
  cartTotal.textContent = `${itemCount} item${itemCount === 1 ? "" : "s"}`;
  subtotal.textContent = formatCurrency(subtotalAmount);

  if (!cart.length) {
    container.innerHTML = '<div class="empty-state">Your cart is empty.</div>';
    checkoutButton.disabled = true;
    return;
  }

  checkoutButton.disabled = false;
  container.innerHTML = cart
    .map(
      (item) => `
        <div class="cart-item">
          <div class="cart-item-row">
            <span>${item.name}</span>
            <strong>${formatCurrency(item.price * item.quantity)}</strong>
          </div>
          <div class="cart-item-row" style="font-size: 0.9rem; color: var(--muted); margin-top: 0.35rem;">
            <span>Qty ${item.quantity}</span>
            <span>${formatCurrency(item.price)} each</span>
          </div>
        </div>
      `
    )
    .join("");

  checkoutButton.onclick = onCheckout;
}
