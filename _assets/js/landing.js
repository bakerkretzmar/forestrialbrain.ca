(function() {

  setTimeout(function() {
    document.getElementById('landing').classList.add('appear');
  }, 400);

  setTimeout(function() {
    fetch('/home/index.html').then(function(response) {
      return response.text();
    }).then(function(text) {
      var parser = new DOMParser();
      var dom = parser.parseFromString(text, "text/html");
      var pano = dom.getElementById('pano');
      document.body.appendChild(pano);
      var script_common = document.createElement('script');
      script_common.src = "{% asset_path common.js %}";
      document.body.appendChild(script_common);
      var script_lazy = document.createElement('script');
      script_lazy.src = "{% asset_path lazy.js %}";
      document.body.appendChild(script_lazy);
    }).catch(function(error) {
      console.log('Fetch unsuccessful: ' + error);
    });
  }, 1000);

  document.getElementById('main_title').addEventListener('click', function() {
    document.getElementById('landing').classList.add('disappear');
    history.pushState({}, null, "home/");
    setTimeout(function() {
      document.getElementById('landing').remove();
      document.getElementById('script_landing').remove();
    }, 2200);
  })

})();
