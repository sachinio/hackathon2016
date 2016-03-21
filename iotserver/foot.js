var Glimpse = (function () {
    function Glimpse(options) {
        var _this = this;
        this.options = options;
        this.maxR = 40;
        d3.select(options.element).append('canvas').attr('id', 'canvas')
            .style('background', 'url("http://images.clipartpanda.com/wrongdoing-clipart-left-foot-hollow-md.png")')
            .style('background-position', 'center')
            .style('background-repeat', 'no-repeat')
            .style('background-size', 'contain');
        this.context = document.getElementById('canvas').getContext('2d');
        options.host.on('update', function (data) {
            var maxR = _this.maxR;
            var height = _this.viewport.height;
            var width = _this.viewport.width;
            if (data.s2 <= 2) {
                _this.drawCircle(width * 2.5 / 6, (height - (height - (297 * width / 234)) / 2) - maxR * 2 / 3, maxR * data.s2);
            }
        });
    }
    Glimpse.prototype.drawCircle = function (cx, cy, r) {
        var context = this.context;
        context.clearRect(0, 0, this.viewport.width, this.viewport.height);
        context.beginPath();
        context.arc(cx, cy, r, 0, 2 * Math.PI, false);
        context.fillStyle = 'red';
        context.fill();
        context.lineWidth = 5;
        context.strokeStyle = '#003300';
        context.stroke();
    };
    Glimpse.prototype.resize = function (viewport) {
        this.viewport = viewport;
        d3.select('#canvas').attr('width', viewport.width).attr('height', viewport.height);
    };
    return Glimpse;
})();
//# sourceMappingURL=foot.js.map