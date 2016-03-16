require('./keys.js');
var testUrl = "http://dev.virtualearth.net/REST/V1/Routes/Driving?wp.0=Minneapolis,MN&wp.1=St%20Paul,MN&optmz=distance&routeAttributes=routePath&key=" + key;
var request = require('request');
var _ = require('lodash');
var geo = require('geolib');
var path = require('path');
var Glimpse = require('pbi-glimpse');

var glimpse8 = new Glimpse('map', path.join(__dirname, '../iotserver/map.js'));
var glimpse3 = new Glimpse('distance', path.join(__dirname,'../iotserver/text.js'));
var glimpseCost = new Glimpse('cost', path.join(__dirname,'../iotserver/text.js'));
var glimpseCompleted = new Glimpse('completed', path.join(__dirname,'../iotserver/text.js'));
var glimpseRemaining = new Glimpse('remaining', path.join(__dirname,'../iotserver/text.js'));

var map;
var distance;
var cost;
var completed;
var remaining

glimpse8.connect(function (err, socket) {
    map = socket;
    console.log('map connected');
    map.on('alive',function(){
        startSim();
    });
    if (err) return console.log('ERROR', err);
});

glimpse3.connect(function(err, socket) {
    distance = socket;
    console.log('distance connected');
    if(err) return console.log('ERROR', err);
});

glimpseCost.connect(function(err, socket) {
    cost = socket;
    console.log('distance connected');
    if(err) return console.log('ERROR', err);
});

glimpseCompleted.connect(function(err, socket) {
    completed = socket;
    console.log('distance connected');
    if(err) return console.log('ERROR', err);
});

glimpseRemaining.connect(function(err, socket) {
    remaining = socket;
    console.log('distance connected');
    if(err) return console.log('ERROR', err);
});

var waZips = ["98001", "98002", "98003", "98004", "98005", "98006", "98007", "98008", "98009", "98010", "98011", "98012", "98013", "98014", "98015", "98019", "98020", "98021", "98022", "98023", "98024", "98025", "98026", "98027", "98028", "98029", "98030", "98031", "98032", "98033", "98034", "98035", "98036", "98037", "98038", "98039", "98040", "98041", "98042", "98043", "98045", "98046", "98047", "98050", "98051", "98052", "98053", "98054", "98055", "98056", "98057", "98058", "98059", "98061", "98062", "98063", "98064", "98065", "98068", "98070", "98071", "98072", "98073", "98074", "98075", "98077", "98082", "98083", "98087", "98089", "98092", "98093", "98101", "98102", "98103", "98104", "98105", "98106", "98107", "98108", "98109", "98110", "98111", "98112", "98113", "98114", "98115", "98116", "98117", "98118", "98119", "98121", "98122", "98124", "98125", "98126", "98127", "98129", "98131", "98132", "98133", "98134", "98136", "98138", "98139", "98141", "98144", "98145", "98146", "98148", "98151", "98154", "98155", "98158", "98160", "98161", "98164", "98165", "98166", "98168", "98170", "98171", "98174", "98175", "98177", "98178", "98181", "98184", "98185", "98188", "98189", "98190", "98191", "98194", "98195", "98198", "98199", "98201", "98203", "98204", "98205", "98206", "98207", "98208", "98213", "98220", "98221", "98222", "98223", "98224", "98225", "98226", "98227", "98228", "98229", "98230", "98231", "98232", "98233", "98235", "98236", "98237", "98238", "98239", "98240", "98241", "98243", "98244", "98245", "98247", "98248", "98249", "98250", "98251", "98252", "98253", "98255", "98256", "98257", "98258", "98259", "98260", "98261", "98262", "98263", "98264", "98266", "98267", "98270", "98271", "98272", "98273", "98274", "98275", "98276", "98277", "98278", "98279", "98280", "98281", "98282", "98283", "98284", "98286", "98287", "98288", "98290", "98291", "98292", "98293", "98294", "98295", "98296", "98297", "98303", "98304", "98305", "98310", "98311", "98312", "98314", "98315", "98320", "98321", "98322", "98323", "98324", "98325", "98326", "98327", "98328", "98329", "98330", "98331", "98332", "98333", "98335", "98336", "98337", "98338", "98339", "98340", "98342", "98343", "98344", "98345", "98346", "98348", "98349", "98350", "98351", "98352", "98353", "98354", "98355", "98356", "98357", "98358", "98359", "98360", "98361", "98362", "98363", "98364", "98365", "98366", "98367", "98368", "98370", "98371", "98372", "98373", "98374", "98375", "98376", "98377", "98378", "98380", "98381", "98382", "98383", "98384", "98385", "98386", "98387", "98388", "98390", "98391", "98392", "98393", "98394", "98395", "98396", "98397", "98398", "98401", "98402", "98403", "98404", "98405", "98406", "98407", "98408", "98409", "98411", "98412", "98413", "98415", "98416", "98417", "98418", "98419", "98421", "98422", "98424", "98430", "98431", "98433", "98438", "98439", "98442", "98443", "98444", "98445", "98446", "98447", "98448", "98450", "98455", "98460", "98464", "98465", "98466", "98467", "98471", "98477", "98481", "98490", "98492", "98493", "98496", "98497", "98498", "98499", "98501", "98502", "98503", "98504", "98505", "98506", "98507", "98508", "98509", "98511", "98512", "98513", "98516", "98520", "98522", "98524", "98526", "98527", "98528", "98530", "98531", "98532", "98533", "98535", "98536", "98537", "98538", "98539", "98540", "98541", "98542", "98544", "98546", "98547", "98548", "98550", "98552", "98554", "98555", "98556", "98557", "98558", "98559", "98560", "98561", "98562", "98563", "98564", "98565", "98566", "98568", "98569", "98570", "98571", "98572", "98575", "98576", "98577", "98579", "98580", "98581", "98582", "98583", "98584", "98585", "98586", "98587", "98588", "98589", "98590", "98591", "98592", "98593", "98595", "98596", "98597", "98599", "98601", "98602", "98603", "98604", "98605", "98606", "98607", "98609", "98610", "98611", "98612", "98613", "98614", "98616", "98617", "98619", "98620", "98621", "98622", "98623", "98624", "98625", "98626", "98628", "98629", "98631", "98632", "98635", "98637", "98638", "98639", "98640", "98641", "98642", "98643", "98644", "98645", "98647", "98648", "98649", "98650", "98651", "98660", "98661", "98662", "98663", "98664", "98665", "98666", "98667", "98668", "98670", "98671", "98672", "98673", "98674", "98675", "98682", "98683", "98684", "98685", "98686", "98687", "98801", "98802", "98807", "98811", "98812", "98813", "98814", "98815", "98816", "98817", "98819", "98821", "98822", "98823", "98824", "98826", "98827", "98828", "98829", "98830", "98831", "98832", "98833", "98834", "98836", "98837", "98840", "98841", "98843", "98844", "98845", "98846", "98847", "98848", "98849", "98850", "98851", "98852", "98853", "98855", "98856", "98857", "98858", "98859", "98860", "98862", "98901", "98902", "98903", "98904", "98907", "98908", "98909", "98920", "98921", "98922", "98923", "98925", "98926", "98929", "98930", "98932", "98933", "98934", "98935", "98936", "98937", "98938", "98939", "98940", "98941", "98942", "98943", "98944", "98946", "98947", "98948", "98950", "98951", "98952", "98953", "99001", "99003", "99004", "99005", "99006", "99008", "99009", "99011", "99012", "99013", "99014", "99016", "99017", "99018", "99019", "99020", "99021", "99022", "99023", "99025", "99026", "99027", "99029", "99030", "99031", "99032", "99033", "99034", "99036", "99037", "99039", "99040", "99101", "99102", "99103", "99104", "99105", "99107", "99109", "99110", "99111", "99113", "99114", "99115", "99116", "99117", "99118", "99119", "99121", "99122", "99123", "99124", "99125", "99126", "99128", "99129", "99130", "99131", "99133", "99134", "99135", "99136", "99137", "99138", "99139", "99140", "99141", "99143", "99144", "99146", "99147", "99148", "99149", "99150", "99151", "99152", "99153", "99154", "99155", "99156", "99157", "99158", "99159", "99160", "99161", "99163", "99164", "99165", "99166", "99167", "99169", "99170", "99171", "99173", "99174", "99176", "99179", "99180", "99181", "99185", "99201", "99202", "99203", "99204", "99205", "99206", "99207", "99208", "99209", "99210", "99211", "99212", "99213", "99214", "99215", "99216", "99217", "99218", "99219", "99220", "99223", "99224", "99228", "99251", "99252", "99256", "99258", "99260", "99299", "99301", "99302", "99320", "99321", "99322", "99323", "99324", "99326", "99328", "99329", "99330", "99333", "99335", "99336", "99337", "99338", "99341", "99343", "99344", "99345", "99346", "99347", "99348", "99349", "99350", "99352", "99353", "99354", "99356", "99357", "99359", "99360", "99361", "99362", "99363", "99371", "99401", "99402", "99403"];

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    function deg2rad(deg) {
        return deg * (Math.PI / 180)
    }

    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}

function getRect(coords) {
    latFunc = function (o) {
        return o[0]
    };
    lonFunc = function (o) {
        return o[1]
    };
    top = _.max(coords, latFunc)[0];
    bottom = _.min(coords, latFunc)[0];
    right = _.max(coords, lonFunc)[1];
    left = _.min(coords, lonFunc)[1];

    return [
        {latitude: top, longitude: left},
        {latitude: top, longitude: right},
        {latitude: bottom, longitude: left},
        {latitude: bottom, longitude: right}
    ]
}

function makeRequest(url, callback) {
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            if (callback) {
                callback(data);
            }
        }
    });
}

function extractLine(data) {
    return data['resourceSets'][0]['resources'][0]['routePath']['line']['coordinates'];
}

function extractRouteLegs(data) {
    return data['resourceSets'][0]['resources'][0]['routeLegs'];
}

function combineLegsAndAddresses(data, addresses) {
    var legs = extractRouteLegs(data);
    var result = _.map(legs, function (d, i) {
        var c = d['actualStart'];
        return {
            latitude: c['coordinates'][0],
            longitude: c['coordinates'][1],
            address: addresses[i]
        }
    });

    return result;
}

function bearing(lat1, lng1, lat2, lng2) {
    function _toDeg(rad) {
        return rad * 180 / Math.PI;
    }

    var dLon = (lng2 - lng1);
    var y = Math.sin(dLon) * Math.cos(lat2);
    var x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
    var brng = _toDeg(Math.atan2(y, x));
    return 360 - ((brng + 360) % 360);
}

function optimizeRoute(data, addrs) {
    var optLegs = combineLegsAndAddresses(data, addrs);

    var center = geo.getCenter(optLegs);

    for (var h = 0; h < optLegs.length; h++) {
        var loc = optLegs[h];
        var b = bearing(center.latitude, center.longitude, loc.latitude, loc.longitude);
        loc.first = h === 0;
        loc.bearing = b
    }

    optLegs = _.sortBy(optLegs, function (o) {
        return o.bearing
    });

    while (!optLegs[0].first) {
        optLegs.push(optLegs.shift());
    }

    optLegs.push({
        address: addrs[addrs.length - 1]
    });

    return _.map(optLegs, function (d) {
        return d.address
    });
}

function getOptimizedRoute(adds, callback){
    getRoute(adds, function(d){
        var newAdds = optimizeRoute(d, adds);
        getRoute(newAdds, callback);
    });
}

function getRoute(adds, callback) {
    var stub = generateRouteUrlStub(adds);
    var url = "http://dev.virtualearth.net/REST/V1/Routes/Driving?" + stub + "&key=" + key;
    makeRequest(url, function (data) {
        if (callback) {
            callback(data);
        }
    });
}

function getRoutes(addsArr, finalCallback, count, a) {
    a = a || [];

    if (count === 0) {
        finalCallback(a);
    } else {
        getOptimizedRoute(addsArr[count - 1], function (data) {
            console.log(count);
            a.push(data);
            count--;
            setTimeout(function() {
                getRoutes(addsArr, finalCallback, count, a);
            },500);
        })
    }
}

function generateRouteUrlStub(adds) {
    var stub = "";
    for (var i = 0; i < adds.length; i++) {
        if (i !== 0)
            stub += '&';
        stub += 'wp.' + i + '=' + adds[i]
    }
    stub += "&optmz=distance&routeAttributes=routePath";
    return stub
}

var inter = 0;
function startSim() {
    var fuelCostPerMile = 0.2;
    var stopsPerTruck = 8;
    var stats = {
        distance: 0,
        fuelCost: 0,
        completed: 0,
        remaining: 0,
        revenue: 0
    };

    clearInterval(inter);
    var r = [];
    var startZip = '98052';
    for(var x=0; x<2; x++) {
        var d = [];
        d.push(startZip);
        d.push(_.clone(waZips).slice(x*(stopsPerTruck), x*(stopsPerTruck) + stopsPerTruck));
        d.push(startZip);
        r.push(_.flatten(d));
    }

    getRoutes(r, function (data) {
        var routes = _.map(data, function (d) {
            return extractLine(d);
        });

        var rect = getRect(_.flatten(routes));

        if (map) {
            map.emit('setView', rect);
        }

        var c = 0;
        inter = setInterval(function () {
            var flag = false;
            for (var i = 0; i < routes.length; i++) {
                if (map && c < routes[i].length ) {
                    map.emit('movePin', {
                        id: i,
                        latitude: routes[i][c][0],
                        longitude: routes[i][c][1]
                    });

                    if(c>0){
                        stats.distance += getDistanceFromLatLonInKm(
                            routes[i][c][0],
                            routes[i][c][1],
                            routes[i][c-1][0],
                            routes[i][c-1][1]) / 1.6;
                        stats.fuelCost = stats.distance * fuelCostPerMile;
                    }

                    distance.emit('update',Math.floor(stats.distance) + ' Miles');
                    cost.emit('update','$ '+  Math.round(stats.fuelCost, 2));

                    flag=true;
                }
            }

            c++;

            if(flag) {
                var total = (stopsPerTruck + 1) * routes.length;
                var avg = c / routes[0].length;
                if (avg > 1) {
                    avg = 1;
                }
                stats.completed = Math.floor(total * avg);
                stats.remaining = total - stats.completed;
                completed.emit('update', stats.completed);
                remaining.emit('update', stats.remaining);
            }else{
                clearInterval(inter);
            }

        }, 30);

    }, r.length);
}
