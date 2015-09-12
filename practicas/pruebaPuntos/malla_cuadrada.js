// Malla cuadrada

function MallaCuadrada (div) {
  this.puntos = [];			//	Float32Array
  this.normal = new Vector4([0.0,0.0,1.0]);
  this.indices = [];		//	Uint8Array
  this.divisiones = div;

  this.construye = function() {
  	var x_orig = -0.5;
  	var y_orig = 0.5;
  	var z_orig = 0.0;
		for (var i=0 ; i<=this.divisiones ; i++){ // filas
			for (var j=0 ; j<=this.divisiones ; j++){ // columnas
				// crear el punto
				var ind = i*(this.divisiones+1) + j;
				this.puntos[ind*3] =  x_orig + i * ( 1/this.divisiones) ;
				this.puntos[ind*3+1] = y_orig - j * ( 1/this.divisiones) ;
				this.puntos[ind*3+2] = z_orig;

				// Una vez hecha la primera fila podemos montar los triangulos
				if ( i > 0  && j < this.divisiones ){
					var ind_aux = ind - this.divisiones - 1
					this.indices[ind_aux*6+1] = ind - this.divisiones - 1;
					this.indices[ind_aux*6+2] = ind;
					this.indices[ind_aux*6] = ind - this.divisiones;

					this.indices[ind_aux*6+3] = ind - this.divisiones;
					this.indices[ind_aux*6+4] = ind;
					this.indices[ind_aux*6+5] = ind + 1;
				}
			}
			
		}
  }

  this.dibuja = function(){
  	//TODO
  }

}