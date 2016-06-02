var body = document.getElementsByTagName('body')[0];
var signUp = document.getElementById('sign-up-modal');

var signUpButtons = document.getElementsByClassName('sign-up');
for (var i = 0; i < signUpButtons.length; i++) {
  signUpButtons[i].addEventListener('click', showSignUp, false);
}

function showSignUp(event) {
  if (event && event.preventDefault) {
    event.preventDefault();
  } else if (window.event && window.event.returnValue) {
    window.event.returnValue = false;
  }

  event.stopPropagation();

  body.classList.add('sign-up');
  signUp.classList.add('active');
  signUp.querySelector('.layer').addEventListener('click', hideSignUp, false);
}

function hideSignUp() {
  body.classList.remove('sign-up');
  signUp.classList.remove('active');
}
