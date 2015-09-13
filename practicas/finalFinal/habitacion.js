// Habitacion
function Habitacion (gl) {

	this.luz_ambiente = [0.0,0.0,0.0]; 
	this.luces_direccionales = [];
	this.luces_punto = [];

	this.elementos = [];

	this.gl = gl;

	this.camara = undefined;

	this.modelado_M = new Matrix4();

	this.add_luzDir = function(luz){		this.luces_direccionales.push(luz);	}
	this.add_luzPunt = function(luz){		this.luces_punto.push(luz);	}
	this.add_elemento = function(elem){		this.elementos.push(elem);	}
	this.set_camara = function(cam){		this.camara = cam; 
		this.camara.calcular();
	}
	this.set_ambiente = function(amb){		this.luz_ambiente = amb;	}

	this.dibuja = function(handler){

		for(var i = 0;  i < this.elementos.length; i++){
			this.elementos[i].dibuja(this.camara, handler, this.modelado_M, this.luz_ambiente, this.luces_direccionales, this.luces_punto);
		}

	this.desplaza = function(desp_x, desp_y, desp_z){
    this.matrizPropia.translate(desp_x, desp_y, desp_z);
  }

  this.rota = function(angulo, ejeX, ejeY, ejeZ){
    this.matrizPropia.rotate(angulo, ejeX, ejeY, ejeZ);
  }

  this.escala = function(escX, escY, escZ){
    this.matrizPropia.scale(escX, escY, escZ);
  }

	}
}