// Figura Cuadrado

function FiguraCuadrado (div, color) {
  
  this.prototype = new FigDibujable(color);
  this.prototype.constructor = FiguraCuadrado;

  this.prototype.cara_m =  new MallaCuadrada(div);

  this.dibuja = function(camara, handler, m_externa){
    this.prototype.dibuja(camara, handler, m_externa);
  }

}
