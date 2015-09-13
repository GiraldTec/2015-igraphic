// Malla Torus
function MallaTorus (div1, div2, rat1, rat2) {
  this.puntos = [];			//	Float32Array
  this.normales = [];
  this.indices = [];		//	Uint8Array
  this.segmentosTorus = div1;
  this.divisionesTubo = div2;
  this.buff_obj = new Object();
  this.radTorus = rat1;
  this.radTubo = rat2;

  this.construye = function(gl) {
  	
  	var circulo = obtenerCirculo(this.divisionesTubo, this.radTubo);

  	var angle = 360.0 / this.segmentosTorus;

  	var max_puntos = this.segmentosTorus * this.divisionesTubo;

  	var pnc_totales = 0;
  	var ind_totales = 0;


		
		for(var i=0; i< this.segmentosTorus; i++){
			  	var m_aux = new Matrix4();
				
		  		m_aux.rotate(i*angle, 0, 1, 0);
		  		m_aux.translate(0,0, this.radTubo + this.radTorus);
		  		m_aux.rotate(90, 0, 1, 0);

  		var circulo_aux = transformaCirculo(m_aux, circulo);


  		for (var j=0; j < this.divisionesTubo; j++){
  			this.puntos[pnc_totales*3] = circulo_aux.puntos[j*3];
  			this.puntos[pnc_totales*3+1] = circulo_aux.puntos[j*3+1];
  			this.puntos[pnc_totales*3+2] = circulo_aux.puntos[j*3+2];

  			this.normales[pnc_totales*3] = circulo_aux.normales[j*3];
  			this.normales[pnc_totales*3+1] = circulo_aux.normales[j*3+1];
  			this.normales[pnc_totales*3+2] = circulo_aux.normales[j*3+2];

  			this.indices[ind_totales]   = i*this.divisionesTubo + j;
				this.indices[ind_totales+1] = i*this.divisionesTubo + ((j + 1)%this.divisionesTubo);
				this.indices[ind_totales+2] = ((i+1)%this.segmentosTorus)*this.divisionesTubo + j;

				this.indices[ind_totales+3] = ((i+1)%this.segmentosTorus)*this.divisionesTubo + j;
				this.indices[ind_totales+4] = i*this.divisionesTubo + ((j + 1)%this.divisionesTubo);
				this.indices[ind_totales+5] = ((i+1)%this.segmentosTorus)*this.divisionesTubo + ((j + 1)%this.divisionesTubo);

  			pnc_totales = pnc_totales + 1;
  			ind_totales = ind_totales + 6;
  		}
		}

		this.initBasicShaders(gl);

  }

  this.initBasicShaders = function(gl){

    var vertices = new Float32Array(this.puntos);
    var normals = new Float32Array(this.normales);
    var indices = new Uint8Array(this.indices);

    this.buff_obj.vertexBuffer = initArrayBufferForLaterUse(gl, vertices, 3, gl.FLOAT);
    this.buff_obj.normalsBuffer = initArrayBufferForLaterUse(gl, normals, 3, gl.FLOAT);
    this.buff_obj.indexBuffer = initElementArrayBufferForLaterUse(gl, indices, gl.UNSIGNED_BYTE);
    if (!this.buff_obj.vertexBuffer || !this.buff_obj.normalsBuffer || !this.buff_obj.indexBuffer) 
      this.buff_obj = null; 

    this.buff_obj.numIndices = this.indices.length;

    // Unbind the buffer object
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
  }

	this.dibuja = function(camara, matrizMod, handler, color){

  	var program = handler.multinormal;

  	//camara.calcular();

		camara.canvas.bindFramebuffer(camara.canvas.FRAMEBUFFER, null);               // Change the drawing destination to color buffer
    
		var canvas = document.getElementById('webgl');

    //camara.canvas.viewport(0, 0, canvas.width, canvas.height);
    //camara.canvas.clear(camara.canvas.COLOR_BUFFER_BIT | camara.canvas.DEPTH_BUFFER_BIT);    //

   	camara.canvas.useProgram(program);
  	//camara.dibujar_malla_basic(matrizMod, this.indices.length, program, cara_buff);

  	initAttributeVariable(camara.canvas, program.a_Position, this.buff_obj.vertexBuffer);
  	initAttributeVariable(camara.canvas, program.a_Normal, this.buff_obj.vertexBuffer);

		camara.canvas.bindBuffer(camara.canvas.ELEMENT_ARRAY_BUFFER, this.buff_obj.indexBuffer);

		var g_modelMatrix = new Matrix4(matrizMod);

		camara.canvas.uniform4f(program.u_color, color[0], color[1], color[2], color[3]);

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

function obtenerCirculo(div, rad){

	var circulo =new Object();
	circulo.puntos = [];
	circulo.normales = [];

  var x_orig = 0.0;
	var y_orig = rad;
	var z_orig = 0.0;

	var pnc_totales = 0; // indices de los puntos / normales / colores del CUBO
	var i_totales = 0; //

	var angle = 360.0 / div;
	var p_aux = new Vector4();
	p_aux.elements[0] = x_orig;
	p_aux.elements[1] = y_orig;
	p_aux.elements[2] = z_orig;
	p_aux.elements[3] = 1;

	var n_aux = new Vector4();
	n_aux.elements[0] = 0.0;
	n_aux.elements[1] = 1.0;
	n_aux.elements[2] = 0.0;
	n_aux.elements[3] = 0;

	for(var i=1; i<=div; i++){
		var m_aux = new Matrix4();
		m_aux.setRotate( i*angle , 0, 0, 1);

		var punto = m_aux.multiplyVector4(p_aux);
		var normal = m_aux.multiplyVector4(n_aux);

		var normal_N =  new Vector3(normal.elements);
		normal_N.normalize();

		circulo.puntos[pnc_totales*3] = punto.elements[0];
		circulo.puntos[pnc_totales*3+1] = punto.elements[1];
		circulo.puntos[pnc_totales*3+2] = punto.elements[2];

		circulo.normales[pnc_totales*3] = normal_N.elements[0];
		circulo.normales[pnc_totales*3+1] = normal_N.elements[1];
		circulo.normales[pnc_totales*3+2] = normal_N.elements[2];

		pnc_totales = pnc_totales + 1;

	}

	circulo.divisiones = div;

	return circulo;

}

function transformaCirculo( matriz, circulo){

	var new_circ = new Object();
	new_circ.puntos = [];
	new_circ.normales = [];


	for(var i=0; i<circulo.divisiones; i++){
		var p_aux = new Vector4();
		p_aux.elements[0] = circulo.puntos[3*i];
		p_aux.elements[1] = circulo.puntos[3*i+1];
		p_aux.elements[2] = circulo.puntos[3*i+2];
		p_aux.elements[3] = 1;


		var n_aux = new Vector4();
		n_aux.elements[0] = circulo.normales[3*i];
		n_aux.elements[1] = circulo.normales[3*i+1];
		n_aux.elements[2] = circulo.normales[3*i+2];
		n_aux.elements[3] = 0;

		var punto = matriz.multiplyVector4(p_aux);
		var normal = matriz.multiplyVector4(n_aux);

		var normal_N =  new Vector3(normal.elements);
		normal_N.normalize();

		new_circ.puntos[i*3] = punto.elements[0];
		new_circ.puntos[i*3+1] = punto.elements[1];
		new_circ.puntos[i*3+2] = punto.elements[2];

		new_circ.normales[i*3] = normal_N.elements[0];
		new_circ.normales[i*3+1] = normal_N.elements[1];
		new_circ.normales[i*3+2] = normal_N.elements[2];

	}

	return new_circ;
}