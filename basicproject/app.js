(() => {
    /* ===========================================================================
       ZOMATO CLONE — Complete JavaScript (All Pages)
       =========================================================================== */

    const dataset = (window.restaurants || []).map((r, i) => ({
        id: r.id || i + 1,
        ...r,
    }));

    if (!dataset.length) return;

    /* ---------- Image helpers ---------- */
    const cuisineImages = {
        Indian: "https://images.unsplash.com/photo-1604908177035-0ac1c9bb6469?auto=format&fit=crop&w=800&q=80",
        Chinese: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=800&q=80",
        Japanese: "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=800&q=80",
        Thai: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
        Mexican: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=800&q=80",
        Italian: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=800&q=80",
    };
    const fallbackImage = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80";

    function pickImage(r) {
        return cuisineImages[r.food_type] || `${fallbackImage}&sig=${r.id}`;
    }

    /* ---------- Utility helpers ---------- */
    const fmt = (n) => `₹${Number(n || 0).toLocaleString("en-IN")}`;
    const fmtDist = (d) => `${Number(d || 0).toFixed(1)} km`;

    function isOpenNow(r) {
        const h = new Date().getHours();
        const o = Number(r.restaurant_open_time);
        const c = Number(r.restaurant_close_time);
        if (o === c) return true;
        return o < c ? h >= o && h < c : h >= o || h < c;
    }

    function matchSearch(r, term, loc) {
        const s = (term || "").toLowerCase();
        const l = (loc || "").toLowerCase();
        return `${r.name} ${r.food_type}`.toLowerCase().includes(s) && r.location.toLowerCase().includes(l);
    }

    /* ---------- Cart helpers ---------- */
    function getCart() {
        try { return JSON.parse(localStorage.getItem("zomatoCart")) || []; }
        catch { return []; }
    }
    function saveCart(c) { localStorage.setItem("zomatoCart", JSON.stringify(c)); }

    function addToCart(item) {
        const c = getCart();
        const ex = c.find((e) => e.itemId === item.itemId && e.restaurantId === item.restaurantId);
        if (ex) ex.qty += 1; else c.push({ ...item, qty: 1 });
        saveCart(c);
        updateCartCount();
        showToast(`Added ${item.name} to cart`, "success");
    }

    function removeFromCart(index) {
        const c = getCart();
        c.splice(index, 1);
        saveCart(c);
        updateCartCount();
    }

    function changeQty(index, delta) {
        const c = getCart();
        c[index].qty += delta;
        if (c[index].qty <= 0) c.splice(index, 1);
        saveCart(c);
        updateCartCount();
    }

    /* ---------- Favourites ---------- */
    function getFavs() {
        try { return JSON.parse(localStorage.getItem("zomatoFavs")) || []; }
        catch { return []; }
    }
    function toggleFav(id) {
        let f = getFavs();
        if (f.includes(id)) f = f.filter((x) => x !== id);
        else f.push(id);
        localStorage.setItem("zomatoFavs", JSON.stringify(f));
        return f.includes(id);
    }

    /* ---------- Toast ---------- */
    function showToast(msg, type = "success") {
        const existing = document.querySelector(".toast");
        if (existing) existing.remove();
        const t = document.createElement("div");
        t.className = `toast toast--${type}`;
        const icon = type === "success" ? "fa-check-circle" : "fa-exclamation-circle";
        t.innerHTML = `<i class="fas ${icon}"></i> ${msg}`;
        document.body.appendChild(t);
        setTimeout(() => t.remove(), 3000);
    }

    /* ---------- Cart count badge ---------- */
    function updateCartCount() {
        const count = getCart().reduce((s, i) => s + i.qty, 0);
        document.querySelectorAll("#cartCount").forEach((el) => (el.textContent = count));
    }

    /* ---------- Mobile nav toggle ---------- */
    function initMobileNav() {
        const toggle = document.getElementById("mobileNavToggle");
        const navLinks = document.getElementById("navLinks");
        if (!toggle || !navLinks) return;
        toggle.addEventListener("click", () => {
            navLinks.classList.toggle("open");
            const icon = toggle.querySelector("i");
            icon.classList.toggle("fa-bars");
            icon.classList.toggle("fa-times");
        });
        navLinks.querySelectorAll("a").forEach((a) =>
            a.addEventListener("click", () => {
                navLinks.classList.remove("open");
                const icon = toggle.querySelector("i");
                icon.classList.add("fa-bars");
                icon.classList.remove("fa-times");
            })
        );
    }

    /* ---------- Build menu for a restaurant ---------- */
    function buildMenu(r) {
        const bp = Math.max(150, Math.round(r.price_for_two / 2));
        return [
            { id: `${r.id}-starter`, name: `${r.food_type} Crispy Starters`, tagline: "Golden-fried bites with signature dip", price: Math.round(bp * 0.6) },
            { id: `${r.id}-sig`, name: `${r.food_type} Signature Bowl`, tagline: `House special inspired by ${r.location}`, price: bp },
            { id: `${r.id}-chef`, name: "Chef's Tasting Plate", tagline: "A rotating trio of seasonal bites", price: bp + 120 },
            { id: `${r.id}-special`, name: "Today's Special Thali", tagline: "Complete meal with rice, dal, bread & sides", price: bp + 80 },
            { id: `${r.id}-grill`, name: "Char-Grilled Platter", tagline: "Smoky flavours from the tandoor", price: bp + 150 },
            { id: `${r.id}-dessert`, name: "Dessert Sampler", tagline: "Sweet finish for two", price: bp - 40 },
            { id: `${r.id}-drink`, name: r.alcohol ? "Craft Cocktail" : "Signature Cooler", tagline: r.alcohol ? "Bartender's choice" : "Fresh fruit blend", price: bp - 20 },
            { id: `${r.id}-combo`, name: "Couple's Combo", tagline: "Starter + Main + Dessert for two", price: Math.round(bp * 2.2) },
        ];
    }

    /* ---------- Generate mock reviews ---------- */
    function generateReviews(r) {
        const names = ["Priya S.", "Amit K.", "Neha R.", "Rahul M.", "Sneha D.", "Vikram T.", "Riya G.", "Arjun P."];
        const comments = [
            `Amazing ${r.food_type} food! The flavours were authentic and the service was top-notch.`,
            `Great ambiance in ${r.location}. Will definitely come back for the signature dishes.`,
            "Loved the portion sizes. Very generous and the presentation was beautiful.",
            `Best ${r.food_type} restaurant in the area. The chef really knows what they're doing.`,
            "Quick service and the food was hot and fresh. The dessert was the highlight!",
            "A wonderful dining experience. The staff made great recommendations.",
        ];
        const count = 3 + Math.floor(Math.random() * 3);
        const reviews = [];
        for (let i = 0; i < count; i++) {
            reviews.push({
                name: names[i % names.length],
                rating: (r.rating - 0.5 + Math.random()).toFixed(1),
                comment: comments[i % comments.length],
                date: `${Math.floor(Math.random() * 28) + 1} days ago`,
            });
        }
        return reviews;
    }

    /* ---------- Render cards ---------- */
    function renderCards(list, container) {
        if (!container) return;
        container.innerHTML = "";
        const favs = getFavs();
        list.forEach((r) => {
            const card = document.createElement("article");
            card.className = "restaurant-card fade-up";
            const isFav = favs.includes(r.id);
            card.innerHTML = `
        <div class="restaurant-card__image-wrap">
          <div class="restaurant-card__image" style="background-image:url('${pickImage(r)}')">
            <button class="restaurant-card__fav ${isFav ? "liked" : ""}" data-fav="${r.id}" title="Add to favourites">
              <i class="${isFav ? "fas" : "far"} fa-heart"></i>
            </button>
            ${r.offers ? `<div class="restaurant-card__offer-tag"><i class="fas fa-tag"></i> ${r.offers}% OFF</div>` : ""}
          </div>
        </div>
        <div class="restaurant-card__body">
          <div class="card-meta">
            <div>
              <strong>${r.name}</strong>
              <div class="muted">${r.food_type}</div>
            </div>
            <span class="rating"><i class="fas fa-star"></i> ${r.rating.toFixed(1)}</span>
          </div>
          <div class="pill-row">
            <span><i class="fas fa-wallet"></i> ${fmt(r.price_for_two)} for two</span>
            <span><i class="fas fa-location-dot"></i> ${fmtDist(r.distance_from_Customer_house)}</span>
          </div>
          <div class="badge-row">
            <span class="badge">${r.location}</span>
            ${r.alcohol ? '<span class="badge badge--accent"><i class="fas fa-wine-glass"></i> Alcohol</span>' : ""}
            ${isOpenNow(r) ? '<span class="badge badge--green"><i class="fas fa-clock"></i> Open now</span>' : '<span class="badge"><i class="fas fa-clock"></i> Closed</span>'}
          </div>
        </div>
      `;
            // Fav button
            card.querySelector(".restaurant-card__fav").addEventListener("click", (e) => {
                e.stopPropagation();
                const btn = e.currentTarget;
                const liked = toggleFav(r.id);
                btn.classList.toggle("liked", liked);
                btn.querySelector("i").className = liked ? "fas fa-heart" : "far fa-heart";
                showToast(liked ? "Added to favourites" : "Removed from favourites");
            });
            // Navigate on click
            card.addEventListener("click", () => {
                window.location.href = `restaurant.html?id=${r.id}`;
            });
            container.appendChild(card);
        });
    }

    /* ==========================================================================
       PAGE INIT — Router
       ========================================================================== */
    const page = document.body.dataset.page;

    // Global inits
    updateCartCount();
    initMobileNav();

    if (page === "home") initHome();
    else if (page === "restaurants") initRestaurants();
    else if (page === "restaurant") initRestaurantDetail();
    else if (page === "cart") initCart();
    else if (page === "offers") initOffers();
    else if (page === "about") initAbout();
    else if (page === "login") initLogin();
    else if (page === "checkout") initCheckout();

    /* ==========================================================================
       HOME
       ========================================================================== */
    function initHome() {
        const form = document.querySelector("[data-search-form]");
        const statTopRated = document.getElementById("statTopRated");
        const statOpenNow = document.getElementById("statOpenNow");
        const topRatedList = document.getElementById("topRatedList");
        const cuisineGrid = document.getElementById("cuisineGrid");

        // Animate stat numbers
        animateNumber(statTopRated, dataset.filter((r) => r.rating >= 4.5).length);
        animateNumber(statOpenNow, dataset.filter((r) => isOpenNow(r)).length);

        renderCards(
            dataset.filter((r) => r.rating >= 4.5).slice(0, 6),
            topRatedList
        );

        // Cuisines
        const cuisines = [...new Set(dataset.map((r) => r.food_type))];
        cuisineGrid.innerHTML = cuisines
            .map((c) => {
                const count = dataset.filter((r) => r.food_type === c).length;
                return `<div class="cuisine-chip" data-cuisine="${c}"><span>${c}</span><span class="cuisine-count">${count}</span></div>`;
            })
            .join("");

        cuisineGrid.addEventListener("click", (e) => {
            const chip = e.target.closest(".cuisine-chip");
            if (chip) window.location.href = `restaurants.html?cuisine=${chip.dataset.cuisine}`;
        });

        // Collection cards click
        document.querySelectorAll(".collection-card").forEach((card, i) => {
            card.addEventListener("click", () => {
                const links = [
                    "restaurants.html?alcohol=1&sort=rating",
                    "restaurants.html?open=1&sort=rating",
                    "restaurants.html?cuisine=Indian",
                    "restaurants.html?maxPrice=500&sort=costLow",
                ];
                window.location.href = links[i] || "restaurants.html";
            });
        });

        form?.addEventListener("submit", (e) => {
            e.preventDefault();
            const fd = new FormData(form);
            const s = encodeURIComponent(fd.get("search") || "");
            const l = encodeURIComponent(fd.get("location") || "");
            window.location.href = `restaurants.html?search=${s}&location=${l}`;
        });
    }

    /* ==========================================================================
       RESTAURANTS LIST
       ========================================================================== */
    function initRestaurants() {
        const params = new URLSearchParams(window.location.search);
        const searchInput = document.getElementById("searchInput");
        const cuisineSelect = document.getElementById("cuisineSelect");
        const minRating = document.getElementById("minRating");
        const minRatingValue = document.getElementById("minRatingValue");
        const maxPrice = document.getElementById("maxPrice");
        const openNow = document.getElementById("openNow");
        const servesAlcohol = document.getElementById("servesAlcohol");
        const sortSelect = document.getElementById("sortSelect");
        const listStatus = document.getElementById("listStatus");
        const restaurantList = document.getElementById("restaurantList");
        const quickFilters = document.getElementById("quickFilters");
        const clearFilters = document.getElementById("clearFilters");

        searchInput.value = params.get("search") || "";
        cuisineSelect.value = params.get("cuisine") || "";
        minRating.value = params.get("minRating") || 3;
        minRatingValue.textContent = minRating.value;
        maxPrice.value = params.get("maxPrice") || "";
        openNow.checked = params.get("open") === "1";
        servesAlcohol.checked = params.get("alcohol") === "1";
        sortSelect.value = params.get("sort") || "rating";

        const state = {
            search: searchInput.value,
            location: params.get("location") || "",
            cuisine: cuisineSelect.value,
            minRating: Number(minRating.value),
            maxPrice: maxPrice.value ? Number(maxPrice.value) : null,
            openNow: openNow.checked,
            servesAlcohol: servesAlcohol.checked,
            sort: sortSelect.value,
            offers: params.get("offers") === "1",
        };

        const refresh = () => {
            const filtered = dataset.filter((r) => {
                if (!matchSearch(r, state.search, state.location)) return false;
                if (state.cuisine && r.food_type !== state.cuisine) return false;
                if (r.rating < state.minRating) return false;
                if (state.maxPrice && r.price_for_two > state.maxPrice) return false;
                if (state.openNow && !isOpenNow(r)) return false;
                if (state.servesAlcohol && !r.alcohol) return false;
                if (state.offers && r.offers < 20) return false;
                return true;
            });

            const sorted = [...filtered].sort((a, b) => {
                if (state.sort === "rating") return b.rating - a.rating;
                if (state.sort === "costLow") return a.price_for_two - b.price_for_two;
                if (state.sort === "costHigh") return b.price_for_two - a.price_for_two;
                if (state.sort === "distance") return Number(a.distance_from_Customer_house) - Number(b.distance_from_Customer_house);
                if (state.sort === "offers") return b.offers - a.offers;
                return 0;
            });

            listStatus.textContent = `${sorted.length} restaurant${sorted.length !== 1 ? "s" : ""}`;
            renderCards(sorted.slice(0, 60), restaurantList);
        };

        // Event listeners
        minRating.addEventListener("input", () => { state.minRating = Number(minRating.value); minRatingValue.textContent = minRating.value; refresh(); });
        searchInput.addEventListener("input", () => { state.search = searchInput.value; refresh(); });
        cuisineSelect.addEventListener("change", () => { state.cuisine = cuisineSelect.value; refresh(); });
        maxPrice.addEventListener("input", () => { state.maxPrice = maxPrice.value ? Number(maxPrice.value) : null; refresh(); });
        openNow.addEventListener("change", () => { state.openNow = openNow.checked; refresh(); });
        servesAlcohol.addEventListener("change", () => { state.servesAlcohol = servesAlcohol.checked; refresh(); });
        sortSelect.addEventListener("change", () => { state.sort = sortSelect.value; refresh(); });

        quickFilters.addEventListener("click", (e) => {
            const chip = e.target.closest(".chip");
            if (!chip) return;
            const type = chip.dataset.filter;
            chip.classList.toggle("active");
            if (type === "rating") state.minRating = chip.classList.contains("active") ? 4.5 : 3;
            if (type === "offers") state.offers = chip.classList.contains("active");
            if (type === "open") state.openNow = chip.classList.contains("active");
            if (type === "alcohol") state.servesAlcohol = chip.classList.contains("active");
            minRating.value = state.minRating;
            minRatingValue.textContent = state.minRating;
            openNow.checked = state.openNow;
            servesAlcohol.checked = state.servesAlcohol;
            refresh();
        });

        clearFilters.addEventListener("click", () => {
            searchInput.value = "";
            cuisineSelect.value = "";
            minRating.value = 3;
            minRatingValue.textContent = 3;
            maxPrice.value = "";
            openNow.checked = false;
            servesAlcohol.checked = false;
            sortSelect.value = "rating";
            document.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
            Object.assign(state, { search: "", cuisine: "", minRating: 3, maxPrice: null, openNow: false, servesAlcohol: false, offers: false, sort: "rating" });
            refresh();
        });

        refresh();
    }

    /* ==========================================================================
       RESTAURANT DETAIL
       ========================================================================== */
    function initRestaurantDetail() {
        const params = new URLSearchParams(window.location.search);
        const id = Number(params.get("id"));
        const r = dataset.find((x) => x.id === id) || dataset[0];
        if (!r) return;

        const $ = (sel) => document.getElementById(sel);

        $("detailHero").style.backgroundImage = `url(${pickImage(r)})`;
        $("detailName").textContent = r.name;
        $("detailBadges").innerHTML = `
      <span class="badge badge--accent"><i class="fas fa-utensils"></i> ${r.food_type}</span>
      <span class="badge"><i class="fas fa-map-marker-alt"></i> ${r.location}</span>
      <span class="badge"><i class="fas fa-route"></i> ${fmtDist(r.distance_from_Customer_house)}</span>
    `;
        $("detailMeta").innerHTML = `
      <span class="rating"><i class="fas fa-star"></i> ${r.rating.toFixed(1)}</span>
      <span><i class="fas fa-tag"></i> ${r.offers}% off</span>
      <span>${r.alcohol ? '<i class="fas fa-wine-glass"></i> Serves alcohol' : '<i class="fas fa-ban"></i> Non-alcoholic'}</span>
      <span>${isOpenNow(r) ? '<i class="fas fa-clock"></i> Open now' : '<i class="fas fa-clock"></i> Closed'}</span>
    `;

        $("detailAbout").textContent = `${r.name} brings authentic ${r.food_type} flavours to ${r.location}. Expect generous portions, warm ambiance, and a solid ${r.rating.toFixed(1)}-star reputation among local food lovers. Perfect for both casual dining and special occasions.`;
        $("detailInfo").innerHTML = `
      <span class="badge"><i class="fas fa-wallet"></i> Price for two: ${fmt(r.price_for_two)}</span>
      <span class="badge"><i class="fas fa-road"></i> Distance: ${fmtDist(r.distance_from_Customer_house)}</span>
      <span class="badge"><i class="fas fa-clock"></i> Timings: ${r.restaurant_open_time}:00 – ${r.restaurant_close_time}:00</span>
    `;

        // Menu
        const menu = buildMenu(r);
        const menuList = $("menuList");
        menuList.innerHTML = "";
        menu.forEach((item) => {
            const row = document.createElement("div");
            row.className = "menu-item";
            row.innerHTML = `
        <div class="menu-item__info">
          <strong>${item.name}</strong>
          <p class="muted">${item.tagline}</p>
        </div>
        <div class="menu-actions">
          <span>${fmt(item.price)}</span>
          <button class="btn btn--sm"><i class="fas fa-plus"></i> Add</button>
        </div>
      `;
            row.querySelector("button").addEventListener("click", () => {
                addToCart({ itemId: item.id, name: item.name, price: item.price, restaurantId: r.id, restaurantName: r.name });
            });
            menuList.appendChild(row);
        });

        $("viewCart").addEventListener("click", () => (window.location.href = "cart.html"));

        // Reviews
        const reviewsList = $("reviewsList");
        if (reviewsList) {
            const reviews = generateReviews(r);
            reviewsList.innerHTML = reviews
                .map(
                    (rev) => `
        <div class="review-item">
          <div class="review-header">
            <strong><i class="fas fa-user-circle"></i> ${rev.name}</strong>
            <span class="rating"><i class="fas fa-star"></i> ${rev.rating}</span>
          </div>
          <p>${rev.comment}</p>
          <p class="muted" style="font-size:12px;margin-top:4px"><i class="fas fa-calendar"></i> ${rev.date}</p>
        </div>
      `
                )
                .join("");
        }

        // Similar
        const similar = dataset.filter((x) => x.food_type === r.food_type && x.id !== r.id).slice(0, 4);
        renderCards(similar, $("similarList"));
    }

    /* ==========================================================================
       CART
       ========================================================================== */
    function initCart() {
        const cartBody = document.getElementById("cartBody");
        const cartTotal = document.getElementById("cartTotal");
        const clearCartBtn = document.getElementById("clearCart");
        const checkoutBtn = document.getElementById("checkoutBtn");

        const render = () => {
            const cart = getCart();
            cartBody.innerHTML = "";
            if (!cart.length) {
                cartBody.innerHTML = `<tr><td colspan="5" class="muted" style="text-align:center;padding:40px"><i class="fas fa-shopping-cart" style="font-size:48px;display:block;margin-bottom:12px;color:var(--border)"></i>Your cart is empty.<br><a href="restaurants.html" style="color:var(--accent);font-weight:700">Browse restaurants</a></td></tr>`;
                cartTotal.textContent = fmt(0);
                if (checkoutBtn) checkoutBtn.style.opacity = "0.5";
                return;
            }
            if (checkoutBtn) checkoutBtn.style.opacity = "1";
            let total = 0;
            cart.forEach((item, i) => {
                total += item.price * item.qty;
                const row = document.createElement("tr");
                row.innerHTML = `
          <td><strong>${item.name}</strong></td>
          <td class="muted">${item.restaurantName}</td>
          <td>
            <div class="qty-controls">
              <button data-qty-minus="${i}"><i class="fas fa-minus"></i></button>
              <span>${item.qty}</span>
              <button data-qty-plus="${i}"><i class="fas fa-plus"></i></button>
            </div>
          </td>
          <td><strong>${fmt(item.price * item.qty)}</strong></td>
          <td><button class="btn btn--sm btn--ghost" data-remove="${i}"><i class="fas fa-trash"></i></button></td>
        `;
                row.querySelector(`[data-qty-minus="${i}"]`).addEventListener("click", () => { changeQty(i, -1); render(); });
                row.querySelector(`[data-qty-plus="${i}"]`).addEventListener("click", () => { changeQty(i, 1); render(); });
                row.querySelector(`[data-remove="${i}"]`).addEventListener("click", () => { removeFromCart(i); render(); });
                cartBody.appendChild(row);
            });
            cartTotal.textContent = fmt(total);
        };

        clearCartBtn.addEventListener("click", () => {
            localStorage.removeItem("zomatoCart");
            updateCartCount();
            render();
            showToast("Cart cleared");
        });

        render();
    }

    /* ==========================================================================
       OFFERS PAGE
       ========================================================================== */
    function initOffers() {
        const featuredDeals = document.getElementById("featuredDeals");
        const allDeals = document.getElementById("allDeals");
        const offerChips = document.getElementById("offerCuisineChips");

        // Featured — top offers
        const topOffers = [...dataset].sort((a, b) => b.offers - a.offers).filter((r) => r.offers >= 15).slice(0, 6);
        featuredDeals.innerHTML = topOffers
            .map(
                (r) => `
      <div class="offer-card fade-up" onclick="window.location.href='restaurant.html?id=${r.id}'">
        <div class="offer-card__ribbon"><i class="fas fa-fire"></i> ${r.offers}% OFF</div>
        <div class="offer-card__image" style="background-image:url('${pickImage(r)}')"></div>
        <div class="offer-card__body">
          <h3>${r.name}</h3>
          <p class="muted"><i class="fas fa-utensils"></i> ${r.food_type} · <i class="fas fa-map-marker-alt"></i> ${r.location}</p>
          <div class="badge-row" style="margin-top:8px">
            <span class="badge badge--green">${fmt(r.price_for_two)} for two</span>
            <span class="rating"><i class="fas fa-star"></i> ${r.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
    `
            )
            .join("");

        // Cuisine chips
        const cuisines = [...new Set(dataset.map((r) => r.food_type))];
        offerChips.innerHTML = `<span class="chip active" data-cuisine="">All</span>` +
            cuisines.map((c) => `<span class="chip" data-cuisine="${c}">${c}</span>`).join("");

        let activeCuisine = "";
        const refreshDeals = () => {
            const items = dataset
                .filter((r) => r.offers > 0 && (activeCuisine === "" || r.food_type === activeCuisine))
                .sort((a, b) => b.offers - a.offers)
                .slice(0, 30);
            renderCards(items, allDeals);
        };

        offerChips.addEventListener("click", (e) => {
            const chip = e.target.closest(".chip");
            if (!chip) return;
            offerChips.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
            chip.classList.add("active");
            activeCuisine = chip.dataset.cuisine;
            refreshDeals();
        });

        refreshDeals();
    }

    /* ==========================================================================
       ABOUT PAGE
       ========================================================================== */
    function initAbout() {
        const totalR = document.getElementById("aboutTotalRestaurants");
        const totalL = document.getElementById("aboutTotalLocations");
        const totalC = document.getElementById("aboutTotalCuisines");
        const topR = document.getElementById("aboutTopRated");

        animateNumber(totalR, dataset.length);
        animateNumber(totalL, new Set(dataset.map((r) => r.location)).size);
        animateNumber(totalC, new Set(dataset.map((r) => r.food_type)).size);
        animateNumber(topR, dataset.filter((r) => r.rating >= 4.0).length);

        // FAQ accordion
        const faqList = document.getElementById("faqList");
        if (faqList) {
            faqList.querySelectorAll(".faq-item").forEach((item) => {
                const btn = item.querySelector(".faq-question");
                btn.addEventListener("click", () => {
                    const wasOpen = item.classList.contains("open");
                    faqList.querySelectorAll(".faq-item").forEach((fi) => fi.classList.remove("open"));
                    if (!wasOpen) item.classList.add("open");
                });
            });
        }
    }

    /* ==========================================================================
       LOGIN PAGE
       ========================================================================== */
    function initLogin() {
        const loginForm = document.getElementById("loginForm");
        const signupForm = document.getElementById("signupForm");
        const showSignup = document.getElementById("showSignup");
        const showLogin = document.getElementById("showLogin");
        const loginFormEl = document.getElementById("loginFormEl");
        const signupFormEl = document.getElementById("signupFormEl");
        const googleBtn = document.getElementById("googleBtn");
        const facebookBtn = document.getElementById("facebookBtn");

        showSignup?.addEventListener("click", (e) => {
            e.preventDefault();
            loginForm.classList.add("hidden");
            signupForm.classList.remove("hidden");
        });

        showLogin?.addEventListener("click", (e) => {
            e.preventDefault();
            signupForm.classList.add("hidden");
            loginForm.classList.remove("hidden");
        });

        loginFormEl?.addEventListener("submit", (e) => {
            e.preventDefault();
            const email = document.getElementById("loginEmail").value;
            if (email) {
                showToast(`Welcome back, ${email.split("@")[0]}!`, "success");
                setTimeout(() => (window.location.href = "index.html"), 1500);
            }
        });

        signupFormEl?.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("signupName").value;
            const pass = document.getElementById("signupPassword");
            const confirm = document.getElementById("signupConfirm");
            if (pass && confirm && pass.value !== confirm.value) {
                showToast("Passwords don't match!", "error");
                return;
            }
            if (name) {
                showToast(`Account created! Welcome, ${name}!`, "success");
                setTimeout(() => (window.location.href = "index.html"), 1500);
            }
        });

        googleBtn?.addEventListener("click", () => {
            showToast("Signing in with Google...", "success");
            setTimeout(() => (window.location.href = "index.html"), 1500);
        });

        facebookBtn?.addEventListener("click", () => {
            showToast("Signing in with Facebook...", "success");
            setTimeout(() => (window.location.href = "index.html"), 1500);
        });
    }

    /* ==========================================================================
       CHECKOUT PAGE
       ========================================================================== */
    function initCheckout() {
        const form = document.getElementById("checkoutForm");
        const checkoutItems = document.getElementById("checkoutItems");
        const coSubtotal = document.getElementById("coSubtotal");
        const coTax = document.getElementById("coTax");
        const coTotal = document.getElementById("coTotal");
        const successModal = document.getElementById("successModal");
        const successClose = document.getElementById("successClose");

        const cart = getCart();
        if (checkoutItems) {
            if (!cart.length) {
                checkoutItems.innerHTML = '<p class="muted" style="text-align:center;padding:20px">No items in cart. <a href="restaurants.html" style="color:var(--accent);font-weight:700">Add some!</a></p>';
            } else {
                checkoutItems.innerHTML = cart
                    .map(
                        (item) => `
          <div class="checkout-item">
            <span>${item.name} × ${item.qty}</span>
            <strong>${fmt(item.price * item.qty)}</strong>
          </div>
        `
                    )
                    .join("");
            }
        }

        const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
        const tax = Math.round(subtotal * 0.05);
        const delivery = subtotal > 0 ? 49 : 0;
        const total = subtotal + tax + delivery;

        if (coSubtotal) coSubtotal.textContent = fmt(subtotal);
        if (coTax) coTax.textContent = fmt(tax);
        if (coTotal) coTotal.textContent = fmt(total);

        form?.addEventListener("submit", (e) => {
            e.preventDefault();
            if (!cart.length) {
                showToast("Your cart is empty!", "error");
                return;
            }
            // Show success modal
            if (successModal) {
                successModal.classList.remove("hidden");
                localStorage.removeItem("zomatoCart");
                updateCartCount();
            }
        });

        successClose?.addEventListener("click", () => {
            window.location.href = "index.html";
        });

        // Close modal on overlay click
        successModal?.addEventListener("click", (e) => {
            if (e.target === successModal) window.location.href = "index.html";
        });
    }

    /* ---------- Animate number ---------- */
    function animateNumber(el, target) {
        if (!el) return;
        const duration = 1200;
        const start = performance.now();
        const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(eased * target);
            if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }
})();
