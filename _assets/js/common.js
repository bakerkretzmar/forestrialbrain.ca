(function() {

  // Register service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('{% asset_path sw.js %}')
      .then(function(reg) {
        console.log('Service worker registered with scope: ', reg.scope);
      }, function(err) {
        console.log('Service worker registration failed: ', err);
      });
  }

  // Without the user noticing, scroll to the center of the pano on page load
  window.scrollTo((document.getElementById('pano').offsetWidth / 2) - (window.innerWidth / 2), 0);

  // Asynchronously retrieve and insert HTML content for specific sections
  function retrieveContent(resource) {
    fetch('/' + resource + '.html').then(function(response) {
      return response.text();
    }).then(function(responseText) {
      var ac = document.getElementById('ac');
      ac.innerHTML = responseText;
      refreshObserver();
      ac.querySelector('span.toggler').addEventListener('click', function() {
        ac.classList.remove('show');
        setTimeout(function() {
          observer.disconnect();
          ac.innerHTML = null;
        }, 650);
      })
    }).catch(function(error) {
      console.log('Fetch unsuccessful: ' + error);
    });
  }

  var panels = {};
  var menuItems = {};

  // Fill panels object with panels
  var panelNodes = document.getElementsByClassName('panel');
  Array.prototype.forEach.call(panelNodes, function(node) {
    panels[node.getAttribute('data-open')] = node; // looks like 'panoramas': '<section class="panel" data-open="panoramas">Panoramas</p>'
  });

  // Make panel titles hoverable and clickable
  for (var node in panels) {
    panels[node].addEventListener('click', function() {
      document.getElementById('ac').scrollTop = 0;
      document.getElementById('ac').classList.add('show');
      retrieveContent(this.getAttribute('data-open'));
    })
  }

  // Fill menuItems object with menu items
  var menuNodes = document.getElementsByClassName('menuItem');
  Array.prototype.forEach.call(menuNodes, function(node) {
    menuItems[node.getAttribute('data-select')] = node;
  })

  // Make menu items clickable
  for (var item in menuItems) {
    menuItems[item].addEventListener('click', function() {
      retrieveContent(this.getAttribute('data-select'));
      document.getElementById('menuToggle').checked = false;
      setTimeout(function() {
        document.getElementById('ac').scrollTop = 0;
        document.getElementById('ac').classList.add('show');
      }, 200);
    })
  }

  // Hide bouncing arrows when scrolled almost to ends of panorama
  window.addEventListener('scroll', function() {
    if (window.scrollX > (document.getElementById('panorama').offsetWidth * .1) && (window.scrollX + window.innerWidth) < (document.getElementById('panorama').offsetWidth * .9)) { return; }
    if (window.scrollX < (document.getElementById('panorama').offsetWidth * .05)) {
      document.getElementById('arrowLeft').classList.remove('show');
    } else {
      document.getElementById('arrowLeft').classList.add('show');
    }
    if ((window.scrollX + window.innerWidth) > (document.getElementById('panorama').offsetWidth * .95)) {
      document.getElementById('arrowRight').classList.remove('show');
    } else {
      document.getElementById('arrowRight').classList.add('show');
    }
  })

  document.getElementById('arrowLeft').addEventListener('click', function() {
    window.scrollBy({
      top: 0,
      left: -200,
      behavior: 'smooth'
    });
  })
  document.getElementById('arrowRight').addEventListener('click', function() {
    window.scrollBy({
      top: 0,
      left: 200,
      behavior: 'smooth'
    });
  })

})();
