/* 꼬리말 — data/footer.json 을 읽어 모든 페이지 하단 정보를 채움. 저작권 표시는 HTML 에 고정. */
(function(){
  var D = window.SiteData, esc = D.esc;
  var box = document.getElementById('foot-info');

  D.load('footer').then(function(f){
    if (Array.isArray(f) || !box) return;   // 불러오기 실패 시 HTML 기본 내용 유지
    var map = f.map ? ' <a href="https://map.kakao.com/?q='+encodeURIComponent(f.map)+'" target="_blank" rel="noopener">지도</a>' : '';
    var contacts = [
      '교수연구실 ' + (f.office ? esc(f.office) : '<span class="todo">호실 입력</span>'),
      f.email ? 'E-mail <a href="mailto:'+esc(f.email)+'">'+esc(f.email)+'</a>' : '',
      f.phone ? 'Tel <a href="tel:'+esc(String(f.phone).replace(/[^\d+]/g, ''))+'">'+esc(f.phone)+'</a>' : ''
    ].filter(Boolean).map(function(s){ return '<span>'+s+'</span>'; }).join('');
    box.innerHTML = '<b>'+esc(f.title)+'</b>'
      + (f.address || map ? '<p>'+esc(f.address)+map+'</p>' : '')
      + '<p>'+contacts+'</p>';
  });
})();
