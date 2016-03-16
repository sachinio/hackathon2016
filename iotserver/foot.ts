/**
 * Created by spatney on 3/8/2016.
 */
import {IGlimpse, ConstructorOptions, IHost, IViewport} from '../node_modules/pbi-glimpse/glimpse'

class Glimpse implements IGlimpse {
    private context;
    private viewport: IViewport;
    private maxR = 40;

    constructor(private options: ConstructorOptions){
        d3.select(options.element).append('canvas').attr('id','canvas')
            .style('background', 'url("http://images.clipartpanda.com/wrongdoing-clipart-left-foot-hollow-md.png")')
            .style('background-position','center')
            .style('background-repeat','no-repeat')
            .style('background-size','contain');
        this.context = document.getElementById('canvas').getContext('2d');
        options.host.on('update', (data)=>{
            var maxR = this.maxR;
            var height = this.viewport.height;
            var width = this.viewport.width;
            if(data.s2 <= 2) {
                this.drawCircle(width * 2.5 / 6, (height - (height - (297 * width / 234)) / 2) - maxR * 2 / 3, maxR * (<any>data).s2);
            }
        });
    }

    public drawCircle(cx, cy, r){
        var context = this.context;
        context.clearRect(0,0,this.viewport.width, this.viewport.height)
        context.beginPath();
        context.arc(cx, cy, r, 0, 2 * Math.PI, false);
        context.fillStyle = 'red';
        context.fill();
        context.lineWidth = 5;
        context.strokeStyle = '#003300';
        context.stroke();
    }
    public resize(viewport: IViewport){
        this.viewport = viewport;
        d3.select('#canvas').attr('width', viewport.width).attr('height', viewport.height);
    }
}