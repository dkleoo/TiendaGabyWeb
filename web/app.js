/* ============================================================
   TiendaGaby — lógica de tienda
   ============================================================ */
(() => {
    'use strict';

    /* --------------------------------------------------------
       Catálogo
       -------------------------------------------------------- */
    let PRODUCTS = [
        {
            id: 'chaqueta-oversize',
            name: 'Chaqueta Minimalista Oversize',
            category: 'Ropa Femenina',
            price: 120000,
            compareAt: 180000,
            image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&q=80&w=600',
            badge: { text: 'OFERTA ESPECIAL', tone: 'dark' },
            sizes: ['S', 'M', 'L'],
            colors: [{ name: 'Arena', hex: '#d8cfc0' }, { name: 'Negro', hex: '#111111' }],
            trending: true,
            featured: 1
        },
        {
            id: 'set-madera',
            name: 'Set de Figuras de Acción',
            category: 'Juguetes Educativos',
            price: 85000,
            image: 'https://images.unsplash.com/photo-1599623560574-39d485900c95?auto=format&fit=crop&q=80&w=600',
            note: 'Envío Rápido Dropi',
            sizes: [],
            colors: [],
            trending: true,
            featured: 2
        },
        {
            id: 'zapatillas-urban',
            name: 'Zapatillas Casuales Urban',
            category: 'Calzado',
            price: 95500,
            compareAt: 136500,
            image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=600',
            badge: { text: '-30% DESCUENTO', tone: 'red' },
            sizes: ['38', '39', '40', '41'],
            colors: [
                { name: 'Camel', hex: '#c0a080' },
                { name: 'Negro', hex: '#111111' },
                { name: 'Blanco', hex: '#f8f8f8' }
            ],
            trending: true,
            featured: 3
        },
        {
            id: 'reloj-smart',
            name: 'Reloj Minimalista Clásico',
            category: 'Tecnología',
            price: 150000,
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600',
            sizes: [],
            colors: [],
            featured: 4
        },
        {
            id: 'bolso-premium',
            name: 'Bolso Cuero Sintético Premium',
            category: 'Accesorios',
            price: 78900,
            image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=600',
            sizes: [],
            colors: [],
            featured: 5
        },
        {
            id: 'auriculares-pro',
            name: 'Auriculares Inalámbricos Pro',
            category: 'Tecnología',
            price: 110000,
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600',
            badge: { text: 'LO MÁS VENDIDO', tone: 'dark' },
            sizes: [],
            colors: [{ name: 'Negro', hex: '#111111' }, { name: 'Blanco', hex: '#f4f4f4' }],
            trending: true,
            featured: 6
        },
        {
            id: 'vestido-plisado',
            name: 'Blusa Midi Fluida',
            category: 'Ropa Femenina',
            price: 132000,
            compareAt: 165000,
            image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=600',
            badge: { text: 'NUEVO', tone: 'dark' },
            sizes: ['XS', 'S', 'M', 'L', 'XL'],
            colors: [
                { name: 'Terracota', hex: '#b5654a' },
                { name: 'Arena', hex: '#d8cfc0' },
                { name: 'Negro', hex: '#111111' }
            ],
            trending: true,
            featured: 7
        },
        {
            id: 'mochila-urbana',
            name: 'Mochila Urbana Impermeable',
            category: 'Accesorios',
            price: 98000,
            image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600',
            note: 'Envío Rápido Dropi',
            sizes: [],
            colors: [],
            trending: true,
            featured: 8
        },
        {
            id: 'gafas-polarizadas',
            name: 'Gafas de Sol Polarizadas',
            category: 'Accesorios',
            price: 45000,
            image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=600',
            sizes: [],
            colors: [
                { name: 'Tortoise', hex: '#8a5a35' },
                { name: 'Negro', hex: '#111111' },
                { name: 'Cristal', hex: '#e8e8e8' }
            ],
            trending: true,
            featured: 9
        },
        {
            id: 'sneakers-air',
            name: 'Sneakers Running Air',
            category: 'Calzado',
            price: 168000,
            compareAt: 210000,
            image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600',
            badge: { text: '-20% DESCUENTO', tone: 'red' },
            sizes: ['39', '40', '41', '42', '43'],
            colors: [{ name: 'Rojo', hex: '#c0392b' }, { name: 'Negro', hex: '#111111' }],
            trending: true,
            featured: 10
        },
        {
            id: 'lampara-nordica',
            name: 'Lámpara Nórdica de Pie',
            category: 'Hogar',
            price: 89000,
            image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=600',
            note: 'Envío Rápido Dropi',
            sizes: [],
            colors: [],
            featured: 11
        },
        {
            id: 'set-numeros',
            name: 'Set de Bloques Creativos',
            category: 'Juguetes Educativos',
            price: 62000,
            image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80&w=600',
            sizes: [],
            colors: [],
            featured: 12
        }
    ];

    const CITY_NAMES = {
        Bogota: 'Bogotá',
        Medellin: 'Medellín',
        Cali: 'Cali',
        Barranquilla: 'Barranquilla',
        Bucaramanga: 'Bucaramanga',
        Pereira: 'Pereira',
        Dosquebradas: 'Dosquebradas'
    };

    const DEPARTMENTS = {
        Cundinamarca: ['Bogota'],
        Antioquia: ['Medellin'],
        Valle: ['Cali'],
        Atlantico: ['Barranquilla'],
        Santander: ['Bucaramanga'],
        Risaralda: ['Pereira', 'Dosquebradas']
    };

    const CARRIERS = [
        { id: 'envia', name: 'Envia', color: 'bg-red-500', extra: 910 },
        { id: 'domina', name: 'Domina', color: 'bg-blue-600', extra: 1589 },
        { id: 'tcc', name: 'Tcc', color: 'bg-yellow-500', extra: 1670 },
        { id: 'coordinadora', name: 'Coordinadora', color: 'bg-blue-400', extra: 4561 },
        { id: 'interrapidisimo', name: 'Interrapidisimo', color: 'bg-black', extra: 5370 }
    ];

    const MONEY = new Intl.NumberFormat('es-CO');
    const CART_KEY = 'tiendagaby.cart.v1';
    const PAGE_SIZE = 6;
    const MAX_PRICE = 450000;
    let catalogMaxPrice = MAX_PRICE;
    const API_BASE = window.TIENDA_API_BASE ?? (location.port === '8080' ? '' : 'http://localhost:8080');

    const FALLBACK_IMAGE = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 750">
            <rect width="600" height="750" fill="#f3f4f6"/>
            <path d="M250 300v-40a50 50 0 0 1 100 0v40" fill="none" stroke="#9ca3af" stroke-width="12" stroke-linecap="round"/>
            <path d="M220 300h160l14 190H206l14-190z" fill="none" stroke="#9ca3af" stroke-width="12" stroke-linejoin="round"/>
        </svg>`
    );

    /* --------------------------------------------------------
       Estado
       -------------------------------------------------------- */
    const state = {
        categories: new Set(),
        dropi: true,
        minPrice: 0,
        maxPrice: 450000,
        search: '',
        sort: 'featured',
        visible: PAGE_SIZE,
        city: 'Bogota',
        carrier: null,
        shipping: 0,
        cart: [],
        lastFocused: null
    };

    /* --------------------------------------------------------
       Utilidades
       -------------------------------------------------------- */
    const $ = (selector, root = document) => root.querySelector(selector);
    const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

    const money = (value) => `$ ${MONEY.format(Math.max(0, Math.round(value)))}`;

    const escapeHtml = (value) => String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');

    const normalize = (value) => String(value)
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

    const getProduct = (id) => PRODUCTS.find((product) => product.id === id);

    const subtotal = () => state.cart.reduce((sum, item) => sum + item.price * item.qty, 0);

    const cartCount = () => state.cart.reduce((sum, item) => sum + item.qty, 0);

    const supplierCost = () => Math.round(subtotal() * 0.55);
    const commission = () => Math.round(subtotal() * 0.05);

    /* --------------------------------------------------------
       Persistencia del carrito
       -------------------------------------------------------- */
    function saveCart() {
        try {
            localStorage.setItem(CART_KEY, JSON.stringify(state.cart));
        } catch (error) {
            /* almacenamiento no disponible: seguimos en memoria */
        }
    }

    function restoreCart() {
        try {
            const raw = localStorage.getItem(CART_KEY);
            if (!raw) return;
            const parsed = JSON.parse(raw);
            if (!Array.isArray(parsed)) return;

            state.cart = parsed.map((item) => {
                const product = item && getProduct(item.id);
                if (!item || (!product && !item.name)) return null;

                const size = item.size || '';
                const colorName = item.colorName || '';
                const qty = Math.min(99, Math.max(1, Number(item.qty) || 1));

                return {
                    key: `${item.id}|${size}|${colorName}`,
                    id: item.id,
                    name: product?.name || item.name,
                    price: product?.price ?? (Number(item.price) || 0),
                    image: product?.image || item.image || FALLBACK_IMAGE,
                    size,
                    colorName,
                    colorHex: product?.colors.find((color) => color.name === colorName)?.hex || item.colorHex || '',
                    qty
                };
            }).filter(Boolean);
        } catch (error) {
            state.cart = [];
        }
    }

    /* --------------------------------------------------------
       Filtros y catálogo
       -------------------------------------------------------- */
    function categoryCounts() {
        return PRODUCTS.reduce((acc, product) => {
            acc[product.category] = (acc[product.category] || 0) + 1;
            return acc;
        }, {});
    }

    function renderCategoryFilters() {
        const container = $('#category-filters');
        const counts = categoryCounts();
        const trendingCount = PRODUCTS.filter((product) => product.trending).length;

        const rows = [
            `<label class="flex items-center space-x-2 cursor-pointer group">
                <input type="checkbox" class="filter-checkbox" data-filter="dropi" ${state.dropi ? 'checked' : ''}>
                <span class="group-hover:text-black ${state.dropi ? 'text-black font-medium' : ''}">Tendencias Dropi (${trendingCount})</span>
            </label>`
        ];

        Object.keys(counts).forEach((category) => {
            const checked = state.categories.has(category);
            rows.push(`
                <label class="flex items-center space-x-2 cursor-pointer group">
                    <input type="checkbox" class="filter-checkbox" data-filter="category" value="${escapeHtml(category)}" ${checked ? 'checked' : ''}>
                    <span class="group-hover:text-black ${checked ? 'text-black font-medium' : ''}">${escapeHtml(category)} (${counts[category]})</span>
                </label>
            `);
        });

        container.innerHTML = rows.join('');
    }

    function filteredProducts() {
        const term = normalize(state.search.trim());

        const list = PRODUCTS.filter((product) => {
            if (state.dropi && !product.trending) return false;
            if (state.categories.size > 0 && !state.categories.has(product.category)) return false;
            if (product.price < state.minPrice || product.price > state.maxPrice) return false;
            if (term) {
                const haystack = normalize(`${product.name} ${product.category}`);
                if (!haystack.includes(term)) return false;
            }
            return true;
        });

        const sorters = {
            featured: (a, b) => a.featured - b.featured,
            'price-asc': (a, b) => a.price - b.price,
            'price-desc': (a, b) => b.price - a.price,
            name: (a, b) => a.name.localeCompare(b.name, 'es')
        };

        return list.sort(sorters[state.sort] || sorters.featured);
    }

    function badgeMarkup(product) {
        if (!product.badge) return '';
        const tone = product.badge.tone === 'red' ? 'bg-red-600' : 'bg-black';
        return `<div class="absolute top-3 left-3 ${tone} text-white text-[10px] font-bold px-2 py-1 z-10 rounded shadow">
                    ${escapeHtml(product.badge.text)}
                </div>`;
    }

    function variantsMarkup(product) {
        if (product.stock === 0) {
            return '<p class="text-xs text-red-500 font-medium mt-3">Agotado</p>';
        }

        if (!product.sizes.length && !product.colors.length) {
            return product.note
                ? `<p class="text-xs text-green-600 font-medium mt-3">${escapeHtml(product.note)}</p>`
                : '';
        }

        const sizeMarkup = product.sizes.length
            ? `<div class="flex items-center justify-between text-sm">
                    <label for="size-${product.id}" class="text-gray-500 text-xs">Talla:</label>
                    <select id="size-${product.id}" data-size
                            class="border border-gray-300 rounded-md py-1 px-2 text-xs bg-white focus:outline-none focus:border-black cursor-pointer">
                        ${product.sizes.map((size) => `<option value="${escapeHtml(size)}">${escapeHtml(size)}</option>`).join('')}
                    </select>
               </div>`
            : '';

        const colorMarkup = product.colors.length
            ? `<div class="flex items-center justify-between text-sm">
                    <span class="text-gray-500 text-xs">Color:</span>
                    <div class="flex space-x-2" role="radiogroup" aria-label="Color de ${escapeHtml(product.name)}">
                        ${product.colors.map((color, index) => `
                            <label class="cursor-pointer">
                                <input type="radio" name="color-${product.id}" value="${escapeHtml(color.name)}"
                                       class="peer sr-only" ${index === 0 ? 'checked' : ''}>
                                <span class="color-dot block ${color.hex.toLowerCase() === '#f8f8f8' || color.hex.toLowerCase() === '#f4f4f4' || color.hex.toLowerCase() === '#e8e8e8' ? 'color-dot--light' : ''}"
                                      style="background-color:${escapeHtml(color.hex)}" title="${escapeHtml(color.name)}"></span>
                            </label>
                        `).join('')}
                    </div>
               </div>`
            : '';

        return `<div class="space-y-3 mt-4">${sizeMarkup}${colorMarkup}</div>`;
    }

    function productCardMarkup(product) {
        const compare = product.compareAt
            ? `<p class="text-sm text-gray-400 line-through">${money(product.compareAt)}</p>`
            : '';
        const soldOut = product.stock === 0;

        return `
            <article class="product-card glass-panel rounded-2xl overflow-hidden border border-white flex flex-col"
                     data-product-id="${product.id}" aria-labelledby="title-${product.id}">
                <div class="product-card__media relative overflow-hidden aspect-[4/5] flex items-center justify-center">
                    ${badgeMarkup(product)}
                    <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}" loading="lazy"
                         class="object-cover w-full h-full">
                </div>
                <div class="p-5 flex-grow flex flex-col justify-between">
                    <div>
                        <p class="text-[10px] uppercase tracking-[0.14em] text-gray-400 mb-1">${escapeHtml(product.category)}</p>
                        <h3 id="title-${product.id}" class="text-sm font-medium text-gray-900 mb-1 leading-snug">${escapeHtml(product.name)}</h3>
                        <div class="flex items-center space-x-2 mt-1">
                            <p class="text-lg font-bold text-black">${money(product.price)}</p>
                            ${compare}
                        </div>
                        ${variantsMarkup(product)}
                    </div>
                    <button type="button" data-add ${soldOut ? 'disabled' : ''}
                            class="w-full font-semibold py-2.5 rounded-xl transition text-sm mt-5 ${soldOut ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-black/90 text-white shadow hover:bg-black'}">
                        ${soldOut ? 'Agotado' : 'Añadir al Carrito'}
                    </button>
                </div>
            </article>
        `;
    }

    function renderProducts() {
        const grid = $('#product-grid');
        const list = filteredProducts();
        const visible = list.slice(0, state.visible);

        grid.innerHTML = visible.map(productCardMarkup).join('');

        $$('img', grid).forEach((img) => {
            img.addEventListener('error', () => img.classList.add('img-fallback'), { once: true });
        });

        const empty = $('#empty-results');
        empty.classList.toggle('hidden', list.length > 0);
        grid.classList.toggle('hidden', list.length === 0);

        const count = $('#results-count');
        count.innerHTML = list.length === 0
            ? 'Mostrando <span class="font-bold text-black">0</span> productos'
            : `Mostrando <span class="font-bold text-black">${visible.length}</span> de <span class="font-bold text-black">${list.length}</span> productos`;

        const loadMore = $('#load-more');
        const wrap = $('#load-more-wrap');
        const remaining = list.length - visible.length;

        wrap.classList.toggle('hidden', list.length === 0);
        if (remaining > 0) {
            loadMore.disabled = false;
            loadMore.textContent = `Cargar más productos (${remaining})`;
        } else {
            loadMore.disabled = true;
            loadMore.textContent = 'Has visto todos los productos';
        }
    }

    function updateFilterBadge() {
        const priceChanged = state.minPrice > 0 || state.maxPrice < catalogMaxPrice;
        const active = state.categories.size + (state.dropi ? 1 : 0) + (priceChanged ? 1 : 0);
        const badge = $('#active-filters-badge');
        badge.textContent = active === 0 ? 'Sin filtros' : `${active} activo${active === 1 ? '' : 's'}`;
    }

    function applyFilters() {
        state.visible = PAGE_SIZE;
        renderCategoryFilters();
        updateFilterBadge();
        renderProducts();
    }

    function resetFilters() {
        state.categories.clear();
        state.dropi = true;
        state.minPrice = 0;
        state.maxPrice = catalogMaxPrice;
        state.search = '';
        state.sort = 'featured';

        $('#price-min').value = '0';
        $('#price-max').value = String(catalogMaxPrice);
        $('#search').value = '';
        $('#sort').value = 'featured';

        updatePriceHint();
        applyFilters();
    }

    function updatePriceHint() {
        $('#price-hint').textContent = `Productos entre ${money(state.minPrice)} y ${money(state.maxPrice)}`;
    }

    /* --------------------------------------------------------
       Carrito
       -------------------------------------------------------- */
    function addToCart(card) {
        const id = card.dataset.productId;
        const product = getProduct(id);
        if (!product) return;

        const size = $('[data-size]', card)?.value || '';
        const colorInput = $('input[type="radio"]:checked', card);
        const colorName = colorInput?.value || '';
        const color = product.colors.find((item) => item.name === colorName);

        const key = `${id}|${size}|${colorName}`;
        const existing = state.cart.find((item) => item.key === key);

        if (existing) {
            existing.qty += 1;
        } else {
            state.cart.push({
                key,
                id,
                name: product.name,
                price: product.price,
                image: product.image,
                size,
                colorName,
                colorHex: color?.hex || '',
                qty: 1
            });
        }

        saveCart();
        renderCart();

        const badge = $('#cart-count');
        badge.classList.add('scale-150');
        setTimeout(() => badge.classList.remove('scale-150'), 200);

        showToast('¡Añadido al carrito!', `${product.name} se agregó exitosamente.`, 'success');
    }

    function changeQty(key, delta) {
        const item = state.cart.find((entry) => entry.key === key);
        if (!item) return;

        item.qty += delta;
        if (item.qty <= 0) {
            removeItem(key);
            return;
        }
        if (item.qty > 99) item.qty = 99;

        saveCart();
        renderCart();
    }

    function removeItem(key) {
        state.cart = state.cart.filter((entry) => entry.key !== key);
        saveCart();
        renderCart();
    }

    function variantLabel(item) {
        const parts = [];
        if (item.size) parts.push(`Talla ${item.size}`);
        if (item.colorName) parts.push(`Color ${item.colorName}`);
        return parts.join(' · ');
    }

    function renderCart() {
        const count = cartCount();
        $('#cart-count').textContent = count;

        const isEmpty = state.cart.length === 0;
        const emptyMsg = $('#empty-cart-msg');
        const form = $('#checkout-container');

        emptyMsg.classList.toggle('hidden', !isEmpty);
        form.classList.toggle('hidden', isEmpty);
        form.classList.toggle('grid', !isEmpty);

        const container = $('#cart-items-container');

        container.innerHTML = state.cart.map((item) => {
            const variant = variantLabel(item);
            return `
                <div class="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                    <img src="${escapeHtml(item.image)}" alt="" loading="lazy" class="cart-item-thumb">
                    <div class="flex-1 min-w-0">
                        <p class="text-[13px] text-gray-800 leading-snug pr-1">${escapeHtml(item.name)}</p>
                        ${variant ? `<p class="text-[11px] text-gray-400 mt-0.5">${escapeHtml(variant)}</p>` : ''}
                        <div class="flex items-center gap-2 mt-1.5">
                            <button type="button" class="qty-btn" data-action="dec" data-key="${encodeURIComponent(item.key)}" aria-label="Quitar una unidad de ${escapeHtml(item.name)}">−</button>
                            <span class="text-xs font-semibold text-gray-700 min-w-[16px] text-center">${item.qty}</span>
                            <button type="button" class="qty-btn" data-action="inc" data-key="${encodeURIComponent(item.key)}" aria-label="Agregar una unidad de ${escapeHtml(item.name)}">+</button>
                        </div>
                    </div>
                    <div class="text-right flex-shrink-0">
                        <p class="font-bold text-gray-900 text-[13px] whitespace-nowrap">${money(item.price * item.qty)}</p>
                        <button type="button" class="cart-line-remove text-[11px] mt-1.5 inline-flex items-center gap-1"
                                data-action="remove" data-key="${encodeURIComponent(item.key)}"
                                aria-label="Eliminar ${escapeHtml(item.name)}">
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                            </svg>
                            Quitar
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        updateTotals();
    }

    function updateTotals() {
        const sub = subtotal();
        const total = sub + state.shipping;

        $('#summary-total-recaudar').textContent = money(total);
        $('#summary-supplier').textContent = money(supplierCost());
        $('#summary-shipping').textContent = money(state.shipping);
        $('#summary-commission').textContent = money(commission());
        $('#summary-profit').textContent = money(sub - supplierCost() - commission());

        const btn = $('#btn-checkout');
        btn.disabled = !(state.cart.length > 0 && state.shipping > 0);
    }

    /* --------------------------------------------------------
       Envío / transportadoras
       -------------------------------------------------------- */
    function cityDepartment(city) {
        return Object.keys(DEPARTMENTS).find((department) => DEPARTMENTS[department].includes(city)) || '';
    }

    function populateCities(department, selectedCity = '') {
        const citySelect = $('#city');
        const cities = DEPARTMENTS[department] || [];
        citySelect.innerHTML = '<option value="">Ciudad</option>' + cities
            .map((city) => `<option value="${city}" ${city === selectedCity ? 'selected' : ''}>${CITY_NAMES[city] || city}</option>`)
            .join('');
    }

    function recaudoFee() {
        const selected = $('input[name="recaudo"]:checked');
        return selected && selected.value === 'con' ? 2500 : 0;
    }

    function updateRecaudoStyles() {
        $$('input[name="recaudo"]').forEach((input) => {
            const label = input.closest('label');
            const active = input.checked;
            label.classList.toggle('border-orange-400', active);
            label.classList.toggle('bg-orange-50', active);
            label.classList.toggle('text-orange-800', active);
            label.classList.toggle('border-gray-300', !active);
            label.classList.toggle('text-gray-600', !active);
        });
    }

    function quoteCarriers(city) {
        const base = (city === 'Dosquebradas' || city === 'Pereira') ? 15000 : 20000;
        const fee = recaudoFee();
        return CARRIERS.map((carrier) => ({
            ...carrier,
            price: base + carrier.extra + fee
        }));
    }

    function renderCarriers(city, preferredId = null) {
        const placeholder = $('#carrier-placeholder');
        const list = $('#carrier-list');

        if (!city) {
            placeholder.classList.remove('hidden');
            list.innerHTML = '';
            state.shipping = 0;
            state.carrier = null;
            updateTotals();
            return;
        }

        placeholder.classList.add('hidden');
        const rates = quoteCarriers(city);
        const selected = rates.find((rate) => rate.id === preferredId) || rates[0];

        list.innerHTML = rates.map((rate) => `
            <label class="border border-gray-200 rounded-md p-3 flex justify-between items-center cursor-pointer hover:border-orange-400 hover:bg-orange-50/50 transition has-[:checked]:border-orange-400 has-[:checked]:bg-orange-50 group">
                <span class="flex items-center space-x-3">
                    <input type="radio" name="carrier" value="${rate.id}" class="w-4 h-4 accent-orange-500"
                           data-price="${rate.price}" ${rate.id === selected.id ? 'checked' : ''}>
                    <span class="w-5 h-5 rounded-full ${rate.color} flex items-center justify-center text-white text-[8px] font-bold shadow-sm">
                        ${escapeHtml(rate.name.charAt(0))}
                    </span>
                    <span class="text-sm font-medium text-gray-800">${escapeHtml(rate.name)}</span>
                </span>
                <span class="text-sm font-bold text-gray-700 group-has-[:checked]:text-orange-600">${money(rate.price)}</span>
            </label>
        `).join('');

        state.carrier = selected.id;
        state.shipping = selected.price;
        updateTotals();
    }

    function setCity(city, { syncDepartment = true } = {}) {
        state.city = city || '';

        $('#header-city').value = state.city;

        if (syncDepartment) {
            const department = cityDepartment(state.city);
            $('#department').value = department;
            populateCities(department, state.city);
            $('#city').value = state.city;
        }

        renderCarriers(state.city);
    }

    function syncCityFromHeader(city) {
        state.city = city;
        const department = cityDepartment(city);
        $('#department').value = department;
        populateCities(department, city);
        $('#city').value = city;
        renderCarriers(city);
        updateTotals();
    }

    /* --------------------------------------------------------
       Toast
       -------------------------------------------------------- */
    let toastTimer = null;

    function showToast(title, text, type = 'success') {
        const toast = $('#toast');
        const icon = $('#toast-icon');

        $('#toast-title').textContent = title;
        $('#toast-text').textContent = text;

        icon.className = 'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ' +
            (type === 'error' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600');

        icon.innerHTML = type === 'error'
            ? '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>'
            : '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>';

        toast.classList.remove('translate-y-20', 'opacity-0');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => {
            toast.classList.add('translate-y-20', 'opacity-0');
        }, 3200);
    }

    /* --------------------------------------------------------
       Carrito: abrir / cerrar
       -------------------------------------------------------- */
    function openCart() {
        if ($('#cart-sidebar').classList.contains('translate-x-full') === false) return;

        state.lastFocused = document.activeElement;

        const sidebar = $('#cart-sidebar');
        const overlay = $('#cart-overlay');

        sidebar.classList.remove('translate-x-full');
        sidebar.inert = false;
        sidebar.setAttribute('aria-hidden', 'false');
        $('#cart-toggle').setAttribute('aria-expanded', 'true');

        overlay.classList.remove('hidden');
        requestAnimationFrame(() => overlay.classList.remove('opacity-0'));

        document.body.classList.add('cart-open');
        renderCart();
        setTimeout(() => $('[data-close-cart]', sidebar)?.focus(), 50);
    }

    function closeCart() {
        const sidebar = $('#cart-sidebar');
        const overlay = $('#cart-overlay');

        if (sidebar.classList.contains('translate-x-full')) return;

        const hadSuccess = !$('#success-message').classList.contains('hidden');

        sidebar.classList.add('translate-x-full');
        sidebar.inert = true;
        sidebar.setAttribute('aria-hidden', 'true');
        $('#cart-toggle').setAttribute('aria-expanded', 'false');

        overlay.classList.add('opacity-0');
        setTimeout(() => overlay.classList.add('hidden'), 300);

        document.body.classList.remove('cart-open');

        if (state.lastFocused && typeof state.lastFocused.focus === 'function') {
            state.lastFocused.focus();
        }

        if (hadSuccess) {
            setTimeout(resetCheckoutView, 350);
        }
    }

    function trapFocus(event) {
        if (event.key !== 'Tab') return;
        if ($('#cart-sidebar').classList.contains('translate-x-full')) return;

        const focusables = $$(
            'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
            $('#cart-sidebar')
        ).filter((element) => element.offsetParent !== null);

        if (!focusables.length) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    }

    /* --------------------------------------------------------
       Validación y creación de orden
       -------------------------------------------------------- */
    const REQUIRED_FIELDS = [
        { id: 'first-name', message: 'Ingresa tus nombres.' },
        { id: 'last-name', message: 'Ingresa tus apellidos.' },
        { id: 'phone', message: 'Ingresa un teléfono válido.', validate: (value) => value.replace(/\D/g, '').length >= 7 },
        { id: 'department', message: 'Selecciona un departamento.' },
        { id: 'city', message: 'Selecciona una ciudad.' },
        { id: 'address', message: 'Ingresa la dirección de entrega.' },
        { id: 'email', message: 'Ingresa un correo válido.', validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value) }
    ];

    function setFieldError(input, message) {
        const error = $(`[data-error-for="${input.id}"]`);
        input.classList.toggle('invalid', Boolean(message));
        if (error) {
            error.textContent = message || '';
            error.classList.toggle('visible', Boolean(message));
        }
    }

    function validateCheckout() {
        let firstInvalid = null;

        REQUIRED_FIELDS.forEach((field) => {
            const input = document.getElementById(field.id);
            if (!input) return;

            const value = input.value.trim();
            const valid = value !== '' && (!field.validate || field.validate(value));

            setFieldError(input, valid ? '' : field.message);
            if (!valid && !firstInvalid) firstInvalid = input;
        });

        if (firstInvalid) {
            firstInvalid.focus();
            if (typeof firstInvalid.scrollIntoView === 'function') {
                firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }

        return !firstInvalid;
    }

    function createOrderNumber() {
        const now = new Date();
        const stamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
        const random = Math.floor(1000 + Math.random() * 9000);
        return `TG-${stamp}-${random}`;
    }

    function processOrder(event) {
        event.preventDefault();

        if (!state.cart.length) {
            showToast('Carrito vacío', 'Agrega productos antes de crear la orden.', 'error');
            return;
        }

        if (!validateCheckout()) {
            showToast('Revisa los datos', 'Completa los campos obligatorios para continuar.', 'error');
            return;
        }

        const orderNumber = createOrderNumber();
        $('#order-number').textContent = orderNumber;
        $('#cart-title').textContent = 'Orden creada';

        $('#checkout-container').classList.add('hidden');
        $('#checkout-container').classList.remove('grid');
        const success = $('#success-message');
        success.classList.remove('hidden');
        success.classList.add('flex');
        success.setAttribute('tabindex', '-1');
        success.focus({ preventScroll: true });
        success.scrollIntoView({ behavior: 'smooth', block: 'center' });

        state.cart = [];
        saveCart();
        renderCart();
        $('#empty-cart-msg').classList.add('hidden');
        showToast('Orden creada', `El pedido ${orderNumber} se registró correctamente.`, 'success');
    }

    function resetCheckoutView() {
        $('#success-message').classList.add('hidden');
        $('#success-message').classList.remove('flex');
        $('#cart-title').textContent = 'Crear Orden';
        $('#checkout-container').classList.remove('hidden');
        $('#checkout-container').classList.add('grid');

        $('#checkout-container').reset();

        ['first-name', 'last-name', 'phone', 'department', 'city', 'address', 'email'].forEach((id) => {
            const input = document.getElementById(id);
            if (input) setFieldError(input, '');
        });

        $('#notes').classList.add('hidden');
        $('#notes').value = '';
        updateRecaudoStyles();

        setCity(state.city);
        renderCart();
    }

    /* --------------------------------------------------------
       Geolocalización
       -------------------------------------------------------- */
    async function useCurrentLocation() {
        const status = $('#location-status');
        const addressInput = $('#address');

        const setStatus = (text, tone) => {
            status.textContent = text;
            status.classList.remove('hidden', 'text-blue-500', 'text-green-600', 'text-red-500', 'text-gray-500');
            status.classList.add(tone);
        };

        if (!navigator.geolocation) {
            setStatus('Tu navegador no soporta geolocalización.', 'text-red-500');
            return;
        }

        setStatus('Obteniendo ubicación…', 'text-blue-500');

        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;

            try {
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=es`,
                    { headers: { Accept: 'application/json' } }
                );
                const data = await response.json();

                if (!data || !data.address) throw new Error('Sin dirección');

                const road = data.address.road || data.address.pedestrian || '';
                const house = data.address.house_number || '';
                const municipality = data.address.city || data.address.town || data.address.village || '';
                const stateName = data.address.state || '';

                addressInput.value = `${road} ${house}`.trim();
                setFieldError(addressInput, '');

                const departmentKey = Object.keys(DEPARTMENTS).find((key) =>
                    normalize(key) === normalize(stateName) ||
                    normalize(stateName).includes(normalize(key))
                );

                if (departmentKey) {
                    $('#department').value = departmentKey;
                    populateCities(departmentKey);
                }

                const cityKey = Object.keys(CITY_NAMES).find((key) => normalize(CITY_NAMES[key]) === normalize(municipality));

                if (cityKey) {
                    $('#city').value = cityKey;
                    state.city = cityKey;
                    $('#header-city').value = cityKey;
                    renderCarriers(cityKey);
                }

                setStatus('Ubicación encontrada. Revisa y completa los datos.', 'text-green-600');
                setTimeout(() => status.classList.add('hidden'), 4000);
            } catch (error) {
                setStatus('Ingresa la dirección manualmente.', 'text-gray-500');
            }
        }, () => {
            setStatus('No se pudo obtener la ubicación.', 'text-red-500');
        }, { timeout: 10000 });
    }

    /* --------------------------------------------------------
       Eventos
       -------------------------------------------------------- */
    function bindEvents() {
        /* Carrito */
        $('#cart-toggle').addEventListener('click', openCart);
        $$('[data-close-cart]').forEach((button) => button.addEventListener('click', closeCart));
        $('#cart-overlay').addEventListener('click', closeCart);

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') closeCart();
            trapFocus(event);
        });

        /* Añadir al carrito y variantes */
        $('#product-grid').addEventListener('click', (event) => {
            const button = event.target.closest('[data-add]');
            if (!button) return;
            const card = button.closest('[data-product-id]');
            if (card) addToCart(card);
        });

        /* Cantidades y eliminación */
        $('#cart-items-container').addEventListener('click', (event) => {
            const button = event.target.closest('[data-action]');
            if (!button) return;

            const key = decodeURIComponent(button.dataset.key || '');
            const action = button.dataset.action;

            if (action === 'inc') changeQty(key, 1);
            if (action === 'dec') changeQty(key, -1);
            if (action === 'remove') removeItem(key);
        });

        /* Filtros de categoría */
        $('#category-filters').addEventListener('change', (event) => {
            const input = event.target;
            if (!input.matches('.filter-checkbox')) return;

            if (input.dataset.filter === 'dropi') {
                state.dropi = input.checked;
            } else if (input.checked) {
                state.categories.add(input.value);
            } else {
                state.categories.delete(input.value);
            }

            applyFilters();
        });

        /* Precio */
        let priceTimer = null;
        const onPriceChange = () => {
            clearTimeout(priceTimer);
            priceTimer = setTimeout(() => {
                const min = Math.max(0, Number($('#price-min').value) || 0);
                const max = Math.max(0, Number($('#price-max').value) || 0);

                state.minPrice = Math.min(min, max);
                state.maxPrice = Math.max(min, max);

                updatePriceHint();
                applyFilters();
            }, 250);
        };

        $('#price-min').addEventListener('input', onPriceChange);
        $('#price-max').addEventListener('input', onPriceChange);

        /* Buscador y orden */
        $('#search').addEventListener('input', (event) => {
            state.search = event.target.value;
            state.visible = PAGE_SIZE;
            renderProducts();
        });

        $('#sort').addEventListener('change', (event) => {
            state.sort = event.target.value;
            state.visible = PAGE_SIZE;
            renderProducts();
        });

        /* Cargar más */
        $('#load-more').addEventListener('click', () => {
            state.visible += PAGE_SIZE;
            renderProducts();
        });

        /* Limpiar filtros */
        $('#clear-filters').addEventListener('click', resetFilters);
        $$('[data-clear-all]').forEach((button) => button.addEventListener('click', resetFilters));

        /* Filtros en móvil */
        $('#filters-toggle').addEventListener('click', () => {
            const panel = $('#filters-panel');
            const isHidden = panel.classList.contains('hidden');
            panel.classList.toggle('hidden', !isHidden);
            $('#filters-toggle').setAttribute('aria-expanded', String(isHidden));
        });

        /* Ciudad de entrega */
        $('#header-city').addEventListener('change', (event) => {
            syncCityFromHeader(event.target.value);
        });

        $('#department').addEventListener('change', (event) => {
            populateCities(event.target.value);
            $('#city').value = '';
            renderCarriers('');
            updateTotals();
        });

        $('#city').addEventListener('change', (event) => {
            const city = event.target.value;
            state.city = city;
            $('#header-city').value = city;
            renderCarriers(city);
            updateTotals();
        });

        /* Transportadora y tipo de recaudo */
        $('#carrier-list').addEventListener('change', (event) => {
            const input = event.target.closest('input[name="carrier"]');
            if (!input) return;
            state.carrier = input.value;
            state.shipping = Number(input.dataset.price) || 0;
            updateTotals();
        });

        $$('input[name="recaudo"]').forEach((input) => {
            input.addEventListener('change', () => {
                updateRecaudoStyles();
                renderCarriers(state.city, state.carrier);
            });
        });

        /* Geolocalización */
        $('#use-location').addEventListener('click', useCurrentLocation);

        /* Notas */
        $('#notes-toggle').addEventListener('change', (event) => {
            $('#notes').classList.toggle('hidden', !event.target.checked);
        });

        /* Checkout */
        $('#checkout-container').addEventListener('submit', processOrder);

        ['first-name', 'last-name', 'phone', 'address', 'email'].forEach((id) => {
            const input = document.getElementById(id);
            input?.addEventListener('input', () => {
                if (input.classList.contains('invalid')) setFieldError(input, '');
            });
        });

        $('#back-to-store').addEventListener('click', closeCart);

        /* Newsletter */
        $('#newsletter-form').addEventListener('submit', (event) => {
            event.preventDefault();
            const email = $('#newsletter-email');
            const message = $('#newsletter-msg');

            const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim());

            message.classList.remove('hidden', 'text-red-500', 'text-green-600');
            message.classList.add(valid ? 'text-green-600' : 'text-red-500');
            message.textContent = valid
                ? '¡Listo! Revisa tu correo para confirmar la suscripción.'
                : 'Ingresa un correo electrónico válido.';

            if (valid) {
                email.value = '';
                showToast('Suscripción exitosa', 'Gracias por unirte a nuestro newsletter.', 'success');
            }
        });
    }

    /* --------------------------------------------------------
       Inicialización
       -------------------------------------------------------- */
    function init() {
        $('#year').textContent = new Date().getFullYear();

        restoreCart();
        renderCategoryFilters();
        bindEvents();
        updateRecaudoStyles();
        setCity(state.city);
        renderProducts();
        renderCart();
        loadCatalog();
    }

    function mapCatalogProduct(product, index) {
        const price = Number(product.price) || 0;
        const compareAt = Number(product.compareAtPrice) || 0;
        const discount = compareAt > price ? Math.round((1 - price / compareAt) * 100) : 0;

        return {
            id: String(product.id),
            name: product.name || 'Producto',
            category: product.category || 'Dropi',
            price,
            compareAt: compareAt > price ? compareAt : undefined,
            image: product.imageUrl || FALLBACK_IMAGE,
            badge: discount > 0 ? { text: `-${discount}% DESCUENTO`, tone: 'red' } : undefined,
            note: 'Envío Rápido Dropi',
            sizes: Array.isArray(product.sizes) ? product.sizes : [],
            colors: Array.isArray(product.colors)
                ? product.colors.map((color) => ({ name: color.name, hex: color.hex || '#d1d5db' }))
                : [],
            featured: index + 1,
            stock: Number(product.stock) || 0,
            trending: Number(product.stock) > 0
        };
    }

    async function loadCatalog() {
        try {
            const response = await fetch(`${API_BASE}/api/catalog/products?limit=100`);
            if (!response.ok) {
                console.warn(`Catálogo Dropi no disponible (${response.status}); usando catálogo local.`);
                return;
            }

            const data = await response.json();
            if (!Array.isArray(data.products) || data.products.length === 0) return;

            PRODUCTS = data.products.map(mapCatalogProduct);
            state.cart = state.cart.map((item) => {
                const product = getProduct(item.id);
                if (!product) return item;
                return { ...item, name: product.name, price: product.price, image: product.image };
            });
            catalogMaxPrice = Math.max(
                MAX_PRICE,
                ...PRODUCTS.map((product) => Math.ceil(product.price / 1000) * 1000)
            );
            state.dropi = false;
            state.categories.clear();
            state.minPrice = 0;
            state.maxPrice = catalogMaxPrice;
            state.visible = PAGE_SIZE;
            $('#price-min').value = '0';
            $('#price-max').value = String(catalogMaxPrice);
            updatePriceHint();
            updateFilterBadge();
            renderCategoryFilters();
            renderProducts();
            renderCart();
        } catch (error) {
            return;
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
