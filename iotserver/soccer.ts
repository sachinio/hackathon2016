/**
 * Created by spatney on 3/16/2016.
 */
import {IGlimpse, ConstructorOptions, IHost, IViewport} from '../node_modules/pbi-glimpse/glimpse'

class Glimpse implements IGlimpse {
    private text;
    private static css = "#container{position:relative}#shoe{background-image:url(https://visual.azureedge.net/dev/right_shoe.png)}#right_sensor{background-image:url(https://visual.azureedge.net/dev/right_sensor.png)}#left_sensor{background-image:url(https://visual.azureedge.net/dev/left_sensor.png)}#side_sensor{background-image:url(https://visual.azureedge.net/dev/side_sensor.png)}#heel_sensor{background-image:url(https://visual.azureedge.net/dev/heel_sensor.png)}.layer{margin-right:10%;margin-left:10%;position:absolute;height:100%;width:80%;background-size:100% 100%;background-repeat:no-repeat}";
    private static template: string =
        `<div id="container">
            <div id="shoe" class="layer"></div>
            <div id="right_sensor" class="layer"></div>
            <div id="left_sensor" class="layer"></div>
            <div id="heel_sensor" class="layer"></div>
            <div id="side_sensor" class="layer"></div>
        </div>`;

    private container;

    constructor(private options: ConstructorOptions){
        $("<style type='text/css'>"+Glimpse.css+"</style>").appendTo("head");
        var container = this.container = $(Glimpse.template);
        $(options.element).append(container);

        options.host.on('update', (data: any)=>{
            $('#right_sensor').css({'opacity' : data.right});
            $('#left_sensor').css({'opacity' : data.left});
            $('#heel_sensor').css({'opacity' : data.heel || 0});
            $('#side_sensor').css({'opacity' : data.side || 0});
        });

        this.init();
    }

    private init(){
        $('#right_sensor').css('opacity', 0.3);
        $('#left_sensor').css('opacity', 0.3);
        $('#heel_sensor').css('opacity', 0.3);
        $('#side_sensor').css('opacity', 0.3);
    }

    public resize(viewport: IViewport){
        this.container.css('height', viewport.height).css('width',viewport.width);
    }
}