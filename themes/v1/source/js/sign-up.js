var body = document.getElementsByTagName('body')[0];
var signUp = document.getElementById('sign-up');

function showSignUp() {
  body.classList.add('sign-up');
  signUp.classList.add('active');
  signUp.querySelector('.layer').addEventListener('click', hideSignUp, false);
}

function hideSignUp() {
  body.classList.remove('sign-up');
  signUp.classList.remove('active');
}
