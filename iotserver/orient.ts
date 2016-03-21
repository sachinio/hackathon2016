/**
 * Created by spatney on 3/20/2016.
 */
/**
 * Created by spatney on 2/26/2016.
 */
/**
 * Created by spatney on 2/24/2016.
 */

import {IGlimpse, ConstructorOptions, IHost, IViewport} from '../node_modules/pbi-glimpse/glimpse'

class Glimpse implements IGlimpse {
    private viewport;
    private circle;
    private svg;
    private value  = 0.5;

    constructor(private options: ConstructorOptions){
        var svg =  this.svg =d3.select(options.element).append('svg');
        d3.select(options.element).style('background','#333333');
        var circle = this.circle = svg.append('circle');
        circle.style({
            fill: '#EDC951',
            'stroke-width': '1px',
            'stroke': '#EDC951'
        });

        options.host.on('update',(data: any)=>{
            this.value = data;
            this.circle.attr('r', data);
        });
    }

    public resize(viewport: IViewport){
        this.svg.attr({
            width: viewport.width,
            height: viewport.height
        });

        this.circle.attr({
            cx: viewport.width/2,
            cy: viewport.height/2,
            r: viewport.height / 4 * this.value
        });
        this.viewport = viewport;
    }
}