<sub-navigation>
  <a class="item" data-href="{ attrs.link }" each="{ key, attrs in opts.submenu }" href="/server/{ this.model.id }{ attrs.link }">{ attrs.label }</a>
  <script>
    this.model = opts.model;
    this.on('mount', function () {
      var elements = this.root.querySelectorAll('.item');
      var setActive = false;
      [].forEach.call(elements, function (element) {
        if (location.pathname.indexOf(element.getAttribute('data-href')) > -1) {
          element.classList.add('active');
          setActive = true;
        }
      });

      if (!setActive) {
        var firstLink = this.root.querySelectorAll('.item:first-child')[0];
        firstLink.classList.add('active');
      }
    });
  </script>
</sub-navigation>
