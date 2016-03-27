<bulletin-board>

  <script>
    this.cpu = _.map(opts, function (data) {
      return parseInt(data.cpu.s.mean + data.cpu.u.mean);
    });

    this.ram = _.map(opts, function (data) {
      return parseInt(data.ram.mean);
    });

    this.swap = _.map(opts, function (data) {
      return parseInt(data.swap.mean);
    });
  </script>

  <div class="component-container clearfix">
    <div class="title"></div>
    <div class="component cpu">
      <div class="name">CPU</div>
      <div class="value">{Math.round(10 * (opts[0].cpu.s.mean + opts[0].cpu.u.mean)) / 10}</div>
      <div class="unit">%</div>
      <mini-bar-chart data="{JSON.stringify(this.cpu)}" prop="cpu"></mini-bar-chart>
    </div>
    <div class="component ram">
      <div class="name">RAM</div>
      <div class="value">{Math.round(10 * opts[0].ram.mean / 1024) / 10}</div>
      <div class="unit">GB</div>
      <mini-bar-chart data="{JSON.stringify(this.ram)}" prop="ram"></mini-bar-chart>
    </div>
    <div class="component swap">
      <div class="name">SWAP</div>
      <div class="value">{Math.round(10 * opts[0].swap.mean / 1024) / 10}</div>
      <div class="unit">GB</div>
      <mini-bar-chart data="{JSON.stringify(this.swap)}" prop="swap"></mini-bar-chart>
    </div>
  </div>
  <style>
    bulletin-board {
      display: block;
      margin-top: 15px;
    }

    bulletin-board .component > div {
      position: relative;
      z-index: 2;
    }

    bulletin-board .value {
      color: #e91e63;
      font-size: 3em;
      font-weight: 300;
      float: left;
      margin-left: -2px;
    }

    bulletin-board .unit {
      color: #888;
      float: left;
      font-weight: 300;
      font-size: 1.3em;
      padding-top: 25px;
      padding-left: 2px;
    }

    bulletin-board .name {
      clear: both;
      text-align: left;
      color: #333;
      margin-bottom: -6px;
    }

  </style>

</bulletin-board>
