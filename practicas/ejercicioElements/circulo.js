function Circulo (div) {
  this.puntos = [0.0,0.0,0.0];			//	Float32Array
  this.normales = [0.0,0.0,1.0];
  this.colores = [1.0,0.4,0.0,1.0];		//	Float32Array
  this.indices = [];		//	Uint8Array
  this.divisiones = div;

  this.construye = function() {
  	var x_orig = 0.0;
  	var y_orig = Math.sqrt(2.0)/2.0;
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

			this.normales[pnc_totales*3] = 0.0;
			this.normales[pnc_totales*3+1] = 0.0;
			this.normales[pnc_totales*3+2] = 1.0;

			this.colores[pnc_totales*4] = 1.0;
			this.colores[pnc_totales*4+1] = 0.4;
			this.colores[pnc_totales*4+2] = 0.0;
			this.colores[pnc_totales*4+3] = 1.0;

			pnc_totales = pnc_totales + 1;

			this.indices[i_totales] = 0 ;
			this.indices[i_totales+1] = i ;
			this.indices[i_totales+2] = (i+1)%(this.divisiones+1);
			if (this.indices[i_totales+2] ==0) this.indices[i_totales+2] =1;

			i_totales = i_totales +3; 

		}

  }


}