// Cubo compuesto

function CuboCompuesto (div) {

  this.cara_m = new MallaCuadrada(div);
  this.cara_buff = new Object();

  this.colores = [];    
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
    this.cara_m.construye();

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

    this.initBasicShaders(gl);
  }

  this.dibuja = function(camara, handler){ 

    for (var iCara=0 ; iCara < 1 ; iCara++){
      // TODO
      // push y pop ...
      this.cara_m.dibuja(camara, this.cara_buff, this.matricesCaras[iCara], handler);
      //  
      //
    }

    console.log('DIBUJO cubo');
  }


  this.desplaza = function(desp_x, desp_y, desp_z){
    this.matrizPropia.translate(desp_x, desp_y, desp_z);
  }

  this.rota = function(desp_x, desp_y, desp_z){
    this.matrizPropia.rotate(desp_x, desp_y, desp_z);
  }

  this.escala = function(desp_x, desp_y, desp_z){
    this.matrizPropia.translate(desp_x, desp_y, desp_z);
  }

  this.initBasicShaders = function(gl){

    var vertices = new Float32Array(this.cara_m.puntos);
    var indices = new Uint8Array(this.cara_m.indices);

    this.cara_buff.vertexBuffer = initArrayBufferForLaterUse(gl, vertices, 3, gl.FLOAT);
    this.cara_buff.indexBuffer = initElementArrayBufferForLaterUse(gl, indices, gl.UNSIGNED_BYTE);
    if (!this.cara_buff.vertexBuffer || !this.cara_buff.indexBuffer) 
      this.cara_buff = null; 

    this.cara_buff.numIndices = this.cara_m.indices.length;

    // Unbind the buffer object
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
  }
}
