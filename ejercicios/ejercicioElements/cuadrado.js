function Cuadrado (div) {
  this.puntos = [];			//	Float32Array
  this.normales = [];
  this.colores = [];		//	Float32Array
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

				this.normales[ind*3] = 0.0;
				this.normales[ind*3+1] = 0.0;
				this.normales[ind*3+2] = 1.0;

				this.colores[ind*4] = 1.0;
				this.colores[ind*4+1] = 0.4;
				this.colores[ind*4+2] = 0.0;
				this.colores[ind*4+3] = 1.0;

				if (ind == 0) {
					this.colores[ind*4] = 0.4;
					this.colores[ind*4+1] = 0.4;
					this.colores[ind*4+2] = 1.0;
					this.colores[ind*4+3] = 1.0;
				}

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
  };
}