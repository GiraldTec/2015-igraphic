function main() {
  // Retrieve <canvas> element
  var canvas = document.getElementById('webgl');

  // Get the rendering context for WebGL
  var gl = getWebGLContext(canvas);
  if (!gl) {
    //console.log('Failed to get the rendering context for WebGL');
    return;
  }

  var progHand = new ProgramHandler(gl);

  var hab = new Habitacion(gl);
  habitacion_01(hab, gl, canvas)

	gl.clearColor(1.0, 1.0, 0.0, 1);
  gl.enable(gl.DEPTH_TEST);

  gl.viewport(0, 0, canvas.width, canvas.height);


  var tick = function() {
	  hab.tick();
	  gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);    //
	  hab.dibuja(progHand);
	  window.requestAnimationFrame(tick, canvas);
  };
  tick();

}

