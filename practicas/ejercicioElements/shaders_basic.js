var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'uniform vec4 u_Normal;\n' +
  'uniform vec4 u_color;\n' +
  'uniform mat4 u_MvpMatrix;\n' +
  'uniform mat4 u_ModelMatrix;\n' +   // Model matrix
  'uniform mat4 u_NormalMatrix;\n' +
  'varying vec4 v_Color;\n' +
  'void main() {\n' +
  '  gl_Position = u_MvpMatrix * a_Position;\n' +
  '  vec4 vertexPosition = u_ModelMatrix * a_Position;\n' +
  // Shading calculation to make the arm look three-dimensional
  '  vec3 lightDirection = normalize(vec3(-0.7, -0.5, 0.0));\n' + // Light direction
  '  vec4 color = u_color;\n' +  // Robot color
  '  vec3 normal = normalize((u_NormalMatrix * u_Normal).xyz);\n' +
  '  float nDotL = max(dot(normal, lightDirection), 0.0);\n' +
  '  v_Color = vec4(color.rgb * nDotL + vec3(0.1), color.a);\n' +

  '  vec3 lightDirection2 = normalize(vec3(0.0, -0.5, 0.7));\n' + // Light direction
  '  vec4 color2 = u_color;\n' +  // Robot color
  '  vec3 normal2 = normalize((u_NormalMatrix * u_Normal).xyz);\n' +
  '  float nDotL2 = max(dot(normal2, lightDirection2), 0.0);\n' +
  '  v_Color = v_Color + vec4(color2.rgb * nDotL2 + vec3(0.1), color2.a);\n' +

  '  v_Color = v_Color *0.75;\n' +
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
