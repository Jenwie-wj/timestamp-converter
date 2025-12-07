// Popup script for timestamp <-> date converter (offset-based timezones)
(function(){
  // Constants
  const COPY_FEEDBACK_DURATION_MS = 1200;
  
  // Utils
  function pad(n, width=2){ return String(n).padStart(width,'0'); }
  function padMs(n){ return String(n).padStart(3,'0'); }

  function formatDateFromMs(ms){
    const d = new Date(ms);
    const Y = d.getUTCFullYear();
    const M = pad(d.getUTCMonth()+1);
    const D = pad(d.getUTCDate());
    const h = pad(d.getUTCHours());
    const m = pad(d.getUTCMinutes());
    const s = pad(d.getUTCSeconds());
    const msPart = padMs(d.getUTCMilliseconds());
    return `${Y}-${M}-${D} ${h}:${m}:${s}.${msPart}`;
  }

  // timestamp (s or ms) -> formatted date string in timezone offset hours
  function tsToDateString(value, unit, offsetHours){
    if(isNaN(Number(value))) return '输入无效';
    let msUTC = Number(value);
    if(unit === 's') msUTC = msUTC * 1000;
    // local ms in that timezone = UTC ms + offsetHours*3600000
    const localMs = msUTC + offsetHours * 3600000;
    return formatDateFromMs(localMs) + ` (UTC${offsetHours>=0?'+':''}${offsetHours})`;
  }

  // Convert datetime-local value to timestamp
  function datetimeLocalToTs(datetimeValue, outUnit, offsetHours){
    if(!datetimeValue) return { ok:false, text:'请选择日期和时间' };
    
    // datetime-local format: YYYY-MM-DDTHH:mm or YYYY-MM-DDTHH:mm:ss
    // The browser interprets this as local time, so we need to adjust for the desired timezone
    const date = new Date(datetimeValue);
    if(isNaN(date.getTime())) return { ok:false, text:'日期格式无效' };
    
    // The date is already in local time, we need to convert it to the specified timezone
    // First, get the local timezone offset and calculate UTC
    const localOffsetMs = date.getTimezoneOffset() * 60000;
    const utcMs = date.getTime() + localOffsetMs - offsetHours * 3600000;
    
    if(outUnit === 's') return { ok:true, value: Math.floor(utcMs/1000) };
    return { ok:true, value: utcMs };
  }

  // DOM
  const tsInput = document.getElementById('ts-input');
  const tzOffsetTs = document.getElementById('tz-offset-ts');
  const btnTsToDate = document.getElementById('btn-ts-to-date');
  const tsResult = document.getElementById('ts-result');
  const btnCopyDate = document.getElementById('btn-copy-date');

  const dateInput = document.getElementById('date-input');
  const tzOffsetDate = document.getElementById('tz-offset-date');
  const btnDateToTs = document.getElementById('btn-date-to-ts');
  const dateResult = document.getElementById('date-result');
  const btnCopyTs = document.getElementById('btn-copy-ts');
  
  // Real-time timestamp elements
  const realtimeTsS = document.getElementById('realtime-ts-s');
  const realtimeTsMs = document.getElementById('realtime-ts-ms');
  const currentTimeDisplay = document.getElementById('current-time-display');

  function getSelectedRadioValue(name){
    const els = document.getElementsByName(name);
    for(const e of els) if(e.checked) return e.value;
    return null;
  }

  // Real-time timestamp update function
  function updateRealtimeTimestamp(){
    const now = Date.now();
    const nowSeconds = Math.floor(now / 1000);
    
    realtimeTsS.textContent = nowSeconds;
    realtimeTsMs.textContent = now;
    
    // Format current time in Beijing timezone (UTC+8)
    const formatter = new Intl.DateTimeFormat('zh-CN', {
      timeZone: 'Asia/Shanghai',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
    const parts = formatter.formatToParts(new Date());
    const year = parts.find(p => p.type === 'year').value;
    const month = parts.find(p => p.type === 'month').value;
    const day = parts.find(p => p.type === 'day').value;
    const hour = parts.find(p => p.type === 'hour').value;
    const minute = parts.find(p => p.type === 'minute').value;
    const second = parts.find(p => p.type === 'second').value;
    currentTimeDisplay.textContent = `北京时间：${year}-${month}-${day} ${hour}:${minute}:${second}`;
  }

  // Update realtime timestamp every second
  updateRealtimeTimestamp();
  setInterval(updateRealtimeTimestamp, 1000);

  btnTsToDate.addEventListener('click', ()=>{
    const val = tsInput.value.trim();
    const unit = getSelectedRadioValue('ts-unit'); // s or ms
    let offset = Number(tzOffsetTs.value);
    if(isNaN(offset)) offset = 8;
    const res = tsToDateString(val, unit, offset);
    tsResult.value = res;
  });

  btnDateToTs.addEventListener('click', ()=>{
    const val = dateInput.value.trim();
    let offset = Number(tzOffsetDate.value);
    if(isNaN(offset)) offset = 8;
    const outUnit = getSelectedRadioValue('date-out-unit'); // s or ms
    const r = datetimeLocalToTs(val, outUnit, offset);
    if(!r.ok){ dateResult.value = r.text; return; }
    dateResult.value = String(r.value) + (outUnit==='s' ? ' (秒)' : ' (毫秒)');
  });

  btnCopyDate.addEventListener('click', async ()=>{
    const txt = tsResult.value.trim();
    if(!txt) return;
    try{
      await navigator.clipboard.writeText(txt);
      btnCopyDate.textContent = '✓ 已复制';
      setTimeout(()=>btnCopyDate.textContent='📋 复制结果', COPY_FEEDBACK_DURATION_MS);
    }catch(e){ alert('复制失败：' + e); }
  });

  btnCopyTs.addEventListener('click', async ()=>{
    const txt = dateResult.value.trim();
    if(!txt) return;
    try{
      await navigator.clipboard.writeText(txt);
      btnCopyTs.textContent = '✓ 已复制';
      setTimeout(()=>btnCopyTs.textContent='📋 复制结果', COPY_FEEDBACK_DURATION_MS);
    }catch(e){ alert('复制失败：' + e); }
  });

  // small helpers: example shortcuts on enter
  tsInput.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter') btnTsToDate.click();
  });
  dateInput.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter') btnDateToTs.click();
  });

  // Set current datetime as default for date input
  const now = new Date();
  const year = now.getFullYear();
  const month = pad(now.getMonth() + 1);
  const day = pad(now.getDate());
  const hour = pad(now.getHours());
  const minute = pad(now.getMinutes());
  const second = pad(now.getSeconds());
  dateInput.value = `${year}-${month}-${day}T${hour}:${minute}:${second}`;

})();
