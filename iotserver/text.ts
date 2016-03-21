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

    constructor(private options: ConstructorOptions){
        var count = 0;
        var text= this.text= $('<div></div>');
        text.css({
            'text-align': 'center',
            'vertical-align': 'middle',
            'color':'#EDC951',
            'font-size': '60px',
            'font-family': 'wf_standard-font_light',
            'transition': 'width 0.1s'
        });

        this.bar = $('<div class="bar"></div>');
        this.bar.css('background-color','#EDC951');
        $(options.element).append(text).append(this.bar) //.append('<span class="glyphicon pbi-glyph-barchart glyph-large" aria-hidden="true"></span>');

        d3.select(options.element).style('background','#333333');

        text.text('-');

        options.host.on('update', (data: any)=>{
            text.text(data.text ? data.text : data);
            if(data.width){
                this.barWidth = true;
                this.bar.css({
                    'width': (data.width * 100) + '%',
                    'height': 8 + 'px'
                });
            }
        });
    }

    public resize(viewport: IViewport){
        this.text.css('line-height',(viewport.height - (this.barWidth !== undefined ? 8 : 0)) + 'px');

        console.log('resizing ...')
    }
}