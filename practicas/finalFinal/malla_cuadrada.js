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

  this.dibuja = function(camara, cara_buff, matrizMod, handler){

  	var program = handler.basic;

   	camara.canvas.useProgram(program);
  	//camara.dibujar_malla_basic(matrizMod, this.indices.length, program, cara_buff);

  	initAttributeVariable(camara.canvas, program.a_Position, cara_buff.vertexBuffer);

		camara.canvas.bindBuffer(camara.canvas.ELEMENT_ARRAY_BUFFER, cara_buff.indexBuffer);

		var g_modelMatrix = new Matrix4(matrizMod);

		camara.canvas.bindBuffer(camara.canvas.ELEMENT_ARRAY_BUFFER, cara_buff.indexBuffer);

		camara.canvas.uniform4f(program.u_color, 1.0,0.0,0.0, 1.0);
		camara.canvas.uniform4f(program.u_Normal, 1.0,0.0,0.0, 0.0);

		var g_mvpMatrix = new Matrix4();
		g_mvpMatrix.set(camara.proyeccion_M);
		g_mvpMatrix.multiply(g_modelMatrix);

		camara.canvas.uniformMatrix4fv(program.u_MvpMatrix, false, g_mvpMatrix.elements);
		camara.canvas.uniformMatrix4fv(program.u_ModelMatrix, false, g_modelMatrix.elements);

		var normalMatrix = new Matrix4(); // Transformation matrix for normals
	  // Pass the matrix to transform the normal based on the model matrix to u_NormalMatrix
	  normalMatrix.setInverseOf(matrizMod);
	  normalMatrix.transpose();
	  camara.canvas.uniformMatrix4fv(program.u_NormalMatrix, false, normalMatrix.elements);

	  // Clear color and depth buffer
	  camara.canvas.clear(camara.canvas.COLOR_BUFFER_BIT | camara.canvas.DEPTH_BUFFER_BIT);

		camara.canvas.drawElements(camara.canvas.TRIANGLES, handler.numIndices, camara.canvas.UNSIGNED_BYTE, 0);

  }

}