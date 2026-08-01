(function(){
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var canvas = document.getElementById('cloud-canvas');
  var ctx = canvas.getContext('2d');
  var w,h,dpr = Math.min(window.devicePixelRatio||1,2);
  function resize(){
    w = canvas.clientWidth; h = canvas.clientHeight;
    canvas.width = w*dpr; canvas.height = h*dpr;
    ctx.setTransform(dpr,0,0,dpr,0,0);
  }
  window.addEventListener('resize', resize);
  resize();

  function getVar(name){
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }

  var clouds = [
    {x:-0.1,y:0.18,r:0.34,s:0.0009},
    {x:0.5,y:0.05,r:0.26,s:0.0006},
    {x:0.8,y:0.28,r:0.4,s:0.0007},
    {x:0.25,y:0.4,r:0.22,s:0.0011}
  ];

  function draw(t){
    ctx.clearRect(0,0,w,h);
    var pale = getVar('--sora-pale');
    clouds.forEach(function(c,i){
      var x = ((c.x + (reduced?0:t*c.s)) % 1.4 - 0.2) * w;
      var y = c.y*h;
      var r = c.r*w;
      var grad = ctx.createRadialGradient(x,y,0,x,y,r);
      grad.addColorStop(0, pale);
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x,y,r,0,Math.PI*2);
      ctx.fill();
    });
    if(!reduced){ requestAnimationFrame(draw); }
  }
  requestAnimationFrame(draw);
  if(reduced){ draw(0); }
})();

(function(){
  var els = document.querySelectorAll('.reveal');
  if(!('IntersectionObserver' in window)){ els.forEach(function(e){e.classList.add('in');}); return; }
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); }
    });
  },{threshold:0.15});
  els.forEach(function(e){ io.observe(e); });
})();
