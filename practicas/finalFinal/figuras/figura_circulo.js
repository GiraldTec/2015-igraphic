// Figura Circulo

function FiguraCirculo (div, color) {
  
  this.prototype = new FigDibujable(color);
  this.prototype.constructor = FiguraCirculo;

  this.prototype.cara_m =  new MallaCirculo(div);

  this.dibuja = function(camara, handler, m_externa){
    this.prototype.dibuja(camara, handler, m_externa);
  }

}
