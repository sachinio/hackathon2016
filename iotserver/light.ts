/**
 * Created by spatney on 2/24/2016.
 */

import {IGlimpse, ConstructorOptions, IHost, IViewport} from '../node_modules/pbi-glimpse/glimpse'

class Glimpse implements IGlimpse {
    private state;
    constructor(private options: ConstructorOptions){

        this.toggle(false);
        options.host.on('update', (data)=>{
            this.toggle(data === '1' ? true : false);
        });

        $(options.element).on('click', ()=>{
            this.toggle(!this.state);
            this.options.host.emit('light', this.state);
        });
    }

    private toggle(value: boolean){
        this.state = value;
        $(this.options.element).css('background-color', value ? 'yellow':'black' );
    }

    public resize(viewport: IViewport){
        console.log('resizing ...')
    }
}