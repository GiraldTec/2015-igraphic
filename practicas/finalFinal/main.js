function main() {
  // Retrieve <canvas> element
  var canvas = document.getElementById('webgl');

  // Get the rendering context for WebGL
  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  var progHand = new ProgramHandler(gl);

  var hab = new Habitacion(gl);
  habitacion_prueba(hab, gl, canvas)

	gl.clearColor(1, 1,1, 1);
  gl.enable(gl.DEPTH_TEST);



  //var tick = function() {
	  //hab.tick();
	  //gl.viewport(0, 0, canvas.width, canvas.height);

	  hab.dibuja(progHand);
	 // window.requestAnimationFrame(tick, canvas);
  //};
  //tick();

}

function habitacion_prueba(habitacion, gl, canvas){
	var cubC = new CuboCompuesto(2);
	cubC.construye(gl);
	habitacion.add_elemento(cubC);
	habitacion.set_camara(new Camara(gl, canvas.width/canvas.height))
}