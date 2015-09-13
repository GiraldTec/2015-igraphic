// Cubo Circulo compuesto

function FiguraCirculo (div, color) {

  this.cara_m = new MallaCirculo(div);

  this.colorRGB = color;   
  this.matricesCaras = [];
  this.matrizPropia = new Matrix4();

  this.divisiones = div;  
  
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

    for (var iCara=0 ; iCara < 6 ; iCara++){
      var m_aux = new Matrix4();
      switch(iCara) {
        case 0:
          m_aux.translate(0.0, 0.5, 0.5);
        break;
        case 1:
          m_aux.rotate(90, 0, 1, 0);
          m_aux.translate(0.0, 0.5, 0.5);
        break;
        case 2:
          m_aux.rotate(180, 0, 1, 0);
          m_aux.translate(0.0, 0.5, 0.5);
        break;
        case 3:
          m_aux.rotate(270, 0, 1, 0);
          m_aux.translate(0.0, 0.5, 0.5);
        break;
        case 4:  // tapa superior
          m_aux.rotate(-90, 1, 0, 0);
          m_aux.translate(0.0, 0.0, 1.0);
        break;
        case 5: //tapa inferior
          m_aux.rotate(90, 1, 0, 0);
        break;
      }

      this.matricesCaras[iCara] = m_aux;
    }

    
  }

  this.dibuja = function(camara, handler){ 

    for (var iCara=0 ; iCara < 6 ; iCara++){
      var mat_aux =  new Matrix4();
      mat_aux.multiply(this.matrizPropia);
      mat_aux.multiply(this.matricesCaras[iCara]);
      this.cara_m.dibuja(camara, mat_aux, handler);
    }

    console.log('DIBUJO cubo');
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
