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
  habitacion_prueba(hab)




   var tick = function() {
	  //hab.tick();
	  hab.dibuja(progHand);
	  window.requestAnimationFrame(tick, canvas);
  };
  tick();

}

function habitacion_prueba(habitacion){
	habitacion.add_elemento(new CuboCompuesto(2));
}