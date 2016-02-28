/**
 * Created by spatney on 2/27/2016.
 */
/**
 * Created by spatney on 2/26/2016.
 */
/**
 * Created by spatney on 2/24/2016.
 */

import {IGlimpse, ConstructorOptions, IHost, IViewport} from '../node_modules/pbi-glimpse/glimpse'

class Glimpse implements IGlimpse {
    private canvas;
    private ctx;
    private viewport = {height: 1, width: 1};
    private dia = 10;
    private level = 0;
    private tall = 10;

    constructor(private options:ConstructorOptions) {
        var zindex = 15;
        var canvas = this.canvas = document.createElement("canvas");
        canvas.id = 'canvas';
        canvas.style.zIndex = zindex;
        options.element.appendChild(canvas);
        this.ctx = canvas.getContext('2d');

        options.host.on('update',(d)=>{
            this.level = d;
            this.draw();
        })
    }

    public resize(viewport:IViewport) {
        this.viewport = viewport;
        var canvas = this.canvas;
        canvas.width = this.viewport.width;
        canvas.height = this.viewport.height;
        this.draw();
    }

    private food(x, y) {
        var ctx = this.ctx;
        var side = this.dia;
        ctx.beginPath();
        ctx.arc(x, y, side / 2, 0, 2 * Math.PI, false);
        ctx.fillStyle = '#B0AC69';
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#003300';
        ctx.stroke();
    }

    private draw() {
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
                this.food(
                    W / 2 + ((j - i / 2) * side),
                    side * (i + 1) + (H - (tall * side + side))
                );
            }
        }

        ctx.restore();
    }
}