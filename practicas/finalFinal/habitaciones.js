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
	
  var cubC = new CuboCompuesto(5);
  //var cubC = new CuboTorusCompuesto(4,7 , 1.5,1.0);
	cubC.construye(gl);
  cubC.desplaza(0.0,-10.0,0.0);
  cubC.escala(9.0,1.0,9.0);
  //cubC.rota(30, 1, 0, 0);


  var ann = new FiguraAnillo(5, 2, 5, [0, 0, 1]);
  ann.construye(gl);
  ann.desplaza(0,0,-4);




  var circ = new FiguraCirculo(6, [0,1,0,1])
  circ.construye(gl);
  circ.escala(7,7,1);
	circ.desplaza(0,0,2.5);

	var cuad = new FiguraCuadrado(6, [0,1,0,1])
  cuad.construye(gl);
  cuad.escala(7,7,1);

  var torus = new FiguraTorus(19, 6, 5, 1, [0,1,0,1]);
  torus.construye(gl);
  torus.desplaza(0,0,-7);
  torus.rota(90, 1,0,0);

  var tubo = new FiguraTubo(3, 3, 3,  [0,1,0,1])
  tubo.construye(gl);
  tubo.desplaza(0,0,4);
  
	habitacion.add_elemento(cubC);
	habitacion.add_elemento(ann);
	habitacion.add_elemento(circ);
	habitacion.add_elemento(cuad);
	habitacion.add_elemento(torus);
	habitacion.add_elemento(tubo);


	habitacion.set_camara(new Camara(gl, canvas.width/canvas.height, 40, 40, 10 , 1, 100))

	habitacion.tick = function(){
		this.camara.rotar(1, 0 , 1 , 0);
	}
}