function FigDibujable(color){
	

  this.cara_m = undefined;

  this.colorRGBA = color;   
  this.matrizPropia = new Matrix4();
  
  this.setColores = function(vector_colores){
    this.colores = vector_colores;
  }

  this.setColor = function(un_color){
    var vector_colores = [];
    for (var i = 0; i<6 ; i++){
      vector_colores.push(un_color)
    }
    setColores(vector_colores);
  }

  this.construye = function(gl) {
    // Hay que hacer las distintas caras del cubo juntando varias caras 
    // (es mejor, aunque sobrarían algunos puntos)
    this.cara_m.construye(gl);
    var m_aux = new Matrix4();
    m_aux.translate(0.0, 0.5, 0.0);
    this.matrizPropia = m_aux;
    
  }

  this.dibuja = function(camara, handler, m_externa){ 

      var mat_aux =  new Matrix4();
      mat_aux.multiply(m_externa);
      mat_aux.multiply(this.matrizPropia);
      this.cara_m.dibuja(camara, mat_aux, handler, this.colorRGBA);

    //console.log('DIBUJO circulo');
  }


  this.desplaza = function(desp_x, desp_y, desp_z){
    this.matrizPropia.translate(desp_x, desp_y, desp_z);
  }

  this.rota = function(angulo, ejeX, ejeY, ejeZ){
    this.matrizPropia.rotate(angulo, ejeX, ejeY, ejeZ);
  }

  this.escala = function(escX, escY, escZ){
    this.matrizPropia.scale(escX, escY, escZ);
  }


}