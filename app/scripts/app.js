var App = {};

$(document).ajaxError((err, xhr) => {
  if (xhr.status === 401) {
    /* Invalidate Cookies. */
    ['id', 'session'].forEach((name) => {
      let invalidDate = new Date(0);
      document.cookie = `${name}=;expires=${invalidDate.toUTCString()};path=/;domain=.enginsight.com;`;
    });
    location = `//enginsight.com/login/`;
  }
});

$.fn.serializeObject = function () {
  var o = {};
  var a = this.serializeArray();
  $.each(a, function () {
    if (o[this.name] !== undefined) {
      if (!o[this.name].push) {
        o[this.name] = [o[this.name]];
      }
      o[this.name].push(this.value || '');
    } else {
      o[this.name] = this.value || '';
    }
  });
  return o;
};
