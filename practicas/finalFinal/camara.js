// Camara
function Camara (gl, ratio, e_x, e_y, e_z, close, far) {

	this.canvas = gl;
	this.proyeccion_M = new Matrix4();
	this.modelado_M = new Matrix4();
	this.matrizPropia = new Matrix4();

	this.eye = new Vector3([e_x, e_y, e_z]);					// DECISION DE DISEÃ‘O
	this.atPoint = new Vector3([0.0, 0.0, 0.0]);
	this.upVector = new Vector3([0.0, 1.0, 0.0]);

	this.close = close;
	this.far = far;

	this.ratio = ratio;


	this.set_rotar = function( angulo, x_cord, y_cord, z_cord){
		this.modelado_M.setRotate(angulo, x_cord, y_cord, z_cord);
		this.recalcular();
	}

	this.rotar = function( angulo, x_cord, y_cord, z_cord){
		this.modelado_M.rotate(angulo, x_cord, y_cord, z_cord);
		this.calcular();
	}

	this.set_eye = function (nuevo){
		this.eye = nuevo;
		this.calcular();
	}
	this.set_atPoint = function (nuevo){
		this.atPoint = nuevo;
		this.calcular();
	}
	this.set_upVector = function (nuevo){
		this.upVector = nuevo;
		this.calcular();
	}

	this.calcular = function(){
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

		this.proyeccion_M.setPerspective(30, this.ratio, this.close, this.far);
		this.proyeccion_M.lookAt(v_eye[0], v_eye[1], v_eye[2], 
																	v_atPoint[0], v_atPoint[1], v_atPoint[2], 
																		v_upVector[0], v_upVector[1], v_upVector[2]);
		
	}

	this.get_eye = function (){		return this.eye;	}
	this.get_atPoint = function (){		return this.atPoint;	}
	this.get_upVector = function (){		return this.upVector;	}


	this.roll = function( ang ){ // modificar el Up

		var m_aux = new Matrix4();
		m_aux.rotate(ang, 0, 0, 1);

		var v4_upVector = new Vector4(this.upVector.elements);
		v4_upVector.elements[3] = 0.0;
		var new_upVector = this.modelado_M.multiplyVector4(v4_upVector);

		this.upVector = new Vector3(new_upVector.elements);

		this.calcular();

	}

	this.yaw = function(){

	}

	this.pitch = function(){

	}


}