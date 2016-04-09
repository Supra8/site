<line-chart>
  <div class="header">
    <div class="title">{opts.name}</div>
    <div class="description">{opts.description}</div>
  </div>
  <div id="line-chart-{opts.prop}"></div>
  <script>
    opts.prop = opts.prop.replace(new RegExp('-', 'g'), '.');
    var xValues = [];
    var timeSeries = [];
    _.map(opts.data, function (data) {
      xValues.push(data.unix);
      timeSeries.push(_.get(data, opts.prop));
    });

    xValues.unshift('x');
    timeSeries.unshift(opts.name)

    console.log(xValues);

    this.on('mount', function () {
      var chart = c3.generate({
        bindto: '#line-chart-' + opts.prop,
        size: {
          height: 240
        },
        data: {
          x: 'x',
          columns: [
            xValues, timeSeries
          ],
          colors: {
            'CPU': '#e91e63'
          },
          color: function (color, d) {
            return '#e91e63';
          }
        },
        axis: {
          x: {
            type: 'timeseries',
            tick: {
              count: 5,
              format: '%d.%m.%Y'
            }
          },
          y: {
            tick: {
              count: 5,
              format: d3.format('.1f')
            }
          }
        },
        point: {
          show: false
        },
        legend: {
          show: false
        }
      });
    });
  </script>
  <style>
    line-chart .c3-line {
      stroke-width: 3px;
      stroke-linejoin: round
    }

  </style>
</line-chart>
