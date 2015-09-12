// Habitacion
function Habitacion (gl) {

	this.luz_ambiente = new Vector3(0.0); // esto es un color
	this.luces_direccionales = [];
	this.luces_punto = [];

	this.elementos = [];

	this.gl = gl;

	this.add_luzDir = function(luz){		this.luces_direccionales.push(luz);	}
	this.add_luzPunt = function(luz){		this.luces_punto.push(luz);	}
	this.add_elemento = function(elem){		this.elementos.push(elem);	}
	this.add_camara = function(cam){		this.camaras.push(cam);	}
	this.set_ambiente = function(amb){		this.luz_ambiente = amb;	}

	this.tick = function(){
		for(var i = 0;  i < this.elementos.length; i++){
			this.elementos[i].tick();
		}
	}

	this.dibuja = function(handler){

		for(var i = 0;  i < this.elementos.length; i++){
			this.elementos[i].dibuja(this.gl, handler);
		}


	}
}