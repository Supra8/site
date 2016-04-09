<stacked-bar-chart>
  <svg id="sbc"></svg>
  <script>
    this.on('mount', function () {
      var margin = {
          top: 20,
          right: 20,
          bottom: 30,
          left: 40
        },
        width = 500 - margin.left - margin.right,
        height = 200 - margin.top - margin.bottom;

      var x = d3.scale.ordinal().rangeRoundBands([
        0, width
      ], .1);

      var y = d3.scale.linear().range([height, 0]);
      var xAxis = d3.svg.axis().scale(x).orient("bottom");
      var yAxis = d3.svg.axis().scale(y).orient("left").ticks(5);
      var svg = d3.select("#sbc").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      var data = opts.data;

      x.domain(data.map(function (d) {
        return d.date;
      }));
      y.domain([
        0,
        d3.max(data, function (d) {
          return d.value;
        })
      ]);

      svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(xAxis);
      svg.append("g").attr("class", "y axis").call(yAxis);
      svg.selectAll(".bar").data(data).enter().append("rect").attr("class", "bar").attr("x", function (d) {
        return x(d.date);
      }).attr("width", x.rangeBand()).attr("y", function (d) {
        return y(d.value);
      }).attr("height", function (d) {
        return height - y(d.value);
      });
    });
  </script>

  <style>
  stacked-bar-chart .domain {
    fill: none;
  }
  </style>
</stacked-bar-chart>
