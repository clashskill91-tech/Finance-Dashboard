/* ===================================================================
   LOGIN PAGE LOGIC (login.html)
   Handles tab switching, validation, register/login, and redirect
   to the main app (index.html) once authenticated.
=================================================================== */
(function () {
  "use strict";

  function validateField(input, rule) {
    const field = input.closest(".field");
    let valid = true, msg = "";
    const val = input.value.trim();
    if (rule === "required" && val === "") { valid = false; msg = "Bu maydon bo'sh bo'lishi mumkin emas"; }
    if (field) {
      field.classList.toggle("error", !valid);
      const msgEl = field.querySelector(".field-error-msg");
      if (msgEl) msgEl.textContent = msg;
    }
    return valid;
  }

  function setFieldError(input, msg) {
    const field = input.closest(".field");
    if (!field) return;
    field.classList.add("error");
    const msgEl = field.querySelector(".field-error-msg");
    if (msgEl) msgEl.textContent = msg;
  }

  function setAuthMode(mode) {
    const tabs = document.querySelectorAll(".auth-tab");
    const indicator = document.getElementById("authTabIndicator");
    tabs.forEach(t => t.classList.toggle("active", t.dataset.mode === mode));
    indicator.style.transform = mode === "register" ? "translateX(100%)" : "translateX(0)";
    document.getElementById("loginForm").style.display = mode === "login" ? "flex" : "none";
    document.getElementById("registerForm").style.display = mode === "register" ? "flex" : "none";
    const title = document.getElementById("authTitle");
    const subtitle = document.getElementById("authSubtitle");
    if (title && subtitle) {
      if (mode === "register") {
        title.textContent = "Hisob yarating";
        subtitle.textContent = "Bir necha soniyada boshlashga tayyor bo'ling";
      } else {
        title.textContent = "Xush kelibsiz";
        subtitle.textContent = "Davom etish uchun hisobingizga kiring";
      }
    }
    setAuthHint("");
  }

  function setAuthHint(msg, type) {
    const hint = document.getElementById("authHint");
    hint.textContent = msg;
    hint.className = "auth-hint" + (type ? " " + type : "");
  }

  function goToApp() {
    window.location.href = "index.html";
  }

  function init() {
    // Match the saved theme preference (the branded left panel stays dark regardless).
    const settings = Store.getSettings() || {};
    document.documentElement.setAttribute("data-theme", settings.darkMode ? "dark" : "light");

    // Do not auto-send users to the app from the login screen.
    // The app itself will protect the dashboard when a valid session exists.
    setAuthMode(Auth.isRegistered() ? "login" : "register");

    document.querySelectorAll(".auth-tab").forEach(tab => {
      tab.addEventListener("click", () => setAuthMode(tab.dataset.mode));
    });

    document.querySelectorAll(".pw-toggle").forEach(btn => {
      btn.addEventListener("click", () => {
        const input = document.getElementById(btn.dataset.target);
        const isPw = input.type === "password";
        input.type = isPw ? "text" : "password";
        btn.style.color = isPw ? "var(--primary)" : "";
      });
    });

    document.getElementById("loginForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const userInput = document.getElementById("loginUsername");
      const passInput = document.getElementById("loginPassword");
      let valid = true;
      valid = validateField(userInput, "required") && valid;
      valid = validateField(passInput, "required") && valid;
      if (!valid) { setAuthHint("Iltimos, barcha maydonlarni to'ldiring", "error"); return; }
      if (!Auth.isRegistered()) {
        setAuthHint("Hisob topilmadi. Avval ro'yxatdan o'ting", "error");
        setAuthMode("register");
        return;
      }
      if (!Auth.verify(userInput.value.trim(), passInput.value)) {
        setAuthHint("Login yoki parol noto'g'ri", "error");
        return;
      }
      const remember = document.getElementById("rememberMe").checked;
      Auth.login(remember);
      setAuthHint("Muvaffaqiyatli! Kirilmoqda...", "success");
      setTimeout(goToApp, 350);
    });

    document.getElementById("registerForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const nameInput = document.getElementById("regName");
      const userInput = document.getElementById("regUsername");
      const passInput = document.getElementById("regPassword");
      const pass2Input = document.getElementById("regPassword2");
      let valid = true;
      valid = validateField(nameInput, "required") && valid;
      valid = validateField(userInput, "required") && valid;
      valid = validateField(passInput, "required") && valid;
      valid = validateField(pass2Input, "required") && valid;
      if (valid && passInput.value.length < 4) {
        setFieldError(passInput, "Parol kamida 4 ta belgidan iborat bo'lsin");
        valid = false;
      }
      if (valid && passInput.value !== pass2Input.value) {
        setFieldError(pass2Input, "Parollar mos kelmadi");
        valid = false;
      }
      if (!valid) { setAuthHint("Iltimos, maydonlarni to'g'ri to'ldiring", "error"); return; }

      Auth.register(nameInput.value.trim(), userInput.value.trim(), passInput.value);
      const settings = Store.getSettings() || {};
      settings.userName = nameInput.value.trim();
      Store.setSettings(settings);
      Auth.login(true);
      setAuthHint("Hisob yaratildi! Kirilmoqda...", "success");
      setTimeout(goToApp, 400);
    });

    document.getElementById("authResetLink").addEventListener("click", () => {
      const ok = window.confirm("Bu amal joriy login ma'lumotlarini o'chiradi (moliyaviy ma'lumotlar saqlanib qoladi). Davom etasizmi?");
      if (!ok) return;
      Auth.clear();
      Auth.logout();
      setAuthMode("register");
      setAuthHint("Hisob tozalandi. Yangi hisob yarating", "success");
    });

    const firstInput = document.querySelector(".auth-form:not([style*='display: none']) input");
    if (firstInput) firstInput.focus();
  }

  document.addEventListener("DOMContentLoaded", init);
})();