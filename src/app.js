import { products } from "./data/products.js";
import { renderProductGrid } from "./components/productGrid.js";
import { renderCartPanel } from "./components/cartPanel.js";

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

function addToCart(productId) {
  const product = products.find((item) => item.id === productId);
  if (!product) return;

  const existingItem = state.cart.find((item) => item.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    state.cart.push({ ...product, quantity: 1 });
  }

  render();
  showToast(`${product.name} added to cart`);
}

function checkout() {
  if (!state.cart.length) {
    showToast("Your cart is empty.");
    return;
  }

  state.cart = [];
  render();
  showToast("Checkout successful! 🎉");
}

function render() {
  renderProductGrid(productGrid, {
    products: getFilteredProducts(),
    onAddToCart: addToCart,
  });

  renderCartPanel(cartItems, {
    cart: state.cart,
    onCheckout: checkout,
    cartCount,
    cartTotal,
    subtotal,
    checkoutButton,
  });
}

searchInput.addEventListener("input", (event) => {
  state.search = event.target.value;
  render();
});

render();
