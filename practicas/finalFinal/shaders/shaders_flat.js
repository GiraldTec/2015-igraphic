var VSHADER_FLAT =
  'attribute vec4 a_Position;\n' +
  'uniform vec4 u_Normal;\n' +
  'uniform vec4 u_Color;\n' +
  'uniform mat4 u_MvpMatrix;\n' +
  'uniform mat4 u_ModelMatrix;\n' +   // Model matrix
  'uniform mat4 u_NormalMatrix;\n' +


  'uniform vec3 u_PosLightColor[2];\n' +
  'uniform vec3 u_LightPosition[2];\n' +
  'uniform vec3 u_DirLightColor[2];\n' +
  'uniform vec3 u_LightDirection[2];\n' +
  'uniform vec3 u_AmbientLight;\n' +  

  'varying vec4 v_Color;\n' +
  'void main() {\n' +
  '  gl_Position = u_MvpMatrix * a_Position;\n' +
  '  vec4 vertexPosition = u_ModelMatrix * a_Position;\n' +
  
  '  vec3 ambient = u_AmbientLight * u_Color.rgb;\n' +
  '  v_Color = vec4(0.0);\n' + 
  '  vec3 normal = normalize((u_NormalMatrix * u_Normal).xyz);\n' +

  '  for(int i = 0; i < 2 ; i++){\n' +  // Procesamos las luces de punto
    '  vec3 lightDirection_pos = normalize(u_LightPosition[i] - vec3(vertexPosition));\n' + 
    '  float nDotL_pos = max(dot(lightDirection_pos, normal), 0.0);\n' +
    '  vec3 diffuse_pos = u_PosLightColor[i] * u_Color.rgb * nDotL_pos;\n' +
    '  v_Color = v_Color*0.85  + vec4(diffuse_pos + ambient, u_Color.a);\n' + 
  '  }\n' + 

  '  for(int i = 0; i < 2 ; i++){\n' +  // Procesamos las luces direccionales
    '  vec3 lightDirection_dir = normalize(u_LightDirection[i]);\n' + 
    '  float nDotL_dir = max(dot(lightDirection_dir, normal), 0.0);\n' +
    '  vec3 diffuse_dir = u_DirLightColor[i] * u_Color.rgb * nDotL_dir;\n' +
    '  v_Color = v_Color*0.85  + vec4(diffuse_dir + ambient, u_Color.a);\n' + 
  '  }\n' + 

  '  v_Color = v_Color *0.25;\n' +
  '}\n';

// Fragment shader program
var FSHADER_FLAT =
  '#ifdef GL_ES\n' +
  'precision mediump float;\n' +
  '#endif\n' +
  'varying vec4 v_Color;\n' +
  'void main() {\n' +
  '  gl_FragColor = v_Color;\n' +
  '}\n';

