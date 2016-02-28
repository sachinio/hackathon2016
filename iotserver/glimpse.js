var Glimpse = (function () {
    function Glimpse(options) {
        var _this = this;
        this.options = options;
        this.r = 10;
        var canvas = this.canvas = $('<canvas height="300" width="300"></canvas>');
        var bool = false;
        canvas.on('click', function () {
            bool = !bool;
            options.host.emit('light', bool ? '1' : '0');
            console.log('click');
        });
        var cube = false;
        var fumc;
        if (cube) {
            this.initCube(options.element);
        }
        else {
            $(options.element).append(canvas);
        }
        options.host.on('update', function (data) {
            if (!fumc) {
                fumc = true;
                window.requestAnimationFrame(function () {
                    if (!cube) {
                        var r = ((parseFloat(data) + 1) * _this.viewport.height / 4);
                        if (r < _this.viewport.height / 2) {
                            _this.r = r | 0;
                            _this.draw();
                        }
                    }
                    else {
                        var fac = 5;
                        var x = parseFloat(data.yaw) * fac;
                        var y = parseFloat(data.pitch) * fac;
                        var z = parseFloat(data.roll) * fac;
                        _this.renderCube(-z, 0, 0);
                    }
                    fumc = null;
                });
            }
        });
    }
    Glimpse.prototype.draw = function () {
        var context = this.canvas.get(0).getContext('2d');
        var viewport = this.viewport;
        context.clearRect(0, 0, viewport.width | 0, viewport.height | 0);
        var centerX = (viewport.width / 2) | 0;
        var centerY = (viewport.height / 2) | 0;
        var radius = this.r;
        context.beginPath();
        context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        context.fillStyle = '#DEDF08';
        context.fill();
        context.lineWidth = 5;
        context.strokeStyle = 'black';
        context.globalAlpha = 1;
        context.stroke();
    };
    Glimpse.prototype.initCube = function (element, w, h) {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, 300 / 300, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(300, 300);
        element.appendChild(this.renderer.domElement);
        var geometry = new THREE.BoxGeometry(1, 1, 1);
        for (var i = 0; i < geometry.faces.length; i += 2) {
            var color = Math.random() * 0xffffff;
            geometry.faces[i].color.setHex(color);
            geometry.faces[i + 1].color.setHex(color);
        }
        var material = new THREE.MeshBasicMaterial({ color: 0xffffff, vertexColors: THREE.FaceColors });
        this.cube = new THREE.Mesh(geometry, material);
        this.scene.add(this.cube);
        this.camera.position.z = 1.5;
        this.renderCube(0, 0, 0);
    };
    Glimpse.prototype.renderCube = function (x, y, z) {
        // requestAnimationFrame( render );
        this.cube.rotation.x = x;
        this.cube.rotation.y = y;
        this.cube.rotation.z = z;
        this.renderer.render(this.scene, this.camera);
    };
    ;
    Glimpse.prototype.resize = function (viewport) {
        console.log('resize??');
        console.log(viewport);
        this.viewport = viewport;
        this.canvas.attr('width', viewport.width).attr('height', (viewport.height));
        this.draw();
    };
    return Glimpse;
})();
//# sourceMappingURL=glimpse.js.map