function $(id){ return document.getElementById(id); }
function setMsg(id, txt, ok){
  const el = $(id);
  if(!el) return;
  el.textContent = txt || "";
  el.className = "msg " + (ok ? "ok" : "err");
}
function normEmp(s){
  s = String(s||"").trim();
  if(s.startsWith("'")) s = s.slice(1);
  s = s.replace(/[^0-9]/g,'');
  if(!s) return "";
  if(s.length < 6) s = s.padStart(6,'0');
  if(s.length > 6) s = s.slice(-6);
  return s;
}
function ymd(d){
  const y=d.getFullYear();
  const m=String(d.getMonth()+1).padStart(2,'0');
  const dd=String(d.getDate()).padStart(2,'0');
  return `${y}-${m}-${dd}`;
}
function parseYMD(s){
  const m=String(s||"").match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if(!m) return null;
  return new Date(Number(m[1]), Number(m[2])-1, Number(m[3]));
}
function dowZh(i){ return ["日","一","二","三","四","五","六"][i] || ""; }
