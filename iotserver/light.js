/**
 * Created by spatney on 2/24/2016.
 */
var Glimpse = (function () {
    function Glimpse(options) {
        var _this = this;
        this.options = options;
        this.toggle(false);
        options.host.on('update', function (data) {
            _this.toggle(data === '1' ? true : false);
        });
        $(options.element).on('click', function () {
            _this.toggle(!_this.state);
            _this.options.host.emit('light', _this.state);
        });
    }
    Glimpse.prototype.toggle = function (value) {
        this.state = value;
        $(this.options.element).css('background-color', value ? 'yellow' : 'black');
    };
    Glimpse.prototype.resize = function (viewport) {
        console.log('resizing ...');
    };
    return Glimpse;
})();
//# sourceMappingURL=light.js.map