/**
 * Created by spatney on 2/27/2016.
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
        this.viewport = { height: 1, width: 1 };
        this.dia = 10;
        this.level = 0;
        this.tall = 10;
        var zindex = 15;
        var canvas = this.canvas = document.createElement("canvas");
        canvas.id = 'canvas';
        canvas.style.zIndex = zindex;
        options.element.appendChild(canvas);
        this.ctx = canvas.getContext('2d');
        options.host.on('update', function (d) {
            _this.level = d;
            _this.draw();
        });
    }
    Glimpse.prototype.resize = function (viewport) {
        this.viewport = viewport;
        var canvas = this.canvas;
        canvas.width = this.viewport.width;
        canvas.height = this.viewport.height;
        this.draw();
    };
    Glimpse.prototype.food = function (x, y) {
        var ctx = this.ctx;
        var side = this.dia;
        ctx.beginPath();
        ctx.arc(x, y, side / 2, 0, 2 * Math.PI, false);
        ctx.fillStyle = '#B0AC69';
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#003300';
        ctx.stroke();
    };
    Glimpse.prototype.draw = function () {
        var tall = this.tall;
        var level = this.level;
        var ctx = this.ctx;
        var H = this.viewport.height;
        var W = this.viewport.width;
        var side = this.dia;
        ctx.clearRect(0, 0, W, H);
        ctx.save();
        for (var i = level; i < tall; i++) {
            for (var j = 0; j < i + 1; j++) {
                this.food(W / 2 + ((j - i / 2) * side), side * (i + 1) + (H - (tall * side + side)));
            }
        }
        ctx.restore();
    };
    return Glimpse;
})();
//# sourceMappingURL=food.js.map