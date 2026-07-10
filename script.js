const products = [
  {
    id: 1,
    name: "Aurora Desk Lamp",
    price: 49.99,
    category: "Home",
    description: "Warm ambient lighting that makes work feel calm.",
    icon: "💡",
  },
  {
    id: 2,
    name: "Nimbus Backpack",
    price: 79.0,
    category: "Travel",
    description: "A sleek travel bag with padded laptop storage.",
    icon: "🎒",
  },
  {
    id: 3,
    name: "Luna Headphones",
    price: 129.5,
    category: "Audio",
    description: "Quiet comfort and rich sound for your day.",
    icon: "🎧",
  },
  {
    id: 4,
    name: "Cove Sneakers",
    price: 89.99,
    category: "Style",
    description: "Lightweight sneakers designed for daily movement.",
    icon: "👟",
  },
  {
    id: 5,
    name: "Terra Bottle",
    price: 24.0,
    category: "Wellness",
    description: "A durable bottle that keeps your drinks fresh.",
    icon: "🧴",
  },
  {
    id: 6,
    name: "Orbit Notebook",
    price: 14.5,
    category: "Office",
    description: "A premium notebook made for thoughtful planning.",
    icon: "📓",
  },
];

const state = {
  search: "",
  cart: [],
};

const productGrid = document.getElementById("product-grid");
const searchInput = document.getElementById("search-input");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");
const subtotal = document.getElementById("subtotal");
const checkoutButton = document.getElementById("checkout-button");
const toast = document.getElementById("toast");

function formatCurrency(value) {
  return `$${value.toFixed(2)}`;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timeoutId);
  showToast.timeoutId = window.setTimeout(() => {
    toast.classList.remove("show");
  }, 1800);
}

function getFilteredProducts() {
  const query = state.search.trim().toLowerCase();
  if (!query) {
    return products;
  }

  return products.filter((product) => {
    const haystack = `${product.name} ${product.category} ${product.description}`.toLowerCase();
    return haystack.includes(query);
  });
}

function renderProducts() {
  const filteredProducts = getFilteredProducts();

  if (!filteredProducts.length) {
    productGrid.innerHTML = '<div class="empty-state">No products match your search.</div>';
    return;
  }

  productGrid.innerHTML = filteredProducts
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
}

function renderCart() {
  const itemCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotalAmount = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  cartCount.textContent = itemCount;
  cartTotal.textContent = `${itemCount} item${itemCount === 1 ? "" : "s"}`;
  subtotal.textContent = formatCurrency(subtotalAmount);

  if (!state.cart.length) {
    cartItems.innerHTML = '<div class="empty-state">Your cart is empty.</div>';
    checkoutButton.disabled = true;
    return;
  }

  checkoutButton.disabled = false;
  cartItems.innerHTML = state.cart
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
}

function addToCart(productId) {
  const product = products.find((item) => item.id === productId);
  if (!product) return;

  const existingItem = state.cart.find((item) => item.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    state.cart.push({ ...product, quantity: 1 });
  }

  renderCart();
  showToast(`${product.name} added to cart`);
}

function handleCheckout() {
  if (!state.cart.length) {
    showToast("Your cart is empty.");
    return;
  }

  state.cart = [];
  renderCart();
  showToast("Checkout successful! 🎉");
}

searchInput.addEventListener("input", (event) => {
  state.search = event.target.value;
  renderProducts();
});

productGrid.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-product-id]");
  if (!button) return;

  addToCart(Number(button.dataset.productId));
});

checkoutButton.addEventListener("click", handleCheckout);

renderProducts();
renderCart();
