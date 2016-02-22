import {IGlimpse, ConstructorOptions, IHost, IViewport} from '../node_modules/pbi-glimpse/glimpse'
declare var THREE;
declare var $;

class MyGlimpse implements IGlimpse {
    private cube;
    private scene;
    private renderer;
    private camera;

    constructor(private options:ConstructorOptions) {
        var canvas = $('<canvas height="300" width="300"></canvas>');
        var cube = true;

        var fumc;
        if(cube) {
            this.initCube(options.element);
        }else{
            $(options.element).append(canvas);
        }
        options.host.on('update', (data)=> {
            if(!fumc) {
                fumc = true;
                window.requestAnimationFrame(()=> {
                    if(!cube){
                        this.draw(canvas, parseInt(data.hello) % 100 + 5);
                    }else {
                        var fac = 5;
                        var x = parseFloat(data.yaw)*fac;
                        var y = parseFloat(data.pitch)*fac;
                        var z = parseFloat(data.roll) * fac;
                        this.renderCube(-z,0,0);
                    }
                    fumc = null;
                });
            }
        })
    }

    private draw(canvas, r){

        var context = canvas.get(0).getContext('2d');
        context.clearRect(0,0,300,300);
        var centerX = 150;
        var centerY = 150;
        var radius = r;

        context.beginPath();
        context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        context.fillStyle = '#DEDF08';
        context.fill();
        context.lineWidth = 5;
        context.strokeStyle = 'black';
        context.globalAlpha=1-r/100;
        context.stroke();
    }

    private initCube(element){
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 75,300/300, 0.1, 1000 );

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( 300, 300);
        element.appendChild( this.renderer.domElement );

        var geometry = new THREE.BoxGeometry( 1, 1, 1);
        for ( var i = 0; i < geometry.faces.length; i +=2 ) {
            var color = Math.random() * 0xffffff;
            geometry.faces[ i ].color.setHex( color );
            geometry.faces[ i+1 ].color.setHex( color );
        }

        var material = new THREE.MeshBasicMaterial( { color: 0xffffff, vertexColors: THREE.FaceColors } );
        this.cube = new THREE.Mesh( geometry, material );
        this.scene.add( this.cube );

        this.camera.position.z = 1.5;

        this.renderCube(0,0,0)
    }

    private renderCube(x,y,z) {
        // requestAnimationFrame( render );

        this.cube.rotation.x = x;
        this.cube.rotation.y = y;
        this.cube.rotation.z = z;

        this.renderer.render(this.scene, this.camera);
    };

    public resize(viewport:IViewport) {
        console.log('resize??');
        console.log(viewport);
    }
}