<mini-bar-chart>
  <svg class="chart" id="mini-bar-chart-{opts.prop}"></svg>
  <script>
    opts.data = JSON.parse(opts.data);
    var drawChart = function () {
      var max = _.max(opts.data);
      if (max === 0)
        max = 1;
      var min = _.min(opts.data);

      var height = 100;
      var width = $('#mini-bar-chart-' + opts.prop).parent().width();
      var barWidth = 10;
      var barPadding = 3;
      var minBarValue = 5;
      width += barPadding;

      $('#mini-bar-chart-' + opts.prop).html('');
      var svg = d3.select('#mini-bar-chart-' + opts.prop).attr('width', width).attr('height', height);
      svg.selectAll('rect').data(opts.data).enter().append('rect').attr('x', function (d, i) {
        return i * (width / opts.data.length);
      }).attr('y', function (d) {
        var quo = max - min === 0
          ? 1
          : max - min;
        var value = height - Math.abs((((d - min) / quo)) * height / 2);
        return value >= (height - minBarValue)
          ? height - minBarValue
          : value;
      }).attr('width', width / opts.data.length - barPadding).attr('height', height).attr('fill', '#e8e9e9');
    }
    this.on('mount', function () {
      var rtime;
      var timeout = false;
      var delta = 200;
      $(window).resize(function () {
        rtime = new Date();
        if (timeout === false) {
          timeout = true;
          setTimeout(resizeend, delta);
        }
      });

      function resizeend() {
        if (new Date() - rtime < delta) {
          setTimeout(resizeend, delta);
        } else {
          timeout = false;
          drawChart();
        }
      }

      setTimeout(drawChart, 100)
    });
  </script>
  <style>
    mini-bar-chart {
      display: block;
    }

    mini-bar-chart svg {
      position: relative;
      z-index: 0;
    }

  </style>
</mini-bar-chart>
