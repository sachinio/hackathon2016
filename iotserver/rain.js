/**
 * Created by spatney on 2/24/2016.
 */
var Glimpse = (function () {
    function Glimpse(options) {
        var _this = this;
        this.options = options;
        this.w = 900;
        this.h = 500;
        this.maxParts = 10;
        var canvas = $('<canvas id="canvas"></canvas>');
        canvas.width(this.w);
        canvas.height(this.h);
        this.canvas = canvas[0];
        d3.select(options.element).style('background', '#AAAAAA');
        $(options.element).append(canvas);
        this.init();
        setInterval(function () { return _this.draw(); }, 50);
        options.host.on('rain', function (data) {
            var value = parseInt(data);
            if (value > 99) {
                console.log(data);
                var last = _this.maxParts;
                _this.maxParts = (1000 - value) * 2;
                if (last != _this.maxParts) {
                    if (_this.maxParts > 0) {
                        d3.select(options.element).transition().duration(3000).style('background', '#333333');
                    }
                    else {
                        d3.select(options.element).transition().duration(3000).style('background', '#AAAAAA');
                    }
                }
            }
            _this.init();
        });
    }
    Glimpse.prototype.init = function () {
        var canvas = this.canvas;
        if (canvas.getContext) {
            var ctx = this.ctx = canvas.getContext('2d');
            var w = this.w;
            var h = this.h;
            ctx.strokeStyle = '#00B4FF';
            ctx.lineWidth = 1;
            ctx.lineCap = 'round';
            var init = [];
            var maxParts = this.maxParts;
            for (var a = 0; a < maxParts; a++) {
                init.push({
                    x: Math.random() * w,
                    y: Math.random() * h,
                    l: Math.random() * 1,
                    xs: -4 + Math.random() * 4 + 2,
                    ys: Math.random() * 10 + 10
                });
            }
            var particles = this.particles = [];
            for (var b = 0; b < maxParts; b++) {
                particles[b] = init[b];
            }
        }
    };
    Glimpse.prototype.draw = function () {
        var ctx = this.ctx;
        var particles = this.particles;
        ctx.clearRect(0, 0, this.w, this.h);
        for (var c = 0; c < particles.length; c++) {
            var p = particles[c];
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.x + p.l * p.xs, p.y + p.l * p.ys);
            ctx.stroke();
        }
        this.move();
    };
    Glimpse.prototype.move = function () {
        var particles = this.particles;
        for (var b = 0; b < particles.length; b++) {
            var p = particles[b];
            p.x += p.xs;
            p.y += p.ys;
            if (p.x > this.w || p.y > this.h) {
                p.x = Math.random() * this.w;
                p.y = -20;
            }
        }
    };
    Glimpse.prototype.resize = function (viewport) {
        console.log('resizing ...');
        console.log(viewport);
        this.w = viewport.width;
        this.h = viewport.height;
        $(this.canvas).height(this.h);
        $(this.canvas).width(this.w);
        this.init();
    };
    return Glimpse;
})();
//# sourceMappingURL=rain.js.map