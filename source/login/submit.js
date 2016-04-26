function getMetaContent(name) {
  return document
    .querySelector('meta[name="' + name + '"]')
    .getAttribute('content');
}

function getCookie(cname) {
  var name = cname + '=';
  var ca = document.cookie.split(';');
  for (var i = 0, l = ca.length; i < l; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = 'expires=' + d.toUTCString();
  document.cookie = cname + '=' + cvalue + '; ' + expires + ';path=/;domain=' + getMetaContent('cookie-domain');
}

function disableInputs() {
  document.getElementById('submit-button')
    .value = 'Please wait...';
}

function enableInputs() {
  document.getElementById('submit-button')
    .value = 'Sign in';
}

document
  .getElementById('login-form')
  .addEventListener('submit', function (e) {
    e.preventDefault();

    disableInputs();

    function serializeLoginForm() {
      var queryString = '';
      for (var i = 0, l = e.target.length; i < l; i++) {
        if (e.target[i].type !== 'submit') {
          queryString += e.target[i].name + '=' + e.target[i].value + '&';
        }
      }
      queryString = queryString.substring(0, queryString.length - 1);
      return queryString.replace('@', '%40');
    }

    function isJSON(text) {
      try {
        return JSON.parse(text);
      } catch (e) {
        return false;
      }
    }

    var loginHost = getMetaContent('api-host');
    var xhr = new XMLHttpRequest();
    xhr.open('POST', loginHost + '/account/login');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          if (isJSON(xhr.responseText)) {
            var data = JSON.parse(xhr.responseText);
            if (data.id && data.session) {
              setCookie('id', data.id, 7);
              setCookie('session', data.session, 7);

              var alreadyRedirected = false;
              setInterval(function () {
                if (!alreadyRedirected && getCookie('id') && getCookie('session')) {
                  alreadyRedirected = true;
                  location = 'https://app.enginsight.com';
                }
              }, 100);
            }
          }
        } else {
          enableInputs();
        }
      }
    };
    xhr.send(serializeLoginForm());
  });
