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
        $(options.element).css('font-size', '200px').text('0');
        options.host.on('update', function (data) {
            options.element.textContent = data;
        });
    }
    Glimpse.prototype.resize = function (viewport) {
        console.log('resizing ...');
    };
    return Glimpse;
})();
//# sourceMappingURL=multi.js.map