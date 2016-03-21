/**
 * Created by spatney on 2/26/2016.
 */
/**
 * Created by spatney on 2/24/2016.
 */
var Glimpse = (function () {
    function Glimpse(options) {
        this.options = options;
        var count = 0;
        var text = this.text = d3.select(options.element).append('svg').append('text');
        d3.select(options.element).style('background', '#333333');
        text.style({
            'font-size': '60px',
            'font-family': 'wf_standard-font_light'
        }).attr('fill', '#EDC951').attr('text-anchor', 'middle').text('-');
        options.host.on('update', function (data) {
            text.text(data);
        });
    }
    Glimpse.prototype.resize = function (viewport) {
        d3.select('svg').attr('height', viewport.height).attr('width', viewport.width);
        this.text.attr('x', viewport.width / 2).attr('y', viewport.height / 2 + 70);
        console.log('resizing ...');
    };
    return Glimpse;
})();
//# sourceMappingURL=text.js.map