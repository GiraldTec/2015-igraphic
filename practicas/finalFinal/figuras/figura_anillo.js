// Figura Anillo

function FiguraAnillo (div, rat1, rat2, color) {
  
  this.prototype = new FigDibujable(color);
  this.prototype.constructor = FiguraAnillo;

  this.prototype.cara_m =  new MallaAnillo(div, rat1, rat2);

  this.dibuja = function(camara, handler, m_externa){
    this.prototype.dibuja(camara, handler, m_externa);
  }

}
