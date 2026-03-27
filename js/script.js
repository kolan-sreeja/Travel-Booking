/* Holiday Package Booking System UI (frontend only, dynamic mock data) */

function $(selector, root = document) {
  return root.querySelector(selector);
}

function $all(selector, root = document) {
  return Array.from(root.querySelectorAll(selector));
}

function formatINR(value) {
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(value);
  } catch {
    return `₹${String(value)}`;
  }
}

function clampInt(value, min, max, fallback) {
  const n = Number.parseInt(String(value), 10);
  if (Number.isNaN(n)) return fallback;
  return Math.max(min, Math.min(max, n));
}

function plural(n, one, many = one + "s") {
  return n === 1 ? one : many;
}

function formatPax(adults, children) {
  const a = `${adults} ${plural(adults, "Adult")}`;
  const c = `${children} ${plural(children, "Child", "Children")}`;
  return children > 0 ? `${a}, ${c}` : a;
}

function formatDateShort(dateStr) {
  if (!dateStr) return "—";
  const d = new Date(dateStr + "T00:00:00");
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "2-digit" });
}

function toDisplayName(raw) {
  if (!raw) return "Guest User";
  const cleaned = String(raw)
    .trim()
    .replace(/[@._-]+/g, " ")
    .replace(/\s+/g, " ");
  if (!cleaned) return "Guest User";
  return cleaned
    .split(" ")
    .filter(Boolean)
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase())
    .join(" ");
}

function initSidebar() {
  const openBtn = $("[data-sidebar-open]");
  const closeBtns = $all("[data-sidebar-close]");

  const setOpen = (open) => {
    document.body.classList.toggle("is-sidebar-open", open);
  };

  openBtn?.addEventListener("click", () => setOpen(true));
  closeBtns.forEach((btn) => btn.addEventListener("click", () => setOpen(false)));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });
}

// -----------------------------
// Mock JSON Data (MANDATORY)
// -----------------------------
const DATA = {
  cities: {
    indian: [
      { id: "hyd", name: "Hyderabad", code: "HYD" },
      { id: "goa", name: "Goa", code: "GOI" },
      { id: "del", name: "Delhi", code: "DEL" },
      { id: "mum", name: "Mumbai", code: "BOM" }
    ],
    international: [
      { id: "dxb", name: "Dubai", code: "DXB" },
      { id: "sin", name: "Singapore", code: "SIN" },
      { id: "lon", name: "London", code: "LHR" },
      { id: "bkk", name: "Bangkok", code: "BKK" }
    ]
  },
  flights: [
    // Indian
    { id: "ai_hyd_goa_1", tripType: "indian", from: "hyd", to: "goa", airline: "Air India", code: "AI 2691", logoText: "AI", depTime: "11:30", arrTime: "12:55", duration: "1h 25m", baseAdultPrice: 13300, refundable: true, baggage: "15kg • 7kg", stops: 0 },
    { id: "6e_hyd_goa_1", tripType: "indian", from: "hyd", to: "goa", airline: "IndiGo", code: "6E 147", logoText: "6E", depTime: "20:50", arrTime: "22:20", duration: "1h 30m", baseAdultPrice: 14900, refundable: false, baggage: "15kg • 7kg", stops: 0 },
    { id: "ix_hyd_goa_1", tripType: "indian", from: "hyd", to: "goa", airline: "Air India Express", code: "IX 221", logoText: "IX", depTime: "12:05", arrTime: "13:30", duration: "1h 25m", baseAdultPrice: 13900, refundable: true, baggage: "15kg • 7kg", stops: 0 },
    { id: "s5_hyd_goa_1", tripType: "indian", from: "hyd", to: "goa", airline: "Star Air", code: "S5 221", logoText: "S5", depTime: "09:50", arrTime: "17:55", duration: "8h 05m", baseAdultPrice: 12500, refundable: true, baggage: "15kg • 7kg", stops: 1 },
    { id: "6e_del_mum_1", tripType: "indian", from: "del", to: "mum", airline: "IndiGo", code: "6E 312", logoText: "6E", depTime: "10:10", arrTime: "12:20", duration: "2h 10m", baseAdultPrice: 9200, refundable: true, baggage: "15kg • 7kg", stops: 0 },
    { id: "ai_del_mum_1", tripType: "indian", from: "del", to: "mum", airline: "Air India", code: "AI 865", logoText: "AI", depTime: "18:35", arrTime: "20:45", duration: "2h 10m", baseAdultPrice: 9800, refundable: false, baggage: "15kg • 7kg", stops: 0 },
    { id: "ix_mum_del_1", tripType: "indian", from: "mum", to: "del", airline: "Air India Express", code: "IX 772", logoText: "IX", depTime: "06:40", arrTime: "08:50", duration: "2h 10m", baseAdultPrice: 8900, refundable: true, baggage: "15kg • 7kg", stops: 0 },
    { id: "ai_goa_hyd_1", tripType: "indian", from: "goa", to: "hyd", airline: "Air India", code: "AI 2692", logoText: "AI", depTime: "00:50", arrTime: "01:55", duration: "1h 05m", baseAdultPrice: 13300, refundable: true, baggage: "15kg • 7kg", stops: 0 },
    { id: "6e_goa_hyd_1", tripType: "indian", from: "goa", to: "hyd", airline: "IndiGo", code: "6E 148", logoText: "6E", depTime: "16:10", arrTime: "17:40", duration: "1h 30m", baseAdultPrice: 15200, refundable: false, baggage: "15kg • 7kg", stops: 0 },
    { id: "s5_goa_hyd_1", tripType: "indian", from: "goa", to: "hyd", airline: "Star Air", code: "S5 222", logoText: "S5", depTime: "13:10", arrTime: "19:40", duration: "6h 30m", baseAdultPrice: 12700, refundable: true, baggage: "15kg • 7kg", stops: 1 },

    // International
    { id: "ek_dxb_sin_1", tripType: "international", from: "dxb", to: "sin", airline: "Emirates", code: "EK 354", logoText: "EK", depTime: "09:10", arrTime: "20:55", duration: "7h 45m", baseAdultPrice: 25500, refundable: true, baggage: "25kg • 7kg", stops: 0 },
    { id: "sq_dxb_sin_1", tripType: "international", from: "dxb", to: "sin", airline: "Singapore Airlines", code: "SQ 495", logoText: "SQ", depTime: "23:45", arrTime: "11:15", duration: "7h 30m", baseAdultPrice: 27200, refundable: true, baggage: "25kg • 7kg", stops: 0 },
    { id: "tk_dxb_lon_1", tripType: "international", from: "dxb", to: "lon", airline: "Turkish Airlines", code: "TK 763", logoText: "TK", depTime: "03:10", arrTime: "12:35", duration: "12h 25m", baseAdultPrice: 38900, refundable: true, baggage: "30kg • 7kg", stops: 1 },
    { id: "ba_lon_dxb_1", tripType: "international", from: "lon", to: "dxb", airline: "British Airways", code: "BA 107", logoText: "BA", depTime: "14:10", arrTime: "00:45", duration: "7h 35m", baseAdultPrice: 41000, refundable: false, baggage: "25kg • 7kg", stops: 0 },
    { id: "tg_sin_bkk_1", tripType: "international", from: "sin", to: "bkk", airline: "Thai Airways", code: "TG 402", logoText: "TG", depTime: "08:15", arrTime: "09:45", duration: "2h 30m", baseAdultPrice: 17500, refundable: true, baggage: "25kg • 7kg", stops: 0 },
    { id: "ek_bkk_sin_1", tripType: "international", from: "bkk", to: "sin", airline: "Emirates", code: "EK 377", logoText: "EK", depTime: "18:20", arrTime: "21:45", duration: "2h 25m", baseAdultPrice: 16800, refundable: true, baggage: "25kg • 7kg", stops: 0 }
  ],
  pricingRules: {
    childRatio: 0.7,
    hotelMultiplier: { 3: 1, 4: 1.3, 5: 1.6 },
    addons: { lunch: 500, dinner: 700 }
  }
};

// -----------------------------
// Admin SPA State (CRM/modules)
// -----------------------------
const appState = {
  currentPage: "dashboard",
  leads: [],
  bookings: [],
  vouchers: [],
  reviews: [],
  itineraries: [],
  supportTickets: []
};

function uid(prefix = "ID") {
  return `${prefix}${Math.floor(100000 + Math.random() * 900000)}`;
}

function formatMoney(n) {
  return formatINR(Math.round(Number(n) || 0));
}

// -----------------------------
// Dynamic dashboard logic
// -----------------------------
const state = {
  tripType: "indian", // "indian" | "international"
  packageType: "withFlights", // "withFlights" | "withoutFlights"
  from: "hyd",
  to: "goa",
  startDate: "",
  adults: 2,
  children: 2,
  hotel: 3,
  lunch: false,
  dinner: false,
  selectedOutbound: null,
  selectedReturn: null,
  isLoading: false,
  selectedFlight: null,
  bookingConfirmed: false,
  bookingId: null,
  payMethod: "card",
  isPaying: false
};

function getCitiesForTripType(tripType) {
  return tripType === "international" ? DATA.cities.international : DATA.cities.indian;
}

function getCityById(tripType, id) {
  return getCitiesForTripType(tripType).find((c) => c.id === id) ?? null;
}

function getFlights(tripType, from, to) {
  return DATA.flights.filter((f) => f.tripType === tripType && f.from === from && f.to === to);
}

function calcLegTotal(baseAdultPrice, adults, children) {
  const childPrice = baseAdultPrice * DATA.pricingRules.childRatio;
  return adults * baseAdultPrice + children * childPrice;
}

function calcTotalPrice({ outbound, ret }) {
  const adults = state.adults;
  const children = state.children;
  const paxCount = adults + children;
  const hotelMult = DATA.pricingRules.hotelMultiplier[state.hotel] ?? 1;
  const addonsPerPerson = (state.lunch ? DATA.pricingRules.addons.lunch : 0) + (state.dinner ? DATA.pricingRules.addons.dinner : 0);
  const addonsTotal = paxCount * addonsPerPerson;

  const outboundBase = outbound ? calcLegTotal(outbound.baseAdultPrice, adults, children) : 0;
  const returnBase = ret ? calcLegTotal(ret.baseAdultPrice, adults, children) : 0;

  const total = (outboundBase + returnBase) * hotelMult + addonsTotal;
  return Math.round(total);
}

function setActiveButton(groupEl, predicate) {
  const btns = $all("button", groupEl);
  btns.forEach((b) => b.classList.toggle("is-active", predicate(b)));
}

function renderSelectOptions(selectEl, cities, selectedId) {
  if (!selectEl) return;
  selectEl.innerHTML = cities
    .map((c) => `<option value="${c.id}" ${c.id === selectedId ? "selected" : ""}>${c.name} (${c.code})</option>`)
    .join("");
}

function ensureFromToDifferent() {
  if (state.from !== state.to) return;
  const cities = getCitiesForTripType(state.tripType);
  const alternative = cities.find((c) => c.id !== state.from);
  if (alternative) state.to = alternative.id;
}

function flightCardTemplate(f, { selected = false, isBest = false } = {}) {
  const chipStops = `<span class="chip">${f.stops === 0 ? "Non‑stop" : `${f.stops} ${plural(f.stops, "stop")}`}</span>`;
  const chipRefund = f.refundable ? `<span class="chip chip--good">Refundable</span>` : `<span class="chip">Non‑refundable</span>`;
  const chipBag = `<span class="chip chip--warn">${f.baggage}</span>`;
  const chipDeal = isBest ? `<span class="chip chip--good">Best deal</span>` : "";

  const el = document.createElement("article");
  el.className = `flight-card${selected ? " is-selected" : ""}${isBest ? " is-best" : ""}`;
  el.tabIndex = 0;
  el.setAttribute("role", "button");
  el.setAttribute("aria-label", `${f.airline} flight option`);
  el.dataset.flightId = f.id;

  el.innerHTML = `
    <div class="flight-card__top">
      <div class="airline">
        <div class="airline__logo" aria-hidden="true">${f.logoText}</div>
        <div class="airline__meta">
          <p class="airline__name">${f.airline}</p>
          <p class="airline__code">${f.code} • ${f.duration}</p>
        </div>
      </div>
      <div class="price">
        <p class="price__label">Base / Adult</p>
        <p class="price__value">${formatINR(f.baseAdultPrice)}</p>
      </div>
    </div>

    <div class="flight-card__grid">
      <div class="time">
        <div class="time__main">${f.depTime}</div>
        <div class="time__sub">${f.fromCode}</div>
      </div>
      <div class="route">
        <div class="route__line" aria-hidden="true"></div>
        <div class="route__meta">${f.duration}</div>
      </div>
      <div class="time time--right">
        <div class="time__main">${f.arrTime}</div>
        <div class="time__sub">${f.toCode}</div>
      </div>
    </div>

    <div class="chips">
      ${chipDeal}
      ${chipStops}
      ${chipRefund}
      ${chipBag}
    </div>
  `;

  return el;
}

function renderLoading(container) {
  container.innerHTML = "";
  for (let i = 0; i < 4; i += 1) {
    const sk = document.createElement("div");
    sk.className = "flight-card flight-card__loading";
    sk.innerHTML = `<div style="height:92px"></div>`;
    container.appendChild(sk);
  }
}

function renderEmpty(container) {
  container.innerHTML = `<div class="flight-empty">No flights available for this route.</div>`;
}

function initDashboard() {
  const fromEl = /** @type {HTMLSelectElement|null} */ ($("#fromCity"));
  const toEl = /** @type {HTMLSelectElement|null} */ ($("#toCity"));
  const dateEl = /** @type {HTMLInputElement|null} */ ($("#startDate"));
  const adultsEl = /** @type {HTMLSelectElement|null} */ ($("#adults"));
  const childrenEl = /** @type {HTMLSelectElement|null} */ ($("#children"));
  const lunchEl = /** @type {HTMLInputElement|null} */ ($("#addLunch"));
  const dinnerEl = /** @type {HTMLInputElement|null} */ ($("#addDinner"));
  const outboundList = $("#outboundList");
  const returnList = $("#returnList");
  const outboundMeta = $("#outboundMeta");
  const returnMeta = $("#returnMeta");
  const summaryOutbound = $("#summaryOutbound");
  const summaryReturn = $("#summaryReturn");
  const summaryPax = $("#summaryPax");
  const summaryPrice = $(".summary__value--price");
  const notice = $("#flightsNotice");
  const bookingModal = $("#bookingModal");
  const paymentModal = $("#paymentModal");
  const successModal = $("#successModal");
  const bookingBody = $("#bookingBody");
  const successBody = $("#successBody");
  const proceedToPaymentBtn = $("#proceedToPaymentBtn");
  const payNowBtn = $("#payNowBtn");
  const payAmount = $("#payAmount");
  const toastStack = $("#toastStack");
  const appModal = $("#appModal");
  const appModalTitle = $("#appModalTitle");
  const appModalBody = $("#appModalBody");
  const appModalFooter = $("#appModalFooter");

  const overviewCards = $("#overviewCards");
  const recentBookings = $("#recentBookings");
  const dashboardChart = /** @type {HTMLCanvasElement|null} */ ($("#dashboardChart"));
  const profileNameEl = $(".profile__name");
  const avatarEl = $(".avatar");

  if (!fromEl || !toEl || !outboundList || !returnList || !outboundMeta || !returnMeta || !summaryOutbound || !summaryReturn || !summaryPax || !summaryPrice) {
    return;
  }

  const setProfileFromLogin = () => {
    const raw = localStorage.getItem("travel_user_name") || localStorage.getItem("travel_user_email") || "Guest User";
    const display = toDisplayName(raw.includes("@") ? raw.split("@")[0] : raw);
    if (profileNameEl) profileNameEl.textContent = display;
    if (avatarEl) {
      const initials = display
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((s) => s[0]?.toUpperCase() || "")
        .join("");
      avatarEl.textContent = initials || "GU";
    }
  };

  /** @type {Array<any> | null} */
  let outFlightsCache = null;
  /** @type {Array<any> | null} */
  let retFlightsCache = null;

  const openModal = (el) => {
    if (!el) return;
    el.classList.add("is-open");
    el.setAttribute("aria-hidden", "false");
    const focusable = el.querySelector("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])");
    if (focusable && focusable instanceof HTMLElement) focusable.focus();
    document.body.style.overflow = "hidden";
  };

  const closeModal = (el) => {
    if (!el) return;
    el.classList.remove("is-open");
    el.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  const closeAllModals = () => {
    closeModal(bookingModal);
    closeModal(paymentModal);
    closeModal(successModal);
    closeModal(appModal);
  };

  const toast = ({ title, text }) => {
    if (!toastStack) return;
    const el = document.createElement("div");
    el.className = "toast";
    el.innerHTML = `<p class="toast__title">${title}</p><p class="toast__text">${text}</p>`;
    toastStack.appendChild(el);
    window.setTimeout(() => {
      el.style.opacity = "0";
      el.style.transform = "translateY(-4px)";
      el.style.transition = "opacity .25s ease, transform .25s ease";
      window.setTimeout(() => el.remove(), 260);
    }, 2600);
  };

  // modal close handlers (delegated)
  document.addEventListener("click", (e) => {
    const target = /** @type {HTMLElement|null} */ (e.target instanceof HTMLElement ? e.target : null);
    if (!target) return;
    if (target.matches("[data-modal-close]") || target.matches("[data-appmodal-close]")) {
      closeAllModals();
    }
    if (target.closest("[data-modal-close]") || target.closest("[data-appmodal-close]")) {
      const btn = target.closest("[data-modal-close]") || target.closest("[data-appmodal-close]");
      if (btn) closeAllModals();
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAllModals();
  });

  const applyLoading = () => {
    state.isLoading = true;
    render();
    window.setTimeout(() => {
      state.isLoading = false;
      render();
    }, 420);
  };

  const openAppModal = ({ title, bodyHtml, footerHtml }) => {
    if (!appModal || !appModalTitle || !appModalBody || !appModalFooter) return;
    appModalTitle.textContent = title;
    appModalBody.innerHTML = bodyHtml;
    appModalFooter.innerHTML = footerHtml;
    openModal(appModal);
  };

  // -----------------------------
  // SPA Navigation
  // -----------------------------
  const setPage = (page) => {
    appState.currentPage = page;
    // toggle views
    $all("[data-pageview]").forEach((el) => {
      const isActive = el.getAttribute("data-pageview") === page;
      el.classList.toggle("is-active", isActive);
      el.toggleAttribute("hidden", !isActive);
    });
    // nav active state
    $all(".sidebar__nav .nav-item").forEach((a) => {
      const isActive = a.getAttribute("data-page") === page;
      a.classList.toggle("is-active", isActive);
      if (isActive) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
    // update topbar heading
    const heading = $(".topbar__heading");
    if (heading) {
      const map = {
        dashboard: "Dashboard",
        leads: "Leads",
        itineraries: "Itineraries",
        reviews: "Reviews",
        vouchers: "Vouchers",
        accounts: "Accounts",
        reports: "Reports",
        support: "Customer Support"
      };
      heading.textContent = map[page] ?? "Dashboard";
    }
    renderModules();
  };

  const initNav = () => {
    $all(".sidebar__nav .nav-item").forEach((a) => {
      if (a.matches("button")) return;
      a.addEventListener("click", (e) => {
        e.preventDefault();
        const page = a.getAttribute("data-page") || "dashboard";
        setPage(page);
        document.body.classList.remove("is-sidebar-open");
        history.replaceState(null, "", `#${page}`);
      });
    });

    const initial = (location.hash || "#dashboard").replace("#", "");
    const allowed = ["dashboard", "leads", "itineraries", "reviews", "vouchers", "accounts", "reports", "support"];
    setPage(allowed.includes(initial) ? initial : "dashboard");
  };


  // -----------------------------
  // Dashboard module rendering
  // -----------------------------
  const renderDashboardCards = () => {
    if (!overviewCards) return;

    const totalLeads = appState.leads.length;
    const bookingsToday = appState.bookings.filter((b) => {
      const d = new Date(b.createdAt);
      const now = new Date();
      return d.toDateString() === now.toDateString();
    }).length;
    const revenue = appState.bookings.reduce((sum, b) => sum + (b.amount || 0), 0);
    const pendingPayments = Math.max(0, appState.leads.filter((l) => l.status === "Contacted").length - bookingsToday);

    overviewCards.innerHTML = `
      <div class="stat">
        <p class="stat__k">Total Leads</p>
        <p class="stat__v">${totalLeads}</p>
        <p class="stat__sub">Mock CRM pipeline</p>
      </div>
      <div class="stat">
        <p class="stat__k">Bookings Today</p>
        <p class="stat__v">${bookingsToday}</p>
        <p class="stat__sub">Successful payments</p>
      </div>
      <div class="stat">
        <p class="stat__k">Revenue</p>
        <p class="stat__v">${formatMoney(revenue)}</p>
        <p class="stat__sub">Total paid amount</p>
      </div>
      <div class="stat">
        <p class="stat__k">Pending Payments</p>
        <p class="stat__v">${pendingPayments}</p>
        <p class="stat__sub">Estimated (mock)</p>
      </div>
    `;
  };

  const renderRecentBookings = () => {
    if (!recentBookings) return;
    if (!appState.bookings.length) {
      recentBookings.innerHTML = `<div class="flight-empty">No bookings yet. Complete a payment to see bookings here.</div>`;
      return;
    }
    const items = appState.bookings
      .slice()
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 6)
      .map((b) => {
        return `
          <div class="kv">
            <p class="kv__k">${b.id}</p>
            <p class="kv__v">${b.route} • ${b.airline}<br/><span style="color:var(--muted);font-weight:800">${new Date(b.createdAt).toLocaleString()}</span></p>
            <p class="kv__v kv__v--price" style="margin-top:8px">${formatMoney(b.amount)}</p>
          </div>
        `;
      })
      .join("");
    recentBookings.innerHTML = `<div class="summary-grid">${items}</div>`;
  };

  const drawBarChart = (canvas, values, { bar = "#0D6EFD", grid = "rgba(230,232,238,.9)" } = {}) => {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, w, h);

    // grid lines
    ctx.strokeStyle = grid;
    ctx.lineWidth = 1;
    for (let i = 1; i <= 4; i += 1) {
      const y = Math.round((h * i) / 5);
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    const max = Math.max(...values, 1);
    const pad = 22;
    const innerW = w - pad * 2;
    const innerH = h - pad * 2;
    const bw = innerW / values.length;

    values.forEach((v, i) => {
      const bh = Math.round((v / max) * innerH);
      const x = pad + i * bw + bw * 0.18;
      const y = h - pad - bh;
      const width = bw * 0.64;
      ctx.fillStyle = bar;
      ctx.globalAlpha = 0.9;
      ctx.fillRect(x, y, width, bh);
      ctx.globalAlpha = 1;
    });
  };

  const renderDashboardChart = () => {
    if (!dashboardChart) return;
    const vals = [3, 4, 2, 6, 5, 7, 4]; // mock 7-day bookings
    drawBarChart(dashboardChart, vals, { bar: "rgba(43,187,173,.95)" });
  };

  // -----------------------------
  // Leads (placeholder - next)
  // -----------------------------
  const renderLeadsPage = () => {
    const root = $("#page-leads");
    if (!root) return;
    root.innerHTML = `
      <div class="card card--flush">
        <div class="toolbar">
          <div class="toolbar__left">
            <input class="input" id="leadSearch" placeholder="Search name or email..." />
            <select class="select" id="leadStatusFilter">
              <option value="all">All statuses</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Converted">Converted</option>
              <option value="Lost">Lost</option>
            </select>
            <select class="select" id="leadSort">
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
            </select>
          </div>
          <div class="toolbar__right">
            <div class="tag">Total: <span id="leadCount" style="margin-left:6px">${appState.leads.length}</span></div>
            <button class="btn btn--accent" type="button" id="addLeadBtn">Add Lead</button>
          </div>
        </div>

        <div class="table-wrap">
          <table aria-label="Leads table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Destination</th>
                <th>Budget</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="leadsTbody"></tbody>
          </table>
        </div>
      </div>
    `;
  };

  // -----------------------------
  // Leads CRM (full)
  // -----------------------------
  const ensureLeadSeed = () => {
    if (appState.leads.length) return;
    appState.leads = [
      { id: uid("LD"), name: "Ananya Rao", phone: "9876543210", email: "ananya.rao@mail.com", destination: "Goa", budget: 55000, status: "New", createdAt: new Date(Date.now() - 2 * 86400000).toISOString() },
      { id: uid("LD"), name: "Rahul Mehta", phone: "9123456780", email: "rahul.mehta@mail.com", destination: "Dubai", budget: 140000, status: "Contacted", createdAt: new Date(Date.now() - 5 * 86400000).toISOString() },
      { id: uid("LD"), name: "Sneha Iyer", phone: "9988776655", email: "sneha.iyer@mail.com", destination: "Singapore", budget: 180000, status: "Converted", createdAt: new Date(Date.now() - 9 * 86400000).toISOString() },
      { id: uid("LD"), name: "Vikram Singh", phone: "9012345678", email: "vikram.singh@mail.com", destination: "London", budget: 260000, status: "Lost", createdAt: new Date(Date.now() - 12 * 86400000).toISOString() }
    ];
  };

  const statusTagClass = (status) => {
    if (status === "Converted") return "tag tag--converted";
    if (status === "Contacted") return "tag tag--contacted";
    if (status === "Lost") return "tag tag--lost";
    return "tag tag--new";
  };

  const leadRowHtml = (l) => {
    const converted = l.status === "Converted" ? "row--converted" : "";
    return `
      <tr class="${converted}" data-lead-id="${l.id}">
        <td>
          <div style="font-weight:950">${l.name}</div>
          <div style="color:var(--muted);font-weight:800;font-size:12.5px">${l.email}</div>
        </td>
        <td>${l.destination}</td>
        <td>${formatMoney(l.budget)}</td>
        <td>
          <select class="select" data-lead-status>
            ${["New","Contacted","Converted","Lost"].map((s)=>`<option value="${s}" ${s===l.status?"selected":""}>${s}</option>`).join("")}
          </select>
          <span class="${statusTagClass(l.status)}" style="margin-left:8px">${l.status}</span>
        </td>
        <td>
          <div class="actions">
            <button class="btn btn--sm" type="button" data-lead-edit>Edit</button>
            <button class="btn btn--sm" type="button" data-lead-delete>Delete</button>
          </div>
          <div style="color:var(--muted);font-weight:800;font-size:12px;margin-top:8px">Created: ${new Date(l.createdAt).toLocaleDateString()}</div>
        </td>
      </tr>
    `;
  };

  const getLeadsViewState = () => {
    const q = /** @type {HTMLInputElement|null} */ ($("#leadSearch"))?.value?.trim().toLowerCase() ?? "";
    const status = /** @type {HTMLSelectElement|null} */ ($("#leadStatusFilter"))?.value ?? "all";
    const sort = /** @type {HTMLSelectElement|null} */ ($("#leadSort"))?.value ?? "newest";
    return { q, status, sort };
  };

  const renderLeadsTable = () => {
    const tbody = $("#leadsTbody");
    const count = $("#leadCount");
    if (!tbody) return;

    const { q, status, sort } = getLeadsViewState();

    let rows = appState.leads.slice();
    if (q) {
      rows = rows.filter((l) => l.name.toLowerCase().includes(q) || l.email.toLowerCase().includes(q));
    }
    if (status !== "all") {
      rows = rows.filter((l) => l.status === status);
    }
    rows.sort((a, b) => {
      const da = new Date(a.createdAt).getTime();
      const db = new Date(b.createdAt).getTime();
      return sort === "oldest" ? da - db : db - da;
    });

    if (count) count.textContent = String(appState.leads.length);
    tbody.innerHTML = rows.length ? rows.map(leadRowHtml).join("") : `<tr><td colspan="5" style="padding:18px;color:var(--muted);font-weight:900">No leads found.</td></tr>`;
  };

  const openLeadForm = (mode, leadId = null) => {
    const existing = leadId ? appState.leads.find((l) => l.id === leadId) : null;
    const title = mode === "edit" ? "Edit Lead" : "Add Lead";
    const bodyHtml = `
      <form class="form" id="leadForm">
        <div class="form__field">
          <label class="form__label" for="lfName">Name</label>
          <input class="form__input" id="lfName" value="${existing?.name ?? ""}" required />
        </div>
        <div class="form__row">
          <div class="form__field" style="flex:1">
            <label class="form__label" for="lfPhone">Phone</label>
            <input class="form__input" id="lfPhone" value="${existing?.phone ?? ""}" required />
          </div>
          <div class="form__field" style="flex:1">
            <label class="form__label" for="lfBudget">Budget (INR)</label>
            <input class="form__input" id="lfBudget" inputmode="numeric" value="${existing?.budget ?? ""}" required />
          </div>
        </div>
        <div class="form__field">
          <label class="form__label" for="lfEmail">Email</label>
          <input class="form__input" id="lfEmail" type="email" value="${existing?.email ?? ""}" required />
        </div>
        <div class="form__field">
          <label class="form__label" for="lfDestination">Destination</label>
          <input class="form__input" id="lfDestination" value="${existing?.destination ?? ""}" required />
        </div>
      </form>
    `;
    const footerHtml = `
      <button class="btn" type="button" data-appmodal-close>Cancel</button>
      <button class="btn btn--accent" type="button" id="saveLeadBtn">${mode === "edit" ? "Save Changes" : "Save Lead"}</button>
    `;
    openAppModal({ title, bodyHtml, footerHtml });

    $("#saveLeadBtn")?.addEventListener("click", () => {
      const name = /** @type {HTMLInputElement|null} */ ($("#lfName"))?.value?.trim() ?? "";
      const phone = /** @type {HTMLInputElement|null} */ ($("#lfPhone"))?.value?.trim() ?? "";
      const email = /** @type {HTMLInputElement|null} */ ($("#lfEmail"))?.value?.trim() ?? "";
      const dest = /** @type {HTMLInputElement|null} */ ($("#lfDestination"))?.value?.trim() ?? "";
      const budget = Number(/** @type {HTMLInputElement|null} */ ($("#lfBudget"))?.value ?? 0);

      if (!name || !phone || !email || !dest || !Number.isFinite(budget) || budget <= 0) {
        toast({ title: "Missing fields", text: "Please fill all lead details with a valid budget." });
        return;
      }

      if (mode === "edit" && existing) {
        existing.name = name;
        existing.phone = phone;
        existing.email = email;
        existing.destination = dest;
        existing.budget = budget;
      } else {
        appState.leads.unshift({
          id: uid("LD"),
          name,
          phone,
          email,
          destination: dest,
          budget,
          status: "New",
          createdAt: new Date().toISOString()
        });
      }
      closeAllModals();
      renderLeadsTable();
      renderDashboardCards();
      toast({ title: "Saved", text: "Lead updated successfully." });
    });
  };

  const bindLeads = () => {
    ensureLeadSeed();
    renderLeadsPage();
    renderLeadsTable();
    $("#leadSearch")?.addEventListener("input", () => renderLeadsTable());
    $("#leadStatusFilter")?.addEventListener("change", () => renderLeadsTable());
    $("#leadSort")?.addEventListener("change", () => renderLeadsTable());
    $("#addLeadBtn")?.addEventListener("click", () => openLeadForm("add"));

    // Delegated table actions
    $("#page-leads")?.addEventListener("click", (e) => {
      const t = e.target instanceof HTMLElement ? e.target : null;
      if (!t) return;
      const row = t.closest("tr[data-lead-id]");
      const id = row?.getAttribute("data-lead-id");
      if (!id) return;

      if (t.matches("[data-lead-edit]")) {
        openLeadForm("edit", id);
      }
      if (t.matches("[data-lead-delete]")) {
        const idx = appState.leads.findIndex((l) => l.id === id);
        if (idx >= 0) {
          appState.leads.splice(idx, 1);
          renderLeadsTable();
          renderDashboardCards();
          toast({ title: "Deleted", text: "Lead removed." });
        }
      }
    });

    $("#page-leads")?.addEventListener("change", (e) => {
      const t = e.target instanceof HTMLElement ? e.target : null;
      if (!t) return;
      if (!t.matches("[data-lead-status]")) return;
      const row = t.closest("tr[data-lead-id]");
      const id = row?.getAttribute("data-lead-id");
      const lead = id ? appState.leads.find((l) => l.id === id) : null;
      if (!lead) return;
      const next = /** @type {HTMLSelectElement} */ (t).value;
      lead.status = next;
      renderLeadsTable();
      renderDashboardCards();
    });
  };

  const renderModules = () => {
    if (appState.currentPage === "dashboard") {
      renderDashboardCards();
      renderRecentBookings();
      renderDashboardChart();
    }
    if (appState.currentPage === "leads") {
      bindLeads();
    }
    if (appState.currentPage === "itineraries") renderItineraries();
    if (appState.currentPage === "reviews") renderReviews();
    if (appState.currentPage === "vouchers") renderVouchers();
    if (appState.currentPage === "accounts") renderAccounts();
    if (appState.currentPage === "reports") renderReports();
    if (appState.currentPage === "support") renderSupport();
  };

  // -----------------------------
  // Other modules (mock + basic)
  // -----------------------------
  const ensureOtherSeeds = () => {
    if (!appState.itineraries.length) {
      appState.itineraries = [
        { id: uid("IT"), destination: "Goa", days: 5, price: 74999 },
        { id: uid("IT"), destination: "Dubai", days: 6, price: 159999 },
        { id: uid("IT"), destination: "Singapore", days: 4, price: 139999 }
      ];
    }
    if (!appState.reviews.length) {
      appState.reviews = [
        { id: uid("RV"), name: "Priya", rating: 5, comment: "Smooth booking and great support!" },
        { id: uid("RV"), name: "Karthik", rating: 4, comment: "Good deals, easy to shortlist flights." }
      ];
    }
    if (!appState.vouchers.length) {
      appState.vouchers = [{ id: uid("VC"), code: "GOGAGA10", discount: 10, expiry: new Date(Date.now() + 25 * 86400000).toISOString().slice(0, 10) }];
    }
    if (!appState.supportTickets.length) {
      appState.supportTickets = [
        { id: uid("TK"), customer: "Amit", issue: "Need invoice for booking", status: "Open" },
        { id: uid("TK"), customer: "Divya", issue: "Change travel dates", status: "In Progress" }
      ];
    }
  };

  const renderItineraries = () => {
    ensureOtherSeeds();
    const root = $("#page-itineraries");
    if (!root) return;
    const cards = appState.itineraries
      .map(
        (it) => `
        <div class="kv">
          <p class="kv__k">${it.destination}</p>
          <p class="kv__v">${it.days} days • ${formatMoney(it.price)}</p>
          <div class="actions" style="margin-top:10px">
            <button class="btn btn--sm btn--accent" type="button" data-it-view="${it.id}">View details</button>
          </div>
        </div>
      `
      )
      .join("");
    root.innerHTML = `
      <div class="card card--flush">
        <div class="toolbar">
          <div class="toolbar__left">
            <div class="tag">Saved Itineraries</div>
          </div>
          <div class="toolbar__right">
            <button class="btn btn--accent" type="button" id="createItBtn">Create itinerary</button>
          </div>
        </div>
        <div class="summary-grid">${cards}</div>
      </div>
    `;
    $("#createItBtn")?.addEventListener("click", () => {
      openAppModal({
        title: "Create Itinerary",
        bodyHtml: `
          <form class="form">
            <div class="form__field"><label class="form__label">Destination</label><input class="form__input" id="itDest" placeholder="e.g., Bangkok" /></div>
            <div class="form__row">
              <div class="form__field" style="flex:1"><label class="form__label">Days</label><input class="form__input" id="itDays" inputmode="numeric" placeholder="5" /></div>
              <div class="form__field" style="flex:1"><label class="form__label">Price</label><input class="form__input" id="itPrice" inputmode="numeric" placeholder="99999" /></div>
            </div>
          </form>
        `,
        footerHtml: `<button class="btn" type="button" data-appmodal-close>Cancel</button><button class="btn btn--accent" type="button" id="saveItBtn">Save</button>`
      });
      $("#saveItBtn")?.addEventListener("click", () => {
        const dest = /** @type {HTMLInputElement|null} */ ($("#itDest"))?.value?.trim() ?? "";
        const days = Number(/** @type {HTMLInputElement|null} */ ($("#itDays"))?.value ?? 0);
        const price = Number(/** @type {HTMLInputElement|null} */ ($("#itPrice"))?.value ?? 0);
        if (!dest || !days || !price) return;
        appState.itineraries.unshift({ id: uid("IT"), destination: dest, days, price });
        closeAllModals();
        renderItineraries();
      });
    });
  };

  const renderReviews = () => {
    ensureOtherSeeds();
    const root = $("#page-reviews");
    if (!root) return;
    const stars = (n) => "★★★★★".slice(0, n) + "☆☆☆☆☆".slice(0, 5 - n);
    const list = appState.reviews
      .map(
        (r) => `
      <div class="kv">
        <p class="kv__k">${r.name} • <span style="color:var(--teal)">${stars(r.rating)}</span></p>
        <p class="kv__v">${r.comment}</p>
      </div>
    `
      )
      .join("");
    root.innerHTML = `
      <div class="card card--flush">
        <div class="toolbar">
          <div class="toolbar__left"><div class="tag">Customer Reviews</div></div>
          <div class="toolbar__right"><button class="btn btn--accent" type="button" id="addReviewBtn">Add review</button></div>
        </div>
        <div class="summary-grid">${list}</div>
      </div>
    `;
    $("#addReviewBtn")?.addEventListener("click", () => {
      openAppModal({
        title: "Add Review",
        bodyHtml: `
          <div class="form">
            <div class="form__field"><label class="form__label">Name</label><input class="form__input" id="rvName" /></div>
            <div class="form__field">
              <label class="form__label">Rating</label>
              <select class="select" id="rvRating">${[5,4,3,2,1].map((n)=>`<option value="${n}">${n}</option>`).join("")}</select>
            </div>
            <div class="form__field"><label class="form__label">Comment</label><input class="form__input" id="rvComment" placeholder="Your feedback..." /></div>
          </div>
        `,
        footerHtml: `<button class="btn" type="button" data-appmodal-close>Cancel</button><button class="btn btn--accent" type="button" id="saveReviewBtn">Save</button>`
      });
      $("#saveReviewBtn")?.addEventListener("click", () => {
        const name = /** @type {HTMLInputElement|null} */ ($("#rvName"))?.value?.trim() ?? "";
        const rating = Number(/** @type {HTMLSelectElement|null} */ ($("#rvRating"))?.value ?? 5);
        const comment = /** @type {HTMLInputElement|null} */ ($("#rvComment"))?.value?.trim() ?? "";
        if (!name || !comment) return;
        appState.reviews.unshift({ id: uid("RV"), name, rating, comment });
        closeAllModals();
        renderReviews();
      });
    });
  };

  const renderVouchers = () => {
    ensureOtherSeeds();
    const root = $("#page-vouchers");
    if (!root) return;
    const rows = appState.vouchers
      .map((v) => `<tr><td style="font-weight:950">${v.code}</td><td>${v.discount}%</td><td>${v.expiry}</td></tr>`)
      .join("");
    root.innerHTML = `
      <div class="card card--flush">
        <div class="toolbar">
          <div class="toolbar__left"><div class="tag">Vouchers</div></div>
          <div class="toolbar__right"><button class="btn btn--accent" type="button" id="createVoucherBtn">Create voucher</button></div>
        </div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Code</th><th>Discount</th><th>Expiry</th></tr></thead>
            <tbody>${rows || `<tr><td colspan="3" style="padding:18px;color:var(--muted);font-weight:900">No vouchers yet.</td></tr>`}</tbody>
          </table>
        </div>
      </div>
    `;
    $("#createVoucherBtn")?.addEventListener("click", () => {
      openAppModal({
        title: "Create Voucher",
        bodyHtml: `
          <div class="form">
            <div class="form__field"><label class="form__label">Code</label><input class="form__input" id="vcCode" placeholder="e.g., SAVE15" /></div>
            <div class="form__row">
              <div class="form__field" style="flex:1"><label class="form__label">Discount %</label><input class="form__input" id="vcDiscount" inputmode="numeric" placeholder="15" /></div>
              <div class="form__field" style="flex:1"><label class="form__label">Expiry</label><input class="form__input" id="vcExpiry" type="date" /></div>
            </div>
          </div>
        `,
        footerHtml: `<button class="btn" type="button" data-appmodal-close>Cancel</button><button class="btn btn--accent" type="button" id="saveVoucherBtn">Save</button>`
      });
      $("#saveVoucherBtn")?.addEventListener("click", () => {
        const code = /** @type {HTMLInputElement|null} */ ($("#vcCode"))?.value?.trim() ?? "";
        const discount = Number(/** @type {HTMLInputElement|null} */ ($("#vcDiscount"))?.value ?? 0);
        const expiry = /** @type {HTMLInputElement|null} */ ($("#vcExpiry"))?.value ?? "";
        if (!code || !discount || !expiry) return;
        appState.vouchers.unshift({ id: uid("VC"), code: code.toUpperCase(), discount, expiry });
        closeAllModals();
        renderVouchers();
      });
    });
  };

  const renderAccounts = () => {
    const root = $("#page-accounts");
    if (!root) return;
    const revenue = appState.bookings.reduce((sum, b) => sum + (b.amount || 0), 0);
    const pending = appState.leads.filter((l) => l.status === "Contacted").length;
    const rows = appState.bookings
      .slice(0, 12)
      .map((b) => `<tr><td style="font-weight:950">${b.id}</td><td>${b.airline}</td><td>${formatMoney(b.amount)}</td><td><span class="tag tag--converted">${b.status}</span></td></tr>`)
      .join("");
    root.innerHTML = `
      <div class="overview__grid" style="margin-bottom:12px">
        <div class="stat"><p class="stat__k">Total Revenue</p><p class="stat__v">${formatMoney(revenue)}</p><p class="stat__sub">From bookings</p></div>
        <div class="stat"><p class="stat__k">Pending Payments</p><p class="stat__v">${pending}</p><p class="stat__sub">From contacted leads</p></div>
        <div class="stat"><p class="stat__k">Bookings</p><p class="stat__v">${appState.bookings.length}</p><p class="stat__sub">Paid</p></div>
        <div class="stat"><p class="stat__k">Vouchers</p><p class="stat__v">${appState.vouchers.length}</p><p class="stat__sub">Active</p></div>
      </div>
      <div class="card card--flush">
        <div class="toolbar"><div class="toolbar__left"><div class="tag">Transactions</div></div></div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Booking ID</th><th>Airline</th><th>Amount</th><th>Status</th></tr></thead>
            <tbody>${rows || `<tr><td colspan="4" style="padding:18px;color:var(--muted);font-weight:900">No payments yet.</td></tr>`}</tbody>
          </table>
        </div>
      </div>
    `;
  };

  const renderReports = () => {
    const root = $("#page-reports");
    if (!root) return;
    root.innerHTML = `
      <div class="card card--flush">
        <div class="toolbar">
          <div class="toolbar__left"><div class="tag">Analytics</div></div>
          <div class="toolbar__right"><button class="btn btn--accent" type="button" id="regenReportBtn">Regenerate</button></div>
        </div>
        <div class="overview__split">
          <div class="panel">
            <header class="panel__header"><h3 class="panel__title">Monthly Bookings</h3><p class="panel__meta">Mock data</p></header>
            <div class="panel__body"><canvas class="chart" id="reportBookings" width="640" height="240"></canvas></div>
          </div>
          <div class="panel">
            <header class="panel__header"><h3 class="panel__title">Revenue Trend</h3><p class="panel__meta">Mock data</p></header>
            <div class="panel__body"><canvas class="chart" id="reportRevenue" width="640" height="240"></canvas></div>
          </div>
        </div>
      </div>
    `;
    const draw = () => {
      const b = /** @type {HTMLCanvasElement|null} */ ($("#reportBookings"));
      const r = /** @type {HTMLCanvasElement|null} */ ($("#reportRevenue"));
      const v1 = Array.from({ length: 8 }, () => Math.floor(2 + Math.random() * 10));
      const v2 = Array.from({ length: 8 }, () => Math.floor(20 + Math.random() * 80));
      drawBarChart(b, v1, { bar: "rgba(13,110,253,.92)" });
      drawBarChart(r, v2, { bar: "rgba(76,175,80,.92)" });
    };
    draw();
    $("#regenReportBtn")?.addEventListener("click", draw);
  };

  const renderSupport = () => {
    ensureOtherSeeds();
    const root = $("#page-support");
    if (!root) return;
    const rows = appState.supportTickets
      .map((t) => `<tr><td style="font-weight:950">${t.customer}</td><td>${t.issue}</td><td><select class="select" data-ticket-status><option ${t.status==="Open"?"selected":""}>Open</option><option ${t.status==="In Progress"?"selected":""}>In Progress</option><option ${t.status==="Resolved"?"selected":""}>Resolved</option></select></td></tr>`)
      .join("");
    root.innerHTML = `
      <div class="card card--flush">
        <div class="toolbar">
          <div class="toolbar__left"><div class="tag">Support Tickets</div></div>
          <div class="toolbar__right"><button class="btn btn--accent" type="button" id="newTicketBtn">New ticket</button></div>
        </div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Customer</th><th>Issue</th><th>Status</th></tr></thead>
            <tbody id="ticketsBody">${rows}</tbody>
          </table>
        </div>
      </div>
    `;
    $("#newTicketBtn")?.addEventListener("click", () => {
      openAppModal({
        title: "Create Ticket",
        bodyHtml: `
          <div class="form">
            <div class="form__field"><label class="form__label">Customer name</label><input class="form__input" id="tkCustomer" /></div>
            <div class="form__field"><label class="form__label">Issue</label><input class="form__input" id="tkIssue" placeholder="Describe the issue..." /></div>
          </div>
        `,
        footerHtml: `<button class="btn" type="button" data-appmodal-close>Cancel</button><button class="btn btn--accent" type="button" id="saveTicketBtn">Create</button>`
      });
      $("#saveTicketBtn")?.addEventListener("click", () => {
        const customer = /** @type {HTMLInputElement|null} */ ($("#tkCustomer"))?.value?.trim() ?? "";
        const issue = /** @type {HTMLInputElement|null} */ ($("#tkIssue"))?.value?.trim() ?? "";
        if (!customer || !issue) return;
        appState.supportTickets.unshift({ id: uid("TK"), customer, issue, status: "Open" });
        closeAllModals();
        renderSupport();
      });
    });
    root.addEventListener("change", (e) => {
      const t = e.target instanceof HTMLElement ? e.target : null;
      if (!t || !t.matches("[data-ticket-status]")) return;
      const tr = t.closest("tr");
      const customer = tr?.querySelector("td")?.textContent?.trim();
      const ticket = appState.supportTickets.find((x) => x.customer === customer);
      if (ticket) ticket.status = /** @type {HTMLSelectElement} */ (t).value;
    });
  };

  const bindTabs = () => {
    const holidayTabs = $all('[data-tabs="holidayType"] .tabs__tab');
    holidayTabs.forEach((btn) => {
      btn.addEventListener("click", () => {
        const next = btn.dataset.tab === "international" ? "international" : "indian";
        if (state.tripType === next) return;
        state.tripType = next;

        // reset route to something valid within the dataset
        const cities = getCitiesForTripType(state.tripType);
        state.from = cities[0]?.id ?? state.from;
        state.to = cities[1]?.id ?? state.to;
        ensureFromToDifferent();
        state.selectedOutbound = null;
        state.selectedReturn = null;

        setActiveButton(btn.closest("[data-tabs]"), (b) => b === btn);
        applyLoading();
      });
    });

    const pkgTabs = $all('[data-tabs="packageType"] .subtabs__tab');
    pkgTabs.forEach((btn) => {
      btn.addEventListener("click", () => {
        const next = btn.dataset.tab === "withoutFlights" ? "withoutFlights" : "withFlights";
        state.packageType = next;
        setActiveButton(btn.closest("[data-tabs]"), (b) => b === btn);
        render();
      });
    });
  };

  const bindControls = () => {
    fromEl.addEventListener("change", () => {
      state.from = fromEl.value;
      ensureFromToDifferent();
      state.selectedOutbound = null;
      state.selectedReturn = null;
      applyLoading();
    });
    toEl.addEventListener("change", () => {
      state.to = toEl.value;
      ensureFromToDifferent();
      state.selectedOutbound = null;
      state.selectedReturn = null;
      applyLoading();
    });

    dateEl?.addEventListener("change", () => {
      state.startDate = dateEl.value;
      renderSummary();
    });

    adultsEl?.addEventListener("change", () => {
      state.adults = clampInt(adultsEl.value, 1, 6, 2);
      render();
    });
    childrenEl?.addEventListener("change", () => {
      state.children = clampInt(childrenEl.value, 0, 4, 0);
      render();
    });

    lunchEl?.addEventListener("change", () => {
      state.lunch = !!lunchEl.checked;
      render();
    });
    dinnerEl?.addEventListener("change", () => {
      state.dinner = !!dinnerEl.checked;
      render();
    });

    // Hotel segmented buttons
    $all(".segmented__btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const next = clampInt(btn.dataset.segment, 3, 5, 3);
        state.hotel = next;
        const group = btn.closest(".segmented");
        if (group) setActiveButton(group, (b) => b === btn);
        render();
      });
    });

    $("#searchBtn")?.addEventListener("click", applyLoading);
  };

  const renderHeaderControls = () => {
    const cities = getCitiesForTripType(state.tripType);
    ensureFromToDifferent();
    renderSelectOptions(fromEl, cities, state.from);
    renderSelectOptions(toEl, cities, state.to);
  };

  const enrichFlight = (f) => {
    const from = getCityById(state.tripType, f.from);
    const to = getCityById(state.tripType, f.to);
    return {
      ...f,
      fromCode: from?.code ?? "—",
      toCode: to?.code ?? "—"
    };
  };

  const getSelectedFlightsForBooking = (outFlights, retFlights) => {
    const outbound = outFlights.find((f) => f.id === state.selectedOutbound) ?? null;
    const ret = retFlights.find((f) => f.id === state.selectedReturn) ?? null;
    return { outbound, ret };
  };

  const bookingSnapshot = (outFlights, retFlights, clickedFlightId) => {
    const { outbound, ret } = getSelectedFlightsForBooking(outFlights, retFlights);
    const clicked =
      outFlights.find((f) => f.id === clickedFlightId) ??
      retFlights.find((f) => f.id === clickedFlightId) ??
      outbound ??
      ret ??
      null;

    const from = getCityById(state.tripType, state.from);
    const to = getCityById(state.tripType, state.to);
    const total = calcTotalPrice({ outbound, ret });
    return {
      route: { from, to },
      clicked,
      outbound,
      ret,
      pax: { adults: state.adults, children: state.children },
      options: { hotel: state.hotel, lunch: state.lunch, dinner: state.dinner },
      total
    };
  };

  const renderBookingModal = (snap) => {
    if (!bookingBody) return;

    const pill = (label) => `<span class="chip">${label}</span>`;
    const optionPills = [
      pill(`${snap.options.hotel}★ Hotel`),
      snap.options.lunch ? pill("Lunch") : "",
      snap.options.dinner ? pill("Dinner") : ""
    ]
      .filter(Boolean)
      .join("");

    const flightLine = (f, title) => {
      if (!f) return "";
      const fromC = getCityById(state.tripType, f.from)?.code ?? "—";
      const toC = getCityById(state.tripType, f.to)?.code ?? "—";
      return `
        <div class="kv">
          <p class="kv__k">${title}</p>
          <p class="kv__v">${f.airline} • ${f.code}<br/>${fromC} ${f.depTime} → ${toC} ${f.arrTime} • ${f.duration}</p>
        </div>
      `;
    };

    bookingBody.innerHTML = `
      <div class="summary-grid">
        <div class="kv">
          <p class="kv__k">Route</p>
          <p class="kv__v">${snap.route.from?.name ?? "—"} → ${snap.route.to?.name ?? "—"}</p>
        </div>
        <div class="kv">
          <p class="kv__k">Passengers</p>
          <p class="kv__v">${formatPax(snap.pax.adults, snap.pax.children)}</p>
        </div>
        ${flightLine(snap.outbound, "Selected Outbound")}
        ${flightLine(snap.ret, "Selected Return")}
        <div class="kv">
          <p class="kv__k">Selected Options</p>
          <p class="kv__v">${optionPills || "—"}</p>
        </div>
        <div class="kv">
          <p class="kv__k">Total Price</p>
          <p class="kv__v kv__v--price">${formatINR(snap.total)}</p>
        </div>
      </div>
    `;
  };

  const setPayMethod = (method) => {
    state.payMethod = method;
    $all("[data-pay-method]").forEach((b) => b.classList.toggle("is-active", b.getAttribute("data-pay-method") === method));
    $all("[data-pay-panel]").forEach((p) => p.classList.toggle("is-active", p.getAttribute("data-pay-panel") === method));
  };

  const renderList = (container, flights, selectedId, onSelect) => {
    if (state.isLoading) {
      renderLoading(container);
      return;
    }
    if (!flights.length) {
      renderEmpty(container);
      return;
    }

    // Best deal: cheapest base per adult for the current route
    const bestId = flights.reduce((best, f) => (f.baseAdultPrice < best.price ? { id: f.id, price: f.baseAdultPrice } : best), { id: flights[0].id, price: flights[0].baseAdultPrice }).id;

    container.innerHTML = "";
    flights.forEach((f0) => {
      const f = enrichFlight(f0);
      const card = flightCardTemplate(f, { selected: f.id === selectedId, isBest: f.id === bestId });
      // Inject Book Now button
      const bookBtn = document.createElement("button");
      bookBtn.className = "btn btn--accent";
      bookBtn.type = "button";
      bookBtn.textContent = "Book Now";
      bookBtn.style.justifySelf = "end";
      bookBtn.style.marginTop = "2px";
      bookBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        // Selecting the clicked card as well makes the flow consistent
        onSelect(f0.id);
        state.selectedFlight = f0.id;
        const snap = bookingSnapshot(outFlightsCache, retFlightsCache, f0.id);
        state.bookingConfirmed = false;
        state.bookingId = null;
        renderBookingModal(snap);
        if (proceedToPaymentBtn) proceedToPaymentBtn.disabled = false;
        openModal(bookingModal);
      });
      const select = () => onSelect(f0.id);
      card.addEventListener("click", select);
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          select();
        }
      });
      card.appendChild(bookBtn);
      container.appendChild(card);
    });
  };

  const renderSummary = () => {
    const from = getCityById(state.tripType, state.from);
    const to = getCityById(state.tripType, state.to);
    const start = formatDateShort(state.startDate);
    const retDate = state.startDate ? formatDateShort(new Date(new Date(state.startDate + "T00:00:00").getTime() + 5 * 86400000).toISOString().slice(0, 10)) : "—";

    summaryOutbound.innerHTML = `<strong>${from?.code ?? "—"}</strong> → <strong>${to?.code ?? "—"}</strong> • ${start}`;
    summaryReturn.innerHTML = `<strong>${to?.code ?? "—"}</strong> → <strong>${from?.code ?? "—"}</strong> • ${retDate}`;
    summaryPax.textContent = formatPax(state.adults, state.children);
  };

  const renderMeta = (outCount, retCount) => {
    const from = getCityById(state.tripType, state.from);
    const to = getCityById(state.tripType, state.to);
    outboundMeta.textContent = `${from?.code ?? "—"} → ${to?.code ?? "—"} • ${outCount} ${plural(outCount, "option")}`;
    returnMeta.textContent = `${to?.code ?? "—"} → ${from?.code ?? "—"} • ${retCount} ${plural(retCount, "option")}`;
  };

  const renderPrice = (outFlights, retFlights) => {
    const outbound = outFlights.find((f) => f.id === state.selectedOutbound) ?? null;
    const ret = retFlights.find((f) => f.id === state.selectedReturn) ?? null;
    const total = calcTotalPrice({ outbound, ret });

    // Smooth number transition
    const fromText = summaryPrice.textContent?.replace(/[^\d]/g, "") ?? "0";
    const fromVal = Number.parseInt(fromText || "0", 10) || 0;
    const toVal = total;
    if (Number.isFinite(fromVal) && Number.isFinite(toVal) && fromVal !== toVal && summaryPrice.animate) {
      summaryPrice.animate([{ transform: "translateY(0)", opacity: 1 }, { transform: "translateY(-2px)", opacity: 0.55 }, { transform: "translateY(0)", opacity: 1 }], {
        duration: 240,
        easing: "ease-out"
      });
    }
    summaryPrice.textContent = formatINR(total);
  };

  const render = () => {
    setProfileFromLogin();
    renderHeaderControls();
    renderSummary();

    const outFlights = getFlights(state.tripType, state.from, state.to);
    const retFlights = getFlights(state.tripType, state.to, state.from);
    // cache for booking snapshot creation inside card handlers
    outFlightsCache = outFlights;
    retFlightsCache = retFlights;

    // Default select the best deal if none chosen
    if (!state.selectedOutbound && outFlights.length) {
      state.selectedOutbound = outFlights.slice().sort((a, b) => a.baseAdultPrice - b.baseAdultPrice)[0].id;
    }
    if (!state.selectedReturn && retFlights.length) {
      state.selectedReturn = retFlights.slice().sort((a, b) => a.baseAdultPrice - b.baseAdultPrice)[0].id;
    }

    renderMeta(outFlights.length, retFlights.length);

    const showFlights = state.packageType === "withFlights";
    if (notice) notice.hidden = showFlights;
    outboundList.parentElement?.classList.toggle("is-disabled", !showFlights);
    returnList.parentElement?.classList.toggle("is-disabled", !showFlights);

    renderList(outboundList, outFlights, state.selectedOutbound, (id) => {
      if (!showFlights) return;
      state.selectedOutbound = id;
      render();
    });
    renderList(returnList, retFlights, state.selectedReturn, (id) => {
      if (!showFlights) return;
      state.selectedReturn = id;
      render();
    });

    renderPrice(outFlights, retFlights);
  };

  // booking/payment buttons
  proceedToPaymentBtn?.addEventListener("click", () => {
    closeModal(bookingModal);
    // Ensure amount is always up-to-date
    const outFlights = outFlightsCache ?? [];
    const retFlights = retFlightsCache ?? [];
    const { outbound, ret } = getSelectedFlightsForBooking(outFlights, retFlights);
    const amount = calcTotalPrice({ outbound, ret });
    if (payAmount) payAmount.textContent = formatINR(amount);
    setPayMethod(state.payMethod);
    openModal(paymentModal);
  });

  $all("[data-pay-method]").forEach((btn) => {
    btn.addEventListener("click", () => setPayMethod(btn.getAttribute("data-pay-method") || "card"));
  });

  const genBookingId = () => {
    const n = Math.floor(100000 + Math.random() * 900000);
    return `BK${n}`;
  };

  const setPayLoading = (loading) => {
    state.isPaying = loading;
    if (!payNowBtn) return;
    payNowBtn.disabled = loading;
    payNowBtn.classList.toggle("is-loading", loading);
  };

  payNowBtn?.addEventListener("click", () => {
    if (state.isPaying) return;
    setPayLoading(true);

    window.setTimeout(() => {
      setPayLoading(false);
      closeModal(paymentModal);

      const outFlights = outFlightsCache ?? [];
      const retFlights = retFlightsCache ?? [];
      const { outbound, ret } = getSelectedFlightsForBooking(outFlights, retFlights);
      const amount = calcTotalPrice({ outbound, ret });
      const id = genBookingId();
      state.bookingConfirmed = true;
      state.bookingId = id;

      const from = getCityById(state.tripType, state.from);
      const to = getCityById(state.tripType, state.to);
      const airline = outbound?.airline ?? "—";

      // Persist into admin modules
      appState.bookings.unshift({
        id,
        airline,
        route: `${from?.code ?? "—"} → ${to?.code ?? "—"}`,
        amount,
        createdAt: new Date().toISOString(),
        status: "Paid"
      });

      if (successBody) {
        successBody.innerHTML = `
          <div class="summary-grid">
            <div class="kv">
              <p class="kv__k">Booking ID</p>
              <p class="kv__v">${id}</p>
            </div>
            <div class="kv">
              <p class="kv__k">Total Paid</p>
              <p class="kv__v kv__v--price">${formatINR(amount)}</p>
            </div>
            <div class="kv">
              <p class="kv__k">Route</p>
              <p class="kv__v">${from?.name ?? "—"} → ${to?.name ?? "—"}</p>
            </div>
            <div class="kv">
              <p class="kv__k">Airline</p>
              <p class="kv__v">${airline}</p>
            </div>
          </div>
          <div class="pill-row">
            <span class="chip chip--good">Booking Confirmed</span>
            <span class="chip">Payment: ${state.payMethod.toUpperCase()}</span>
          </div>
        `;
      }

      openModal(successModal);
      toast({ title: "Booking Confirmed!", text: `Booking ID ${id} • Paid ${formatINR(amount)}` });
      renderModules();
    }, 2400);
  });

  bindTabs();
  bindControls();

  // Initial date default (today + 3 days)
  if (dateEl && !dateEl.value) {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    state.startDate = d.toISOString().slice(0, 10);
    dateEl.value = state.startDate;
  }

  // Initialize tab classes to state
  const holidayGroup = $('[data-tabs="holidayType"]');
  if (holidayGroup) setActiveButton(holidayGroup, (b) => b.dataset.tab === state.tripType);
  const pkgGroup = $('[data-tabs="packageType"]');
  if (pkgGroup) setActiveButton(pkgGroup, (b) => b.dataset.tab === state.packageType);

  initNav();
  render();
}

function initLogin() {
  const form = $("#loginForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = /** @type {HTMLInputElement|null} */ ($("#email"))?.value?.trim() ?? "";
    const password = /** @type {HTMLInputElement|null} */ ($("#password"))?.value ?? "";

    const ok = email.includes("@") && password.length >= 6;
    if (!ok) {
      const emailEl = /** @type {HTMLInputElement|null} */ ($("#email"));
      const passEl = /** @type {HTMLInputElement|null} */ ($("#password"));
      (emailEl ?? passEl)?.focus();
      return;
    }
    const derivedName = toDisplayName(email.split("@")[0]);
    localStorage.setItem("travel_user_email", email);
    localStorage.setItem("travel_user_name", derivedName);
    window.location.href = "./index.html";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initSidebar();
  initLogin();
  initDashboard();
});

