// Habitaciones 
function habitacion_prueba(habitacion, gl, canvas){
	
  var cubC = new CuboTuboCompuesto(4 , 1.0,1.0);
  //var cubC = new CuboTorusCompuesto(4,7 , 1.5,1.0);
	cubC.construye(gl);
  //cubC.desplaza(0.0,1.0,0.0);
  //cubC.escala(1.0,1.0,2.0);
  //cubC.rota(30, 1, 0, 0);
	habitacion.add_elemento(cubC);
	habitacion.set_camara(new Camara(gl, canvas.width/canvas.height, 6,6,14 , 1, 100))

	habitacion.tick = function(){
		this.camara.rotar(1, 0 , 1 , 0);
	}
}


function habitacion_01(habitacion, gl, canvas){
	
	// Luces Direccionales
	var dir1 = new luzDP([1.0,0.0,0.0], [1.0,1.0,1.0]);
	var dir2 = new luzDP([0.0,0.0,1.0], [1.0,1.0,1.0]);

	habitacion.add_luzDir(dir1);
	habitacion.add_luzDir(dir2);

	var dir1 = new luzDP([0.0,0.0,0.0], [0.0,0.0,0.0]);
	var dir2 = new luzDP([0.0,0.0,1.0], [-10.0,-10.0,-10.0]);

	habitacion.add_luzDir(dir1);
	habitacion.add_luzDir(dir2);

	// Luces de punto


  var cubC = new CuboCompuesto(5);
	cubC.construye(gl);
  cubC.desplaza(0.0,-10.0,0.0);
  cubC.escala(9.0,1.0,9.0);

  var ann = new FiguraAnillo(5, 2, 5, [0, 0, 1, 1]);
  ann.prototype.construye(gl);
  ann.prototype.desplaza(0,0,-4);

  var circ = new FiguraCirculo(6, [0,0,0,1]);
  circ.prototype.construye(gl);
  circ.prototype.escala(5,4,1);
	circ.prototype.desplaza(0,0,2.5);

	var cuad = new FiguraCuadrado(6, [0,1,0,1]);
  cuad.prototype.construye(gl);
  cuad.prototype.escala(5,4,1);

  var torus = new FiguraTorus(19, 6, 5, 1, [0,1,0,1]);
  torus.prototype.construye(gl);
  torus.prototype.desplaza(0,0,-7);
  torus.prototype.rota(90, 1,0,0);

  var tubo = new FiguraTubo(3, 3, 3, [1,1,0,1], 1.5, 0);
  tubo.prototype.construye(gl);
  tubo.prototype.desplaza(0,0,4);
  
	habitacion.add_elemento(cubC);
	habitacion.add_elemento(ann);
	habitacion.add_elemento(circ);
	habitacion.add_elemento(cuad);
	habitacion.add_elemento(torus);
	habitacion.add_elemento(tubo);

	var cam = new Camara(gl, canvas.width/canvas.height, 30, 20, 30 , 1, 100);
	cam.set_atPoint(new Vector3([0.0,-3.0,0.0]));

	habitacion.set_camara(cam);

	habitacion.tick = function(){
		this.camara.rotar(1, 0 , 1 , 0);
	}
}