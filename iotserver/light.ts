/**
 * Created by spatney on 2/24/2016.
 */

import {IGlimpse, ConstructorOptions, IHost, IViewport} from '../node_modules/pbi-glimpse/glimpse'

class Glimpse implements IGlimpse {
    private state;
    private static CSSString = "#light,.container{text-align:center}body{background:#FFF}.night{background:#000}.container{margin:20px auto}h2{color:#CCC}.bulb-light{position:relative;border:0;background:0 0;margin:0 auto!important;padding:0!important;cursor:pointer;display:block;z-index:1}#light,.screw-top{-moz-border-radius:999px;-webkit-border-radius:999px}#light{-moz-opacity:0;-khtml-opacity:0;opacity:0;position:absolute;top:5px;left:0;right:0;box-shadow:0 0 500px rgba(255,210,00,1),inset 0 0 500px 90px rgba(255,210,00,.42);-moz-box-shadow:0 0 500px rgba(255,210,00,1),inset 0 0 500px 90px rgba(255,210,00,.42);-webkit-box-shadow:0 0 500px rgba(255,210,00,1),inset 0 0 500px 90px rgba(255,210,00,.42);-khtml-border-radius:999px;border-radius:999px;width:290px;height:290px;background:0 0;margin:0 auto;z-index:2}#bulb{opacity:1;z-index:3}.bulb-top{position:relative;border:0;width:300px;height:300px;margin:0 auto;padding:0;-moz-border-radius:999px;-webkit-border-radius:999px;-khtml-border-radius:999px;border-radius:999px;background:#E7E7E7;box-shadow:inset 0 10px 15px -5px rgba(10,30,60,.1);-moz-box-shadow:inset 0 10px 15px -5px rgba(10,30,60,.1);-webkit-box-shadow:inset 0 20px 40px -10px rgba(10,30,60,.1)}.reflection{position:absolute;top:50px;left:50px;background:rgba(255,255,255,.8);width:50px;height:50px;-moz-border-radius:999px 400px;-webkit-border-radius:999px 400px;-khtml-border-radius:999px 400px;border-radius:999px 400px}.bulb-middle-1{margin:-75px auto 0;width:190px;height:0;border-left:35px solid transparent;border-right:35px solid transparent;border-top:55px solid #E7E7E7}.bulb-middle-2{margin:-22px auto 0;width:178px;height:0;border-left:19px solid transparent;border-right:19px solid transparent;border-top:50px solid #E7E7E7}.bulb-middle-3{margin:-20px auto 0;width:182px;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-top:30px solid #E7E7E7}.bulb-bottom{width:184px;height:65px;margin:-8px auto 0;padding:0;-moz-border-radius:0 0 999px 999px;-webkit-border-radius:0 0 999px 999px;-khtml-border-radius:0 0 999px 999px;border-radius:0 0 999px 999px;background:#E7E7E7;box-shadow:inset 0 -10px 14px -7px rgba(10,30,60,.1);-moz-box-shadow:inset 0 -10px 14px -7px rgba(10,30,60,.1);-webkit-box-shadow:inset 0 -10px 14px -7px rgba(10,30,60,.1)}.screw-a,.screw-top{-khtml-border-radius:999px}#base{position:relative;z-index:2}.screw-top{margin:-18px auto -4px;padding:0;width:132px;height:0;border-left:15px solid transparent;border-right:15px solid transparent;border-top:21px solid #D3D3D3;border-radius:999px}.screw-a,.screw-b{height:15px;margin:-1px auto 0;padding:0;transform:rotate(-3deg)}.screw-a{background:#DDD;width:150px;-moz-border-radius:999px;-webkit-border-radius:999px;border-radius:999px;-ms-transform:rotate(-3deg);-webkit-transform:rotate(-3deg)}.screw-b{background:#D9D9D9;width:135px;-ms-transform:rotate(-3deg);-webkit-transform:rotate(-3deg)}.screw-c,.screw-c2{margin:-1px auto 0;transform:rotate(-3deg)}.screw-c2{background:#DDD;width:135px;height:20px;padding:0;-moz-border-radius:0 0 999px 999px;-webkit-border-radius:0 0 999px 999px;-khtml-border-radius:0 0 999px 999px;border-radius:0 0 999px 999px;-ms-transform:rotate(-3deg);-webkit-transform:rotate(-3deg)}.screw-c,.screw-d{padding:0;height:0;border-left:30px solid transparent;border-right:30px solid transparent}.screw-c{width:78px;border-top:20px solid #DDD;-moz-border-radius:8px;-webkit-border-radius:8px;-khtml-border-radius:8px;border-radius:8px;-ms-transform:rotate(-3deg);-webkit-transform:rotate(-3deg)}.screw-d{margin:0 auto;width:15px;border-top:15px solid #444;transform:rotate(-3deg);-ms-transform:rotate(-3deg);-webkit-transform:rotate(-3deg)}.night #light{-moz-opacity:1;-khtml-opacity:1;opacity:1}.bulb-bottom,.bulb-top,body{-webkit-transition:background .5s ease-in-out;-moz-transition:background .5s ease-in-out;-o-transition:background .5s ease-in-out;transition:background .5s ease-in-out}.bulb-middle-1,.bulb-middle-2,.bulb-middle-3{-webkit-transition:border .5s ease-in-out;-moz-transition:border .5s ease-in-out;-o-transition:border .5s ease-in-out;transition:border .5s ease-in-out}.night .bulb-bottom,.night .bulb-top{background:#FE3}.night .bulb-middle-1{border-top:55px solid #FE3}.night .bulb-middle-2{border-top:50px solid #FE3}.night .bulb-middle-3{border-top:30px solid #FE3}";
    private static HTMLTemplate = ' <div class="container"><a class="bulb-light"> <div id="light"></div><div id="bulb"> <div class="bulb-top"> <div class="reflection"></div></div><div class="bulb-middle-1"></div><div class="bulb-middle-2"></div><div class="bulb-middle-3"></div><div class="bulb-bottom"></div></div><div id="base"> <div class="screw-top"></div><div class="screw-a"></div><div class="screw-b"></div><div class="screw-a"></div><div class="screw-b"></div><div class="screw-a"></div><div class="screw-b"></div><div class="screw-c"></div><div class="screw-d"></div></div></a> </div>'
    constructor(private options: ConstructorOptions){
        $("<style type='text/css'>"+Glimpse.CSSString+"</style>").appendTo("head");
        $(options.element).append($(Glimpse.HTMLTemplate));
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
        if(this.state) {
            $('body').removeClass('night');
        }else{
            $('body').addClass('night');
        }
        //$(this.options.element).css('background-color', value ? 'yellow':'black' );
    }

    public resize(viewport: IViewport){
        console.log('resizing ...')
    }
}