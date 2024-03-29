(function() {
	// set the scene size
	var WIDTH = window.innerWidth,
	    HEIGHT = window.innerHeight;

	// set some camera attributes
	var VIEW_ANGLE = 45,
	    ASPECT = WIDTH / HEIGHT,
	    NEAR = 0.1,
	    FAR = 10000;



	// create a WebGL renderer, camera
	// and a scene
	var renderer = new THREE.WebGLRenderer();
	var camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
	var scene = new THREE.Scene();

	// the camera starts at 0,0,0 so pull it back
	camera.position.z = 200;

	renderer.setSize(WIDTH, HEIGHT);
  renderer.autoClear = false;


  var cube = (function() {
    var urls = ["sky/f.jpg", "sky/f.jpg",
                "sky/f.jpg", "sky/f.jpg",
                "sky/f.jpg", "sky/f.jpg"];
    var textureCube = THREE.ImageUtils.loadTextureCube(urls);
    textureCube.format = THREE.RGBFormat;

    sceneCube = new THREE.Scene();
    var shader = THREE.ShaderLib[ "cube" ];
    shader.uniforms["tCube"].value = textureCube;

    var material = new THREE.ShaderMaterial({
          fragmentShader: shader.fragmentShader,
          vertexShader: shader.vertexShader,
          uniforms: shader.uniforms,
          depthWrite: false,
          side: THREE.BackSide
        }),
        mesh = new THREE.Mesh( new THREE.CubeGeometry( 100, 100, 100 ), material );

    sceneCube.add( mesh );
    return {
      scene: sceneCube,
      camera: new THREE.PerspectiveCamera( 70, ASPECT, 1, 100000 )
    };

  })();


	// attach the render-supplied DOM element
	document.getElementById('container').appendChild(renderer.domElement);

	// set up the sphere vars
	var segments = 32, rings = 32;

	// create a new mesh with sphere geometry -
	// we will cover the sphereMaterial next!
  for (var j = 0; j < 20; j++) {

    // create the sphere's material & randomize color
    var radius = (Math.random()*30) + 15;
    var color = (Math.random()*255 << 16) | (Math.random()*255 << 8) | Math.random()*255;
    var sphereMaterial = new THREE.MeshLambertMaterial({color: color});
    var sphere = new THREE.Mesh(
       new THREE.SphereGeometry(radius, segments, rings),
       sphereMaterial);
    // randomize position
    var p = 400;
    sphere.position.x = (Math.random() * p) - p/2;
    sphere.position.y = (Math.random() * p) - p/2;
    sphere.position.z = (Math.random() * p) - p;
    // add the sphere to the scene
    scene.add(sphere);
  }

	// and the camera
	scene.add(camera);

	// create a point light
	var pointLight = new THREE.PointLight( 0xFFFFFF );

  var lightBulb = new THREE.Mesh(
     new THREE.SphereGeometry(5, 8, 8),
     new THREE.MeshLambertMaterial({emissive: 0xffffcc}));
  scene.add(lightBulb);

	// add to the scene
	scene.add(pointLight);

	// draw!
  var i = 0, x1, y1, g;
  function loop() {
    i = i < 2*Math.PI ? i+0.01 : 0;
    pointLight.position.x = lightBulb.position.x = 150 * Math.cos(i);
    pointLight.position.y = lightBulb.position.y = 100 * Math.sin(i);
    pointLight.position.z = lightBulb.position.z = -150 + (-200 * Math.sin(i));
    renderer.render(cube.scene, cube.camera);
    renderer.render(scene, camera);
    frame(loop);
  }
  var frame = requestAnimationFrame ||
              webkitRequestAnimationFrame ||
              mozRequestAnimationFrame ||
              function(callback) { setTimeout(callback, 1000 / 60); };

  loop();

})();
