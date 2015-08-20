function Triangulo () {
  this.puntos = [];			//	Float32Array
  this.normales = [];
  this.colores = [];		//	Float32Array
  this.indices = [0,1,2];		//	Uint8Array

  this.construye = function() {
  	var x_orig = 0.0;
  	var y_orig = Math.sqrt(2.0)/2.0;
  	var z_orig = 0.0;

  	var angle = 120.0;
		var p_aux = new Vector4();
		p_aux.elements[0] = x_orig;
		p_aux.elements[1] = y_orig;
		p_aux.elements[2] = z_orig;
		p_aux.elements[3] = 1;

		var pnc_totales = 0;
		var i_totales = 0;

  	for(var i=0; i<3; i++){
  		var m_aux = new Matrix4();
  		m_aux.setRotate( i*angle , 0, 0, 1);

  		var punto = m_aux.multiplyVector4(p_aux);
  		
  		this.puntos[pnc_totales*3] = punto.elements[0];
			this.puntos[pnc_totales*3+1] = punto.elements[1];
			this.puntos[pnc_totales*3+2] = punto.elements[2];

			this.normales[pnc_totales*3] = 0.0;
			this.normales[pnc_totales*3+1] = 0.0;
			this.normales[pnc_totales*3+2] = 1.0;

			this.colores[pnc_totales*4] = 1.0;
			this.colores[pnc_totales*4+1] = 0.4;
			this.colores[pnc_totales*4+2] = 0.0;
			this.colores[pnc_totales*4+3] = 1.0;

			pnc_totales = pnc_totales + 1;
  	}
  }
}