# mysite（Netlify 靜態前端）- SCLC 登錄 + 排假月曆

這個 repo 是**純前端**（放 Netlify / GitHub Pages 都可以），用 `fetch()` 呼叫你的 Google Apps Script Web App 當後端 API。

> 你提供的 Apps Script 已經有核心函式：`api_login / api_session_ping / api_emp_calendar_month / api_emp_create_leave / api_emp_cancel_leave ...`  
> 前端只要把 Web App URL 填好即可。

---

## 1. 你要先準備（必要）

### A) Apps Script 需要提供「HTTP JSON API」
目前你上傳的 login / 排假 DB 程式碼是用 `google.script.run`（只能在 GAS 自己輸出的 HTML 內使用）。  
要讓 Netlify 前端能呼叫，必須讓 GAS 具備：

- `doPost(e)`：接收 JSON
- 依 `action` 呼叫對應的 `api_*` 函式
- 回傳 JSON（並加上 CORS header）

我把**可直接貼進同一個 GAS 專案**的 router 放在 `gas/Code.gs`（你也可自行合併到原專案）。

> 如果你已經有自己的 doPost/router，直接照你的方式改 `public/config.js` 即可。

### B) 把 Apps Script「部署成 Web app」
- Deploy → New deployment → **Web app**
- Execute as：**Me**
- Who has access：**Anyone**（或至少 Anyone with the link）

部署後你會拿到一個 Web App URL，例如：
`https://script.google.com/macros/s/xxxxxxxxxxxxxxxx/exec`

---

## 2. 設定前端（必要）

打開 `public/config.js`，填入你的後端 URL：

- 如果你把「登入」與「排假 DB」放在**同一個 GAS 專案**：兩個都填同一個 URL
- 如果你分成兩個 GAS 專案：填不同 URL

---

## 3. 本機測試（可選）

```bash
cd public
python -m http.server 8080
# 打開 http://localhost:8080
```

---

## 4. Netlify 部署

- Netlify → Add new site → Import from Git
- Base directory：空白
- Publish directory：`public`

---

## 5. 頁面

- `/index.html`：登入 + 忘記/修改密碼 + 管理者重設（如果後端有開）
- `/calendar.html`：員工排假月曆（可新增/取消；點日期看同組明細）

---

## 6. 重要注意（安全）

這是「公司內部系統」的典型做法：
- token 存在 localStorage（7 天免登入）
- 你後端 session sheet 控制效期

若你要更嚴格安全（限制網域 / IP / SSO），再加強後端即可。

