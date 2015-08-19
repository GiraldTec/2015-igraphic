function Cubo (div) {
  this.puntos = [];			//	Float32Array
  this.normales = [];
  this.colores = [];		//	Float32Array
  this.indices = [];		//	Uint8Array
  this.divisiones = div;

  this.construye = function() {
  	// Hay que hacer las distintas caras del cubo juntando varias caras 
  	// (es mejor, aunque sobrarían algunos puntos)
  	var cara_aux = new Cara(this.divisiones);
  	cara_aux.construye();

  	var pnc_totales = 0; // indices de los puntos / normales / colores del CUBO
  	var i_totales = 0; // 

  	for (var iCara=0 ; iCara < 2 ; iCara++){
  		var m_aux = new Matrix4();
			switch(iCara) {
				case 1:
					m_aux.setRotate(90, 0, 1, 0);
			  	break;
			  case 2:
			  	m_aux.setRotate(180, 0, 1, 0);
			  	break;
			  case 3:
			  	m_aux.setRotate(270, 0, 1, 0);
			  	break;
			  case 0:  // tapa superior
			  	m_aux.translate(0.0, 0.5, 0.0);
			  	m_aux.rotate(-90, 1, 0, 0);

			  	//m_aux.translate(0, 0, 0);
			  	
			  	
			  	break;
			  case 5:
			  	m_aux.setRotate(270, 1, 0, 0);
			  	m_aux.translate(1.0, 0.5, -0.5);
			  	break;
			}

			var sq_divisiones = (this.divisiones+1) * (this.divisiones+1);


			//// Agregamos los puntos/normales/colores de una cara a los totales del cubo
			for( var i = 0 ; i < sq_divisiones ; i++){
				var p_aux = new Vector3();
				//[cara_aux.puntos[3*i],cara_aux.puntos[3*i+1],cara_aux.puntos[3*i+2]]
				p_aux.elements[0] = cara_aux.puntos[3*i];
				p_aux.elements[1] = cara_aux.puntos[3*i+1];
				p_aux.elements[2] = cara_aux.puntos[3*i+2];

				var punto = m_aux.multiplyVector3(p_aux);

				//[cara_aux.normales[3*i],	cara_aux.normales[3*i+1], cara_aux.normales[3*i+2]]
				var n_aux = new Vector3();
				n_aux.elements[0] = cara_aux.normales[3*i];
				n_aux.elements[1] = cara_aux.normales[3*i+1];
				n_aux.elements[2] = cara_aux.normales[3*i+2];


				var normal = m_aux.multiplyVector3(n_aux);
				
				var punto_elms = punto.elements;
				var normal_elms = normal.elements;

				this.puntos[pnc_totales*3] = punto_elms[0];
				this.puntos[pnc_totales*3+1] = punto_elms[1];
				this.puntos[pnc_totales*3+2] = punto_elms[2];

				this.normales[pnc_totales*3] = normal_elms[0];
				this.normales[pnc_totales*3+1] = normal_elms[1];
				this.normales[pnc_totales*3+2] = normal_elms[2];

				this.colores[pnc_totales*4] = cara_aux.colores[i*4+0];
				this.colores[pnc_totales*4+1] = cara_aux.colores[i*4+1];
				this.colores[pnc_totales*4+2] = cara_aux.colores[i*4+2];
				this.colores[pnc_totales*4+3] = cara_aux.colores[i*4+3];

				pnc_totales = pnc_totales + 1;
			}

			/////// Agregamos los indices de esa cara
			// Sumamos ((div+1)^2)*i para llevar bien la cuenta
			var max_indices = cara_aux.indices.length;
			for ( var j = 0 ; j < max_indices; j++){
				this.indices[i_totales] = cara_aux.indices[j] + sq_divisiones * iCara;
				i_totales = i_totales + 1;
			}

  	}

  }

}


/*
// Create Matrix4 object for model transformation
  var m_aux = new Matrix4();

  // Calculate a model matrix
  var ANGLE = 60.0; // The rotation angle
  var Tx = 0.5;     // Translation distance
  m_aux.setRotate(ANGLE, 0, 0, 1);  // Set rotation matrix
  m_aux.translate(Tx, 0, 0);        // Mu
*/

