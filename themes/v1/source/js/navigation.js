(function() {
  "use strict";
  var mobileNav = document.getElementById('mobile-nav');
  mobileNav.addEventListener('click', function() {
    var navItems = document.getElementsByClassName('nav-items')[0];
    navItems.classList.toggle('mobile-nav');
  }, false);
})();
