// Figura Torus

function FiguraTorus (div1, div2, rat1, rat2, color) {
  
  this.prototype = new FigDibujable(color);
  this.prototype.constructor = FiguraTubo;

  this.prototype.cara_m = new MallaTorus(div1, div2, rat1, rat2);

  this.dibuja = function(camara, handler, m_externa,luzAmb, lucesDir, lucesPos){
    this.prototype.dibuja(camara, handler, m_externa,luzAmb, lucesDir, lucesPos);
  }


}