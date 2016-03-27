---
title: app
---

<div class="profile clearfix">
  <div class="logo">
    <svg viewBox="1 -3 14 14" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.5 8L8.8 5.4 6.6 8.5 5.5 1.6 2.38 8H0V10h3.6L4.5 8.2l0.9 5.4L9 8.5l1.6 1.5H14V8H11.5z"></path>
    </svg>
    <span class="name">Enginsight</span>
    <span class="title">Data Driven Monitoring</span>
  </div>
  <div class="issues"><i class="material-icons">error_outline</i></div>
  <a class="account" href="/account">
    <img height="35" width="35">
    <div class="name"></div>
    <div class="email"></div>
  </a>
</div>

<div class="navigation">
  <a class="item active" href="/"><i class="material-icons">graphic_eq</i></a>
  <a class="item" href="/servers"><i class="material-icons">desktop_windows</i></a>
  <!--<a class="item octicon octicon-radio-tower">Activites</a>-->
  <a class="item" href="/users"><i class="material-icons">accessibility</i></a>
  <a class="item" href="/settings"><i class="material-icons">tune</i></a>
  <a class="item" href="/feedback"><i class="material-icons">chat_bubble_outline</i></a>
</div>
<div class="" id="app-view"></div>
<div class="credits">
  <span class="">©2016 Enginsight</span>
  <a href="/blog/">Blog</a>
  <a href="/contact/">Contact</a>
</div>

<script src="/assets/js/vendor.min.js" type="text/javascript"></script>
<script>
  const API_URL = document.querySelector('meta[name="api-host"]').getAttribute('content');

  $.ajaxSetup({
    crossDomain: true,
    xhrFields: {
      withCredentials: true
    }
  });
</script>
<script src="/assets/js/tags.min.js" type="text/javascript"></script>
<script src="/assets/js/templates.min.js" type="text/javascript"></script>
<script src="/assets/js/app.min.js" type="text/javascript"></script>
