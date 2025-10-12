// 🧱 Sepet verisini al
function getCart() {
  try {
    return JSON.parse(localStorage.getItem("cart")) || [];
  } catch {
    return [];
  }
}

// 💾 Sepeti kaydet
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// 💰 Fiyatı temizle (ör. "45.000 TL" → 45000)
function parsePrice(value) {
  if (typeof value === "number") return value;
  return parseFloat(String(value).replace(/[^\d.-]/g, "")) || 0;
}

// 🖼️ Sepeti göster
function renderCart() {
  const cart = getCart();
  const container = document.getElementById("cartContainer");
  const totalEl = document.getElementById("totalAmount");

  if (!container || !totalEl) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="text-center text-muted py-5">
        <i class="bi bi-cart-x display-5 d-block mb-2"></i>
        <h5>Sepetiniz boş.</h5>
      </div>`;
    totalEl.textContent = "0 TL";
    return;
  }

  let total = 0;

  container.innerHTML = cart.map((item, i) => {
    const cleanPrice = parsePrice(item.price);
    const quantity = item.quantity || item.qty || 1;
    const lineTotal = cleanPrice * quantity;
    total += lineTotal;

    return `
      <div class="d-flex justify-content-between align-items-center border-bottom py-3">
        <!-- Sol kısım: Görsel ve ürün adı -->
        <div class="d-flex align-items-center gap-3">
          <img src="${item.image}" alt="${item.title}" width="70" height="70" 
               class="rounded shadow-sm" style="object-fit:cover;">
          <div>
            <strong>${item.title}</strong><br>
            <small class="text-muted">${cleanPrice.toLocaleString("tr-TR")} TL</small>
          </div>
        </div>

        <!-- Orta kısım: Artır-Azalt -->
        <div class="d-flex align-items-center justify-content-center gap-2" style="min-width: 110px;">
          <button class="btn btn-outline-secondary btn-sm fw-bold" 
                  style="width:32px;height:32px;padding:0;"
                  onclick="changeQty(${i}, -1)">−</button>
          <span class="fw-bold fs-6">${quantity}</span>
          <button class="btn btn-outline-secondary btn-sm fw-bold" 
                  style="width:32px;height:32px;padding:0;"
                  onclick="changeQty(${i}, 1)">+</button>
        </div>

        <!-- Sağ kısım: Fiyat ve silme -->
        <div class="d-flex align-items-center justify-content-end gap-3" style="width: 150px;">
          <strong class="text-dark">${lineTotal.toLocaleString("tr-TR")} TL</strong>
          <button class="btn btn-danger btn-sm" onclick="removeItem(${i})">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </div>
    `;
  }).join("");

  totalEl.textContent = `${total.toLocaleString("tr-TR")} TL`;
}

// ➕➖ Miktar değiştir
function changeQty(index, delta) {
  const cart = getCart();
  cart[index].quantity = Math.max(1, (cart[index].quantity || cart[index].qty || 1) + delta);
  saveCart(cart);
}

// ❌ Ürün sil
function removeItem(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
}

// 🧹 Sepeti temizle
function clearCart() {
  localStorage.removeItem("cart");
  renderCart();
}

// 🚀 Sayfa yüklenince
document.addEventListener("DOMContentLoaded", () => {
  renderCart();

  const checkoutBtn = document.getElementById("checkoutBtn");
  const clearCartBtn = document.getElementById("clearCartBtn");

  // 💳 Sepeti Onayla
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      const cart = getCart();
      if (cart.length === 0) {
        alert("Sepetiniz boş! Lütfen ürün ekleyin.");
        return;
      }
      console.log("💳 Ödeme sayfasına yönlendiriliyor...");
      window.location.href = "Odeme.html";
    });
  }

  // 🧹 Sepeti Temizle
  if (clearCartBtn) {
    clearCartBtn.addEventListener("click", clearCart);
  }
});

// 🧮 Sepet sayacını güncelleyen fonksiyon
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const total = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const countEl = document.getElementById("cartCount");
  if (countEl) {
    countEl.textContent = total;
  }
}

// 🚀 Sayfa yüklenince otomatik çalışsın
document.addEventListener("DOMContentLoaded", updateCartCount);