/**
 * Created by spatney on 3/20/2016.
 */
/**
 * Created by spatney on 2/26/2016.
 */
/**
 * Created by spatney on 2/24/2016.
 */
var Glimpse = (function () {
    function Glimpse(options) {
        var _this = this;
        this.options = options;
        this.value = 0.5;
        var svg = this.svg = d3.select(options.element).append('svg');
        d3.select(options.element).style('background', '#333333');
        var circle = this.circle = svg.append('circle');
        circle.style({
            fill: '#EDC951',
            'stroke-width': '1px',
            'stroke': '#EDC951'
        });
        options.host.on('update', function (data) {
            _this.value = data;
            _this.circle.attr('r', viewport.height / 4 * data);
        });
    }
    Glimpse.prototype.resize = function (viewport) {
        this.svg.attr({
            width: viewport.width,
            height: viewport.height
        });
        this.circle.attr({
            cx: viewport.width / 2,
            cy: viewport.height / 2,
            r: viewport.height / 4 * this.value
        });
        this.viewport = viewport;
    };
    return Glimpse;
})();
//# sourceMappingURL=orient.js.map