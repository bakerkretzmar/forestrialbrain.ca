(function() {
  if (!document.getElementById('pano')) {
    // If page is visited directly, immediately fetch styles and scripts
    var style = document.createElement('link');
    style.rel = "stylesheet";
    style.href = "{% asset_path main.css %}";
    document.head.appendChild(style);
    var script_lazy = document.createElement('script');
    script_lazy.src = "{% asset_path lazy.js %}";
    document.body.appendChild(script_lazy);
    setTimeout(function() { refreshObserver(); }, 250);
  }
})();
