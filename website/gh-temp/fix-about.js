(function(){
  var sel = 'img[alt="Abstract civil engineering analytics visual"]';
  var url = '/profile-about.jpg?v=3';
  var attempts = 0;
  var t = setInterval(function(){
    attempts++;
    try{
      var el = document.querySelector(sel);
      if(!el) return;
      if(el.getAttribute('src') !== url){ el.setAttribute('src', url); }
      el.onerror = function(){ el.setAttribute('src', url); };
      if(el.naturalHeight && el.naturalHeight>0) { clearInterval(t); }
    }catch(e){}
    if(attempts>15) clearInterval(t);
  },300);
})();
