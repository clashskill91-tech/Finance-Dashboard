/* ===================================================================
   SMART FINANCE DASHBOARD — APPLICATION LOGIC
   Vanilla JS, modular namespaces, hash-based SPA router.
   Modules: Store, Fmt, Toast, Modal, Charts, Views, Router, App
=================================================================== */
(function () {
  "use strict";

  /* ================= ICON SYSTEM (SVG, no emoji) ================= */
  const ICON_PATHS = {
    home: '<path d="M4 11 12 4l8 7"/><path d="M6 10v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-9"/><path d="M10 20v-5h4v5"/>',
    trendUp: '<polyline points="3 17 9 11 13 15 21 6"/><polyline points="15 6 21 6 21 12"/>',
    trendDown: '<polyline points="3 7 9 13 13 9 21 18"/><polyline points="15 18 21 18 21 12"/>',
    barChart: '<rect x="4" y="10" width="3.6" height="10" rx="1"/><rect x="10.2" y="4" width="3.6" height="16" rx="1"/><rect x="16.4" y="13" width="3.6" height="7" rx="1"/>',
    target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="8" y1="3" x2="8" y2="7"/><line x1="16" y1="3" x2="16" y2="7"/>',
    calendarRange: '<rect x="3" y="5" width="18" height="16" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="8" y1="3" x2="8" y2="7"/><line x1="16" y1="3" x2="16" y2="7"/><line x1="7.5" y1="14.5" x2="16.5" y2="14.5"/>',
    activity: '<polyline points="2 12 6 12 9 4 13 20 16 12 22 12"/>',
    sliders: '<line x1="4" y1="6" x2="20" y2="6"/><circle cx="9" cy="6" r="2" fill="currentColor" stroke="none"/><line x1="4" y1="12" x2="20" y2="12"/><circle cx="15" cy="12" r="2" fill="currentColor" stroke="none"/><line x1="4" y1="18" x2="20" y2="18"/><circle cx="7" cy="18" r="2" fill="currentColor" stroke="none"/>',
    briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="3" y1="12" x2="21" y2="12"/>',
    building: '<rect x="5" y="3" width="14" height="18" rx="1"/><rect x="8" y="6.5" width="2" height="2"/><rect x="14" y="6.5" width="2" height="2"/><rect x="8" y="11" width="2" height="2"/><rect x="14" y="11" width="2" height="2"/><rect x="10" y="15.5" width="4" height="5.5"/>',
    gift: '<rect x="3" y="9" width="18" height="11" rx="1"/><line x1="12" y1="9" x2="12" y2="20"/><path d="M3 9h18"/><path d="M12 9c-1.5-4-6-4-6-1s3 1 6 1"/><path d="M12 9c1.5-4 6-4 6-1s-3 1-6 1"/>',
    laptop: '<rect x="4" y="5" width="16" height="10" rx="1"/><line x1="2" y1="19" x2="22" y2="19"/>',
    ribbon: '<circle cx="12" cy="8" r="5"/><path d="M9 12.5 7 21l5-3 5 3-2-8.5"/>',
    box: '<path d="M3 8 12 4l9 4-9 4-9-4Z"/><path d="M3 8v9l9 4 9-4V8"/><line x1="12" y1="12" x2="12" y2="21"/>',
    car: '<path d="M4 16V11l2-5h12l2 5v5"/><line x1="4" y1="16" x2="20" y2="16"/><circle cx="7.5" cy="17.5" r="1.6"/><circle cx="16.5" cy="17.5" r="1.6"/>',
    cart: '<circle cx="9" cy="20" r="1.4"/><circle cx="17" cy="20" r="1.4"/><path d="M3 4h2l2.5 12h10L20 8H6.5"/>',
    wifi: '<path d="M2 8.5a16 16 0 0 1 20 0"/><path d="M5.5 12a11 11 0 0 1 13 0"/><path d="M9 15.5a6 6 0 0 1 6 0"/><circle cx="12" cy="19" r="1.2" fill="currentColor" stroke="none"/>',
    zap: '<polygon points="13 2 4 14 11 14 10 22 20 9 13 9 13 2"/>',
    flame: '<path d="M12 3c3 3 5 6 5 9a5 5 0 0 1-10 0c0-1.6.8-2.8 1.8-4.1C10 6.8 11 5 12 3Z"/>',
    heartPulse: '<path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9Z"/>',
    book: '<path d="M4 5a2 2 0 0 1 2-2h6v18H6a2 2 0 0 1-2-2Z"/><path d="M20 5a2 2 0 0 0-2-2h-6v18h6a2 2 0 0 0 2-2Z"/>',
    film: '<rect x="3" y="4" width="18" height="16" rx="2"/><line x1="7" y1="4" x2="7" y2="20"/><line x1="17" y1="4" x2="17" y2="20"/><line x1="3" y1="9" x2="7" y2="9"/><line x1="3" y1="15" x2="7" y2="15"/><line x1="17" y1="9" x2="21" y2="9"/><line x1="17" y1="15" x2="21" y2="15"/>',
    gem: '<path d="M6 3h12l4 6-10 12L2 9Z"/><path d="M2 9h20"/><path d="M8.5 3 12 9l3.5-6"/>',
    stack: '<polygon points="12 3 21 8 12 13 3 8"/><polyline points="3 13.5 12 18.5 21 13.5"/>',
    layers: '<ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6"/><path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"/>',
    sun: '<circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/><line x1="4.6" y1="4.6" x2="6.7" y2="6.7"/><line x1="17.3" y1="17.3" x2="19.4" y2="19.4"/><line x1="4.6" y1="19.4" x2="6.7" y2="17.3"/><line x1="17.3" y1="6.7" x2="19.4" y2="4.6"/>',
    pencil: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
    trash: '<path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/>',
    plus: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
    check: '<polyline points="20 6 9 17 4 12"/>',
    x: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
    checkCircle: '<circle cx="12" cy="12" r="9"/><polyline points="8 12.5 11 15.5 16 9"/>',
    xCircle: '<circle cx="12" cy="12" r="9"/><line x1="9" y1="9" x2="15" y2="15"/><line x1="15" y1="9" x2="9" y2="15"/>',
    info: '<circle cx="12" cy="12" r="9"/><line x1="12" y1="16" x2="12" y2="11.5"/><circle cx="12" cy="8" r="0.15" fill="currentColor" stroke="currentColor" stroke-width="1.6"/>',
    alertTriangle: '<path d="M12 3 2 20h20Z"/><line x1="12" y1="10" x2="12" y2="14.5"/><circle cx="12" cy="17.3" r="0.15" fill="currentColor" stroke="currentColor" stroke-width="1.6"/>',
    inbox: '<path d="M3 9 5 3h14l2 6"/><path d="M3 9v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9"/><path d="M3 9h5a1 1 0 0 1 1 1 3 3 0 0 0 6 0 1 1 0 0 1 1-1h5"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',
    arrowDownCircle: '<circle cx="12" cy="12" r="9"/><polyline points="8 11 12 15 16 11"/><line x1="12" y1="8" x2="12" y2="15"/>',
    arrowUpCircle: '<circle cx="12" cy="12" r="9"/><polyline points="8 13 12 9 16 13"/><line x1="12" y1="16" x2="12" y2="9"/>',
    quote: '<path d="M7 8c-2 0-3.5 1.6-3.5 4S5 16 7 16c.4 2-1 4-3 4.5"/><path d="M16 8c-2 0-3.5 1.6-3.5 4s1.5 4 3.5 4c.4 2-1 4-3 4.5"/>',
    coin: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.2c0-1 1-1.7 2.5-1.7s2.5.8 2.5 1.7-1 1.3-2.5 1.8-2.5.9-2.5 1.8 1 1.7 2.5 1.7 2.5-.7 2.5-1.7"/><line x1="12" y1="6.3" x2="12" y2="7.5"/><line x1="12" y1="16.5" x2="12" y2="17.7"/>'
  };
  function ic(name, size) {
    size = size || 18;
    const d = ICON_PATHS[name] || ICON_PATHS.box;
    return '<svg class="icon-svg" width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + d + '</svg>';
  }

  /* ================= CONSTANTS ================= */
  const INCOME_CATEGORIES = ["Ish haqi", "Biznes", "Bonus", "Freelance", "Sovg'a", "Boshqa"];
  const EXPENSE_CATEGORIES = ["Transport", "Oziq-ovqat", "Internet", "Elektr", "Gaz", "Ijara", "Sog'liq", "O'qish", "Ko'ngilochar", "Boshqa"];
  const CATEGORY_ICON = {
    "Ish haqi": "briefcase", "Biznes": "building", "Bonus": "gift", "Freelance": "laptop", "Sovg'a": "ribbon", "Boshqa": "box",
    "Transport": "car", "Oziq-ovqat": "cart", "Internet": "wifi", "Elektr": "zap", "Gaz": "flame",
    "Ijara": "home", "Sog'liq": "heartPulse", "O'qish": "book", "Ko'ngilochar": "film"
  };
  function catIcon(cat, size) { return ic(CATEGORY_ICON[cat] || "box", size); }
  const QUOTES = [
    "Kichik tejamkorlik — katta erkinlikning boshlanishi.",
    "Pul sizga xizmat qilishi kerak, siz pulga emas.",
    "Har bir tiyin — ertangi imkoniyat.",
    "Byudjet — bu cheklov emas, erkinlik xaritasi.",
    "Sarflashdan oldin so'rang: bu menga kerakmi yoki xohishmi?",
    "Moliyaviy tinchlik — kichik, doimiy qadamlardan boshlanadi.",
    "Jamg'arma — kelajakdagi sizga yuborilgan sovg'a."
  ];

  /* Store, uid(), and Auth are provided by auth.js, loaded before this file. */


  /* ================= SEED DATA (first run only) ================= */
  function seedIfEmpty() {
    if (Store.getTx() === null) {
      const today = new Date();
      const d = (offset) => { const t = new Date(today); t.setDate(t.getDate() - offset); return t.toISOString().slice(0, 10); };
      const seed = [
        { id: uid(), name: "Oylik ish haqi", amount: 8500000, category: "Ish haqi", date: d(2), note: "Iyul oyi maoshi", type: "in" },
        { id: uid(), name: "Freelance loyiha", amount: 1750000, category: "Freelance", date: d(4), note: "Landing sahifa", type: "in" },
        { id: uid(), name: "Ijara to'lovi", amount: 2200000, category: "Ijara", date: d(1), note: "Iyul oyi", type: "out" },
        { id: uid(), name: "Supermarket", amount: 486000, category: "Oziq-ovqat", date: d(0), note: "Haftalik xarid", type: "out" },
        { id: uid(), name: "Internet to'lovi", amount: 120000, category: "Internet", date: d(3), note: "Uy interneti", type: "out" },
        { id: uid(), name: "Taksi", amount: 38000, category: "Transport", date: d(0), note: "", type: "out" },
        { id: uid(), name: "Elektr energiya", amount: 96000, category: "Elektr", date: d(6), note: "", type: "out" },
        { id: uid(), name: "Kinoteatr", amount: 65000, category: "Ko'ngilochar", date: d(5), note: "Do'stlar bilan", type: "out" },
        { id: uid(), name: "Bonus", amount: 500000, category: "Bonus", date: d(10), note: "Kvartal bonusi", type: "in" },
        { id: uid(), name: "Dorixona", amount: 74000, category: "Sog'liq", date: d(8), note: "", type: "out" },
        { id: uid(), name: "Kurs to'lovi", amount: 340000, category: "O'qish", date: d(14), note: "Ingliz tili kursi", type: "out" },
        { id: uid(), name: "Gaz to'lovi", amount: 54000, category: "Gaz", date: d(9), note: "", type: "out" }
      ];
      Store.setTx(seed);
    }
    if (Store.getGoals() === null) {
      const today = new Date();
      const future = (days) => { const t = new Date(today); t.setDate(t.getDate() + days); return t.toISOString().slice(0, 10); };
      Store.setGoals([
        { id: uid(), name: "Zaxira jamg'arma", target: 20000000, current: 12500000, deadline: future(90) },
        { id: uid(), name: "Yangi noutbuk", target: 9000000, current: 9000000, deadline: future(-2) },
        { id: uid(), name: "Sayohat: Samarqand", target: 4000000, current: 1450000, deadline: future(45) }
      ]);
    }
    if (Store.getBudgets() === null) {
      Store.setBudgets({
        "Oziq-ovqat": 1500000, "Transport": 400000, "Internet": 150000,
        "Ko'ngilochar": 300000, "Ijara": 2200000, "Sog'liq": 300000
      });
    }
    if (Store.getSettings() === null) {
      Store.setSettings({ darkMode: false, currency: "UZS", userName: "Foydalanuvchi", avatar: null });
    }
  }

  /* ================= FORMAT HELPERS ================= */
  const Fmt = {
    money(n, opts) {
      opts = opts || {};
      const sign = n < 0 ? "-" : (opts.forceSign ? "+" : "");
      const val = Math.abs(Math.round(n));
      const s = val.toLocaleString("uz-UZ").replace(/,/g, " ");
      return sign + s + (opts.noSuffix ? "" : " so'm");
    },
    shortMoney(n) {
      const abs = Math.abs(n);
      if (abs >= 1e9) return (n / 1e9).toFixed(1) + "mlrd";
      if (abs >= 1e6) return (n / 1e6).toFixed(1) + "mln";
      if (abs >= 1e3) return (n / 1e3).toFixed(0) + "ming";
      return String(Math.round(n));
    },
    date(str) {
      const d = new Date(str + "T00:00:00");
      const months = ["Yan", "Fev", "Mar", "Apr", "May", "Iyun", "Iyul", "Avg", "Sen", "Okt", "Noy", "Dek"];
      return d.getDate() + " " + months[d.getMonth()] + " " + d.getFullYear();
    },
    longDate(d) {
      const days = ["Yakshanba", "Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma", "Shanba"];
      const months = ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr"];
      return days[d.getDay()] + ", " + d.getDate() + "-" + months[d.getMonth()] + " " + d.getFullYear();
    },
    escape(str) {
      return String(str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
    }
  };

  /* ================= TOAST ================= */
  const Toast = {
    icons: { success: "checkCircle", error: "xCircle", info: "info", warn: "alertTriangle" },
    show(type, title, msg, duration) {
      const container = document.getElementById("toastContainer");
      const el = document.createElement("div");
      el.className = "toast " + type;
      el.innerHTML =
        '<div class="toast-icon">' + ic(this.icons[type], 16) + '</div>' +
        '<div class="toast-body"><div class="toast-title">' + Fmt.escape(title) + '</div>' +
        (msg ? '<div class="toast-msg">' + Fmt.escape(msg) + '</div>' : '') + '</div>';
      container.appendChild(el);
      const t = setTimeout(() => this.dismiss(el), duration || 3800);
      el.addEventListener("click", () => { clearTimeout(t); this.dismiss(el); });
    },
    dismiss(el) {
      el.classList.add("hide");
      setTimeout(() => el.remove(), 380);
    },
    success(t, m) { this.show("success", t, m); },
    error(t, m) { this.show("error", t, m); },
    info(t, m) { this.show("info", t, m); },
    warn(t, m) { this.show("warn", t, m); }
  };

  /* ================= MODAL ================= */
  const Modal = {
    open(html) {
      const overlay = document.getElementById("modalOverlay");
      const root = document.getElementById("modalRoot");
      root.innerHTML = html;
      overlay.classList.add("show");
      const closeBtn = root.querySelector(".modal-close");
      if (closeBtn) closeBtn.addEventListener("click", () => this.close());
    },
    close() {
      document.getElementById("modalOverlay").classList.remove("show");
      document.getElementById("modalRoot").innerHTML = "";
    }
  };
  document.getElementById("modalOverlay").addEventListener("click", (e) => {
    if (e.target.id === "modalOverlay") Modal.close();
  });

  /* ================= RIPPLE (event delegation) ================= */
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn, .icon-btn, .pagination button, .type-toggle button");
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement("span");
    const size = Math.max(rect.width, rect.height);
    ripple.className = "ripple";
    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = (e.clientX - rect.left - size / 2) + "px";
    ripple.style.top = (e.clientY - rect.top - size / 2) + "px";
    btn.style.position = btn.style.position || "relative";
    btn.style.overflow = "hidden";
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 650);
  });

  /* ================= COUNT UP ================= */
  function countUp(el, target, opts) {
    opts = opts || {};
    const duration = opts.duration || 900;
    const isMoney = opts.money !== false;
    const start = 0;
    const t0 = performance.now();
    function tick(now) {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = start + (target - start) * eased;
      el.textContent = isMoney ? Fmt.money(val, { noSuffix: opts.noSuffix }) : Math.round(val).toLocaleString("uz-UZ");
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* ================= CONFETTI ================= */
  function launchConfetti() {
    const canvas = document.getElementById("confettiCanvas");
    canvas.style.display = "block";
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");
    const colors = ["#2563EB", "#22C55E", "#F59E0B", "#EF4444", "#A855F7"];
    const pieces = [];
    for (let i = 0; i < 140; i++) {
      pieces.push({
        x: Math.random() * canvas.width, y: -20 - Math.random() * canvas.height * 0.5,
        w: 6 + Math.random() * 6, h: 8 + Math.random() * 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: 2 + Math.random() * 3, rot: Math.random() * 360, rotSpeed: (Math.random() - 0.5) * 10,
        drift: (Math.random() - 0.5) * 2
      });
    }
    let frame = 0;
    const maxFrames = 220;
    function draw() {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach(p => {
        p.y += p.speed; p.x += p.drift; p.rot += p.rotSpeed;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot * Math.PI / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });
      if (frame < maxFrames) requestAnimationFrame(draw);
      else { canvas.style.display = "none"; ctx.clearRect(0, 0, canvas.width, canvas.height); }
    }
    draw();
  }

  /* ================= CHARTS (pure canvas) ================= */
  const Charts = {
    palette: ["#2563EB", "#22C55E", "#F59E0B", "#EF4444", "#A855F7", "#0EA5E9", "#EC4899", "#84CC16", "#F97316", "#6366F1"],

    setupCanvas(canvas) {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      const cssW = rect.width || canvas.parentElement.clientWidth;
      const cssH = parseInt(canvas.dataset.height || "220", 10);
      canvas.style.height = cssH + "px";
      canvas.width = cssW * dpr;
      canvas.height = cssH * dpr;
      const ctx = canvas.getContext("2d");
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return { ctx, w: cssW, h: cssH };
    },

    pie(canvas, data) {
      const { ctx, w, h } = this.setupCanvas(canvas);
      const cx = w / 2.6, cy = h / 2, r = Math.min(w / 2.6, h / 2) - 10, inner = r * 0.6;
      const total = data.reduce((s, d) => s + d.value, 0) || 1;
      let start = -Math.PI / 2;
      const duration = 900, t0 = performance.now();
      function frame(now) {
        const p = Math.min(1, (now - t0) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        ctx.clearRect(0, 0, w, h);
        let a = -Math.PI / 2;
        data.forEach((d, i) => {
          const slice = (d.value / total) * Math.PI * 2 * eased;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.arc(cx, cy, r, a, a + slice);
          ctx.closePath();
          ctx.fillStyle = d.color || Charts.palette[i % Charts.palette.length];
          ctx.fill();
          a += slice;
        });
        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath(); ctx.arc(cx, cy, inner, 0, Math.PI * 2); ctx.fill();
        ctx.globalCompositeOperation = "source-over";
        if (p < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    },

    bar(canvas, data) {
      const { ctx, w, h } = this.setupCanvas(canvas);
      const padL = 46, padB = 26, padT = 14, padR = 10;
      const chartW = w - padL - padR, chartH = h - padB - padT;
      const max = Math.max(1, ...data.map(d => d.value)) * 1.15;
      const barW = chartW / data.length * 0.55;
      const gap = chartW / data.length;
      const duration = 800, t0 = performance.now();
      function frame(now) {
        const p = Math.min(1, (now - t0) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        ctx.clearRect(0, 0, w, h);
        ctx.strokeStyle = getCss("--border"); ctx.lineWidth = 1;
        for (let i = 0; i <= 4; i++) {
          const y = padT + chartH - (chartH / 4) * i;
          ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(w - padR, y); ctx.stroke();
          ctx.fillStyle = getCss("--text-faint"); ctx.font = "10px var(--font-num)";
          ctx.textAlign = "right";
          ctx.fillText(Fmt.shortMoney((max / 4) * i), padL - 8, y + 3);
        }
        data.forEach((d, i) => {
          const bh = (d.value / max) * chartH * eased;
          const x = padL + gap * i + (gap - barW) / 2;
          const y = padT + chartH - bh;
          const grad = ctx.createLinearGradient(0, y, 0, padT + chartH);
          grad.addColorStop(0, d.color || "#2563EB");
          grad.addColorStop(1, (d.color || "#2563EB") + "55");
          ctx.fillStyle = grad;
          roundRectTop(ctx, x, y, barW, bh, 6);
          ctx.fill();
          ctx.fillStyle = getCss("--text-faint"); ctx.font = "10.5px var(--font-ui)"; ctx.textAlign = "center";
          ctx.fillText(d.label, x + barW / 2, h - 8);
        });
        if (p < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    },

    line(canvas, series) {
      const { ctx, w, h } = this.setupCanvas(canvas);
      const padL = 46, padB = 26, padT = 16, padR = 14;
      const chartW = w - padL - padR, chartH = h - padB - padT;
      const max = Math.max(1, ...series.map(d => d.value)) * 1.2;
      const stepX = series.length > 1 ? chartW / (series.length - 1) : 0;
      const duration = 900, t0 = performance.now();
      function pt(i, v, eased) {
        return [padL + stepX * i, padT + chartH - (v / max) * chartH * eased];
      }
      function frame(now) {
        const p = Math.min(1, (now - t0) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        ctx.clearRect(0, 0, w, h);
        ctx.strokeStyle = getCss("--border"); ctx.lineWidth = 1;
        for (let i = 0; i <= 4; i++) {
          const y = padT + chartH - (chartH / 4) * i;
          ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(w - padR, y); ctx.stroke();
          ctx.fillStyle = getCss("--text-faint"); ctx.font = "10px var(--font-num)"; ctx.textAlign = "right";
          ctx.fillText(Fmt.shortMoney((max / 4) * i), padL - 8, y + 3);
        }
        // area
        ctx.beginPath();
        series.forEach((d, i) => {
          const [x, y] = pt(i, d.value, eased);
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        });
        ctx.lineTo(padL + stepX * (series.length - 1), padT + chartH);
        ctx.lineTo(padL, padT + chartH);
        ctx.closePath();
        const grad = ctx.createLinearGradient(0, padT, 0, padT + chartH);
        grad.addColorStop(0, "rgba(37,99,235,.25)");
        grad.addColorStop(1, "rgba(37,99,235,0)");
        ctx.fillStyle = grad;
        ctx.fill();
        // line
        ctx.beginPath();
        series.forEach((d, i) => {
          const [x, y] = pt(i, d.value, eased);
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        });
        ctx.strokeStyle = "#2563EB"; ctx.lineWidth = 2.5; ctx.lineJoin = "round"; ctx.stroke();
        // points + labels
        series.forEach((d, i) => {
          const [x, y] = pt(i, d.value, eased);
          ctx.beginPath(); ctx.arc(x, y, 3.5, 0, Math.PI * 2);
          ctx.fillStyle = getCss("--surface"); ctx.fill();
          ctx.lineWidth = 2; ctx.strokeStyle = "#2563EB"; ctx.stroke();
          ctx.fillStyle = getCss("--text-faint"); ctx.font = "10.5px var(--font-ui)"; ctx.textAlign = "center";
          ctx.fillText(d.label, x, h - 8);
        });
        if (p < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }
  };
  function getCss(varName) {
    return getComputedStyle(document.documentElement).getPropertyValue(varName).trim() || "#999";
  }
  function roundRectTop(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x, y + h);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h);
    ctx.closePath();
  }

  /* ================= DATA COMPUTATIONS ================= */
  function computeStats() {
    const tx = Store.getTx() || [];
    const now = new Date();
    const todayStr = now.toISOString().slice(0, 10);
    const startOfWeek = new Date(now); startOfWeek.setDate(now.getDate() - now.getDay());
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfYear = new Date(now.getFullYear(), 0, 1);

    let totalIncome = 0, totalExpense = 0, todayExpense = 0, weekExpense = 0, monthExpense = 0, yearExpense = 0;
    tx.forEach(t => {
      const d = new Date(t.date + "T00:00:00");
      if (t.type === "in") totalIncome += t.amount;
      else {
        totalExpense += t.amount;
        if (t.date === todayStr) todayExpense += t.amount;
        if (d >= startOfWeek) weekExpense += t.amount;
        if (d >= startOfMonth) monthExpense += t.amount;
        if (d >= startOfYear) yearExpense += t.amount;
      }
    });
    return {
      balance: totalIncome - totalExpense,
      totalIncome, totalExpense,
      savings: totalIncome - totalExpense,
      todayExpense, weekExpense, monthExpense, yearExpense,
      tx
    };
  }

  function categoryTotals(tx, type) {
    const map = {};
    tx.filter(t => t.type === type).forEach(t => { map[t.category] = (map[t.category] || 0) + t.amount; });
    return Object.entries(map).map(([label, value]) => ({ label, value })).sort((a, b) => b.value - a.value);
  }

  function last30DaysSeries(tx) {
    const days = [];
    const now = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now); d.setDate(now.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      const val = tx.filter(t => t.type === "out" && t.date === key).reduce((s, t) => s + t.amount, 0);
      days.push({ label: d.getDate() + "/" + (d.getMonth() + 1), value: val });
    }
    return days;
  }

  function monthlySeries(tx) {
    const months = ["Yan", "Fev", "Mar", "Apr", "May", "Iyun", "Iyul", "Avg", "Sen", "Okt", "Noy", "Dek"];
    const now = new Date();
    const arr = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const expense = tx.filter(t => {
        const td = new Date(t.date + "T00:00:00");
        return t.type === "out" && td.getFullYear() === d.getFullYear() && td.getMonth() === d.getMonth();
      }).reduce((s, t) => s + t.amount, 0);
      arr.push({ label: months[d.getMonth()], value: expense });
    }
    return arr;
  }

  /* ================= VALIDATION ================= */
  function validateField(input, rule) {
    const field = input.closest(".field");
    let valid = true, msg = "";
    const val = input.value.trim();
    if (rule === "required" && val === "") { valid = false; msg = "Bu maydon bo'sh bo'lishi mumkin emas"; }
    if (rule === "positive") {
      const n = parseFloat(val);
      if (val === "" || isNaN(n)) { valid = false; msg = "Raqam kiriting"; }
      else if (n <= 0) { valid = false; msg = "Miqdor musbat bo'lishi kerak"; }
    }
    if (field) {
      field.classList.toggle("error", !valid);
      const msgEl = field.querySelector(".field-error-msg");
      if (msgEl) msgEl.textContent = msg;
    }
    return valid;
  }

  /* ================= VIEWS ================= */
  const Views = {

    dashboard() {
      const s = computeStats();
      const recent = [...s.tx].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5);
      const topCats = categoryTotals(s.tx, "out").slice(0, 5);
      const budgets = Store.getBudgets() || {};
      const alerts = Object.entries(budgets).map(([cat, limit]) => {
        const spent = s.tx.filter(t => t.type === "out" && t.category === cat && inCurrentMonth(t.date)).reduce((sum, t) => sum + t.amount, 0);
        return { cat, limit, spent, pct: limit ? spent / limit : 0 };
      }).filter(a => a.pct >= 0.8).sort((a, b) => b.pct - a.pct);

      const quote = QUOTES[new Date().getDate() % QUOTES.length];

      return `
      <div class="view">
        <div class="section-head">
          <div><h2>Xush kelibsiz</h2><p>Moliyaviy holatingizga umumiy nazar</p></div>
          <button class="btn btn-primary" id="btnAddTxDash">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M12 5v14M5 12h14"/></svg>
            Tranzaksiya qo'shish
          </button>
        </div>

        <div class="grid stat-grid">
          <div class="card stat-card hero">
            <div class="stat-icon">${ic("gem", 18)}</div>
            <div class="stat-label">Jami balans</div>
            <div class="stat-value countup" data-target="${s.balance}">0</div>
            <div class="stat-delta up">↑ ${((s.savings / (s.totalIncome || 1)) * 100).toFixed(0)}% jamg'arma</div>
          </div>
          <div class="card stat-card">
            <div class="stat-icon icon-green">${ic("trendUp", 18)}</div>
            <div class="stat-label">Jami kirim</div>
            <div class="stat-value countup" data-target="${s.totalIncome}">0</div>
            <div class="stat-delta up">↑ Barcha davr</div>
          </div>
          <div class="card stat-card">
            <div class="stat-icon icon-red">${ic("trendDown", 18)}</div>
            <div class="stat-label">Jami chiqim</div>
            <div class="stat-value countup" data-target="${s.totalExpense}">0</div>
            <div class="stat-delta down">↓ Barcha davr</div>
          </div>
          <div class="card stat-card">
            <div class="stat-icon icon-amber">${ic("layers", 18)}</div>
            <div class="stat-label">Jamg'arma</div>
            <div class="stat-value countup" data-target="${s.savings}">0</div>
            <div class="stat-delta ${s.savings >= 0 ? "up" : "down"}">${s.savings >= 0 ? "↑ Ijobiy" : "↓ Salbiy"}</div>
          </div>
        </div>

        <div class="grid stat-grid secondary">
          <div class="card stat-card"><div class="stat-icon icon-blue">${ic("sun", 18)}</div><div class="stat-label">Bugungi xarajat</div><div class="stat-value countup" data-target="${s.todayExpense}">0</div></div>
          <div class="card stat-card"><div class="stat-icon icon-blue">${ic("calendar", 18)}</div><div class="stat-label">Haftalik xarajat</div><div class="stat-value countup" data-target="${s.weekExpense}">0</div></div>
          <div class="card stat-card"><div class="stat-icon icon-blue">${ic("barChart", 18)}</div><div class="stat-label">Oylik xarajat</div><div class="stat-value countup" data-target="${s.monthExpense}">0</div></div>
          <div class="card stat-card"><div class="stat-icon icon-blue">${ic("calendarRange", 18)}</div><div class="stat-label">Yillik xarajat</div><div class="stat-value countup" data-target="${s.yearExpense}">0</div></div>
        </div>

        <div class="two-col">
          <div class="card panel">
            <div class="panel-head"><h3>Oxirgi tranzaksiyalar</h3><a href="#/income" class="muted" data-route="income">Barchasi →</a></div>
            <div class="tx-list">${recent.length ? recent.map(txRowHtml).join("") : emptyStateHtml("Hozircha tranzaksiya yo'q", "inbox")}</div>
          </div>

          <div style="display:flex; flex-direction:column; gap:18px;">
            <div class="card quote-card">
              <div class="q-text">"${quote}"</div>
              <div class="q-label">Kunlik motivatsiya</div>
            </div>
            <div class="card panel">
              <div class="panel-head"><h3>Bugun qancha tejadingiz?</h3></div>
              <div style="font-family:var(--font-num); font-size:26px; font-weight:800; color:${(s.totalIncome / 30 - s.todayExpense) >= 0 ? "var(--success)" : "var(--danger)"};">
                ${Fmt.money(Math.max(0, (s.totalIncome / 30) - s.todayExpense))}
              </div>
              <div class="muted" style="font-size:12px; color:var(--text-faint); margin-top:4px;">O'rtacha kunlik daromadga nisbatan</div>
            </div>
            ${alerts.length ? `
            <div class="card panel">
              <div class="panel-head"><h3>Byudjet ogohlantirishi</h3></div>
              ${alerts.map(a => `
                <div style="margin-bottom:12px;">
                  <div style="display:flex; justify-content:space-between; font-size:12.5px; margin-bottom:6px;">
                    <span class="cell-with-icon">${catIcon(a.cat,14)}${a.cat}</span>
                    <span class="badge ${a.pct >= 1 ? "badge-danger" : "badge-warn"}">${Math.round(a.pct * 100)}%</span>
                  </div>
                  <div class="progress-track"><div class="progress-fill ${a.pct >= 1 ? "danger" : "warn"}" style="width:${Math.min(100, a.pct * 100)}%"></div></div>
                </div>`).join("")}
            </div>` : ""}
          </div>
        </div>

        <div class="card panel" style="margin-top:18px;">
          <div class="panel-head"><h3>Top 5 xarajat kategoriyasi</h3><a href="#/stats" class="muted" data-route="stats">Statistika →</a></div>
          <div class="tx-list">
            ${topCats.length ? topCats.map((c, i) => `
              <div class="tx-row">
                <div class="tx-avatar" style="background:${Charts.palette[i % Charts.palette.length]}22; color:${Charts.palette[i % Charts.palette.length]};">${catIcon(c.label,16)}</div>
                <div class="tx-info"><div class="tx-name">${Fmt.escape(c.label)}</div></div>
                <div class="tx-amount out">${Fmt.money(c.value)}</div>
              </div>`).join("") : emptyStateHtml("Ma'lumot yo'q", "barChart")}
          </div>
        </div>
      </div>`;
    },

    txList(type) {
      return `
      <div class="view">
        <div class="section-head">
          <div><h2>${type === "in" ? "Kirimlar" : "Chiqimlar"}</h2><p>${type === "in" ? "Barcha daromadlaringizni kuzating" : "Barcha xarajatlaringizni kuzating"}</p></div>
          <button class="btn btn-primary" id="btnAddTx" data-type="${type}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M12 5v14M5 12h14"/></svg>
            ${type === "in" ? "Kirim qo'shish" : "Chiqim qo'shish"}
          </button>
        </div>

        <div class="card panel">
          <div class="toolbar">
            <input type="text" id="txSearch" placeholder="Nomi bo'yicha qidirish...">
            <select id="txCategoryFilter">
              <option value="">Barcha kategoriyalar</option>
              ${(type === "in" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES).map(c => `<option value="${c}">${c}</option>`).join("")}
            </select>
            <input type="date" id="txDateFilter">
            <div class="spacer"></div>
            <select id="txSort">
              <option value="date_desc">Sana: yangi → eski</option>
              <option value="date_asc">Sana: eski → yangi</option>
              <option value="amount_desc">Miqdor: ko'p → kam</option>
              <option value="amount_asc">Miqdor: kam → ko'p</option>
            </select>
          </div>
          <div id="txTableWrap" class="tx-table-wrap"></div>
          <div id="txPagination" class="pagination"></div>
        </div>
      </div>`;
    },

    reports() {
      const s = computeStats();
      const tx = s.tx;
      const expenses = tx.filter(t => t.type === "out");
      const incomes = tx.filter(t => t.type === "in");
      const biggestExpense = expenses.reduce((m, t) => (t.amount > (m ? m.amount : -1) ? t : m), null);
      const biggestIncome = incomes.reduce((m, t) => (t.amount > (m ? m.amount : -1) ? t : m), null);
      const days = new Set(expenses.map(t => t.date)).size || 1;
      const avgDaily = s.totalExpense / days;
      const weeks = Math.max(1, Math.ceil(days / 7));
      const avgWeekly = s.totalExpense / weeks;
      const cats = categoryTotals(tx, "out");
      const mostActive = cats[0];
      const last30 = tx.filter(t => new Date(t.date) >= new Date(Date.now() - 30 * 86400000));
      const last30Expense = last30.filter(t => t.type === "out").reduce((s2, t) => s2 + t.amount, 0);
      const last30Income = last30.filter(t => t.type === "in").reduce((s2, t) => s2 + t.amount, 0);

      return `
      <div class="view">
        <div class="section-head"><div><h2>Hisobot</h2><p>Avtomatik hisoblangan moliyaviy ko'rsatkichlar</p></div></div>
        <div class="grid report-grid">
          <div class="card report-card">
            <div class="report-label">ENG KATTA XARAJAT</div>
            <div class="report-value">${biggestExpense ? Fmt.money(biggestExpense.amount) : "—"}</div>
            <div class="report-extra">${biggestExpense ? Fmt.escape(biggestExpense.name) + " · " + Fmt.date(biggestExpense.date) : "Ma'lumot yo'q"}</div>
          </div>
          <div class="card report-card">
            <div class="report-label">ENG KATTA KIRIM</div>
            <div class="report-value">${biggestIncome ? Fmt.money(biggestIncome.amount) : "—"}</div>
            <div class="report-extra">${biggestIncome ? Fmt.escape(biggestIncome.name) + " · " + Fmt.date(biggestIncome.date) : "Ma'lumot yo'q"}</div>
          </div>
          <div class="card report-card">
            <div class="report-label">O'RTACHA KUNLIK XARAJAT</div>
            <div class="report-value">${Fmt.money(avgDaily)}</div>
            <div class="report-extra">${days} ta faol kun asosida</div>
          </div>
          <div class="card report-card">
            <div class="report-label">O'RTACHA HAFTALIK XARAJAT</div>
            <div class="report-value">${Fmt.money(avgWeekly)}</div>
            <div class="report-extra">${weeks} ta hafta asosida</div>
          </div>
          <div class="card report-card">
            <div class="report-label">ENG FAOL KATEGORIYA</div>
            <div class="report-value">${mostActive ? Fmt.escape(mostActive.label) : "—"}</div>
            <div class="report-extra">${mostActive ? Fmt.money(mostActive.value) + " sarflangan" : "Ma'lumot yo'q"}</div>
          </div>
          <div class="card report-card">
            <div class="report-label">OXIRGI 30 KUN</div>
            <div class="report-value" style="color:var(--danger)">${Fmt.money(last30Expense)}</div>
            <div class="report-extra">Kirim: <span style="color:var(--success); font-weight:700;">${Fmt.money(last30Income)}</span></div>
          </div>
        </div>
      </div>`;
    },

    goals() {
      const goals = Store.getGoals() || [];
      return `
      <div class="view">
        <div class="section-head">
          <div><h2>Maqsadlar</h2><p>Jamg'arma maqsadlaringizni belgilang va kuzating</p></div>
          <button class="btn btn-primary" id="btnAddGoal">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M12 5v14M5 12h14"/></svg>
            Maqsad qo'shish
          </button>
        </div>
        <div class="grid goal-grid">
          ${goals.length ? goals.map(goalCardHtml).join("") : emptyStateHtml("Hali maqsad qo'shilmagan", "target")}
        </div>
      </div>`;
    },

    budget() {
      const budgets = Store.getBudgets() || {};
      const tx = Store.getTx() || [];
      const entries = Object.entries(budgets);
      return `
      <div class="view">
        <div class="section-head">
          <div><h2>Budjet</h2><p>Har oylik kategoriya bo'yicha xarajat chegaralari</p></div>
          <button class="btn btn-primary" id="btnAddBudget">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M12 5v14M5 12h14"/></svg>
            Budjet qo'shish
          </button>
        </div>
        <div class="grid" style="grid-template-columns:repeat(3,1fr);">
          ${entries.length ? entries.map(([cat, limit]) => budgetCardHtml(cat, limit, tx)).join("") : emptyStateHtml("Hali budjet belgilanmagan", "calendar")}
        </div>
      </div>`;
    },

    stats() {
      const tx = Store.getTx() || [];
      const expenseCats = categoryTotals(tx, "out");
      const incomeCats = categoryTotals(tx, "in");
      return `
      <div class="view">
        <div class="section-head"><div><h2>Statistika</h2><p>Vizual tahlil — barchasi Canvas orqali chizilgan</p></div></div>
        <div class="two-col">
          <div class="card chart-card">
            <div class="panel-head"><h3>Oylik xarajat dinamikasi</h3></div>
            <canvas class="chart-canvas" id="chartMonthlyBar" data-height="220"></canvas>
          </div>
          <div class="card chart-card">
            <div class="panel-head"><h3>Xarajatlar taqsimoti</h3></div>
            <canvas class="chart-canvas" id="chartExpensePie" data-height="220"></canvas>
            <div class="chart-legend" id="legendExpensePie"></div>
          </div>
        </div>
        <div class="two-col" style="margin-top:18px;">
          <div class="card chart-card">
            <div class="panel-head"><h3>Oxirgi 7 kunlik trend</h3></div>
            <canvas class="chart-canvas" id="chartTrendLine" data-height="220"></canvas>
          </div>
          <div class="card chart-card">
            <div class="panel-head"><h3>Kirim taqsimoti</h3></div>
            <canvas class="chart-canvas" id="chartIncomePie" data-height="220"></canvas>
            <div class="chart-legend" id="legendIncomePie"></div>
          </div>
        </div>
      </div>`;
    },

    settings() {
      const settings = Store.getSettings() || {};
      return `
      <div class="view">
        <div class="section-head"><div><h2>Sozlamalar</h2><p>Profil va ilova sozlamalari</p></div></div>
        <div class="two-col">
          <div class="card panel">
            <div class="panel-head"><h3>Profil</h3></div>
            <div style="display:flex; align-items:center; gap:16px; margin-bottom:18px;">
              <img src="${settings.avatar || "avatar.svg"}" style="width:64px; height:64px; border-radius:50%; object-fit:cover; border:1px solid var(--border);" id="settingsAvatarPreview">
              <div>
                <button class="btn btn-outline btn-sm" id="btnChangeAvatar">Avatar almashtirish</button>
                <input type="file" id="avatarInput" accept="image/*" style="display:none;">
              </div>
            </div>
            <div class="form-grid">
              <div class="field full"><label>Ism</label><input type="text" id="settingsName" value="${Fmt.escape(settings.userName || "")}"></div>
              <div class="field"><label>Valyuta (faqat UI)</label>
                <select id="settingsCurrency">
                  <option ${settings.currency === "UZS" ? "selected" : ""}>UZS</option>
                  <option ${settings.currency === "USD" ? "selected" : ""}>USD</option>
                  <option ${settings.currency === "EUR" ? "selected" : ""}>EUR</option>
                </select>
              </div>
              <div class="field"><label>Tungi rejim</label>
                <select id="settingsTheme">
                  <option value="light" ${!settings.darkMode ? "selected" : ""}>Kunduzgi</option>
                  <option value="dark" ${settings.darkMode ? "selected" : ""}>Tungi</option>
                </select>
              </div>
            </div>
            <div class="modal-actions" style="justify-content:flex-start; margin-top:20px;">
              <button class="btn btn-primary" id="btnSaveSettings">Saqlash</button>
            </div>
          </div>
          <div class="card panel">
            <div class="panel-head"><h3>Ma'lumotlar</h3></div>
            <p style="font-size:13px; color:var(--text-soft); line-height:1.6;">Barcha ma'lumotlar shu qurilmaning LocalStorage xotirasida saqlanadi va internetga yuborilmaydi.</p>
            <button class="btn btn-outline btn-sm" id="btnResetData" style="margin-top:8px;">Barcha ma'lumotlarni tozalash</button>
          </div>
        </div>
      </div>`;
    }
  };

  function inCurrentMonth(dateStr) {
    const d = new Date(dateStr + "T00:00:00");
    const now = new Date();
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
  }

  function emptyStateHtml(title, iconName) {
    return `<div class="empty-state"><div class="empty-icon">${ic(iconName, 34)}</div><div class="empty-title">${title}</div><div>Boshlash uchun yangi yozuv qo'shing</div></div>`;
  }

  function txRowHtml(t) {
    const icon = catIcon(t.category, 16);
    const color = t.type === "in" ? "var(--success)" : "var(--danger)";
    return `
    <div class="tx-row" data-id="${t.id}">
      <div class="tx-avatar" style="background:${t.type === "in" ? "rgba(34,197,94,.12)" : "rgba(239,68,68,.12)"}; color:${color};">${icon}</div>
      <div class="tx-info">
        <div class="tx-name">${Fmt.escape(t.name)}</div>
        <div class="tx-meta">${Fmt.escape(t.category)} · ${Fmt.date(t.date)}</div>
      </div>
      <div class="tx-amount ${t.type === "in" ? "in" : "out"}">${t.type === "in" ? "+" : "-"}${Fmt.money(t.amount, { noSuffix: false })}</div>
      <div class="tx-actions">
        <button class="tx-edit" title="Tahrirlash" data-id="${t.id}">${ic("pencil",14)}</button>
        <button class="tx-delete" title="O'chirish" data-id="${t.id}">${ic("trash",14)}</button>
      </div>
    </div>`;
  }

  function goalCardHtml(g) {
    const pct = Math.min(100, (g.current / g.target) * 100);
    const remain = Math.max(0, g.target - g.current);
    const daysLeft = Math.ceil((new Date(g.deadline) - new Date()) / 86400000);
    return `
    <div class="card goal-card" data-id="${g.id}">
      <div class="goal-top">
        <div>
          <div class="goal-name">${Fmt.escape(g.name)}</div>
          <div class="goal-sub">${daysLeft >= 0 ? "Tugash: " + Fmt.date(g.deadline) + " (" + daysLeft + " kun)" : "Muddat o'tgan"}</div>
        </div>
        <div class="goal-percent" style="color:${pct >= 100 ? "var(--success)" : "var(--primary)"}">${Math.round(pct)}%</div>
      </div>
      <div class="progress-track"><div class="progress-fill ${pct >= 100 ? "" : ""}" style="width:${pct}%"></div></div>
      <div class="goal-nums">
        <span>${Fmt.money(g.current)}</span>
        <span style="color:var(--text-faint)">/ ${Fmt.money(g.target)}</span>
      </div>
      <div class="goal-sub">Qolgan: <strong style="color:var(--text)">${Fmt.money(remain)}</strong></div>
      <div style="display:flex; gap:8px; margin-top:4px;">
        <button class="btn btn-outline btn-sm goal-contribute" data-id="${g.id}" style="flex:1;">+ Mablag' qo'shish</button>
        <button class="btn btn-outline btn-sm btn-icon-only goal-edit" data-id="${g.id}">${ic("pencil",14)}</button>
        <button class="btn btn-danger-ghost btn-sm btn-icon-only goal-delete" data-id="${g.id}">${ic("trash",14)}</button>
      </div>
    </div>`;
  }

  function budgetCardHtml(cat, limit, tx) {
    const spent = tx.filter(t => t.type === "out" && t.category === cat && inCurrentMonth(t.date)).reduce((s, t) => s + t.amount, 0);
    const pct = limit ? Math.min(100, (spent / limit) * 100) : 0;
    const level = spent / limit >= 1 ? "danger" : (spent / limit >= 0.8 ? "warn" : "ok");
    const badgeClass = level === "danger" ? "badge-danger" : level === "warn" ? "badge-warn" : "badge-ok";
    const fillClass = level === "danger" ? "danger" : level === "warn" ? "warn" : "";
    return `
    <div class="card budget-card" data-cat="${Fmt.escape(cat)}">
      <div class="budget-top">
        <div class="budget-cat">${catIcon(cat,15)} ${Fmt.escape(cat)}</div>
        <span class="badge ${badgeClass}">${Math.round((spent / limit) * 100) || 0}%</span>
      </div>
      <div class="progress-track"><div class="progress-fill ${fillClass}" style="width:${pct}%"></div></div>
      <div class="budget-amounts">${Fmt.money(spent)} / ${Fmt.money(limit)}</div>
      <div style="display:flex; gap:8px;">
        <button class="btn btn-outline btn-sm budget-edit" data-cat="${Fmt.escape(cat)}" style="flex:1;">Tahrirlash</button>
        <button class="btn btn-danger-ghost btn-sm btn-icon-only budget-delete" data-cat="${Fmt.escape(cat)}">${ic("trash",14)}</button>
      </div>
    </div>`;
  }

  /* ================= PAGE TITLES ================= */
  const PAGE_TITLES = {
    dashboard: "Dashboard", income: "Kirim", expense: "Chiqim", reports: "Hisobot",
    goals: "Maqsadlar", budget: "Budjet", stats: "Statistika", settings: "Sozlamalar"
  };

  /* ================= TRANSACTION TABLE STATE ================= */
  const TxTableState = { page: 1, perPage: 6, search: "", category: "", date: "", sort: "date_desc" };

  function renderTxTable(type) {
    const all = (Store.getTx() || []).filter(t => t.type === type);
    let filtered = all.filter(t => {
      if (TxTableState.search && !t.name.toLowerCase().includes(TxTableState.search.toLowerCase())) return false;
      if (TxTableState.category && t.category !== TxTableState.category) return false;
      if (TxTableState.date && t.date !== TxTableState.date) return false;
      return true;
    });
    const [sortKey, sortDir] = TxTableState.sort.split("_");
    filtered.sort((a, b) => {
      let cmp = sortKey === "date" ? a.date.localeCompare(b.date) : a.amount - b.amount;
      return sortDir === "asc" ? cmp : -cmp;
    });

    const totalPages = Math.max(1, Math.ceil(filtered.length / TxTableState.perPage));
    TxTableState.page = Math.min(TxTableState.page, totalPages);
    const pageItems = filtered.slice((TxTableState.page - 1) * TxTableState.perPage, TxTableState.page * TxTableState.perPage);

    const wrap = document.getElementById("txTableWrap");
    if (!wrap) return;
    if (!filtered.length) {
      wrap.innerHTML = emptyStateHtml("Natija topilmadi", "search");
    } else {
      wrap.innerHTML = `
      <table class="tx-table">
        <thead><tr>
          <th data-sort="name">Nomi</th><th data-sort="category">Kategoriya</th>
          <th data-sort="date">Sana</th><th>Izoh</th><th data-sort="amount">Miqdor</th><th></th>
        </tr></thead>
        <tbody>
          ${pageItems.map(t => `
            <tr data-id="${t.id}">
              <td><strong>${Fmt.escape(t.name)}</strong></td>
              <td><span class="cell-with-icon">${catIcon(t.category,14)}${Fmt.escape(t.category)}</span></td>
              <td>${Fmt.date(t.date)}</td>
              <td style="color:var(--text-faint); max-width:160px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${Fmt.escape(t.note || "—")}</td>
              <td class="tx-amount ${t.type === "in" ? "in" : "out"}">${t.type === "in" ? "+" : "-"}${Fmt.money(t.amount)}</td>
              <td>
                <div class="tx-actions" style="opacity:1;">
                  <button class="tx-edit" data-id="${t.id}" title="Tahrirlash">${ic("pencil",14)}</button>
                  <button class="tx-delete" data-id="${t.id}" title="O'chirish">${ic("trash",14)}</button>
                </div>
              </td>
            </tr>`).join("")}
        </tbody>
      </table>`;
    }

    const pag = document.getElementById("txPagination");
    if (pag) {
      let html = "";
      for (let i = 1; i <= totalPages; i++) {
        html += `<button class="${i === TxTableState.page ? "active" : ""}" data-page="${i}">${i}</button>`;
      }
      pag.innerHTML = html;
    }
  }

  /* ================= ROUTER ================= */
  const Router = {
    current: "dashboard",
    routes: {
      dashboard: Views.dashboard, income: () => Views.txList("in"), expense: () => Views.txList("out"),
      reports: Views.reports, goals: Views.goals, budget: Views.budget, stats: Views.stats, settings: Views.settings
    },
    go(route) {
      if (!this.routes[route]) route = "dashboard";
      this.current = route;
      const main = document.getElementById("main");
      main.innerHTML = this.routes[route]();
      document.getElementById("pageTitle").textContent = PAGE_TITLES[route];
      this.updateNavActive(route);
      this.postRender(route);
      window.scrollTo({ top: 0, behavior: "smooth" });
      const sidebar = document.getElementById("sidebar");
      sidebar.classList.remove("mobile-open");
    },
    updateNavActive(route) {
      document.querySelectorAll(".nav-item").forEach(a => a.classList.toggle("active", a.dataset.route === route));
      const activeItem = document.querySelector('.nav-item[data-route="' + route + '"]');
      const indicator = document.getElementById("navIndicator");
      if (activeItem && indicator) {
        indicator.style.transform = "translateY(" + activeItem.offsetTop + "px)";
      }
    },
    postRender(route) {
      // count-up animations
      document.querySelectorAll(".countup").forEach(el => {
        countUp(el, parseFloat(el.dataset.target || "0"));
      });
      if (route === "income" || route === "expense") {
        const type = route === "income" ? "in" : "out";
        TxTableState.page = 1; TxTableState.search = ""; TxTableState.category = ""; TxTableState.date = "";
        renderTxTable(type);
        bindTxListEvents(type);
      }
      if (route === "stats") renderStatsCharts();
      if (route === "dashboard") bindDashboardEvents();
      if (route === "goals") bindGoalsEvents();
      if (route === "budget") bindBudgetEvents();
      if (route === "settings") bindSettingsEvents();
      bindTxRowActions();
    }
  };

  function renderStatsCharts() {
    const tx = Store.getTx() || [];
    const expenseCats = categoryTotals(tx, "out");
    const incomeCats = categoryTotals(tx, "in");
    Charts.bar(document.getElementById("chartMonthlyBar"), monthlySeries(tx).map((d, i) => ({ ...d, color: Charts.palette[0] })));
    Charts.line(document.getElementById("chartTrendLine"), last30DaysSeries(tx));
    Charts.pie(document.getElementById("chartExpensePie"), expenseCats.map((d, i) => ({ ...d, color: Charts.palette[i % Charts.palette.length] })));
    Charts.pie(document.getElementById("chartIncomePie"), incomeCats.map((d, i) => ({ ...d, color: Charts.palette[(i + 3) % Charts.palette.length] })));
    renderLegend("legendExpensePie", expenseCats);
    renderLegend("legendIncomePie", incomeCats);
  }
  function renderLegend(id, cats) {
    const el = document.getElementById(id);
    if (!el) return;
    if (!cats.length) { el.innerHTML = '<span style="color:var(--text-faint); font-size:12px;">Ma\'lumot yo\'q</span>'; return; }
    el.innerHTML = cats.map((c, i) => `<div class="legend-item"><span class="legend-dot" style="background:${Charts.palette[i % Charts.palette.length]}"></span>${Fmt.escape(c.label)}</div>`).join("");
  }

  /* ================= EVENT BINDINGS ================= */
  function bindTxRowActions() {
    document.querySelectorAll(".tx-edit").forEach(btn => btn.addEventListener("click", () => openTxModal(btn.dataset.id)));
    document.querySelectorAll(".tx-delete").forEach(btn => btn.addEventListener("click", () => confirmDeleteTx(btn.dataset.id)));
  }

  function bindDashboardEvents() {
    const btn = document.getElementById("btnAddTxDash");
    if (btn) btn.addEventListener("click", () => openTxModal(null, "out"));
  }

  function bindTxListEvents(type) {
    const addBtn = document.getElementById("btnAddTx");
    if (addBtn) addBtn.addEventListener("click", () => openTxModal(null, type));
    const search = document.getElementById("txSearch");
    const catFilter = document.getElementById("txCategoryFilter");
    const dateFilter = document.getElementById("txDateFilter");
    const sortSel = document.getElementById("txSort");
    if (search) search.addEventListener("input", () => { TxTableState.search = search.value; TxTableState.page = 1; renderTxTable(type); bindTxRowActions(); });
    if (catFilter) catFilter.addEventListener("change", () => { TxTableState.category = catFilter.value; TxTableState.page = 1; renderTxTable(type); bindTxRowActions(); });
    if (dateFilter) dateFilter.addEventListener("change", () => { TxTableState.date = dateFilter.value; TxTableState.page = 1; renderTxTable(type); bindTxRowActions(); });
    if (sortSel) sortSel.addEventListener("change", () => { TxTableState.sort = sortSel.value; renderTxTable(type); bindTxRowActions(); });
    const pag = document.getElementById("txPagination");
    if (pag) pag.addEventListener("click", (e) => {
      const b = e.target.closest("button[data-page]");
      if (!b) return;
      TxTableState.page = parseInt(b.dataset.page, 10);
      renderTxTable(type); bindTxRowActions();
    });
    const wrapEl = document.getElementById("txTableWrap");
    if (wrapEl) wrapEl.addEventListener("click", (e) => {
      const th = e.target.closest("th[data-sort]");
      if (!th) return;
      const key = th.dataset.sort;
      if (key === "name" || key === "category") return;
      const parts = TxTableState.sort.split("_");
      const curKey = parts[0], curDir = parts[1];
      TxTableState.sort = key + "_" + (curKey === key && curDir === "desc" ? "asc" : "desc");
      const sortSel = document.getElementById("txSort");
      if (sortSel) sortSel.value = TxTableState.sort;
      renderTxTable(type); bindTxRowActions();
    });
  }

  function openTxModal(id, presetType) {
    const tx = Store.getTx() || [];
    const editing = id ? tx.find(t => t.id === id) : null;
    const type = editing ? editing.type : (presetType || "out");
    const cats = type === "in" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
    const html = `
      <div class="modal-head"><h3>${editing ? "Tranzaksiyani tahrirlash" : "Yangi tranzaksiya"}</h3><button class="modal-close">${ic("x",16)}</button></div>
      <div class="type-toggle" style="margin-bottom:16px;">
        <button type="button" class="type-in ${type === "in" ? "active-in" : ""}" data-type="in">${ic("arrowDownCircle",15)} Kirim</button>
        <button type="button" class="type-out ${type === "out" ? "active-out" : ""}" data-type="out">${ic("arrowUpCircle",15)} Chiqim</button>
      </div>
      <div class="form-grid">
        <div class="field full"><label>Nomi</label><input type="text" id="fName" value="${editing ? Fmt.escape(editing.name) : ""}" placeholder="Masalan: Oylik maosh"><div class="field-error-msg"></div></div>
        <div class="field"><label>Miqdori (so'm)</label><input type="number" id="fAmount" value="${editing ? editing.amount : ""}" placeholder="0" min="0"><div class="field-error-msg"></div></div>
        <div class="field"><label>Sana</label><input type="date" id="fDate" value="${editing ? editing.date : new Date().toISOString().slice(0, 10)}"><div class="field-error-msg"></div></div>
        <div class="field full"><label>Kategoriya</label>
          <select id="fCategory">${cats.map(c => `<option value="${c}" ${editing && editing.category === c ? "selected" : ""}>${c}</option>`).join("")}</select>
          <div class="field-error-msg"></div>
        </div>
        <div class="field full"><label>Izoh (ixtiyoriy)</label><textarea id="fNote" placeholder="Qo'shimcha izoh...">${editing ? Fmt.escape(editing.note || "") : ""}</textarea></div>
      </div>
      <div class="modal-actions">
        <button class="btn btn-outline modal-close">Bekor qilish</button>
        <button class="btn btn-primary" id="btnSaveTx">${editing ? "Saqlash" : "Qo'shish"}</button>
      </div>`;
    Modal.open(html);
    let currentType = type;
    document.querySelectorAll(".type-toggle button").forEach(b => {
      b.addEventListener("click", () => {
        currentType = b.dataset.type;
        document.querySelectorAll(".type-toggle button").forEach(x => x.classList.remove("active-in", "active-out"));
        b.classList.add(b.dataset.type === "in" ? "active-in" : "active-out");
        const catSel = document.getElementById("fCategory");
        const newCats = currentType === "in" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
        catSel.innerHTML = newCats.map(c => `<option value="${c}">${c}</option>`).join("");
      });
    });
    document.querySelectorAll(".modal-close").forEach(b => b.addEventListener("click", () => Modal.close()));
    document.getElementById("btnSaveTx").addEventListener("click", () => {
      const nameInput = document.getElementById("fName");
      const amountInput = document.getElementById("fAmount");
      const dateInput = document.getElementById("fDate");
      const catInput = document.getElementById("fCategory");
      let valid = true;
      valid = validateField(nameInput, "required") && valid;
      valid = validateField(amountInput, "positive") && valid;
      valid = validateField(dateInput, "required") && valid;
      valid = validateField(catInput, "required") && valid;
      if (!valid) { Toast.error("Xatolik", "Iltimos, barcha maydonlarni to'g'ri to'ldiring"); return; }
      const data = {
        name: nameInput.value.trim(),
        amount: parseFloat(amountInput.value),
        date: dateInput.value,
        category: catInput.value,
        note: document.getElementById("fNote").value.trim(),
        type: currentType
      };
      let all = Store.getTx() || [];
      if (editing) {
        all = all.map(t => t.id === editing.id ? { ...t, ...data } : t);
        Toast.success("Yangilandi", "Tranzaksiya muvaffaqiyatli tahrirlandi");
      } else {
        all.push({ id: uid(), ...data });
        Toast.success("Qo'shildi", "Yangi tranzaksiya saqlandi");
      }
      Store.setTx(all);
      Modal.close();
      Router.go(Router.current);
    });
  }

  function confirmDeleteTx(id) {
    const html = `
      <div class="modal-head"><h3>O'chirishni tasdiqlang</h3><button class="modal-close">${ic("x",16)}</button></div>
      <p style="font-size:13.5px; color:var(--text-soft);">Ushbu tranzaksiyani o'chirmoqchimisiz? Bu amalni qaytarib bo'lmaydi.</p>
      <div class="modal-actions">
        <button class="btn btn-outline modal-close">Bekor qilish</button>
        <button class="btn btn-primary" id="btnConfirmDelete" style="background:linear-gradient(135deg,var(--danger),#F87171)">O'chirish</button>
      </div>`;
    Modal.open(html);
    document.querySelectorAll(".modal-close").forEach(b => b.addEventListener("click", () => Modal.close()));
    document.getElementById("btnConfirmDelete").addEventListener("click", () => {
      const all = (Store.getTx() || []).filter(t => t.id !== id);
      Store.setTx(all);
      Modal.close();
      Toast.info("O'chirildi", "Tranzaksiya o'chirildi");
      Router.go(Router.current);
    });
  }

  /* ---- Goals ---- */
  function bindGoalsEvents() {
    const addBtn = document.getElementById("btnAddGoal");
    if (addBtn) addBtn.addEventListener("click", () => openGoalModal(null));
    document.querySelectorAll(".goal-edit").forEach(b => b.addEventListener("click", () => openGoalModal(b.dataset.id)));
    document.querySelectorAll(".goal-delete").forEach(b => b.addEventListener("click", () => {
      const all = (Store.getGoals() || []).filter(g => g.id !== b.dataset.id);
      Store.setGoals(all); Toast.info("O'chirildi", "Maqsad o'chirildi"); Router.go("goals");
    }));
    document.querySelectorAll(".goal-contribute").forEach(b => b.addEventListener("click", () => openContributeModal(b.dataset.id)));
  }

  function openGoalModal(id) {
    const goals = Store.getGoals() || [];
    const editing = id ? goals.find(g => g.id === id) : null;
    const html = `
      <div class="modal-head"><h3>${editing ? "Maqsadni tahrirlash" : "Yangi maqsad"}</h3><button class="modal-close">${ic("x",16)}</button></div>
      <div class="form-grid">
        <div class="field full"><label>Maqsad nomi</label><input type="text" id="gName" value="${editing ? Fmt.escape(editing.name) : ""}" placeholder="Masalan: Yangi noutbuk"><div class="field-error-msg"></div></div>
        <div class="field"><label>Maqsad summasi</label><input type="number" id="gTarget" value="${editing ? editing.target : ""}" min="1"><div class="field-error-msg"></div></div>
        <div class="field"><label>Hozirgi jamg'arma</label><input type="number" id="gCurrent" value="${editing ? editing.current : 0}" min="0"><div class="field-error-msg"></div></div>
        <div class="field full"><label>Tugash sanasi</label><input type="date" id="gDeadline" value="${editing ? editing.deadline : ""}"><div class="field-error-msg"></div></div>
      </div>
      <div class="modal-actions">
        <button class="btn btn-outline modal-close">Bekor qilish</button>
        <button class="btn btn-primary" id="btnSaveGoal">${editing ? "Saqlash" : "Qo'shish"}</button>
      </div>`;
    Modal.open(html);
    document.querySelectorAll(".modal-close").forEach(b => b.addEventListener("click", () => Modal.close()));
    document.getElementById("btnSaveGoal").addEventListener("click", () => {
      const nameInput = document.getElementById("gName");
      const targetInput = document.getElementById("gTarget");
      const currentInput = document.getElementById("gCurrent");
      const deadlineInput = document.getElementById("gDeadline");
      let valid = true;
      valid = validateField(nameInput, "required") && valid;
      valid = validateField(targetInput, "positive") && valid;
      valid = validateField(deadlineInput, "required") && valid;
      if (!valid) { Toast.error("Xatolik", "Barcha maydonlarni to'ldiring"); return; }
      const data = {
        name: nameInput.value.trim(), target: parseFloat(targetInput.value),
        current: Math.max(0, parseFloat(currentInput.value) || 0), deadline: deadlineInput.value
      };
      let all = Store.getGoals() || [];
      if (editing) all = all.map(g => g.id === editing.id ? { ...g, ...data } : g);
      else all.push({ id: uid(), ...data });
      Store.setGoals(all);
      Modal.close();
      Toast.success(editing ? "Yangilandi" : "Qo'shildi", "Maqsad saqlandi");
      Router.go("goals");
      if (data.current >= data.target) launchConfetti();
    });
  }

  function openContributeModal(id) {
    const goals = Store.getGoals() || [];
    const goal = goals.find(g => g.id === id);
    if (!goal) return;
    const html = `
      <div class="modal-head"><h3>Mablag' qo'shish</h3><button class="modal-close">${ic("x",16)}</button></div>
      <p style="font-size:13px; color:var(--text-soft); margin-bottom:14px;">"${Fmt.escape(goal.name)}" maqsadiga qancha mablag' qo'shmoqchisiz?</p>
      <div class="field"><label>Miqdor</label><input type="number" id="cAmount" min="1" placeholder="0"><div class="field-error-msg"></div></div>
      <div class="modal-actions">
        <button class="btn btn-outline modal-close">Bekor qilish</button>
        <button class="btn btn-primary" id="btnConfirmContribute">Qo'shish</button>
      </div>`;
    Modal.open(html);
    document.querySelectorAll(".modal-close").forEach(b => b.addEventListener("click", () => Modal.close()));
    document.getElementById("btnConfirmContribute").addEventListener("click", () => {
      const input = document.getElementById("cAmount");
      if (!validateField(input, "positive")) { Toast.error("Xatolik", "To'g'ri miqdor kiriting"); return; }
      const amount = parseFloat(input.value);
      const all = Store.getGoals() || [];
      const updated = all.map(g => g.id === id ? { ...g, current: g.current + amount } : g);
      Store.setGoals(updated);
      Modal.close();
      Router.go("goals");
      const newGoal = updated.find(g => g.id === id);
      if (newGoal.current >= newGoal.target) { launchConfetti(); Toast.success("Tabriklaymiz!", "Maqsadga erishildi!"); }
      else Toast.success("Qo'shildi", "Mablag' muvaffaqiyatli qo'shildi");
    });
  }

  /* ---- Budget ---- */
  function bindBudgetEvents() {
    const addBtn = document.getElementById("btnAddBudget");
    if (addBtn) addBtn.addEventListener("click", () => openBudgetModal(null));
    document.querySelectorAll(".budget-edit").forEach(b => b.addEventListener("click", () => openBudgetModal(b.dataset.cat)));
    document.querySelectorAll(".budget-delete").forEach(b => b.addEventListener("click", () => {
      const budgets = Store.getBudgets() || {};
      delete budgets[b.dataset.cat];
      Store.setBudgets(budgets);
      Toast.info("O'chirildi", "Budjet o'chirildi");
      Router.go("budget");
    }));
  }

  function openBudgetModal(cat) {
    const budgets = Store.getBudgets() || {};
    const editing = cat !== null && cat !== undefined;
    const usedCats = Object.keys(budgets);
    const availableCats = EXPENSE_CATEGORIES.filter(c => editing ? c === cat : !usedCats.includes(c));
    const html = `
      <div class="modal-head"><h3>${editing ? "Budjetni tahrirlash" : "Yangi budjet"}</h3><button class="modal-close">${ic("x",16)}</button></div>
      <div class="form-grid">
        <div class="field full"><label>Kategoriya</label>
          <select id="bCategory" ${editing ? "disabled" : ""}>${(availableCats.length ? availableCats : EXPENSE_CATEGORIES).map(c => `<option value="${c}" ${editing && c === cat ? "selected" : ""}>${c}</option>`).join("")}</select>
        </div>
        <div class="field full"><label>Oylik limit (so'm)</label><input type="number" id="bLimit" value="${editing ? budgets[cat] : ""}" min="1"><div class="field-error-msg"></div></div>
      </div>
      <div class="modal-actions">
        <button class="btn btn-outline modal-close">Bekor qilish</button>
        <button class="btn btn-primary" id="btnSaveBudget">${editing ? "Saqlash" : "Qo'shish"}</button>
      </div>`;
    Modal.open(html);
    document.querySelectorAll(".modal-close").forEach(b => b.addEventListener("click", () => Modal.close()));
    document.getElementById("btnSaveBudget").addEventListener("click", () => {
      const limitInput = document.getElementById("bLimit");
      if (!validateField(limitInput, "positive")) { Toast.error("Xatolik", "To'g'ri limit kiriting"); return; }
      const selectedCat = editing ? cat : document.getElementById("bCategory").value;
      const all = Store.getBudgets() || {};
      all[selectedCat] = parseFloat(limitInput.value);
      Store.setBudgets(all);
      Modal.close();
      Toast.success("Saqlandi", "Budjet saqlandi");
      Router.go("budget");
    });
  }

  /* ---- Settings ---- */
  function bindSettingsEvents() {
    const avatarBtn = document.getElementById("btnChangeAvatar");
    const avatarInput = document.getElementById("avatarInput");
    if (avatarBtn) avatarBtn.addEventListener("click", () => avatarInput.click());
    if (avatarInput) avatarInput.addEventListener("change", () => {
      const file = avatarInput.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        document.getElementById("settingsAvatarPreview").src = reader.result;
        const settings = Store.getSettings() || {};
        settings.avatar = reader.result;
        Store.setSettings(settings);
        document.getElementById("avatarImg").src = reader.result;
        Toast.success("Yangilandi", "Avatar o'zgartirildi");
      };
      reader.readAsDataURL(file);
    });
    const saveBtn = document.getElementById("btnSaveSettings");
    if (saveBtn) saveBtn.addEventListener("click", () => {
      const settings = Store.getSettings() || {};
      settings.userName = document.getElementById("settingsName").value.trim() || "Foydalanuvchi";
      settings.currency = document.getElementById("settingsCurrency").value;
      const wantDark = document.getElementById("settingsTheme").value === "dark";
      settings.darkMode = wantDark;
      Store.setSettings(settings);
      applyTheme(wantDark);
      document.getElementById("dropdownName").textContent = settings.userName;
      const acc = Auth.get();
      if (acc) { acc.name = settings.userName; Auth.set(acc); }
      Toast.success("Saqlandi", "Sozlamalar yangilandi");
    });
    const resetBtn = document.getElementById("btnResetData");
    if (resetBtn) resetBtn.addEventListener("click", () => {
      const html = `
        <div class="modal-head"><h3>Diqqat!</h3><button class="modal-close">${ic("x",16)}</button></div>
        <p style="font-size:13.5px; color:var(--text-soft);">Barcha ma'lumotlar (tranzaksiyalar, maqsadlar, budjetlar) butunlay o'chiriladi. Davom etasizmi?</p>
        <div class="modal-actions">
          <button class="btn btn-outline modal-close">Bekor qilish</button>
          <button class="btn btn-primary" id="btnConfirmReset" style="background:linear-gradient(135deg,var(--danger),#F87171)">Ha, tozalash</button>
        </div>`;
      Modal.open(html);
      document.querySelectorAll(".modal-close").forEach(b => b.addEventListener("click", () => Modal.close()));
      document.getElementById("btnConfirmReset").addEventListener("click", () => {
        localStorage.removeItem(Store.keys.tx);
        localStorage.removeItem(Store.keys.goals);
        localStorage.removeItem(Store.keys.budgets);
        seedIfEmpty();
        Modal.close();
        Toast.success("Tozalandi", "Ma'lumotlar tiklandi");
        Router.go("dashboard");
      });
    });
  }

  /* ================= THEME ================= */
  function applyTheme(dark) {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    const settings = Store.getSettings() || {};
    settings.darkMode = dark;
    Store.setSettings(settings);
  }

  /* ================= GLOBAL SEARCH ================= */
  function setupGlobalSearch() {
    const input = document.getElementById("globalSearch");
    const results = document.getElementById("searchResults");
    input.addEventListener("input", () => {
      const q = input.value.trim().toLowerCase();
      if (!q) { results.classList.remove("show"); results.innerHTML = ""; return; }
      const tx = Store.getTx() || [];
      const matches = tx.filter(t => t.name.toLowerCase().includes(q) || t.category.toLowerCase().includes(q)).slice(0, 8);
      if (!matches.length) {
        results.innerHTML = '<div class="search-empty">Hech narsa topilmadi</div>';
      } else {
        results.innerHTML = matches.map(t => `
          <div class="search-item" data-id="${t.id}" data-type="${t.type}">
            <div><div class="si-name">${Fmt.escape(t.name)}</div><div class="si-meta">${Fmt.escape(t.category)} · ${Fmt.date(t.date)}</div></div>
            <div class="tx-amount ${t.type === "in" ? "in" : "out"}">${t.type === "in" ? "+" : "-"}${Fmt.money(t.amount)}</div>
          </div>`).join("");
      }
      results.classList.add("show");
    });
    results.addEventListener("click", (e) => {
      const item = e.target.closest(".search-item");
      if (!item) return;
      window.location.hash = "#/" + (item.dataset.type === "in" ? "income" : "expense");
      results.classList.remove("show");
      input.value = "";
    });
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".header-search")) results.classList.remove("show");
    });
  }

  /* ================= HEADER CLOCK / DATE ================= */
  function startClock() {
    function tick() {
      const now = new Date();
      document.getElementById("headerClock").textContent = now.toLocaleTimeString("uz-UZ", { hour12: false });
      document.getElementById("headerDate").textContent = Fmt.longDate(now);
    }
    tick();
    setInterval(tick, 1000);
  }

  /* ================= SIDEBAR QUOTE ================= */
  function setMiniQuote() {
    const el = document.getElementById("miniQuote");
    if (!el) return;
    const quote = QUOTES[new Date().getDate() % QUOTES.length];
    el.innerHTML = '<span class="mini-quote-icon">' + ic("quote", 14) + '</span><span>' + Fmt.escape(quote) + '</span>';
  }

  /* ================= NOTIFICATIONS (budget alerts as demo notifications) ================= */
  function checkNotifications() {
    const tx = Store.getTx() || [];
    const budgets = Store.getBudgets() || {};
    const hasAlert = Object.entries(budgets).some(([cat, limit]) => {
      const spent = tx.filter(t => t.type === "out" && t.category === cat && inCurrentMonth(t.date)).reduce((s, t) => s + t.amount, 0);
      return limit && spent / limit >= 0.8;
    });
    document.getElementById("notifDot").classList.toggle("show", hasAlert);
  }

  /* ================= APP INIT (runs once, after successful login) ================= */
  let appStarted = false;
  function initApp() {
    if (appStarted) return;
    appStarted = true;

    const settings = Store.getSettings() || {};
    document.getElementById("dropdownName").textContent = settings.userName || "Foydalanuvchi";
    if (settings.avatar) document.getElementById("avatarImg").src = settings.avatar;

    // sidebar collapse
    document.getElementById("sidebarToggle").addEventListener("click", () => {
      document.getElementById("sidebar").classList.toggle("collapsed");
      setTimeout(() => Router.updateNavActive(Router.current), 0);
    });
    document.getElementById("mobileMenuBtn").addEventListener("click", () => {
      document.getElementById("sidebar").classList.toggle("mobile-open");
    });

    // dark mode toggle
    document.getElementById("darkModeBtn").addEventListener("click", () => {
      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      applyTheme(!isDark);
      Toast.info(isDark ? "Kunduzgi rejim" : "Tungi rejim", "Ko'rinish o'zgartirildi");
    });

    // user dropdown
    document.getElementById("avatarImg").addEventListener("click", (e) => {
      e.stopPropagation();
      document.getElementById("userDropdown").classList.toggle("show");
    });
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".user-menu")) document.getElementById("userDropdown").classList.remove("show");
    });
    document.getElementById("notifBtn").addEventListener("click", () => {
      Toast.info("Bildirishnomalar", "Byudjet chegaralariga yaqinlashgan kategoriyalarni Dashboard sahifasida ko'ring");
    });
    document.getElementById("printBtn").addEventListener("click", (e) => { e.preventDefault(); window.print(); });
    document.getElementById("exportPdfBtn").addEventListener("click", (e) => { e.preventDefault(); Toast.info("PDF eksport", "Eksport funksiyasi tez orada faollashtiriladi"); });
    document.getElementById("exportExcelBtn").addEventListener("click", (e) => { e.preventDefault(); Toast.info("Excel eksport", "Eksport funksiyasi tez orada faollashtiriladi"); });
    document.getElementById("logoutBtn").addEventListener("click", (e) => {
      e.preventDefault();
      Auth.logout();
      window.location.href = "login.html";
    });

    setMiniQuote();
    setupGlobalSearch();
    startClock();
    checkNotifications();

    // router
    window.addEventListener("hashchange", () => {
      const route = (window.location.hash.replace("#/", "") || "dashboard");
      Router.go(route);
      checkNotifications();
    });
    const initialRoute = window.location.hash.replace("#/", "") || "dashboard";
    Router.go(initialRoute);
  }

  /* ================= AUTH SCREEN LOGIC ================= */
  /* ================= BOOTSTRAP (always runs on load) ================= */
  function bootstrap() {
    // Not logged in? Bounce to the standalone login page immediately.
    if (!Auth.isRegistered() || !Auth.isLoggedIn()) {
      window.location.href = "login.html";
      return;
    }

    seedIfEmpty();
    const settings = Store.getSettings() || {};
    applyTheme(!!settings.darkMode);

    initApp();

    setTimeout(() => {
      document.getElementById("loading-screen").classList.add("hide");
    }, 900);
  }

  document.addEventListener("DOMContentLoaded", bootstrap);
})();