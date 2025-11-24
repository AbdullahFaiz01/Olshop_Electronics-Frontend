const API = "https://olshopelectronics-production.up.railway.app";

const PRODUCTS = [
  { id: 1, title: "Headphone Wireless X200", price: 499000, img: "https://i0.wp.com/gotit.org.in/wp-content/uploads/2024/04/6-2.jpeg?fit=1000%2C1000&ssl=1" },
  { id: 2, title: "Smartwatch Z-Track Pro", price: 899000, img: "https://id-live-01.slatic.net/p/485d7fd4bfa8d7dae6c0d2e7c6ddd053.jpg" },
  { id: 3, title: "Keyboard Mechanical RGB", price: 699000, img: "https://img.lazcdn.com/g/p/d950b10768fa6f501cff9b34e09597ba.jpg_720x720q80.jpg" },
  { id: 4, title: "Mouse Gaming HyperX Pulsefire", price: 399000, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5rYe84ak_v5rNq2JICoYBoxDOzsBLT6_nJg&s" },
  { id: 5, title: "Speaker Bluetooth JBL Flip 5", price: 799000, img: "https://down-id.img.susercontent.com/file/id-11134201-23020-a6yjtky4vlnvfa" },
  { id: 6, title: "Laptop ASUS VivoBook 15", price: 7499000, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3TkqRoTSC4RpVfG8GqRiQ1RS0qzywSUBuUg&s" },
  { id: 7, title: "Monitor Gaming 24 inci 144Hz", price: 1990000, img: "https://technokomputerbali.com/img/item/210930154041.jpg" },
  { id: 8, title: "Webcam HD 1080p", price: 299000, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdNOIPxq9CVldN-J2_owXndbXCZS6T4oGJrQ&s" },
  { id: 9, title: "Power Bank Anker 10000mAh", price: 399000, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTswxIfbxMBJ6O1NV7uby6h5IKwE7hEtV4CbA&s" },
  { id: 10, title: "Router WiFi TP-Link AC1200", price: 599000, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSULkC6or6Oj8ZycP43uLYjIFUBegYKsNgy0g&s" }
];

const DEFAULT_ICON = "img/default-pfp.png";

const formatIDR = n => "Rp " + n.toLocaleString("id-ID");
const loadCart = () => JSON.parse(localStorage.getItem("cart") || "[]");
const saveCart = c => localStorage.setItem("cart", JSON.stringify(c));
const mustLogin = () => {
  const e = localStorage.getItem("email");
  if (!e) {
    alert("Anda harus login terlebih dahulu.");
    window.location.href = "login.html";
    return false;
  }
  return true;
};

function updateCartCount() {
  document.querySelectorAll("#cart-count").forEach(e => {
    e.textContent = loadCart().length;
  });
}

function updateNavbarPhoto() {
  const email = localStorage.getItem("email");
  const username = localStorage.getItem("user");
  const savedPhoto = localStorage.getItem("photoUrl");

  const area = document.getElementById("profile-area");
  const login = document.getElementById("login-link");
  const navPfp = document.getElementById("nav-pfp");
  const navUser = document.getElementById("nav-username");

  if (!area || !login) return;

  if (!email) {
    area.style.display = "none";
    login.style.display = "inline-block";
    if (navPfp) navPfp.src = DEFAULT_ICON;
    if (navUser) navUser.textContent = "";
    return;
  }

  area.style.display = "flex";
  login.style.display = "none";
  if (navUser) navUser.textContent = username || email.split("@")[0];
  if (navPfp) navPfp.src = savedPhoto || DEFAULT_ICON;
}

async function fetchNavbarUser() {
  const email = localStorage.getItem("email");
  if (!email) return;
  try {
    const res = await fetch(`${API}/api/user/${encodeURIComponent(email)}`);
    if (!res.ok) return;
    const data = await res.json();
    if (data.username) localStorage.setItem("user", data.username);
    if (data.photoUrl) localStorage.setItem("photoUrl", data.photoUrl);
    const navPfp = document.getElementById("nav-pfp");
    const navUser = document.getElementById("nav-username");
    if (navUser) navUser.textContent = data.username;
    if (navPfp) navPfp.src = data.photoUrl || DEFAULT_ICON;
  } catch {}
}

function addToCart(id) {
  if (!mustLogin()) return;
  let c = loadCart();
  const f = c.find(i => i.id === id);
  if (f) f.qty++;
  else c.push({ id, qty: 1 });
  saveCart(c);
  updateCartCount();
  alert("Produk ditambahkan ke keranjang");
}

function renderProducts() {
  const list = document.getElementById("product-list");
  if (!list) return;
  list.innerHTML = "";
  PRODUCTS.forEach(p => {
    const d = document.createElement("div");
    d.className = "card";
    d.innerHTML = `
      <img src="${p.img}">
      <h3>${p.title}</h3>
      <p>${formatIDR(p.price)}</p>
      <button class="btn" onclick="addToCart(${p.id})">
        <i class="fa-solid fa-cart-plus"></i> Tambah ke Keranjang
      </button>`;
    list.appendChild(d);
  });
}

function updateQty(id, delta) {
  let cart = loadCart();
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
  saveCart(cart);
  renderCart();
  updateCartCount();
}

function removeItem(id) {
  const cart = loadCart().filter(i => i.id !== id);
  saveCart(cart);
  renderCart();
  updateCartCount();
}

function renderCart() {
  if (!mustLogin()) return;
  const list = document.getElementById("cart-list");
  const totalEl = document.getElementById("cart-total");
  const summary = document.getElementById("cart-summary");
  if (!list) return;

  const cart = loadCart();
  let total = 0;

  if (!cart.length) {
    list.innerHTML = "<p>Keranjang kosong.</p>";
    summary.style.display = "none";
    return;
  }

  list.innerHTML = "";
  cart.forEach(item => {
    const p = PRODUCTS.find(x => x.id === item.id);
    const sub = p.price * item.qty;
    total += sub;
    const d = document.createElement("div");
    d.className = "card";
    d.innerHTML = `
      <img src="${p.img}">
      <div class="cart-info">
        <h3>${p.title}</h3>
        <p>${formatIDR(p.price)}</p>
        <p>Jumlah:
          <button onclick="updateQty(${p.id}, -1)">-</button>
          ${item.qty}
          <button onclick="updateQty(${p.id}, 1)">+</button>
        </p>
        <strong>${formatIDR(sub)}</strong>
      </div>
      <button class="btn-danger" onclick="removeItem(${p.id})">
        <i class="fa-solid fa-trash"></i> Hapus
      </button>`;
    list.appendChild(d);
  });

  totalEl.textContent = formatIDR(total);
  summary.style.display = "block";
}

function renderCheckout() {
  if (!mustLogin()) return;

  const list = document.getElementById("checkout-list");
  const totalEl = document.getElementById("checkout-total");
  const summary = document.getElementById("checkout-summary");
  if (!list) return;

  const cart = loadCart();
  let total = 0;

  if (!cart.length) {
    list.innerHTML = "<p>Keranjang kosong.</p>";
    summary.style.display = "none";
    return;
  }

  list.innerHTML = "";
  cart.forEach(item => {
    const p = PRODUCTS.find(x => x.id === item.id);
    const sub = p.price * item.qty;
    total += sub;
    list.innerHTML += `
      <div class="card checkout-item">
        <img src="${p.img}">
        <div>
          <h3>${p.title}</h3>
          <p>Jumlah: ${item.qty}</p>
          <strong>${formatIDR(sub)}</strong>
        </div>
      </div>`;
  });

  totalEl.textContent = formatIDR(total);
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  updateNavbarPhoto();
  fetchNavbarUser();

  const page = window.location.pathname.split("/").pop();
  if (page === "index.html" || page === "") renderProducts();
  if (page === "cart.html") renderCart();
  if (page === "checkout.html") renderCheckout();

  const toCheckout = document.getElementById("to-checkout");
  if (toCheckout) {
    toCheckout.onclick = () => {
      if (!mustLogin()) return;
      window.location.href = "checkout.html";
    };
  }

  const btnCheckout = document.getElementById("checkout-btn");
  if (btnCheckout) {
    btnCheckout.onclick = async () => {
      const nama = document.getElementById("nama").value.trim();
      const alamat = document.getElementById("alamat").value.trim();
      const telepon = document.getElementById("telepon").value.trim();
      const cart = loadCart();
      const email = localStorage.getItem("email");

      const items = cart.map(i => {
        const p = PRODUCTS.find(x => x.id === i.id);
        return { title: p.title, qty: i.qty, price: p.price };
      });

      const total = items.reduce((a, b) => a + b.price * b.qty, 0);

      const res = await fetch(`${API}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail: email, nama, alamat, telepon, items, total })
      });

      const data = await res.json();
      alert(data.message);
      if (!res.ok) return;

      localStorage.setItem("lastOrder", JSON.stringify({
        userEmail: email, nama, alamat, telepon, items, total,
        createdAt: new Date().toISOString()
      }));

      localStorage.removeItem("cart");
      window.location.href = "receipt.html";
    };
  }
});