<line-chart>
  <div class="header">
    <div class="title">{opts.name}</div>
    <div class="description">{opts.description}</div>
  </div>
  <div id="line-chart-{opts.cs}"></div>
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
      while ( + value > 99) {
        value /= 1024;
        index++;
      }
      return d3.format('.1f')(value) + units[index];
    }

    var lines = [opts.dataset.unix];
    var dataset = opts.dataset;
    var values = [];
    var splits = null,
      selector = null;

    var props = opts.prop.split(',');
    props.forEach(function (prop) {
      prop = prop.replace(new RegExp('-', 'g'), '.');
      values = [];

      splits = prop.split('.');
      selector = _.drop(splits, 1).join('.');

      yMax = parseInt(opts.max);

      values.push(prop);
      _.map(dataset[splits[0]], function (data) {
        splits.length > 1
          ? values.push(_.get(data, selector))
          : values.push(data);
      });

      lines.push(values);
    });

    var groups = [];
    if (opts.groups) {
      groups = [opts.groups.split(',')];
    }

    var chart = null;
    this.on('mount', function () {
      chart = c3.generate({
        bindto: '#line-chart-' + opts.cs,
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
          columns: lines
        },
        color: {
          pattern: ['#e91e63', '#9C27B0', '#3F51B5']
        },
        bar: {
          width: 3
        },
        axis: {
          x: {
            type: 'timeseries',
            tick: {
              count: 4,
              format: function(unix) {
                return moment(unix).format('HH:mm');
              }
            }
          },
          y: {
            min: 0,
            max: yMax,
            tick: {
              count: 5,
              format: function (value) {
                if (opts.unit === 'b') {return yFormatByte(value);} else if (opts.unit === '%') {return yFormatPercentage(value);} else {return yFormatNumber(value);}
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
    this.on('unmount', function () {
      chart = null;
    });
  </script>
  <style>
  line-chart svg {
    overflow: visible!important;
  }
    line-chart .c3-line {
      stroke-width: 3px;
      stroke-linejoin: round;
    }
    line-chart .c3-area {
      opacity: 1!important;
    }
    line-chart text {
      fill: #444;
    }
  </style>
</line-chart>
