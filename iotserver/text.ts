/**
 * Created by spatney on 2/26/2016.
 */
/**
 * Created by spatney on 2/24/2016.
 */

import {IGlimpse, ConstructorOptions, IHost, IViewport} from '../node_modules/pbi-glimpse/glimpse'

class Glimpse implements IGlimpse {
    private text;
    private bar;
    private barWidth;
    private viewport;

    constructor(private options: ConstructorOptions){
        this.appendPbiStyles();
        var count = 0;
        var text= this.text= $('<div></div>');
        text.css({
            'text-align': 'center',
            'vertical-align': 'middle',
            'color':'#EDC951',
            'font-size': '60px',
            'font-family': 'wf_standard-font_light',
        });

        this.bar = $('<div class="bar"></div>');
        this.bar.css({
            'background-color':'#EDC951',
            'transition': 'width 0.1s'
        });
        $(options.element).append(text).append(this.bar);

        d3.select(options.element).style('background','#333333');

        text.text('-');

        options.host.on('update', (data: any)=>{
            text.text(data.text ? data.text : data);
            if(data.width){

                this.bar.css({
                    'width': (data.width * 100) + '%',
                    'height': 8 + 'px'
                });
                if(!this.barWidth){
                    this.barWidth = true;
                    this.resize(this.viewport);
                }
            }
        });
    }

    public resize(viewport: IViewport){
        this.viewport = viewport;
        this.text.css('line-height',(viewport.height - (this.barWidth !== undefined ? 8 : 0)) + 'px');

        console.log('resizing ...')
    }

    private appendCss(url: string, onload?:()=>void): void{
        var node = $("<link>", {
            type: 'text/css',
            rel: 'stylesheet',
            href: url,
            onload: onload
        });

        node.appendTo($('head'));
    }

    private appendPbiStyles(){
        this.appendCss('https://visual.azureedge.net/glimpse/pbistyleoverride.css');
        this.appendCss('https://visual.azureedge.net/glimpse/pbistyle.css');
    }
}