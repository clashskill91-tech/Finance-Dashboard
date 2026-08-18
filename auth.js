/* ===================================================================
   SMART FINANCE DASHBOARD — SHARED STORAGE & AUTH MODULE
   Loaded by BOTH login.html and index.html (before script.js).
   Client-side only demo auth: credentials live in this browser's
   LocalStorage and never leave the device.
=================================================================== */

const Store = {
  keys: { tx: "sfd_transactions", goals: "sfd_goals", budgets: "sfd_budgets", settings: "sfd_settings", auth: "sfd_auth" },
  load(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) { return fallback; }
  },
  save(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) { /* quota / private mode */ }
  },
  getTx() { return this.load(this.keys.tx, null); },
  setTx(v) { this.save(this.keys.tx, v); },
  getGoals() { return this.load(this.keys.goals, null); },
  setGoals(v) { this.save(this.keys.goals, v); },
  getBudgets() { return this.load(this.keys.budgets, null); },
  setBudgets(v) { this.save(this.keys.budgets, v); },
  getSettings() { return this.load(this.keys.settings, null); },
  setSettings(v) { this.save(this.keys.settings, v); }
};

function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 8); }

const Auth = {
  sessionKey: "sfd_session",
  get() { return Store.load(Store.keys.auth, null); },
  set(v) { Store.save(Store.keys.auth, v); },
  clear() { localStorage.removeItem(Store.keys.auth); },
  encode(pw) {
    try { return btoa(unescape(encodeURIComponent(pw))); } catch (e) { return pw; }
  },
  isRegistered() { return !!this.get(); },
  isLoggedIn() {
    return localStorage.getItem(this.sessionKey) === "1" || sessionStorage.getItem(this.sessionKey) === "1";
  },
  login(remember) {
    if (remember) localStorage.setItem(this.sessionKey, "1");
    else sessionStorage.setItem(this.sessionKey, "1");
  },
  logout() {
    localStorage.removeItem(this.sessionKey);
    sessionStorage.removeItem(this.sessionKey);
  },
  register(name, username, password) {
    this.set({ name, username, password: this.encode(password) });
  },
  verify(username, password) {
    const acc = this.get();
    if (!acc) return false;
    return acc.username.toLowerCase() === username.toLowerCase() && acc.password === this.encode(password);
  }
};