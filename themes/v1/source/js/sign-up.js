(function() {
  "use strict";
  var body = document.getElementsByTagName('body')[0];
  var signUp = document.getElementById('sign-up-modal');

  var signUpButtons = document.getElementsByClassName('sign-up');
  for (var i = 0; i < signUpButtons.length; i++) {
    signUpButtons[i].addEventListener('click', showSignUp, false);
  }

  function showSignUp(event) {
    if (typeof event !== 'undefined' && event && event.preventDefault) {
      event.preventDefault();
      event.stopPropagation();

    } else if (typeof window.event !== 'undefined' && window.event && window.event.returnValue) {
      window.event.returnValue = false;

    }

    body.classList.add('sign-up');
    signUp.classList.add('active');
    signUp.querySelector('.outer').addEventListener('click', hideSignUp, false);
  }

  function hideSignUp() {
    body.classList.remove('sign-up');
    signUp.classList.remove('active');
  }

  /* Detect if showSignUp() should be triggered. */
  if (location.hash.indexOf('#!/sign-up') > -1) {
    showSignUp();
  }
})();
