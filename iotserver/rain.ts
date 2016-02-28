/**
 * Created by spatney on 2/24/2016.
 */

import {IGlimpse, ConstructorOptions, IHost, IViewport} from '../node_modules/pbi-glimpse/glimpse'

class Glimpse implements IGlimpse {
    private ctx;
    private canvas;
    private particles;
    private w=900;
    private h=500;
    private maxParts = 0;

    constructor(private options:ConstructorOptions) {
        var canvas = $('<canvas id="canvas"></canvas>');
        canvas.width(this.w);
        canvas.height(this.h);
        this.canvas = canvas[0];
        $(options.element).css('background', '#061928')
        $(options.element).append(canvas);
        this.init();
        setInterval(()=>this.draw(), 50);

        options.host.on('rain', (data)=>{
            var value = parseInt(<any>data);
            if(value > 99) {
                console.log(data);
                this.maxParts = (1000 - value) * 5;
            }
            this.init();
        })
    }

    private init() {
        var canvas = this.canvas;
        if (canvas.getContext) {
            var ctx=this.ctx= canvas.getContext('2d');
            var w = this.w;
            var h = this.h;
            ctx.strokeStyle = 'rgba(174,194,224,0.5)';
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
                })
            }

            var particles = this.particles =[];
            for (var b = 0; b < maxParts; b++) {
                particles[b] = init[b];
            }

        }
    }
    private draw() {
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
    }

    private move() {
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
    }

    public resize(viewport:IViewport) {
        console.log('resizing ...');
        console.log(viewport);
        this.w = viewport.width;
        this.h = viewport.height;
        $(this.canvas).height(this.h);
        $(this.canvas).width(this.w);
        this.init();
    }
}