<line-chart>
  <!-- http://code.tutsplus.com/tutorials/building-a-multi-line-chart-using-d3js--cms-22935 -->
  <div class="header">
    <div class="title">{opts.name}</div>
    <div class="description">{opts.description}</div>
    <span class="selected">
      <div class="prop"></div>
      <div class="unix"></div>
    </span>
  </div>
  <svg class="chart" id="line-chart-{opts.prop}" preserveAspectRatio="xMidYMin meet">

  </svg>
  <script>
    var yFormatNumber = function (value) {
      return value;
    }
    var yFormatPercentage = function (value) {
      var fmt = d3.format('%');
      return fmt(value / 100);
    }
    var yFormatByte = function (value) {
      var units = ['KB', 'MB', 'GB', 'TB'];
      var index = 0;
      while (value > 99) {
        value /= 1024;
        index++;
      }
      return d3.format('.1f')(value) + units[index];
    }

    this.on('mount', function () {
      var vis = d3.select('#line-chart-' + opts.prop),
        width = $('#line-chart-' + opts.prop).width(),
        height = $('#line-chart-' + opts.prop).height(),
        margin = {
          top: 20,
          right: 30,
          bottom: 20,
          left: 40
        };

      vis.attr("viewBox", "0 0 " + width + " " + height);
      opts.prop = opts.prop.replace(new RegExp('-', 'g'), '.');
      if (opts.unit && opts.unit === "mb") {
        _.map(opts.data, function (data) {
          _.set(data, opts.prop, _.get(data, opts.prop) * 1024)
        });
      }

      var yMax = opts.max * 1024 || _.max(_.map(opts.data, function (row) {
        return _.get(row, opts.prop)
      }));

      if (opts.prop === "ram.used") {
        _.map(opts.data, function (data) {
          _.set(data, 'ram.cached', _.get(data, 'ram.cached') * 1024 + _.get(data, 'ram.used'));
          _.set(data, 'ram.buffers', _.get(data, 'ram.buffers') * 1024 + _.get(data, 'ram.cached'));
          _.set(data, 'ram.free', yMax);
        });
      }

      if (opts.type === 'percentage' && yMax < 3)
        yMax = 3;

      if (yMax === 0 && opts.type !== 'percentage')
        yMax = 128;

      var xScale = d3.time.scale().range([
          margin.left, width - margin.right
        ]).domain(d3.extent(opts.timeSeries)),
        yScale = d3.scale.linear().range([
          height - margin.top,
          margin.bottom
        ]).domain([0, yMax]),
        xAxis = d3.svg.axis().scale(xScale).orient('bottom').ticks(8).innerTickSize(-height).outerTickSize(0).tickPadding(10),
        yAxis = d3.svg.axis().scale(yScale).orient('left').ticks(4).innerTickSize(-width).outerTickSize(10).tickPadding(0);

      if (opts.type === 'percentage')
        yAxis.tickFormat(yFormatPercentage);
      else if (opts.type === 'number')
        yAxis.tickFormat(yFormatNumber);
      else
        yAxis.tickFormat(yFormatByte);

      var lineGen = function(data, prop) {
        return d3.svg.line().x(function (d) {
          return xScale(d.unix);
        }).y(function (d) {
          return yScale(_.get(d, prop));
        }).interpolate('linear').call(this, opts.data);
      }

      var areaGen = function(data, prop) {
        return d3.svg.area().x(function (d) {
          return xScale(d.unix);
        })
        .y0(height - margin.bottom)
        .y1(function (d) {
          return yScale(_.get(d, prop));
        }).call(this, opts.data);
      }

      vis.append('svg:g').attr('class', 'x axis').attr('transform', 'translate(0,' + (height - margin.bottom) + ')').call(xAxis);
      vis.append('svg:g').attr('class', 'y axis').attr('width', '20px').attr('transform', 'translate(0 ,0)').call(yAxis);

      if (opts.prop === "ram.used") {
        vis.append('svg:path').attr('d', areaGen(opts.data, "ram.free")).attr('class', 'area free').attr('stroke-linejoin', 'round').on('mouseover', function () {});
        vis.append('svg:path').attr('d', areaGen(opts.data, "ram.buffers")).attr('class', 'area buffers').attr('stroke-linejoin', 'round').on('mouseover', function () {});
        vis.append('svg:path').attr('d', areaGen(opts.data, "ram.cached")).attr('class', 'area cached').attr('stroke-linejoin', 'round').on('mouseover', function () {});
        vis.append('svg:path').attr('d', areaGen(opts.data, opts.prop)).attr('class', 'area used').attr('stroke-linejoin', 'round').on('mouseover', function () {});
      } else {
      vis.append('svg:path').attr('d', lineGen(opts.data, opts.prop)).attr('stroke-linejoin', 'round').on('mouseover', function () {});
      }
      vis.selectAll("dot").data(opts.data).enter().append("rect").attr("x", function (d) {
        return xScale(d.unix);
      }).attr("y", function (d) {
        return 0;
      }).attr("height", function (d) {
        return height - 20;
      }).attr("width", function (d) {
        return 2.5;
      }).on("mouseover", function (d) {
        $('.unix, .prop', $(this).parent().parent()).show();
        $('.unix', $(this).parent().parent()).text(moment(d.unix).format('HH:mm, DD.MM.YYYY'));
        $('.prop', $(this).parent().parent()).text(_.get(d, opts.prop));
      }).on("mouseout", function (d) {
        $('.unix, .prop', $(this).parent().parent()).hide();
      });
    });
  </script>
  <style>
    line-chart rect {
      opacity: 0;
      fill: #ccc;
      stroke: transparent;
      stroke-width: 3px;
    }
    line-chart rect:hover {
      opacity: 1;
    }

    line-chart .area {
      stroke: none;
    }

    line-chart .area.used {
      fill: #e91e63;
    }

    line-chart .area.cached,
    line-chart .area.buffers,
    line-chart .area.free {
      fill: rgba(233, 30, 99, 0.33);
    }

    line-chart .selected {
      font-size: 0.9em;
      position: absolute;
      top: 15px;
      left: 100px;
      color: #222;
    }

    line-chart .selected .prop {
      color: #e91e63;
      font-weight: 500;
    }

    line-chart {
      display: inline-block;
      background: #fff;
      position: relative;
    }
    line-chart .header {
      padding: 15px 0;
      margin-bottom: -30px;
    }
    line-chart .header .title {
      color: #333;
    }
    line-chart .header .description {
      color: #888;
      font-size: 0.85em;
    }
    line-chart svg .axis text {
      font-size: 11px;
      fill: #333;
    }

    line-chart svg .y.axis text {
      text-anchor: start!important;
    }

    line-chart svg .x.axis .tick line {
      stroke: #e4e4e4;
      stroke-width: 1px;
      stroke-dasharray: 4px;
    }

    line-chart svg path {
      stroke-width: 3px;
      fill: none;
      stroke: #e91e63;
      vector-effect: non-scaling-stroke;
    }

    line-chart svg .domain {
      opacity: 0;
    }

  </style>
</line-chart>
