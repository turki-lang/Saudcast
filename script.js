document.addEventListener("DOMContentLoaded", () => {
  loadProducts();

  const pw = document.getElementById("password");
  if (pw) {
    pw.addEventListener("input", () => {
      if (pw.value === "playshopksa") checkPassword(); 
    });
    pw.addEventListener("keypress", (e) => {
      if (e.key === "Enter") checkPassword();
    });
  }
});

function loadProducts() {
  const productList = document.getElementById("product-list");
  if (!productList) return;
  const products = JSON.parse(localStorage.getItem("products") || "[]");
  productList.innerHTML = "";
  if (products.length === 0) {
    productList.innerHTML = "<p>لا توجد منتجات حالياً.</p>";
    return;
  }
  products.forEach((p, i) => {
    const item = document.createElement("div");
    item.className = "product";
    item.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>${p.price} ريال</p>
      <button onclick="orderWhatsApp('${p.name}', '${p.price}', '${p.whatsapp}')">اطلب الآن</button>
    `;
    productList.appendChild(item);
  });
}

function orderWhatsApp(name, price, number) {
  const msg = `مرحباً، أريد شراء ${name} بسعر ${price} ريال.`;
  const url = `https://wa.me/${number}?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank");
}

function checkPassword() {
  const pw = document.getElementById("password").value;
  if (pw === "playshopksa") {
    document.getElementById("login-screen").classList.add("hidden");
    document.getElementById("admin-panel").classList.remove("hidden");
    loadAdminProducts();
  }
}

function addProduct() {
  const name = document.getElementById("productName").value.trim();
  const price = document.getElementById("productPrice").value.trim();
  const image = document.getElementById("productImage").value.trim();
  const whatsapp = document.getElementById("whatsapp").value.trim();
  if (!name || !price || !image || !whatsapp) return alert("املأ جميع الحقول");
  const products = JSON.parse(localStorage.getItem("products") || "[]");
  products.push({ name, price, image, whatsapp });
  localStorage.setItem("products", JSON.stringify(products));
  document.getElementById("productName").value = "";
  document.getElementById("productPrice").value = "";
  document.getElementById("productImage").value = "";
  document.getElementById("whatsapp").value = "";
  loadAdminProducts();
  alert("تم إضافة المنتج بنجاح");
}

function loadAdminProducts() {
  const container = document.getElementById("adminProducts");
  if (!container) return;
  const products = JSON.parse(localStorage.getItem("products") || "[]");
  container.innerHTML = "";
  products.forEach((p, i) => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>${p.price} ريال</p>
      <button onclick="deleteProduct(${i})">🗑️ حذف</button>
    `;
    container.appendChild(div);
  });
}

function deleteProduct(index) {
  const products = JSON.parse(localStorage.getItem("products") || "[]");
  products.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(products));
  loadAdminProducts();
}