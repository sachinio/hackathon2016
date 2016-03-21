/**
 * Created by spatney on 3/21/2016.
 */
/**
 * Created by spatney on 2/26/2016.
 */
/**
 * Created by spatney on 2/24/2016.
 */

import {IGlimpse, ConstructorOptions, IHost, IViewport} from '../node_modules/pbi-glimpse/glimpse'

class Glimpse implements IGlimpse {
    private text;
    private counter=0;
    private viewport;

    constructor(private options: ConstructorOptions){
        this.appendPbiStyles();
        var text= this.text= $('<div></div>');
        text.css({
            'text-align': 'center',
            'vertical-align': 'middle',
            'color':'#EDC951',
            'font-size': '60px',
            'font-family': 'wf_standard-font_light',
        });

        $(options.element).append(text)

        d3.select(options.element).style('background','#333333');

        text.text(this.counter);

        options.host.on('update',()=>{
            text.text(++this.counter);
        });
    }

    public resize(viewport: IViewport){
        this.viewport = viewport;
        this.text.css('line-height',viewport.height  + 'px');
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