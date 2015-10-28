var elements = document.querySelectorAll('body :not(.__parent-highlight)');

var clearHighlight = function() {
  var highlights = document.querySelectorAll('.__parent-highlight');

  Array.from(highlights).forEach(function(highlight) {
    if (highlight) {
      highlight.parentNode.removeChild(highlight);
    }
  });
};

var createHighlight = function(elem) {
  var highlight = document.createElement('div');
  highlight.classList.add('__parent-highlight');
  highlight.style.width = '100%';
  highlight.style.height = '100%';
  highlight.style.position = 'absolute';
  highlight.style.top = 0;
  highlight.style.left = 0;
  highlight.style.bottom = 0;
  highlight.style.right = 0;
  highlight.style.background = 'repeating-linear-gradient(45deg,#ccc,#ccc 10px,#444 10px,#444 20px)';
  highlight.style.mixBlendMode = 'exclusion';
  highlight.style.opacity = 0.3;

  elem.insertBefore(highlight, elem.firstElementChild);
};

var findAbsoluteAncestor = function(elem) {
  if (!elem) {
    return false;
  }

  var style = getComputedStyle(elem);

  if (style.position === 'absolute') {
    return elem;
  }
};

var highlightPositionedAncestor = function(elem) {
  if (!elem.parentElement) {
    return createHighlight(document.querySelector('body'));
  }

  var style = getComputedStyle(elem.parentElement);

  if (style.position !== 'static') {
    createHighlight(elem.parentElement);
    return;
  }

  return highlightPositionedAncestor(elem.parentElement);
};

Array.from(elements).forEach(function(elem) {
  elem.addEventListener('mouseenter', function() {
    var abs = findAbsoluteAncestor(this);

    if (abs) {
      highlightPositionedAncestor(abs);
    }
  });

  elem.addEventListener('mouseleave', function() {
    var abs = findAbsoluteAncestor(this);

    if (abs) {
      clearHighlight();
    }
  });
});
