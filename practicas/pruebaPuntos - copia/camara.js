function Camara (gl, ratio) {

	this.canvas = gl;
	this.proyeccion_M = new Matrix4();
	this.modelado_M = new Matrix4();

	this.eye = new Vector3([6.0, 6.0, 14.0]);					// DECISION DE DISEÑO
	this.atPoint = new Vector3([0.0, 0.0, 0.0]);
	this.upVector = new Vector3([0.0, 1.0, 0.0]);

	this.ratio = ratio;


	this.set_rotar = function( angulo, x_cord, y_cord, z_cord){
		this.modelado_M.setRotate(angulo, x_cord, y_cord, z_cord);
		this.recalcular();
	}

	this.rotar = function( angulo, x_cord, y_cord, z_cord){
		this.modelado_M.rotate(angulo, x_cord, y_cord, z_cord);
		this.recalcular();
	}

	this.set_eye = function (nuevo){
		this.eye = nuevo;
		this.recalcular();
	}
	this.set_atPoint = function (nuevo){
		this.atPoint = nuevo;
		this.recalcular();
	}
	this.set_upVector = function (nuevo){
		this.upVector = nuevo;
		this.recalcular();
	}

	this.calcular = function(){
		this.proyeccion_M.setPerspective(30, this.ratio, 1, 100);
		//this.proyeccion_M.lookAt(6, 6, 14, 0, 0, 0, 0, 1, 0);

		var v4_eye = new Vector4(this.eye.elements);
		v4_eye.elements[3] = 1.0;
		var v4_atPoint = new Vector4(this.atPoint.elements);
		v4_atPoint.elements[3] = 1.0;
		var v4_upVector = new Vector4(this.upVector.elements);
		v4_upVector.elements[3] = 0.0;

		var new_eye = this.modelado_M.multiplyVector4(v4_eye);
		var new_atPoint = this.modelado_M.multiplyVector4(v4_atPoint);
		var new_upVector = this.modelado_M.multiplyVector4(v4_upVector);
		
		


		var v_eye = new_eye.elements;
		var v_atPoint = new_atPoint.elements;
		var v_upVector = new_upVector.elements;
		this.proyeccion_M.lookAt(v_eye[0], v_eye[1], v_eye[2], 
																	v_atPoint[0], v_atPoint[1], v_atPoint[2], 
																		v_upVector[0], v_upVector[1], v_upVector[2]);
		
	}

	this.get_eye = function (){		return this.eye;	}
	this.get_atPoint = function (){		return this.atPoint;	}
	this.get_upVector = function (){		return this.upVector;	}

	this.recalcular = function(){

	}

	this.dibujar = function( m_modelo , n, angulo){

		this.set_rotar(angulo,0,1,0);

		this.calcular();

//		var v_eye = this.eye.elements;
//		var v_atPoint = this.atPoint.elements;
//		var v_upVector = this.upVector.elements;
//
		//this.proyeccion_M.setLookAt(v_eye[0], v_eye[1], v_eye[2], v_atPoint[0], v_atPoint[1], v_atPoint[2], v_upVector[0], v_upVector[1], v_upVector[2]);

	  this.proyeccion_M.multiply(m_modelo);

	  var u_MvpMatrix = this.canvas.getUniformLocation(this.canvas.program, 'u_MvpMatrix');
	  var u_NormalMatrix = gl.getUniformLocation(gl.program, 'u_NormalMatrix');
	  if (!u_MvpMatrix || !u_NormalMatrix) { 
	    console.log('Failed to get the storage location');
	    return;
	  }

	  this.canvas.uniformMatrix4fv(u_MvpMatrix, false, this.proyeccion_M.elements);

	  var normalMatrix = new Matrix4(); // Transformation matrix for normals
	  // Pass the matrix to transform the normal based on the model matrix to u_NormalMatrix
	  normalMatrix.setInverseOf(m_modelo);
	  normalMatrix.transpose();
	  this.canvas.uniformMatrix4fv(u_NormalMatrix, false, normalMatrix.elements);

	  // Clear color and depth buffer
	  this.canvas.clear(this.canvas.COLOR_BUFFER_BIT | this.canvas.DEPTH_BUFFER_BIT);

	  // Draw the cube
	  this.canvas.drawElements(this.canvas.TRIANGLES, n, this.canvas.UNSIGNED_BYTE, 0);
	}

}