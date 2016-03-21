/**
 * Created by spatney on 2/26/2016.
 */
/**
 * Created by spatney on 2/24/2016.
 */

import {IGlimpse, ConstructorOptions, IHost, IViewport} from '../node_modules/pbi-glimpse/glimpse'

class Glimpse implements IGlimpse {
    private text;
    constructor(private options: ConstructorOptions){
        var count = 0;
        var text= this.text= $('<div></div>');
        text.css({
            'text-align': 'center',
            'vertical-align': 'middle',
            'color':'#EDC951',
            'font-size': '60px',
            'font-family': 'wf_standard-font_light'
        });


        $(options.element).append(text)//.append('<span class="glyphicon pbi-glyph-barchart glyph-large" aria-hidden="true"></span>');


        d3.select(options.element).style('background','#333333');

        text.text('4234');
        options.host.on('update', (data)=>{
            text.text(data);
        });
    }

    public resize(viewport: IViewport){
        d3.select('svg').attr('height', viewport.height).attr('width',viewport.width);
        this.text.css('line-height',viewport.height + 'px');
        console.log('resizing ...')
    }
}