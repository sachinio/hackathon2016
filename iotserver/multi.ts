/**
 * Created by spatney on 2/26/2016.
 */
/**
 * Created by spatney on 2/24/2016.
 */

import {IGlimpse, ConstructorOptions, IHost, IViewport} from '../node_modules/pbi-glimpse/glimpse'

class Glimpse implements IGlimpse {
    constructor(private options: ConstructorOptions){
        var count = 0;
        $(options.element).css('font-size','200px').text('0');
        options.host.on('update', (data)=>{
            options.element.textContent = data;
        });
    }

    public resize(viewport: IViewport){
        console.log('resizing ...')
    }
}