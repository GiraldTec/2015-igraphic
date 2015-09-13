// Malla circulo

function MallaCirculo (div) {
  this.puntos = [0.0,0.0,0.0];			//	Float32Array
  this.normal = new Vector4([0.0,0.0,1.0]);
  this.indices = [];		//	Uint8Array
  this.divisiones = div;
  this.buff_obj = new Object();

  this.construye = function(gl) {
  	var x_orig = 0.0;
  	var y_orig = 0.5;//Math.sqrt(2.0)/2.0;
  	var z_orig = 0.0;

  	var pnc_totales = 1; // indices de los puntos / normales / colores del CUBO
  	var i_totales = 0; //

		var p_ori = new Vector4();
		p_ori.elements[3] = 1;

  	var angle = 360.0 / this.divisiones;
		var p_aux = new Vector4();
		p_aux.elements[0] = x_orig;
		p_aux.elements[1] = y_orig;
		p_aux.elements[2] = z_orig;
		p_aux.elements[3] = 1;

		for(var i=1; i<=this.divisiones; i++){
			var m_aux = new Matrix4();
  		m_aux.setRotate( i*angle , 0, 0, 1);

  		var punto = m_aux.multiplyVector4(p_aux);

  		this.puntos[pnc_totales*3] = punto.elements[0];
			this.puntos[pnc_totales*3+1] = punto.elements[1];
			this.puntos[pnc_totales*3+2] = punto.elements[2];

			pnc_totales = pnc_totales + 1;

			this.indices[i_totales] = 0 ;
			this.indices[i_totales+1] = i ;
			this.indices[i_totales+2] = (i+1)%(this.divisiones+1);
			if (this.indices[i_totales+2] ==0) this.indices[i_totales+2] =1;

			i_totales = i_totales +3; 

		}

		this.initBasicShaders(gl);

  }

  this.initBasicShaders = function(gl){

    var vertices = new Float32Array(this.puntos);
    var indices = new Uint8Array(this.indices);

    this.buff_obj.vertexBuffer = initArrayBufferForLaterUse(gl, vertices, 3, gl.FLOAT);
    this.buff_obj.indexBuffer = initElementArrayBufferForLaterUse(gl, indices, gl.UNSIGNED_BYTE);
    if (!this.buff_obj.vertexBuffer || !this.buff_obj.indexBuffer) 
      this.buff_obj = null; 

    this.buff_obj.numIndices = this.indices.length;

    // Unbind the buffer object
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
  }

	this.dibuja = function(camara, matrizMod, handler, color){

  	var program = handler.flat;

  	//camara.calcular();

		camara.canvas.bindFramebuffer(camara.canvas.FRAMEBUFFER, null);               // Change the drawing destination to color buffer
    
		var canvas = document.getElementById('webgl');

    //camara.canvas.viewport(0, 0, canvas.width, canvas.height);
    //camara.canvas.clear(camara.canvas.COLOR_BUFFER_BIT | camara.canvas.DEPTH_BUFFER_BIT);    //

   	camara.canvas.useProgram(program);
  	//camara.dibujar_malla_basic(matrizMod, this.indices.length, program, cara_buff);

  	initAttributeVariable(camara.canvas, program.a_Position, this.buff_obj.vertexBuffer);

		camara.canvas.bindBuffer(camara.canvas.ELEMENT_ARRAY_BUFFER, this.buff_obj.indexBuffer);

		var g_modelMatrix = new Matrix4(matrizMod);

		camara.canvas.uniform4f(program.u_color, color[0], color[1], color[2], color[3]);
		camara.canvas.uniform4f(program.u_Normal, 0.0,0.0,1.0, 0.0);

		camara.canvas.uniform3fv(program.u_PosLightColor, [1.0, 1.0,0, 0,0,1], 2);
		camara.canvas.uniform3fv(program.u_LightPosition, [2.3, 4.0, -3.5, 0.0, -4.0, 3.5], 2);

		camara.canvas.uniform3fv(program.u_DirLightColor, [1.0, 1.0,0, 0,0,1], 2);
		camara.canvas.uniform3fv(program.u_LightDirection, [2.3, 4.0, -3.5, 0.0, -4.0, 3.5], 2);


		camara.canvas.uniform3f(program.u_AmbientLight, 0,0,0);

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
	 	//camara.canvas.clear(camara.canvas.COLOR_BUFFER_BIT | camara.canvas.DEPTH_BUFFER_BIT);

	  // Draw the cube
	  camara.canvas.drawElements(camara.canvas.TRIANGLES, this.indices.length, camara.canvas.UNSIGNED_BYTE, 0);

  }




}