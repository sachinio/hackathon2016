var Glimpse = (function () {
    function Glimpse(options) {
        this.options = options;
        $("<style type='text/css'>" + Glimpse.css + "</style>").appendTo("head");
        var container = this.container = $(Glimpse.template);
        $(options.element).append(container);
        options.host.on('update', function (data) {
            $('#right_sensor').css({ 'opacity': data.right });
            $('#left_sensor').css({ 'opacity': data.left });
            $('#heel_sensor').css({ 'opacity': data.heel || 0 });
            $('#side_sensor').css({ 'opacity': data.side || 0 });
        });
        this.init();
    }
    Glimpse.prototype.init = function () {
        $('#right_sensor').css('opacity', 0.3);
        $('#left_sensor').css('opacity', 0.3);
        $('#heel_sensor').css('opacity', 0.3);
        $('#side_sensor').css('opacity', 0.3);
    };
    Glimpse.prototype.resize = function (viewport) {
        this.container.css('height', viewport.height).css('width', viewport.width);
    };
    Glimpse.css = "#container{position:relative}#shoe{background-image:url(https://visual.azureedge.net/dev/right_shoe.png)}#right_sensor{background-image:url(https://visual.azureedge.net/dev/right_sensor.png)}#left_sensor{background-image:url(https://visual.azureedge.net/dev/left_sensor.png)}#side_sensor{background-image:url(https://visual.azureedge.net/dev/side_sensor.png)}#heel_sensor{background-image:url(https://visual.azureedge.net/dev/heel_sensor.png)}.layer{margin-right:10%;margin-left:10%;position:absolute;height:100%;width:80%;background-size:100% 100%;background-repeat:no-repeat}";
    Glimpse.template = "<div id=\"container\">\n            <div id=\"shoe\" class=\"layer\"></div>\n            <div id=\"right_sensor\" class=\"layer\"></div>\n            <div id=\"left_sensor\" class=\"layer\"></div>\n            <div id=\"heel_sensor\" class=\"layer\"></div>\n            <div id=\"side_sensor\" class=\"layer\"></div>\n        </div>";
    return Glimpse;
})();
//# sourceMappingURL=soccer.js.map