// 放到你的 Apps Script 專案（與你現有 login / 排假DB 程式碼同一個專案）
// 目的：讓 Netlify 前端可以用 fetch() 呼叫 api_* 函式
// 注意：這是「最小可用」router；你也可以把安全限制做更嚴格（例如限制 Origin / 內網 / 白名單）。

function doPost(e){
  try{
    const body = e && e.postData && e.postData.contents ? e.postData.contents : '';
    const req = body ? JSON.parse(body) : {};
    const action = String(req.action || '').trim();
    const args = Array.isArray(req.args) ? req.args : [];

    if(!action) return _json_({ok:false, error:'missing action'});

    const fn = this[action];
    if(typeof fn !== 'function') return _json_({ok:false, error:'unknown action: ' + action});

    const out = fn.apply(this, args);
    return _json_(out);

  }catch(err){
    return _json_({ok:false, error: (err && err.message) ? err.message : String(err)});
  }
}

function _json_(obj){
  return ContentService
    .createTextOutput(JSON.stringify(obj || {}))
    .setMimeType(ContentService.MimeType.JSON)
    // CORS (如要更嚴格，可改成你的 Netlify 網域)
    .setHeader('Access-Control-Allow-Origin','*')
    .setHeader('Access-Control-Allow-Methods','POST, OPTIONS')
    .setHeader('Access-Control-Allow-Headers','Content-Type');
}

// 預檢請求
function doOptions(e){
  return _json_({ok:true});
}
