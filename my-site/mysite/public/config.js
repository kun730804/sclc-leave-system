// === 只要改這裡 ===
// 1) 如果你把「登入」與「排假DB」放在同一個 Apps Script Web App：兩個都填同一個 URL
// 2) 如果分開兩個專案：分別填不同 URL
window.APP_CONFIG = {
  LOGIN_API_BASE: "PASTE_YOUR_GAS_WEBAPP_URL_HERE",
  DB_API_BASE: "PASTE_YOUR_GAS_WEBAPP_URL_HERE",

  // localStorage keys（沿用你 login 檔案的命名習慣）
  LS_TOKEN: "leave_session_token",
  LS_ADMIN: "leave_is_admin",
  LS_EXP: "leave_expires_at",

  // UI
  APP_TITLE: "SCLC 排假系統"
};
