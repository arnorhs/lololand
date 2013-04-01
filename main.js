
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

	// start the renderer
	renderer.setSize(WIDTH, HEIGHT);

	// attach the render-supplied DOM element
	document.getElementById('container').appendChild(renderer.domElement);

	// set up the sphere vars
	var radius = 20, segments = 32, rings = 32;

	// create a new mesh with sphere geometry -
	// we will cover the sphereMaterial next!
  for (var j = 0; j < 10; j++) {

    // create the sphere's material & randomize color
    var color = (Math.random()*255 << 16) | (Math.random()*255 << 8) | Math.random()*255;
    var sphereMaterial = new THREE.MeshLambertMaterial({color: color});
    var sphere = new THREE.Mesh(
       new THREE.SphereGeometry(radius, segments, rings),
       sphereMaterial);
    // randomize position
    sphere.position.x = (Math.random() * 200) - 100;
    sphere.position.y = (Math.random() * 200) - 100;
    sphere.position.z = (Math.random() * 200) - 100;
    // add the sphere to the scene
    scene.add(sphere);
  }

	// and the camera
	scene.add(camera);

	// create a point light
	var pointLight = new THREE.PointLight( 0xFFFFFF );

  var lightBulb = new THREE.Mesh(
     new THREE.SphereGeometry(5, 8, 8),
     new THREE.MeshLambertMaterial({color: 0xffff88, emissive: 0xbbbbbb}));
  scene.add(lightBulb);

	// add to the scene
	scene.add(pointLight);

	// draw!
  var i = 0, x1, y1, g;
  function loop() {
    i = i < 2*Math.PI ? i+0.05 : 0;
    pointLight.position.x = lightBulb.position.x = 100 * Math.cos(i);
    pointLight.position.y = lightBulb.position.y = 100 * Math.sin(i);
    pointLight.position.z = lightBulb.position.z = -150 * Math.sin(i);
    renderer.render(scene, camera);
    frame(loop);
  }
  var frame = requestAnimationFrame ||
              webkitRequestAnimationFrame ||
              mozRequestAnimationFrame ||
              function(callback) { setTimeout(callback, 1000 / 60); };

  loop();

