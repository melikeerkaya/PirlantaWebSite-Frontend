// ✅ Ürün kartı oluşturma fonksiyonu
function createProductCard(product) {
  const imageSrc = (product.images && product.images[0]) ? product.images[0] : "assets/img/placeholder.jpg";
  const price = Number(product.price) || 0;
  const oldPrice = Number(product.oldPrice) || null;

  return `
    <div class="col mb-5">
      <div class="card h-100">
        ${product.badge ? `<div class="badge bg-danger text-white position-absolute" style="top: 0.5rem; right: 0.5rem">${product.badge}</div>` : ""}
        <img class="card-img-top" src="${imageSrc}" alt="${product.title}" />
        <div class="card-body p-4 text-center">
          <h5 class="fw-bolder">${product.title}</h5>
          ${oldPrice ? `<span class="text-muted text-decoration-line-through">${oldPrice.toLocaleString("tr-TR")} TL</span><br>` : ""}
          ${price.toLocaleString("tr-TR")} TL
        </div>
        <div class="card-footer p-4 border-top-0 bg-transparent text-center">
          <button class="btn btn-outline-dark mt-auto add-to-cart" 
                  data-title="${product.title}" 
                  data-price="${price}" 
                  data-image="${imageSrc}">
            Sepete Ekle
          </button>
        </div>
      </div>
    </div>
  `;
}

// 🔄 Koleksiyonlar
const categories = [
  ["firsatlarGrid", "firsatlar"],
  ["coksatanlarGrid", "coksatanlar"],
  ["bagetYuzuklerGrid", "bagetyuzukler"],
  ["bagetPirlantalarGrid", "bagetpirlantalar"],
  ["bagetKolyelerGrid", "bagetkolyeler"],
  ["bagetBilekliklerGrid", "bagetbileklikler"],
  ["tektasYuzuklerGrid", "tektasyuzukler"],
  ["bestasYuzuklerGrid", "bestasyuzukler"],
  ["tamturYuzuklerGrid", "tamturyuzukler"],
  ["yakutYuzuklerGrid", "yakutyuzukler"],
  ["zumrutYuzuklerGrid", "zumrutyuzukler"],
  ["gerdanlikGrid", "gerdanliklar"],
  ["harfKolyelerGrid", "harfkolyeler"],
  ["celikKolyelerGrid", "celikkolyeler"],
  ["bagetKupelerGrid", "bagetkupeler"]

];

// 🔄 Ürünleri getir ve sayfaya bas
categories.forEach(([id, endpoint]) => {
  const grid = document.getElementById(id);
  if (!grid) return;
  fetch(`${API_BASE}/products/${endpoint}`)
    .then(res => res.json())
    .then(data => grid.innerHTML = data.map(createProductCard).join(""))
    .catch(err => console.error(`${endpoint} yüklenemedi:`, err));
});

// 🛒 Sepete Ekleme
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".add-to-cart");
  if (!btn) return;

  const product = {
    title: btn.dataset.title,
    price: parseFloat(btn.dataset.price),
    image: btn.dataset.image,
    quantity: 1
  };

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find(p => p.title === product.title);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push(product);
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount(); // ✅ hemen güncelle
  alert(`${product.title} sepete eklendi 🛍️`);
});