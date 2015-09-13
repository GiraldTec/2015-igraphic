// PointLightedCube.js (c) 2012 matsuda
// Vertex shader program
var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'uniform vec4 u_Color;\n' +
  'attribute vec4 a_Normal;\n' +
  'uniform mat4 u_MvpMatrix;\n' +
  'uniform mat4 u_ModelMatrix;\n' +   // Model matrix
  'uniform mat4 u_NormalMatrix;\n' +  // Transformation matrix of the normal
  'uniform vec3 u_LightColor[2];\n' +    // Light color
  'uniform vec3 u_LightPosition[2];\n' + // Position of the light source (in the world coordinate system)
  'uniform vec3 u_AmbientLight;\n' +  // Ambient light color
  'varying vec4 v_Color;\n' +
  'void main() {\n' +
  '  gl_Position = u_MvpMatrix * a_Position;\n' +
     // Recalculate the normal based on the model matrix and make its length 1.
  '  vec3 normal = normalize(vec3(u_NormalMatrix * a_Normal));\n' +
     // Calculate world coordinate of vertex
  '  vec4 vertexPosition = u_ModelMatrix * a_Position;\n' +
//     // Calculate the light direction and make it 1.0 in length
//  '  vec3 lightDirection = normalize(u_LightPosition[0] - vec3(vertexPosition));\n' +  
//     // The dot product of the light direction and the normal
//  '  float nDotL = max(dot(lightDirection, normal), 0.0);\n' +
//     // Calculate the color due to diffuse reflection
//  '  vec3 diffuse = u_LightColor[0] * a_Color.rgb * nDotL;\n' +
//     // Calculate the color due to ambient reflection
  '  vec3 ambient = u_AmbientLight * u_Color.rgb;\n' +
//     //  Add the surface colors due to diffuse reflection and ambient reflection
//  '  v_Color = vec4(diffuse + ambient, a_Color.a);\n' + 
  '  v_Color = vec4(0.0);\n' + 
  '  for(int i = 0; i < 2 ; i++){\n' + 
    '  vec3 lightDirection2 = normalize(u_LightPosition[i] - vec3(vertexPosition));\n' + /// LA LUZ AZUL!
    '  float nDotL2 = max(dot(lightDirection2, normal), 0.0);\n' +
    '  vec3 diffuse2 = u_LightColor[i] * u_Color.rgb * nDotL2;\n' +
    '  v_Color = v_Color  + vec4(diffuse2 + ambient, u_Color.a);\n' + 
  '  }\n' + 
  '  v_Color = v_Color / 2.0 ;\n' + 

  '}\n';

// Fragment shader program
var FSHADER_SOURCE =
  '#ifdef GL_ES\n' +
  'precision mediump float;\n' +
  '#endif\n' +
  'varying vec4 v_Color;\n' +
  'void main() {\n' +
  '  gl_FragColor = v_Color;\n' +
  '}\n';

function main() {
  // Retrieve <canvas> element
  var canvas = document.getElementById('webgl');

  // Get the rendering context for WebGL
  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  var prog = createProgram(gl, VSHADER_SOURCE, FSHADER_SOURCE);
  // Get the storage locations of uniform variables and so on
  prog.u_ModelMatrix = gl.getUniformLocation(prog, 'u_ModelMatrix');
  prog.u_LightColor = gl.getUniformLocation(prog, 'u_LightColor');
  prog.u_LightPosition = gl.getUniformLocation(prog, 'u_LightPosition');
  prog.u_AmbientLight = gl.getUniformLocation(prog, 'u_AmbientLight');
  prog.u_Color = gl.getUniformLocation(prog, 'u_Color');
  if (!prog.u_LightColor || !prog.u_LightPosition　|| !prog.u_AmbientLight || !prog.u_Color) { 
    console.log('Failed to get the storage location');
    return;
  }



  // Set the vertex coordinates, the color and the normal
  var n = initVertexBuffers(gl, prog);
  if (n < 0) {
    console.log('Failed to set the vertex information');
    return;
  }

  // Set the clear color and enable the depth test
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.enable(gl.DEPTH_TEST);

  var camara = new Camara(gl,canvas.width/canvas.height);


  gl.useProgram(prog);
 // if (!initArrayBuffer(gl, 'a_Color', colores, gl.FLOAT, 4)) return -1;
  gl.uniform4f(prog.u_Color, 1.0,1.0,1.0, 1.0);

  // Set the light color (white)
  gl.uniform3fv(prog.u_LightColor, [1.0, 1.0,0, 0,0,1], 2);  // AMARILLO + AZUL
  // Set the light direction (in the world coordinate)
  gl.uniform3fv(prog.u_LightPosition, [2.3, 4.0, -3.5, 0.0, -4.0, 3.5], 2); // AMARILLO + AZUL
  // Set the ambient light
  gl.uniform3f(prog.u_AmbientLight, 0,0,0);

  var modelMatrix = new Matrix4();  // Model matrix
  var mvpMatrix = new Matrix4();    // Model view projection matrix
  

  // Calculate the model matrix
 // modelMatrix.setRotate(45, 0, 1, 0); // Rotate around the y-axis
  // Pass the model matrix to u_ModelMatrix
  gl.uniformMatrix4fv(prog.u_ModelMatrix, false, modelMatrix.elements);

  // Pass the model view projection matrix to u_MvpMatrix
  camara.calcular();//mvpMatrix.setPerspective(30, canvas.width/canvas.height, 1, 100);
  //mvpMatrix.lookAt(6, 6, 14, 0, 0, 0, 0, 1, 0);
  
  var currentAngle = 0.0;

  var tick = function() {
  currentAngle = currentAngle + 0.2;  // Update current rotation angle
  camara.dibujar(modelMatrix,n,currentAngle, prog);
  window.requestAnimationFrame(tick, canvas);
  };
  tick();

}

function initVertexBuffers(gl, prog) {
  var miCirc = new Cubo(1);
  miCirc.construye();

  var vertices = new Float32Array(miCirc.puntos);
  var normals = new Float32Array(miCirc.normales);
  var indices = new Uint8Array(miCirc.indices);

  // Write the vertex property to buffers (coordinates, colors and normals)
  if (!initArrayBuffer(gl, 'a_Position', vertices, 3, gl.FLOAT, prog)) return -1;
  if (!initArrayBuffer(gl, 'a_Normal', normals, 3, gl.FLOAT, prog)) return -1;


  // Unbind the buffer object
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  // Write the indices to the buffer object
  var indexBuffer = gl.createBuffer();
  if (!indexBuffer) {
    console.log('Failed to create the buffer object');
    return false;
  }
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

  return indices.length;
}

function initArrayBuffer(gl, attribute, data, num, type, prog) {
  // Create a buffer object
  var buffer = gl.createBuffer();
  if (!buffer) {
    console.log('Failed to create the buffer object');
    return false;
  }
  // Write date into the buffer object
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
  // Assign the buffer object to the attribute variable
  var a_attribute = gl.getAttribLocation(prog, attribute);
  if (a_attribute < 0) {
    console.log('Failed to get the storage location of ' + attribute);
    return false;
  }
  gl.vertexAttribPointer(a_attribute, num, type, false, 0, 0);
  // Enable the assignment of the buffer object to the attribute variable
  gl.enableVertexAttribArray(a_attribute);

  return true;
}



