---
title: app
---

<div class="profile clearfix">
  <div class="logo">
    <svg viewBox="-8 -7 30 30" height="30" width="30" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.5 8L8.8 5.4 6.6 8.5 5.5 1.6 2.38 8H0V10h3.6L4.5 8.2l0.9 5.4L9 8.5l1.6 1.5H14V8H11.5z"></path>
    </svg>
    <div class="name">Enginsight</div>
    <div class="title">Data Driven Monitoring</div>
  </div>
  <div class="issues"><i class="material-icons">error_outline</i></div>
  <a class="account" href="/account">
    <img height="45" width="45">
    <div class="name"></div>
    <div class="email"></div>
  </a>
</div>

<div class="navigation">
  <a class="item" href="/"><i class="material-icons">view_headline</i></a>
  <a class="item" href="/servers"><i class="material-icons">settings_ethernet</i></a>
  <a class="item" href="/users"><i class="material-icons">accessibility</i></a>
  <a class="item" href="/settings"><i class="material-icons">tune</i></a>
  <a class="item" href="/feedback"><i class="material-icons">bug_report</i></a>
</div>
<div class="" id="app-view"></div>
<div class="credits">
  <span class="">©2016 Enginsight</span>
  <a href="/blog/">Blog</a>
  <a href="/contact/">Contact</a>
</div>

<script src="https://assets.enginsight.com/app/js/vendor.min.js" type="text/javascript"></script>
<script>
  const API_URL = document.querySelector('meta[name="api-host"]').getAttribute('content');

  $.ajaxSetup({
    crossDomain: true,
    xhrFields: {
      withCredentials: true
    }
  });
</script>
<script src="https://assets.enginsight.com/app/js/tags.min.js" type="text/javascript"></script>
<script src="https://assets.enginsight.com/app/js/templates.min.js" type="text/javascript"></script>
<script src="https://assets.enginsight.com/app/js/app.min.js" type="text/javascript"></script>
<script src="https://assets.enginsight.com/js/ga.js" type="text/javascript" async=""></script>
