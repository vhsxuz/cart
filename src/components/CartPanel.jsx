const formatCurrency = (value) => `$${value.toFixed(2)}`;

export function CartPanel({ cart, itemCount, subtotal, onCheckout }) {
  return (
    <>
      <div className="cart-header">
        <h2>Your cart</h2>
        <span>{itemCount} item{itemCount === 1 ? '' : 's'}</span>
      </div>

      <div className="cart-items">
        {!cart.length ? (
          <div className="empty-state">Your cart is empty.</div>
        ) : (
          cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <div className="cart-item-row">
                <span>{item.name}</span>
                <strong>{formatCurrency(item.price * item.quantity)}</strong>
              </div>
              <div className="cart-item-row" style={{ fontSize: '0.9rem', color: 'var(--muted)', marginTop: '0.35rem' }}>
                <span>Qty {item.quantity}</span>
                <span>{formatCurrency(item.price)} each</span>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="cart-footer">
        <div className="summary-row">
          <span>Subtotal</span>
          <strong>{formatCurrency(subtotal)}</strong>
        </div>
        <button className="checkout-button" onClick={onCheckout} disabled={!cart.length}>
          Checkout
        </button>
      </div>
    </>
  );
}
