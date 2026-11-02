/* 교수 소개 — data/about.json 을 읽어 프로필을 그림.
   비어 있는 항목은 노란 "입력" 표시로 남겨 둠. */
(function(){
  var D = window.SiteData, esc = D.esc;
  var $ = function(id){ return document.getElementById(id); };
  function todo(label){ return '<span class="todo">'+label+' 입력</span>'; }
  // 학력·경력·수상은 한 항목씩 줄을 나눠 표시
  function lines(list, label){
    list = (list || []).filter(Boolean);
    return list.length ? list.map(esc).join('<br>') : todo(label);
  }
  function item(label, body, full){
    return '<div class="item'+(full ? ' full' : '')+'"><div class="label">'+label+'</div>'+body+'</div>';
  }

  D.load('about').then(function(a){
    if (Array.isArray(a) || !$('profile')) return;   // 불러오기 실패 시 HTML 기본 내용 유지
    var photo = a.photo
      ? '<img src="'+esc(D.img(a.photo))+'" alt="'+esc(a.name)+' 교수 사진">'
      : '사진 준비 중';
    var position = a.position
      ? esc(a.position) + (a.position_note ? ' <span class="position-note">· '+esc(a.position_note)+'</span>' : '')
      : todo('직위');
    $('profile').innerHTML = '<div class="photo">'+photo+'</div><div>'
      + '<h3>'+esc(a.name)+(a.name_en ? '<small>'+esc(a.name_en)+'</small>' : '')+'</h3>'
      + '<p class="affil">'+esc(a.affiliation)+'</p>'
      + '<div class="info">'
      + item('전공', a.major ? esc(a.major) : todo('전공'))
      + item('직위', position)
      + item('학력', lines(a.education, '학력'), true)
      + item('경력', lines(a.career, '경력'), true)
      + item('수상', lines(a.awards, '수상'), true)
      + '</div></div>';
  });
})();
