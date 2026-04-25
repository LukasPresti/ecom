
window.Cart = {
 items: JSON.parse(localStorage.getItem('ct_cart') || '[]'),

 add(item) {
 const existing = this.items.find(i => i.id === item.id);
 if (existing) { existing.qty = (existing.qty || 1) + 1; }
 else { this.items.push({ ...item, qty: 1 }); }
 this.save();
 this.updateBadge();
 showToast(`"${item.title}" added to cart`, 'success');
 },

 remove(id) {
 this.items = this.items.filter(i => i.id != id);
 this.save();
 this.updateBadge();
 },

 clear() { this.items = []; this.save(); this.updateBadge(); },

 total() { return this.items.reduce((s, i) => s + i.price * (i.qty || 1), 0); },

 count() { return this.items.reduce((s, i) => s + (i.qty || 1), 0); },

 save() { localStorage.setItem('ct_cart', JSON.stringify(this.items)); },

 updateBadge() {
 const badges = document.querySelectorAll('.cart-count');
 const n = this.count();
 badges.forEach(b => {
 b.textContent = n;
 b.style.display = n > 0 ? 'flex' : 'none';
 });
 }
};

function initNavbar() {
 const navbar = document.querySelector('.navbar');
 const menuBtn = document.querySelector('.mobile-menu-btn');
 const navlinksEl = document.querySelector('.nav-links');

 window.addEventListener('scroll', () => {
 navbar?.classList.toggle('scrolled', window.scrollY > 20);
 });

 menuBtn?.addEventListener('click', () => {
 navlinksEl?.classList.toggle('open');
 });

 const current_page = window.location.pathname.split('/').pop() || 'index.html';
 document.querySelectorAll('.nav-link').forEach(l => {
 const href = l.getAttribute('href');
 if (href === current_page + '' || (current_page === '' && href === 'index.html')) {
 l.classList.add('active');
 }
 });

 Cart.updateBadge();
}

function renderNav() {
 const nav = document.getElementById('main-nav');
 if (!nav) return;
 nav.innerHTML = `
 <nav class="navbar" id="navbar">
 <div class="nav-inner">
 <a href="index.html" class="nav-logo">
 <div class="logo-icon">CT</div>
 Campus<span>Thrift</span>
 </a>
 <ul class="nav-links" id="navLinks">
 <li><a href="index.html" class="nav-link">Home</a></li>
 <li><a href="listings.html" class="nav-link">Browse</a></li>
 <li><a href="sell.html" class="nav-link">Sell</a></li>
 <li><a href="profile.html" class="nav-link">Profile</a></li>
 <li><a href="legal.html" class="nav-link">Legal</a></li>
 </ul>
 <div class="nav-actions">
 <a href="cart.html" class="cart-btn" aria-label="Cart">
 CART
 <span class="cart-count" style="display:none">0</span>
 </a>
 <a href="login.html" class="btn btn-primary btn-sm">Sign In</a>
 <button class="mobile-menu-btn" id="mobileMenuBtn" aria-label="Menu">&#9776;</button>
 </div>
 </div>
 </nav>`;
 initNavbar();
}

function renderFooter() {
 const footer = document.getElementById('main-footer');
 if (!footer) return;
 footer.innerHTML = `
 <footer class="footer">
 <div class="container">
 <div class="footer-grid">
 <div class="footer-brand">
 <a href="index.html" class="nav-logo" style="margin-bottom:12px;display:inline-flex;">
 <div class="logo-icon">CT</div>
 Campus<span>Thrift</span>
 </a>
 <p>The peer-to-peer marketplace built exclusively for college students. Buy and sell safely within your campus community.</p>
 </div>
 <div class="footer-col">
 <h4>Marketplace</h4>
 <ul>
 <li><a href="listings.html">Browse Listings</a></li>
 <li><a href="sell.html">Post an Item</a></li>
 <li><a href="cart.html">My Cart</a></li>
 <li><a href="profile.html">My Profile</a></li>
 </ul>
 </div>
 <div class="footer-col">
 <h4>Categories</h4>
 <ul>
 <li><a href="listings.html?cat=textbooks">Textbooks</a></li>
 <li><a href="listings.html?cat=electronics">Electronics</a></li>
 <li><a href="listings.html?cat=furniture">Furniture</a></li>
 <li><a href="listings.html?cat=clothing">Clothing</a></li>
 </ul>
 </div>
 <div class="footer-col">
 <h4>Legal</h4>
 <ul>
 <li><a href="legal.html#tos">Terms of Service</a></li>
 <li><a href="legal.html#privacy">Privacy Policy</a></li>
 <li><a href="legal.html#listing">Listing Policy</a></li>
 <li><a href="legal.html#payment">Payment Policy</a></li>
 <li><a href="legal.html#returns">Returns & Refunds</a></li>
 <li><a href="legal.html#community">Community Guidelines</a></li>
 </ul>
 </div>
 </div>
 <div class="footer-bottom">
 <p> copyright 2026 CampusThrift. All rights reserved. | NJIT — Group 10</p>
 <p>Shrestha Bose · Joseph Kane · Luke Marinelli · Lukas Presti</p>
 </div>
 </div>
 </footer>`;
}

function showToast(msg, type = 'info') {
 let container = document.querySelector('.toast-container');
 if (!container) {
 container = document.createElement('div');
 container.className = 'toast-container';
 document.body.appendChild(container);
 }
 const icons = { success: '[OK]', info: '[i]', warn: '[!]' };
 const toast = document.createElement('div');
 toast.className = `toast toast-${type}`;
 toast.innerHTML = `<span>${icons[type] || '[i]'}</span><span>${msg}</span>`;
 document.querySelector('.toast-container').appendChild(toast);
 setTimeout(() => toast.remove(), 3500);
}

function initTabs(containerSelector, tabBtnSelector, contentSelector) {
 const container = document.querySelector(containerSelector);
 if (!container) return;
 const buttons = container.querySelectorAll(tabBtnSelector);
 const contents = document.querySelectorAll(contentSelector);

 buttons.forEach((button, i) => {
 button.addEventListener('click', () => {
 buttons.forEach(b => b.classList.remove('active'));
 contents.forEach(c => c.classList.remove('active'));
 button.classList.add('active');
 if (contents[i]) contents[i].classList.add('active');
 });
 });
}

function initScrollAnimations() {
 const observer = new IntersectionObserver((entries) => {
 entries.forEach(e => {
 if (e.isIntersecting) {
 e.target.style.opacity = '1';
 e.target.style.transform = 'translateY(0)';
 observer.unobserve(e.target);
 }
 });
 }, { threshold: 0.1 });

 document.querySelectorAll('[data-animate]').forEach(el => {
 el.style.opacity = '0';
 el.style.transform = 'translateY(30px)';
 el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
 observer.observe(el);
 });
}

const sampleListings = [
 { id: 1, title: 'Calculus: Early Transcendentals (9th Ed)', price: 38, condition: 'Good', campus: 'NJIT', category: 'textbooks', emoji: ' [ PHOTO ] ', seller: 'Alex M.', rating: 4.8 },
 { id: 2, title: 'Dell XPS 15 Laptop Stand + USB Hub', price: 22, condition: 'Like New', campus: 'Rutgers', category: 'electronics', emoji: ' [ PHOTO ] ', seller: 'Jamie K.', rating: 5.0 },
 { id: 3, title: 'IKEA Kallax Shelf Unit (white, 2x4)', price: 55, condition: 'Good', campus: 'NJIT', category: 'furniture', emoji: ' [ PHOTO ] ', seller: 'Priya S.', rating: 4.5 },
 { id: 4, title: 'TI-84 Plus CE Graphing Calculator', price: 65, condition: 'Good', campus: 'Rutgers', category: 'electronics', emoji: ' [ PHOTO ] ', seller: 'Marcus T.', rating: 4.9 },
 { id: 5, title: 'Nike Dri-FIT Athletic Set (M)', price: 18, condition: 'Good', campus: 'NJIT', category: 'clothing', emoji: ' [ PHOTO ] ', seller: 'Leah W.', rating: 4.7 },
 { id: 6, title: 'Chemistry: A Molecular Approach (4th Ed)', price: 30, condition: 'Fair', campus: 'Montclair', category: 'textbooks', emoji: ' [ PHOTO ] ', seller: 'Chris B.', rating: 4.3 },
 { id: 7, title: 'Sony WH-1000XM4 Headphones (black)', price: 120, condition: 'Good', campus: 'NJIT', category: 'electronics', emoji: ' [ PHOTO ] ', seller: 'Dani R.', rating: 4.9 },
 { id: 8, title: 'Mini Fridge (Frigidaire, 3.2 cu ft)', price: 75, condition: 'Fair', campus: 'Rutgers', category: 'furniture', emoji: ' [ PHOTO ] ', seller: 'Omar H.', rating: 4.6 },
];

function getListingById(id) { return sampleListings.find(l => l.id === parseInt(id.toString())); }

document.addEventListener('DOMContentLoaded', () => {
 renderNav();
 renderFooter();
 initScrollAnimations();

 if (window.location.hash) {
 const hash = window.location.hash.substring(1);
 const btn = document.querySelector(`[data-section="${hash}"]`);
 if (btn) btn.click();
 }
});

window.addEventListener('storage', (e) => {
 if (e.key === 'ct_cart') {
 Cart.items = JSON.parse(e.newValue || '[]');
 Cart.updateBadge();
 if (typeof renderCart === 'function') renderCart();
 }
});
