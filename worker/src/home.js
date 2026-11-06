export function getHomeHtml() {
  const subscription = "https://raw.githubusercontent.com/CingGui/Wloc-dingwei/refs/heads/main/modules/wloc.module";
  return `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="theme-color" content="#f5f7fb">
<title>WLOC 定位工具</title>
<meta name="description" content="自托管 Apple WLOC 定位工具，提供地图选点与模块订阅。">
<style>
:root{color-scheme:light;--ink:#172033;--muted:#687386;--blue:#2864e8;--line:#e7ebf2;--bg:#f5f7fb}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--ink);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;line-height:1.65}
.wrap{width:min(920px,calc(100% - 36px));margin:auto}
header{height:68px;display:flex;align-items:center;justify-content:space-between}
.brand{font-size:18px;font-weight:750;letter-spacing:.2px}
.brand span{color:var(--blue)}
.nav{color:var(--muted);font-size:14px;text-decoration:none}
.hero{padding:76px 0 48px;text-align:center}
.tag{display:inline-block;padding:5px 12px;border:1px solid #dce5fb;background:#edf3ff;color:#315fc2;border-radius:999px;font-size:12px;font-weight:650}
h1{font-size:clamp(34px,6vw,54px);line-height:1.15;letter-spacing:-1.5px;margin:22px 0 16px}
.lead{max-width:620px;margin:0 auto;color:var(--muted);font-size:16px}
.actions{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-top:30px}
.btn{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:0 22px;border-radius:10px;text-decoration:none;font-size:14px;font-weight:700;border:1px solid transparent;cursor:pointer}
.primary{background:var(--blue);color:#fff;box-shadow:0 8px 18px #2864e82b}
.secondary{background:#fff;color:var(--ink);border-color:var(--line)}
.card{background:#fff;border:1px solid var(--line);border-radius:16px;padding:26px;margin:18px 0;box-shadow:0 8px 28px #1a2b4a08}
.card h2{font-size:19px;margin:0 0 8px}
.sub{color:var(--muted);font-size:14px;margin:0 0 18px}
.address{display:flex;gap:10px;align-items:stretch}
.address input{flex:1;min-width:0;padding:13px 14px;border:1px solid var(--line);border-radius:9px;background:#f8faff;color:#354057;font-size:13px}
.address button{flex:none}
.note{font-size:12px;color:var(--muted);margin:10px 0 0}
.steps{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:18px}
.step{padding:16px;background:#f8faff;border-radius:12px}
.num{font-size:12px;color:var(--blue);font-weight:800}
.step strong{display:block;margin:5px 0;font-size:14px}
.step p{margin:0;color:var(--muted);font-size:13px}
footer{padding:32px 0 44px;text-align:center;color:#8a94a5;font-size:12px}
.toast{position:fixed;left:50%;bottom:28px;transform:translate(-50%,12px);opacity:0;background:#172033;color:white;padding:10px 18px;border-radius:999px;font-size:13px;transition:.2s;pointer-events:none}
.toast.show{opacity:1;transform:translate(-50%,0)}
@media(max-width:620px){.hero{padding:56px 0 32px}.card{padding:20px}.address{flex-direction:column}.address button{width:100%}.steps{grid-template-columns:1fr}}
</style>
</head>
<body>
<header class="wrap"><div class="brand">WLOC <span>定位工具</span></div><a class="nav" href="/map">打开地图选点 →</a></header>
<main class="wrap">
<section class="hero">
<div class="tag">自托管 · Apple WLOC</div>
<h1>WLOC 定位工具</h1>
<p class="lead">通过地图选择目标位置，并将坐标写入设备。添加下方模块订阅后，即可配合支持脚本模块的代理工具使用。</p>
<div class="actions"><a class="btn primary" href="/map">打开地图选点</a><a class="btn secondary" href="#subscription">获取模块订阅</a></div>
</section>
<section class="card" id="subscription">
<h2>模块订阅地址</h2>
<p class="sub">复制以下地址，在支持模块订阅的代理工具中添加。</p>
<div class="address"><input id="subUrl" type="text" value="${subscription}" readonly aria-label="模块订阅地址"><button class="btn primary" id="copyBtn" type="button">复制订阅地址</button></div>
<p class="note">如果浏览器未能自动复制，可点击输入框后手动复制。</p>
</section>
<section class="card">
<h2>使用步骤</h2>
<div class="steps">
<div class="step"><span class="num">01</span><strong>添加模块</strong><p>复制上方订阅地址，在代理工具中添加并启用 WLOC 模块。</p></div>
<div class="step"><span class="num">02</span><strong>开启必要配置</strong><p>按代理工具要求开启脚本及 MITM，并信任对应证书。</p></div>
<div class="step"><span class="num">03</span><strong>选择位置</strong><p>打开地图选点，选择坐标后点击“储存到设备”。</p></div>
</div>
</section>
</main>
<footer class="wrap">WLOC Location Tool · 自托管服务</footer>
<div class="toast" id="toast" role="status" aria-live="polite">复制成功</div>
<script>
const input=document.getElementById('subUrl');
const button=document.getElementById('copyBtn');
const toast=document.getElementById('toast');
let toastTimer;
function showToast(message){toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2200)}
async function copyAddress(){
  const value=input.value;
  try{
    if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(value)}
    else{input.focus();input.select();input.setSelectionRange(0,value.length);const ok=document.execCommand('copy');if(!ok)throw new Error('copy failed')}
    showToast('订阅地址已复制');
  }catch(e){
    input.focus();input.select();input.setSelectionRange(0,value.length);
    showToast('自动复制受限，请手动复制');
  }
}
button.addEventListener('click',copyAddress);
input.addEventListener('click',()=>{input.select();input.setSelectionRange(0,input.value.length)});
</script>
</body>
</html>`;
}
