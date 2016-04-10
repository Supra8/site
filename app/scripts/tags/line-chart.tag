<line-chart>
  <div class="header">
    <div class="title">{opts.name}</div>
    <div class="description">{opts.description}</div>
  </div>
  <div id="line-chart-{opts.prop}"></div>
  <script>
    var yFormatNumber = function (value) {
      return Math.round(value);
    }
    var yFormatPercentage = function (value) {
      //var fmt = d3.format('%'); return fmt(value / 100);
      return d3.format('.1f')(value) + '%';
    }
    var yFormatByte = function (value) {
      if (opts.prop.indexOf('ram') !== -1) {
        value *= 1024;
      }
      var units = ['KB', 'MB', 'GB', 'TB'];
      var index = 0;
      while (+ value > 99) {
        value /= 1024;
        index++;
      }
      return d3.format('.1f')(value) + units[index];
    }

    var prop = opts.prop.replace(new RegExp('-', 'g'), '.');
    var dataset = opts.dataset;
    var values = [];

    var splits = prop.split('.');
    var selector = _.drop(splits, 1).join('.');

    yMax = parseInt(opts.max);

    values.push(prop);
    _.map(dataset[splits[0]], function (data) {
      splits.length > 1
        ? values.push(_.get(data, selector))
        : values.push(data);
    });

    var lines = [opts.dataset.unix, values];

    var buffers = [];
    var cached = [];
    if (opts.prop === 'ram-used') {
      cached.push('ram.cached');
      buffers.push('ram.buffers');
      _.map(dataset.ram, function (data) {
        cached.push(data.cached);
        buffers.push(data.buffers);
      });
      lines.push(cached);
      lines.push(buffers);
    }

    var groups = [];
    if (opts.groups) {
      groups = [opts.groups.split(',')];
    }

    this.on('mount', function () {
      var chart = c3.generate({
        bindto: '#line-chart-' + opts.prop,
        padding: {
          left: 45
        },
        size: {
          height: 220
        },
        data: {
          type: opts.type || '',
          groups: groups,
          x: 'x',
          columns: lines,
          colors: {
            'ram.cached': '#9C27B0',
            'ram.buffers': '#3F51B5'
          },
          color: function (color, d) {
            if (color === '#9C27B0' || color === '#3F51B5') {
              return color;
            } else {
              return '#e91e63';
            }
          }
        },
        bar: {
          width: 3
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
            min: 0,
            max: yMax,
            tick: {
              count: 5,
              format: function (value) {
                if (opts.unit === 'b') {
                  return yFormatByte(value);
                } else if (opts.unit === '%') {
                  return yFormatPercentage(value);
                } else {
                  return yFormatNumber(value);
                }
              }
            },
            padding: {
              top: 0,
              bottom: 0
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
      stroke-linejoin: round;
    }
    line-chart .c3-area {
      opacity: 0.95!important;
    }
    line-chart text {
      fill: #444;
    }

  </style>
</line-chart>
