import {IGlimpse, ConstructorOptions, IHost, IViewport} from '../node_modules/pbi-glimpse/glimpse'

class Glimpse implements IGlimpse {
    private map;
    private pins = {};
    constructor(private options: ConstructorOptions){
        $(options.element).append('<div id="mapDiv"></div>');

        this.appendJS('https://ecn.dev.virtualearth.net/mapcontrol/mapcontrol.ashx?v=7.0&s=1',()=>{
            setTimeout(() =>{
                this.appendJS('https://visual.azureedge.net/dev/moveLocationPlugin.js',()=>{
                    options.host.emit('alive');
                });
            },2000);
            options.host.on('setView', (data)=>{
                var map = this.ensure();
                if(map) {
                    var viewBoundaries = Microsoft.Maps.LocationRect.fromLocations(
                        new Microsoft.Maps.Location(data[0].latitude, data[0].longitude),
                        new Microsoft.Maps.Location(data[1].latitude, data[1].longitude),
                        new Microsoft.Maps.Location(data[2].latitude, data[2].longitude),
                        new Microsoft.Maps.Location(data[3].latitude, data[3].longitude)
                    );
                    map.setView({bounds: viewBoundaries});
                }
            });

            options.host.on('movePin', (data: any)=>{
                var map = this.ensure();
                if(map) {
                    var loc = new Microsoft.Maps.Location(data.latitude, data.longitude);
                    this.movePin(data.id, loc);
                }
            });
        });
    }

    private createPin(startLoc, icon?){
    var pin = new Microsoft.Maps.Pushpin(
        startLoc,
        {
            //icon: ,
            icon: icon,
            draggable: false,
            //typeName: 'truckMarker',
        });

    this.map.entities.push(pin);

    return pin;
}
    private movePin(id, loc, icon?){
    if(this.pins[id] === undefined){
        console.log('creating pin '+id)
        console.log(loc)
        this.pins[id] = this.createPin(loc, icon)
    }else {

        var pin = this.pins[id];
        pin.moveLocation(loc, 25);
        //pin.setLocation(loc);
    }
}

    private ensure(){
        if(!this.map){

            var BING_KEY = "AiSh7hwvS3f6gXgQV7cWs5DXyLFGL1nSdBrhxp9rAbvJPrwMoTZaf0S7LY_DdBin";
            this.map = new Microsoft.Maps.Map(document.getElementById("mapDiv"),
                {
                    credentials: BING_KEY,
                    mapTypeId: Microsoft.Maps.MapTypeId.road,
                    showDashboard: false
                });
        }

        return this.map;
    }
    public resize(viewport: IViewport){
        console.log('resizing ...')
    }

    private appendJS(url: string, onload?:()=>void): void{
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.onload = onload;
        script.onerror = ()=>{
            console.log('error loading '+url);
        };
        script.src = url;
        document.getElementsByTagName('head')[0].appendChild(script);
    }
}