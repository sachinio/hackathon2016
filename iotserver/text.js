/**
 * Created by spatney on 2/26/2016.
 */
/**
 * Created by spatney on 2/24/2016.
 */
var Glimpse = (function () {
    function Glimpse(options) {
        var _this = this;
        this.options = options;
        this.appendPbiStyles();
        var count = 0;
        var text = this.text = $('<div></div>');
        text.css({
            'text-align': 'center',
            'vertical-align': 'middle',
            'color': '#EDC951',
            'font-size': '60px',
            'font-family': 'wf_standard-font_light'
        });
        this.bar = $('<div class="bar"></div>');
        this.bar.css({
            'background-color': '#EDC951',
            'transition': 'width 0.1s'
        });
        $(options.element).append(text).append(this.bar);
        d3.select(options.element).style('background', '#333333');
        text.text('-');
        options.host.on('update', function (data) {
            text.text(data.text ? data.text : data);
            if (data.width) {
                _this.bar.css({
                    'width': (data.width * 100) + '%',
                    'height': 8 + 'px'
                });
                if (!_this.barWidth) {
                    _this.barWidth = true;
                    _this.resize(_this.viewport);
                }
            }
        });
    }
    Glimpse.prototype.resize = function (viewport) {
        this.viewport = viewport;
        this.text.css('line-height', (viewport.height - (this.barWidth !== undefined ? 8 : 0)) + 'px');
        console.log('resizing ...');
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
//# sourceMappingURL=text.js.map