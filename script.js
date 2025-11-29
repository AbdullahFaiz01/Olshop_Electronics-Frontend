const API = "https://olshopelectronics-production-398b.up.railway.app";

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
  { id: 10, title: "Router WiFi TP-Link AC1200", price: 599000, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSULkC6or6Oj8ZycP43uLYjIFUBegYKsNgy0g&s" },
  { id: 11, title: "SSD Samsung 1TB", price: 1299000, img: "https://down-id.img.susercontent.com/file/id-11134207-81ztj-medrcnj8bsau3c" },
  { id: 12, title: "Kamera Aksi GoPro Hero 9", price: 3499000, img: "https://sewakameramedan.id/public/uploads/all/VPMtHmxhmFBvDgEdL79Sc545BWHMUjQZWScPmMD1.jpg" },
  { id: 13, title: "Tablet Samsung Galaxy Tab A7", price: 2999000, img: "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//catalog-image/104/MTA-142754369/samsung_samsung_galaxy_tab_a7_lite_full01_l6ua7u1a.jpg" },
  { id: 14, title: "Smartphone Xiaomi Redmi Note 10", price: 2499000, img: "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//106/MTA-36397744/xiaomi_xiaomi_-_redmi_note_10_pro_kapasitas_6gb-128gb_dan_8gb-128gb_-__garansi_resmi_full06_br8tqoi1.jpg" },
  { id: 15, title: "Earbuds True Wireless QCY T13", price: 399000, img: "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/catalog-image/97/MTA-183079202/br-m036969-12766_tws-qcy-t13-anc-tws-wireless-earbuds-original_full01-2e52304a.webp" }
];

const formatIDR = n => "Rp " + n.toLocaleString("id-ID");
const loadCart = () => JSON.parse(localStorage.getItem("cart") || "[]");
const saveCart = c => localStorage.setItem("cart", JSON.stringify(c));

const mustLogin = () => {
  const email = localStorage.getItem("email");
  if (!email) {
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
  const isMobile = window.innerWidth <= 768;
  const email = localStorage.getItem("email");
  const username = localStorage.getItem("user");
  const savedPhoto = localStorage.getItem("photoUrl");

  const area = document.getElementById("profile-area");
  const login = document.getElementById("login-link");
  const navPfp = document.getElementById("nav-pfp");
  const navUser = document.getElementById("nav-username");

  const bnProfile = document.getElementById("bn-profile");
  const bnProfileText = document.getElementById("bn-profile-text");

  if (!email) {
    if (area) area.style.display = "none";
    if (login) login.style.display = "inline-block";
    if (navUser) navUser.textContent = "";

    if (bnProfile && bnProfileText) {
      bnProfile.href = "login.html";
      bnProfileText.textContent = "Login";
      const iconEl = bnProfile.querySelector("i, img");
      if (iconEl) {
        iconEl.outerHTML = '<i class="fa-solid fa-user"></i>';
      } else {
        bnProfile.insertAdjacentHTML("afterbegin", '<i class="fa-solid fa-user"></i>');
      }
    }

    return;
  }

  if (area && !isMobile) area.style.display = "flex";
  if (login && !isMobile) login.style.display = "none";

  const displayName = username || email.split("@")[0];
  if (navUser) navUser.textContent = displayName;

  const pfpWrapper = document.getElementById("nav-pfp-wrapper");
  if (pfpWrapper) {
    if (savedPhoto) {
      if (!isMobile) {
        pfpWrapper.innerHTML = `<img class="nav-pfp" src="${savedPhoto}">`;
      }
    } else {
      pfpWrapper.innerHTML = `<i class="fa-solid fa-user user-icon"></i>`;
    }
  }

  if (bnProfile && bnProfileText) {
    bnProfile.href = "profile.html";
    bnProfileText.textContent = displayName;
    const existingIcon = bnProfile.querySelector(".nav-pfp");
    if (savedPhoto) {
      if (existingIcon) {
        existingIcon.outerHTML = `<img class="nav-pfp" src="${savedPhoto}">`;
      } else {
        if (!isMobile) {
          bnProfile.insertAdjacentHTML("afterbegin", `<img class="nav-pfp" src="${savedPhoto}">`);
        }
      }
    } else {
      if (existingIcon) {
        existingIcon.outerHTML = '<i class="fa-solid fa-user"></i>';
      } else {
        bnProfile.insertAdjacentHTML("afterbegin", '<i class="fa-solid fa-user"></i>');
      }
    }
  }
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
    else localStorage.removeItem("photoUrl");
    updateNavbarPhoto();
  } catch { }
}

function addToCart(id) {
  if (!mustLogin()) return;

  let cart = loadCart();
  const found = cart.find(i => i.id === id);

  if (found) found.qty++;
  else cart.push({ id, qty: 1 });

  saveCart(cart);
  updateCartCount();
  showToast("🛒 Produk ditambahkan ke keranjang", 900);
}

function showConfirm(message, yesCallback, noCallback) {
  const overlay = document.createElement("div");
  overlay.className = "confirm-overlay";

  overlay.innerHTML = `
    <div class="confirm-content">
      <p>${message}</p>
      <div class="confirm-buttons">
        <button id="confirm-yes" class="btn-yes">Ya</button>
        <button id="confirm-no" class="btn-no">Tidak</button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  document.getElementById("confirm-yes").onclick = () => {
    overlay.remove();
    if (yesCallback) yesCallback();
  };

  document.getElementById("confirm-no").onclick = () => {
    overlay.remove();
    if (noCallback) noCallback();
  };
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

function setupSearch() {
  const input = document.getElementById("search-input");
  if (!input) return;

  input.addEventListener("keyup", () => {
    const keyword = input.value.toLowerCase();
    const filtered = PRODUCTS.filter(p =>
      p.title.toLowerCase().includes(keyword)
    );
    renderFilteredProducts(filtered);
  });
}

function renderFilteredProducts(listProduk) {
  const list = document.getElementById("product-list");
  list.innerHTML = "";

  listProduk.forEach(p => {
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

  if (listProduk.length === 0) {
    list.innerHTML = `
      <div style="text-align:center; width:100%; padding:20px;">
        <h3>😢 Produk tidak ditemukan</h3>
        <p>Coba kata kunci lainnya</p>
      </div>
    `;
  }
}

function updateQty(id, delta) {
  let cart = loadCart();
  const item = cart.find(i => i.id === id);

  if (!item) return;

  item.qty += delta;

  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== id);
  }

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
    list.innerHTML = `
    <div class="empty-cart-box slide-in">
      <div class="empty-icon">🛒</div>
      <h3>Keranjang Anda Kosong</h3>
      <p>Yuk lanjutkan belanja untuk menemukan produk terbaik!</p>
      <a href="index.html" class="big-shop-btn">Mulai Belanja</a>
    </div>
  `;
    if (summary) summary.style.display = "none";
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
    list.innerHTML = `
    <div class="empty-cart-box slide-in">
      <div class="empty-icon">📦</div>
      <h3>Belum Ada Item Untuk Checkout</h3>
      <p>Tambahkan produk ke keranjang terlebih dahulu sebelum melakukan checkout.</p>
      <a href="index.html" class="big-shop-btn">Kembali Belanja</a>
    </div>
  `;
    if (summary) summary.style.display = "none";
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

function showSuccessToast(msg) {
  const t = document.getElementById("toastSuccess");
  document.getElementById("successMsg").textContent = msg;
  t.classList.remove("hidden");
  setTimeout(() => t.classList.add("show"), 20);
  setTimeout(() => {
    t.classList.remove("show");
    setTimeout(() => t.classList.add("hidden"), 300);
  }, 4000);
}

function showErrorToast(msg) {
  const t = document.getElementById("toastError");
  document.getElementById("errorMsg").textContent = msg;
  t.classList.remove("hidden");
  setTimeout(() => t.classList.add("show"), 20);
  setTimeout(() => {
    t.classList.remove("show");
    setTimeout(() => t.classList.add("hidden"), 300);
  }, 3500);
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  updateNavbarPhoto();
  fetchNavbarUser();

  let page = window.location.pathname.split("/").pop();
  if (page === "") page = "index.html";

  if (page === "index.html") {
    renderProducts();
    setupSearch();
  }
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

      if (!nama || !alamat || !telepon) return showErrorToast("Mohon lengkapi semua data pengiriman.");
      if (!/^[0-9]+$/.test(telepon)) return showErrorToast("Nomor telepon hanya boleh angka!");
      if (telepon.length < 9) return showErrorToast("Nomor telepon tidak valid!");

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

      if (!res.ok) return showErrorToast("Terjadi kesalahan saat membuat pesanan.");

      showSuccessToast("Pembayaran Berhasil! Pesanan sedang diproses…");

      localStorage.setItem("lastOrder", JSON.stringify({
        userEmail: email,
        nama,
        alamat,
        telepon,
        items,
        total,
        createdAt: new Date().toISOString()
      }));

      localStorage.removeItem("cart");

      setTimeout(() => {
        window.location.href = "receipt.html";
      }, 4000);
    };
  }

  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) logoutBtn.addEventListener("click", logout);

  document.addEventListener("click", (e) => {
    const btn = document.getElementById("profile-btn");
    const drop = document.getElementById("profile-dropdown");

    if (!btn || !drop) return;

    if (btn.contains(e.target)) {
      drop.classList.toggle("show");
    } else if (!drop.contains(e.target)) {
      drop.classList.remove("show");
    }
  });
});

function showToast(msg, duration = 5000) {
  const t = document.getElementById("toast");
  if (!t) return;
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => {
    t.classList.remove("show");
  }, duration);
}

function logout() {
  localStorage.removeItem("email");
  localStorage.removeItem("user");
  localStorage.removeItem("photoUrl");
  localStorage.removeItem("cart");
  window.location.href = "login.html";
}