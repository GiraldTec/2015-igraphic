// Cilindro

function CilindroCompuesto (){//alt, rad1, rad2, divA, divH) {

//  this.tubo = new MallaTubo(alt, rad1, rad2, divA, divH,0);
//  this.tapa1 = new MallaCirculo(rad1, divA);
//  this.tapa2 = new MallaCirculo(rad2, divA);
  //
  this.matrizPropia = new Matrix4();
 

  this.construye = function() {
   
  }

  this.dibuja = function(){
    //console.log('DIBUJO CILINDRO');
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
}
