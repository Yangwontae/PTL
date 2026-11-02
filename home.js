/* 메인 화면 — data/home.json 을 읽어 히어로 문구, 키워드, 바로가기 설명을 채움.
   비어 있는 항목은 index.html 에 적힌 기본 문구를 그대로 둠. */
(function(){
  var D = window.SiteData, esc = D.esc;
  var $ = function(id){ return document.getElementById(id); };
  // 줄바꿈은 <br> 로
  function html(id, v){ var el = $(id); if (el && v) el.innerHTML = esc(v).replace(/\r?\n/g, '<br>'); }

  D.load('home').then(function(h){
    html('home-eyebrow', h.eyebrow);
    html('home-title', h.title);
    html('home-intro', h.intro);
    if (h.areas) html('stat-areas', String(h.areas));

    var kw = (h.keywords || []).filter(Boolean);
    if (kw.length && $('home-keywords')) $('home-keywords').innerHTML = kw.map(function(k){
      return '<span class="tag">'+esc(k)+'</span>';
    }).join('');

    var c = h.cards || {};
    ['about', 'research', 'achievements', 'teaching'].forEach(function(k){ html('card-' + k, c[k]); });
  });
})();
