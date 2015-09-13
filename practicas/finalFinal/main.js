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

	gl.clearColor(0.0, 1.0, 0.0, 1);
  gl.enable(gl.DEPTH_TEST);

  gl.viewport(0, 0, canvas.width, canvas.height);


  var tick = function() {
//	  hab.tick();
//	  gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);    //
	  hab.dibuja(progHand);
	  window.requestAnimationFrame(tick, canvas);
  };
  tick();

}

function habitacion_prueba(habitacion, gl, canvas){
	var cubC = new CuboCircCompuesto(10);
	cubC.construye(gl);
  cubC.desplaza(0.0,1.0,0.0);
  //cubC.escala(1.0,1.0,2.0);
  cubC.rota(30, 1, 0, 0);
	habitacion.add_elemento(cubC);
	habitacion.set_camara(new Camara(gl, canvas.width/canvas.height))
}