// Figura Tubo

function FiguraTubo (div, rat1, rat2, color, altura, nDir) {

  
  this.prototype = new FigDibujable(color);
  this.prototype.constructor = FiguraTubo;

  this.prototype.cara_m = new MallaTubo(div, rat1, rat2, altura, nDir);

  this.dibuja = function(camara, handler, m_externa){
    this.prototype.dibuja(camara, handler, m_externa);
  }

  this.construye = function(gl){
    this.prototype.construye(gl);
  }

}