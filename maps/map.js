var Glimpse = (function () {
    function Glimpse(options) {
        var _this = this;
        this.options = options;
        this.pins = {};
        $(options.element).append('<div id="mapDiv"></div>');
        this.appendJS('https://ecn.dev.virtualearth.net/mapcontrol/mapcontrol.ashx?v=7.0&s=1', function () {
            _this.ensure();
            setTimeout(function () {
                _this.appendJS('https://visual.azureedge.net/dev/moveLocationPlugin.js', function () {
                    _this.ensure();
                });
            }, 2000);
            options.host.on('setView', function (data) {
                var map = _this.ensure();
                if (map) {
                    var viewBoundaries = Microsoft.Maps.LocationRect.fromLocations(new Microsoft.Maps.Location(data[0].latitude, data[0].longitude), new Microsoft.Maps.Location(data[1].latitude, data[1].longitude), new Microsoft.Maps.Location(data[2].latitude, data[2].longitude), new Microsoft.Maps.Location(data[3].latitude, data[3].longitude));
                    map.setView({ bounds: viewBoundaries });
                }
            });
            options.host.on('movePin', function (data) {
                var map = _this.ensure();
                if (map) {
                    var loc = new Microsoft.Maps.Location(data.latitude, data.longitude);
                    //this.movePin(data.id, loc, 'https://cdn3.iconfinder.com/data/icons/transport-icons-2/512/BT_truck_renault_front-48.png')
                    //this.movePin(data.id, loc,'https://cdn2.iconfinder.com/data/icons/windows-8-metro-style/48/delivery_food.png')
                    _this.movePin(data.id, loc, 'https://cdn2.iconfinder.com/data/icons/shop-payment-vol-5/128/shop-13-48.png');
                }
            });
            options.host.on('clearPins', function () {
                _this.pins = {};
                var map = _this.ensure();
                if (map) {
                    _this.map.entities.clear();
                }
            });
        });
    }
    Glimpse.prototype.createPin = function (startLoc, icon) {
        var pin = new Microsoft.Maps.Pushpin(startLoc, {
            //icon: ,
            icon: icon,
            draggable: false,
            height: 48,
            width: 48
        });
        this.map.entities.push(pin);
        return pin;
    };
    Glimpse.prototype.movePin = function (id, loc, icon) {
        if (this.pins[id] === undefined) {
            console.log('creating pin ' + id);
            console.log(loc);
            this.pins[id] = this.createPin(loc, icon);
        }
        else {
            var pin = this.pins[id];
            if (pin.moveLocation) {
                pin.moveLocation(loc, 25);
            }
            else {
                pin.setLocation(loc);
            }
        }
    };
    Glimpse.prototype.ensure = function () {
        if (!this.map) {
            try {
                var BING_KEY = "AiSh7hwvS3f6gXgQV7cWs5DXyLFGL1nSdBrhxp9rAbvJPrwMoTZaf0S7LY_DdBin";
                this.map = new Microsoft.Maps.Map(document.getElementById("mapDiv"), {
                    credentials: BING_KEY,
                    mapTypeId: Microsoft.Maps.MapTypeId.road,
                    showDashboard: false
                });
            }
            catch (ex) { }
        }
        return this.map;
    };
    Glimpse.prototype.resize = function (viewport) {
        console.log('resizing ...');
    };
    Glimpse.prototype.appendJS = function (url, onload) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.onload = onload;
        script.onerror = function () {
            console.log('error loading ' + url);
        };
        script.src = url;
        document.getElementsByTagName('head')[0].appendChild(script);
    };
    Glimpse.prototype.appendCss = function (url, onload) {
        var node = $("<link>", {
            type: 'text/css',
            rel: 'stylesheet',
            href: url,
            onload: onload
        });
        node.appendTo($('head'));
    };
    Glimpse.prototype.appendPbiStyles = function () {
        this.appendCss('https://visual.azureedge.net/glimpse/pbistyleoverride.css');
        this.appendCss('https://visual.azureedge.net/glimpse/pbistyle.css');
    };
    return Glimpse;
})();
//# sourceMappingURL=map.js.map