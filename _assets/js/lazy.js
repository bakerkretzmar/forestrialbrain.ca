// Once per page

if ('IntersectionObserver' in window) {
  window.observer = new IntersectionObserver(onIntersection, {
    rootMargin: '200px',
    threshold: .01
  });
}

window.imageData = {};

function onIntersection(entries) {
  entries.forEach(function(entry) {
    if (entry.intersectionRatio > 0) {
      imageData.imageCount--;
      observer.unobserve(entry.target);
      loadImage(entry.target);
    }
  })
}

function loadImage(image) {
  var src = image.dataset.src;
  if (src) {
    return fetchImage(src).then(function() {
      applyImage(image, src);
    });
  }
}

function fetchImage(url) {
  return new Promise(function(resolve, reject) {
    var image = new Image();
    image.src = url;
    image.onload = resolve;
    image.onerror = reject;
  });
}

function applyImage(img, src) {
  img.classList.add('lazyLoaded');
  img.src = src;
  img.classList.add('lazyShown');
}

function loadAllImages() {
  imageData.images.forEach(function(image) {
    loadImage(image);
  })
}

// Every time any content loads

function refreshObserver() {
  imageData.images = document.querySelectorAll('.lazy');
  imageData.imageCount = imageData.images.length;
  if (!('IntersectionObserver' in window)) {
    loadAllImages();
  } else {
    imageData.images.forEach(function(image) {
      observer.observe(image);
    })
  }
}
