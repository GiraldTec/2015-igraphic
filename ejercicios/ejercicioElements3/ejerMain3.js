
// Size of off screen
var OFFSCREEN_WIDTH = 256;
var OFFSCREEN_HEIGHT = 256;

function main() {
  // Retrieve <canvas> element
  var canvas = document.getElementById('webgl');

  // Get the rendering context for WebGL
  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  // Initialize shaders
//  if (!initShaders(gl, TEXTVSHADER_SOURCE, TEXTFSHADER_SOURCE)) {
//    console.log('Failed to intialize shaders.');
//    return;
//  }

  // Get the storage location of attribute variables and uniform variables
  var solid_program = createProgram(gl, VSHADER_SOURCE, FSHADER_SOURCE);
  //TODO


  var textured_program = createProgram(gl, TEXTVSHADER_SOURCE, TEXTFSHADER_SOURCE);
  textured_program.a_Position = gl.getAttribLocation(textured_program, 'a_Position');
  textured_program.a_TexCoord = gl.getAttribLocation(textured_program, 'a_TexCoord');
  textured_program.u_MvpMatrix = gl.getUniformLocation(textured_program, 'u_MvpMatrix');
  if (textured_program.a_Position < 0 || textured_program.a_TexCoord < 0 || !textured_program.u_MvpMatrix) {
    console.log('Failed to get the storage location of attribute or uniform variable from textured_program'); 
    return;
  }

  var solid_program = createProgram(gl, VSHADER_SOURCE, FSHADER_SOURCE);
  solid_program.a_Position = gl.getAttribLocation(solid_program, 'a_Position');
  solid_program.a_Normal = gl.getAttribLocation(solid_program, 'a_Normal');
  solid_program.a_Color = gl.getAttribLocation(solid_program, 'a_Color');
  solid_program.u_MvpMatrix = gl.getUniformLocation(solid_program, 'u_MvpMatrix');
  solid_program.u_NormalMatrix = gl.getUniformLocation(solid_program, 'u_NormalMatrix');
  if (solid_program.a_Position < 0 || solid_program.a_Normal < 0 || solid_program.a_Color < 0 || !solid_program.u_MvpMatrix) {
    console.log('Failed to get the storage location of a_Position, a_Normal, a_Color, u_MvpMatrix');
    return;
  }

  // Set the vertex information
  var cube = initVertexBuffersForCube(gl);
  var plane = initVertexBuffersForPlane(gl);
  if (!cube || !plane) {
    console.log('Failed to set the vertex information');
    return;
  }

  // Set texture
//  var texture = initTextures(gl);
//  if (!texture) {
//    console.log('Failed to intialize the texture.');
//    return;
//  }

  // Initialize framebuffer object (FBO)
  var fbo = initFramebufferObject(gl);
  if (!fbo) {
    console.log('Failed to intialize the framebuffer object (FBO)');
    return;
  }

  // Enable depth test
  gl.enable(gl.DEPTH_TEST);   //  gl.enable(gl.CULL_FACE);

  var viewProjMatrix = new Matrix4();   // Prepare view projection matrix for color buffer
  viewProjMatrix.setPerspective(30, canvas.width/canvas.height, 1.0, 100.0);
  viewProjMatrix.lookAt(0.0, 0.0, 7.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0);

  var viewProjMatrixFBO = new Matrix4();   // Prepare view projection matrix for FBO
  viewProjMatrixFBO.setPerspective(30.0, OFFSCREEN_WIDTH/OFFSCREEN_HEIGHT, 1.0, 100.0);
  viewProjMatrixFBO.lookAt(0.0, 2.0, 7.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0);

  // Start drawing
  var currentAngle = 0.0; // Current rotation angle (degrees)
  var tick = function() {
    currentAngle = animate(currentAngle);  // Update current rotation angle
    draw(gl, canvas, fbo, plane, cube, currentAngle, viewProjMatrix, viewProjMatrixFBO, textured_program, solid_program);
    window.requestAnimationFrame(tick, canvas);
  };
  tick();
}

function initVertexBuffersForCube(gl) {
  // Create a cube
  //    v6----- v5
  //   /|      /|
  //  v1------v0|
  //  | |     | |
  //  | |v7---|-|v4
  //  |/      |/
  //  v2------v3


  var miCub = new Cubo(3);
  miCub.construye();

  var vertices = new Float32Array(miCub.puntos);
  var normals = new Float32Array(miCub.normales);
  var colors = new Float32Array(miCub.colores);
  var indices = new Uint8Array(miCub.indices);

  var o = new Object();  // Create the "Object" object to return multiple objects.

  // Write vertex information to buffer object
  o.vertexBuffer = initArrayBufferForLaterUse(gl, vertices, 3, gl.FLOAT);
  o.normalsBuffer = initArrayBufferForLaterUse(gl, normals, 3, gl.FLOAT);
  o.colorsBuffer = initArrayBufferForLaterUse(gl, colors, 4, gl.FLOAT);
  o.indexBuffer = initElementArrayBufferForLaterUse(gl, indices, gl.UNSIGNED_BYTE);
  if (!o.vertexBuffer || !o.normalsBuffer || !o.colorsBuffer || !o.indexBuffer) return null; 

  o.numIndices = indices.length;

  // Unbind the buffer object
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

  return o;
}

function initVertexBuffersForPlane(gl) {
  // Create face
  //  v1------v0
  //  |        | 
  //  |        |
  //  |        |
  //  v2------v3

  // Vertex coordinates
  var vertices = new Float32Array([
    1.0, 1.0, 0.0,  -1.0, 1.0, 0.0,  -1.0,-1.0, 0.0,   1.0,-1.0, 0.0    // v0-v1-v2-v3
  ]);

  // Texture coordinates
  var texCoords = new Float32Array([1.0, 1.0,   0.0, 1.0,   0.0, 0.0,   1.0, 0.0]);

  // Indices of the vertices
  var indices = new Uint8Array([0, 1, 2,   0, 2, 3]);

  var o = new Object(); // Create the "Object" object to return multiple objects.

  // Write vertex information to buffer object
  o.vertexBuffer = initArrayBufferForLaterUse(gl, vertices, 3, gl.FLOAT);
  o.texCoordBuffer = initArrayBufferForLaterUse(gl, texCoords, 2, gl.FLOAT);
  o.indexBuffer = initElementArrayBufferForLaterUse(gl, indices, gl.UNSIGNED_BYTE);
  if (!o.vertexBuffer || !o.texCoordBuffer || !o.indexBuffer) return null; 

  o.numIndices = indices.length;

  // Unbind the buffer object
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

  return o;
}

function initArrayBufferForLaterUse(gl, data, num, type) {
  // Create a buffer object
  var buffer = gl.createBuffer();
  if (!buffer) {
    console.log('Failed to create the buffer object');
    return null;
  }
  // Write date into the buffer object
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

  // Store the necessary information to assign the object to the attribute variable later
  buffer.num = num;
  buffer.type = type;

  return buffer;
}

function initElementArrayBufferForLaterUse(gl, data, type) {
  // Create a buffer object
  var buffer = gl.createBuffer();
  if (!buffer) {
    console.log('Failed to create the buffer object');
    return null;
  }
  // Write date into the buffer object
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, gl.STATIC_DRAW);

  buffer.type = type;

  return buffer;
}

function initTextures(gl) {
  var texture = gl.createTexture();   // Create a texture object
  if (!texture) {
    console.log('Failed to create the Texture object');
    return null;
  }

  // Get storage location of u_Sampler
  var u_Sampler = gl.getUniformLocation(gl.program, 'u_Sampler');
  if (!u_Sampler) {
    console.log('Failed to get the storage location of u_Sampler');
    return null;
  }

  var image = new Image();  // Create image object
  if (!image) {
    console.log('Failed to create the Image object');
    return null;
  }
  // Register the event handler to be called when image loading is completed
  image.onload = function() {
    // Write image data to texture object
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);  // Flip the image Y coordinate
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    // Pass the texure unit 0 to u_Sampler
    gl.uniform1i(u_Sampler, 0);

    gl.bindTexture(gl.TEXTURE_2D, null); // Unbind the texture object
  };

  // Tell the browser to load an Image  
  image.src = '../resources/sky_cloud.jpg';

  return texture;
}

function initFramebufferObject(gl) {
  var framebuffer, texture, depthBuffer;

  // Define the error handling function
  var error = function() {
    if (framebuffer) gl.deleteFramebuffer(framebuffer);
    if (texture) gl.deleteTexture(texture);
    if (depthBuffer) gl.deleteRenderbuffer(depthBuffer);
    return null;
  }

  // Create a frame buffer object (FBO)
  framebuffer = gl.createFramebuffer();
  if (!framebuffer) {
    console.log('Failed to create frame buffer object');
    return error();
  }

  // Create a texture object and set its size and parameters
  texture = gl.createTexture(); // Create a texture object
  if (!texture) {
    console.log('Failed to create texture object');
    return error();
  }
  gl.bindTexture(gl.TEXTURE_2D, texture); // Bind the object to target
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, OFFSCREEN_WIDTH, OFFSCREEN_HEIGHT, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  framebuffer.texture = texture; // Store the texture object

  // Create a renderbuffer object and Set its size and parameters
  depthBuffer = gl.createRenderbuffer(); // Create a renderbuffer object
  if (!depthBuffer) {
    console.log('Failed to create renderbuffer object');
    return error();
  }
  gl.bindRenderbuffer(gl.RENDERBUFFER, depthBuffer); // Bind the object to target
  gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, OFFSCREEN_WIDTH, OFFSCREEN_HEIGHT);

  // Attach the texture and the renderbuffer object to the FBO
  gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
  gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, depthBuffer);

  // Check if FBO is configured correctly
  var e = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
  if (gl.FRAMEBUFFER_COMPLETE !== e) {
    console.log('Frame buffer object is incomplete: ' + e.toString());
    return error();
  }

  // Unbind the buffer object
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  gl.bindTexture(gl.TEXTURE_2D, null);
  gl.bindRenderbuffer(gl.RENDERBUFFER, null);


  return framebuffer;
}
function draw(gl, canvas, fbo, plane, cube, angle, viewProjMatrix, viewProjMatrixFBO, t_prog, s_prog, u_NormalMatrix) {
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);              // Change the drawing destination to FBO
  gl.viewport(0, 0, OFFSCREEN_WIDTH, OFFSCREEN_HEIGHT); // Set a viewport for FBO

  gl.clearColor(0.2, 0.2, 0.4, 1.0); // Set clear color (the color is slightly changed)
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);  // Clear FBO

  gl.useProgram(s_prog);
  drawSolidCube(gl, s_prog, cube, angle, viewProjMatrixFBO, u_NormalMatrix);   // Draw the cube

  gl.bindFramebuffer(gl.FRAMEBUFFER, null);        // Change the drawing destination to color buffer
  gl.viewport(0, 0, canvas.width, canvas.height);  // Set the size of viewport back to that of <canvas>

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); // Clear the color buffer

  gl.useProgram(t_prog);
  drawTexturedPlane(gl, t_prog, plane, angle, fbo.texture, viewProjMatrix);  // Draw the plane
}

// Coordinate transformation matrix
var g_modelMatrix = new Matrix4();
var g_mvpMatrix = new Matrix4();
var g_normalMatrix = new Matrix4();  // Coordinate transformation matrix for normals


function drawSolidCube(gl, program, o, angle, viewProjMatrix, u_NormalMatrix) {
  // Calculate a model matrix
  g_modelMatrix.setRotate(20.0, 1.0, 0.0, 0.0);
  g_modelMatrix.rotate(angle, 0.0, 1.0, 0.0);

  // Calculate the model view project matrix and pass it to u_MvpMatrix
  g_mvpMatrix.set(viewProjMatrix);
  g_mvpMatrix.multiply(g_modelMatrix);
  gl.uniformMatrix4fv(program.u_MvpMatrix, false, g_mvpMatrix.elements);

  g_normalMatrix.setInverseOf(g_modelMatrix);
  g_normalMatrix.transpose();
  gl.uniformMatrix4fv(u_NormalMatrix, false, g_normalMatrix.elements);

  //drawTexturedObject(gl, program, o, texture);
  drawSolidObject(gl, program, o);
}

function drawTexturedPlane(gl, program, o, angle, texture, viewProjMatrix) {
  // Calculate a model matrix
  g_modelMatrix.setTranslate(0, 0, 1);
  g_modelMatrix.rotate(20.0, 1.0, 0.0, 0.0);
  g_modelMatrix.rotate(angle, 0.0, 1.0, 0.0);

  // Calculate the model view project matrix and pass it to u_MvpMatrix
  g_mvpMatrix.set(viewProjMatrix);
  g_mvpMatrix.multiply(g_modelMatrix);
  gl.uniformMatrix4fv(program.u_MvpMatrix, false, g_mvpMatrix.elements);

  drawTexturedObject(gl, program, o, texture);
}

function drawTexturedObject(gl, program, o, texture) {
  // Assign the buffer objects and enable the assignment
  initAttributeVariable(gl, program.a_Position, o.vertexBuffer);    // Vertex coordinates
  initAttributeVariable(gl, program.a_TexCoord, o.texCoordBuffer);  // Texture coordinates

  // Bind the texture object to the target
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // Draw
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, o.indexBuffer);
  gl.drawElements(gl.TRIANGLES, o.numIndices, o.indexBuffer.type, 0);
}

function drawSolidObject(gl, program, o) {
  // Assign the buffer objects and enable the assignment
  initAttributeVariable(gl, program.a_Position, o.vertexBuffer);    // Vertex coordinates
  initAttributeVariable(gl, program.a_Normal, o.normalsBuffer);  // normals
  initAttributeVariable(gl, program.a_Color, o.colorsBuffer);  // colors

  // Bind the texture object to the target
  //gl.activeTexture(gl.TEXTURE0);
  //gl.bindTexture(gl.TEXTURE_2D, texture);

  // Draw
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, o.indexBuffer);
  gl.drawElements(gl.TRIANGLES, o.numIndices, o.indexBuffer.type, 0);
}


// Assign the buffer objects and enable the assignment
function initAttributeVariable(gl, a_attribute, buffer) {
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.vertexAttribPointer(a_attribute, buffer.num, buffer.type, false, 0, 0);
  gl.enableVertexAttribArray(a_attribute);
}

function drawTexturedCube2(gl, o, angle, texture, viewpProjMatrix, u_MvpMatrix) {
  // Calculate a model matrix
  g_modelMatrix.rotate(20.0, 1.0, 0.0, 0.0);
  g_modelMatrix.rotate(angle, 0.0, 1.0, 0.0);
  g_modelMatrix.scale(1, 1, 1);

  // Calculate the model view project matrix and pass it to u_MvpMatrix
  g_mvpMatrix.set(vpMatrix);
  g_mvpMatrix.multiply(g_modelMatrix);
  gl.uniformMatrix4fv(u_MvpMatrix, false, g_mvpMatrix.elements);

  drawTexturedObject(gl, o, texture);
}

var ANGLE_STEP = 30;   // The increments of rotation angle (degrees)

var last = Date.now(); // Last time that this function was called
function animate(angle) {
  var now = Date.now();   // Calculate the elapsed time
  var elapsed = now - last;
  last = now;
  // Update the current rotation angle (adjusted by the elapsed time)
  var newAngle = angle + (ANGLE_STEP * elapsed) / 1000.0;
  return newAngle % 360;
}
