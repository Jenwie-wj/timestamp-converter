// Popup script for timestamp <-> date converter (offset-based timezones)
(function(){
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

  // date string -> timestamp (s or ms). dateStr formats:
  // YYYY-MM-DD [HH:mm[:ss[.SSS]]]
  function dateStringToTs(dateStr, outUnit, offsetHours){
    // normalize spaces
    const s = dateStr.trim();
    const re = /^(\d{4})-(\d{1,2})-(\d{1,2})(?:[ T](\d{1,2}):(\d{1,2})(?::(\d{1,2})(?:\.(\d{1,3}))?)?)?$/;
    const m = re.exec(s);
    if(!m) return { ok:false, text:'日期格式不匹配。允许格式：YYYY-MM-DD 或 YYYY-MM-DD HH:mm[:ss[.SSS]]' };
    const year = Number(m[1]), month = Number(m[2]), day = Number(m[3]);
    const hour = Number(m[4]||0), minute = Number(m[5]||0), second = Number(m[6]||0), ms = Number((m[7]||'0').padEnd(3,'0'));
    // Compute UTC ms for that wall-clock time in the given timezone:
    // UTCms = Date.UTC(year, month-1, day, hour, minute, second, ms) - offsetHours*3600000
    const utcMs = Date.UTC(year, month-1, day, hour, minute, second, ms) - offsetHours * 3600000;
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

  function getSelectedRadioValue(name){
    const els = document.getElementsByName(name);
    for(const e of els) if(e.checked) return e.value;
    return null;
  }

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
    const r = dateStringToTs(val, outUnit, offset);
    if(!r.ok){ dateResult.value = r.text; return; }
    dateResult.value = String(r.value) + (outUnit==='s' ? ' (秒)' : ' (毫秒)');
  });

  btnCopyDate.addEventListener('click', async ()=>{
    const txt = tsResult.value.trim();
    if(!txt) return;
    try{
      await navigator.clipboard.writeText(txt);
      btnCopyDate.textContent = '已复制';
      setTimeout(()=>btnCopyDate.textContent='复制结果',1200);
    }catch(e){ alert('复制失败：' + e); }
  });

  btnCopyTs.addEventListener('click', async ()=>{
    const txt = dateResult.value.trim();
    if(!txt) return;
    try{
      await navigator.clipboard.writeText(txt);
      btnCopyTs.textContent = '已复制';
      setTimeout(()=>btnCopyTs.textContent='复制结果',1200);
    }catch(e){ alert('复制失败：' + e); }
  });

  // small helpers: example shortcuts on enter
  tsInput.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter') btnTsToDate.click();
  });
  dateInput.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter') btnDateToTs.click();
  });

  // Provide example initial values
  tsInput.placeholder = '例如：1633072800 或 1633072800123';
  dateInput.placeholder = '例如：2025-12-02 15:30:45 或 2025-12-02 15:30:45.123';

})();
