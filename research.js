/* 연구 분야 — data/research.json 을 읽어 펼침 패널을 그림. 번호(01, 02…)는 순서대로 자동. */
(function(){
  var D = window.SiteData, esc = D.esc;
  var box = document.getElementById('research-panels');

  function list(items, fn){ return (items || []).filter(Boolean).map(fn).join(''); }

  function panel(r, i){
    var photos = list(r.photos, function(p){
      var src = esc(D.img(p.image));
      return p.image ? '<figure><a href="'+src+'" target="_blank"><img src="'+src+'" alt="'+esc(p.caption)+'"></a>'
        + '<figcaption>'+esc(p.caption)+'</figcaption></figure>' : '';
    });
    var topics = list(r.topics, function(t){ return '<li>'+esc(t)+'</li>'; });
    var refs = list(r.refs, function(f){
      return f.text ? '<li>'+(f.type ? '<span class="badge">'+esc(f.type)+'</span>' : '')+esc(f.text)+'</li>' : '';
    });
    return '<details class="rpanel" name="research"><summary>'
      + '<span class="num">'+(i < 9 ? '0' : '')+(i + 1)+'</span>'
      + '<span class="rhead"><h3>'+esc(r.title)+'</h3>'
      + (r.title_en ? '<span class="en">'+esc(r.title_en)+'</span>' : '')
      + (r.summary ? '<span class="sum">'+esc(r.summary)+'</span>' : '')
      + '</span><span class="toggle" aria-hidden="true"></span></summary>'
      + '<div class="rdetail">'
      + (photos ? '<div class="rphotos">'+photos+'</div>' : '')
      + (topics ? '<div><h4>주요 연구 내용</h4><ul>'+topics+'</ul></div>' : '')
      + (refs ? '<div><h4>관련 성과</h4><ul class="refs">'+refs+'</ul></div>' : '')
      + '</div></details>';
  }

  function wire(){
    // 주소가 잘못된 사진은 자리째 숨김
    box.querySelectorAll('.rphotos img').forEach(function(img){
      function hide(){ var f = img.closest('figure'), b = f.parentNode; f.remove(); if (!b.querySelector('figure')) b.remove(); }
      if (img.complete && !img.naturalWidth) hide(); else img.addEventListener('error', hide);
    });
    // name 속성을 지원하지 않는 브라우저용: 하나를 열면 나머지는 닫힘
    box.querySelectorAll('.rpanel').forEach(function(d, _, all){
      d.addEventListener('toggle', function(){ if (d.open) all.forEach(function(o){ if (o !== d) o.open = false; }); });
    });
  }

  D.load('research').then(function(rows){
    if (rows.length) box.innerHTML = rows.map(panel).join('');   // 불러오기 실패 시 HTML 기본 내용 유지
    wire();
  });
})();
