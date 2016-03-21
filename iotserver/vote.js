var Glimpse = (function () {
    function Glimpse(options) {
        var _this = this;
        this.options = options;
        this.vote = [];
        this.appendPbiStyles();
        $("<style type='text/css'> svg{ background: #333333} .bar { fill: #EDC951; } .axis { font: 12px wf_standard-font_light; } .axis path,.axis line {fill: none; stroke: #EDC951; shape-rendering: crispEdges; }.axis text{ fill: #EDC951; } .x.axis path { display: none; }</style>").appendTo("head");
        this.data = [];
        this.svg = d3.select(options.element).append('svg');
        this.mainGroup = this.svg.append('g');
        this.xAxisGroup = this.mainGroup.append("g")
            .attr("class", "x axis");
        this.yAxisGroup = this.mainGroup.append("g")
            .attr("class", "y axis");
        this.yAxisGroup
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Vote %");
        options.host.on('update', function (d) {
            _this.addVote(d);
            _this.processData();
            _this.draw(1000);
        });
    }
    Glimpse.prototype.addVote = function (key) {
        if (this.vote[key] === undefined) {
            this.vote[key] = 1;
        }
        else {
            this.vote[key] = ++this.vote[key];
        }
    };
    Glimpse.prototype.processData = function () {
        var total = 0;
        this.data = [];
        for (var key in this.vote) {
            total += this.vote[key];
        }
        for (var key in this.vote) {
            this.data.push({ letter: key, frequency: this.vote[key] / total });
        }
    };
    Glimpse.prototype.draw = function (duration) {
        var data = this.data;
        var margin = { top: 20, right: 20, bottom: 30, left: 45 }, width = this.viewport.width - margin.left - margin.right, height = this.viewport.height - margin.top - margin.bottom;
        var x = d3.scale.ordinal()
            .rangeRoundBands([0, width], .1);
        var y = d3.scale.linear()
            .range([height, 0]);
        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");
        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .ticks(10, "%");
        this.svg.attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom);
        this.mainGroup
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        x.domain(data.map(function (d) { return d.letter; }));
        y.domain([0, d3.max(data, function (d) { return d.frequency; })]);
        this.xAxisGroup
            .attr("transform", "translate(0," + height + ")")
            .transition()
            .duration(duration)
            .call(xAxis);
        this.yAxisGroup.transition().duration(duration).call(yAxis);
        var sel = this.mainGroup.selectAll(".bar")
            .data(data);
        sel.enter()
            .append("rect")
            .attr({ 'x': function (d) { return x(d.letter); }, 'y': height, 'height': 0, "width": x.rangeBand() })
            .style('opacity', 0);
        sel.attr("class", "bar")
            .transition()
            .duration(duration)
            .style('opacity', 1)
            .attr("x", function (d) { return x(d.letter); })
            .attr("width", x.rangeBand())
            .attr("y", function (d) { return y(d.frequency); })
            .attr("height", function (d) { return height - y(d.frequency); });
        sel.exit().remove();
        d3.select('text').style('font-family', 'wf_standard-font_light');
    };
    Glimpse.prototype.resize = function (viewport) {
        this.viewport = viewport;
        this.draw(0);
        console.log('resizing ...');
    };
    Glimpse.prototype.appendCss = function (url, onload) {
        var node = $("<link>", {
            type: 'text/css',
            rel: 'stylesheet',
            href: url,
            onload: onload
        });
        node.appendTo($('head'));
    };
    Glimpse.prototype.appendPbiStyles = function () {
        this.appendCss('https://visual.azureedge.net/glimpse/pbistyleoverride.css');
        this.appendCss('https://visual.azureedge.net/glimpse/pbistyle.css');
    };
    return Glimpse;
})();
//# sourceMappingURL=vote.js.map