(function(){
  function cfg(){ return window.APP_CONFIG || {}; }
  function getToken(){
    return localStorage.getItem(cfg().LS_TOKEN || "leave_session_token") || "";
  }
  function saveSession(token, isAdmin, exp){
    localStorage.setItem(cfg().LS_TOKEN || "leave_session_token", token || "");
    localStorage.setItem(cfg().LS_ADMIN || "leave_is_admin", isAdmin ? "1" : "0");
    if(exp) localStorage.setItem(cfg().LS_EXP || "leave_expires_at", exp);
  }
  function clearSession(){
    localStorage.removeItem(cfg().LS_TOKEN || "leave_session_token");
    localStorage.removeItem(cfg().LS_ADMIN || "leave_is_admin");
    localStorage.removeItem(cfg().LS_EXP || "leave_expires_at");
  }

  async function postJson(url, obj){
    const res = await fetch(url, {
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify(obj)
    });
    const txt = await res.text();
    let data;
    try{ data = JSON.parse(txt); }catch(e){ data = { ok:false, error:"Non-JSON response", raw:txt }; }
    return data;
  }

  // 通用呼叫：後端 router 期待 { action, args }
  async function callApi(base, action, args){
    if(!base || String(base).includes("PASTE_YOUR")) {
      return { ok:false, error:"尚未設定 GAS Web App URL（請到 public/config.js 填入）" };
    }
    return await postJson(base, { action, args: args || [] });
  }

  // 暴露給全站
  window.API = {
    cfg, getToken, saveSession, clearSession,
    callLogin: (action, args)=>callApi(cfg().LOGIN_API_BASE, action, args),
    callDB: (action, args)=>callApi(cfg().DB_API_BASE, action, args),
  };
})(); 
