// PerspectiveView.js
// Vertex shader program
var VSHADER_SOURCE =
	'attribute vec4 a_Position;\n' +
	'attribute vec4 a_Color;\n' +
	'uniform mat4 u_ViewMatrix;\n' +
	'uniform mat4 u_ProjMatrix;\n' +
	'varying vec4 v_Color;\n' +
	'void main() {\n' +
	' gl_Position = u_ProjMatrix * u_ViewMatrix * a_Position;\n' +
	' v_Color = a_Color;\n' +
	'}\n';

var FSHADER_SOURCE =
	'precision mediump float;\n' +
	'varying vec4 v_Color;\n' +
	'void main() {\n' +
	'gl_FragColor = v_Color;\n' + 
	'}\n';

var n;
var viewMatrix = new Matrix4(); // The view matrix

function main() {

	if (window.File && window.FileReader && window.FileList && window.Blob) {
	  // Great success! All the File APIs are supported.
	  alert('The File APIs is fully supported in this browser.');
	} else {
	  alert('The File APIs are not fully supported in this browser.');
	}

	var text = '{ "employees" : [' +
'{ "firstName":"John" , "lastName":"Doe" },' +
'{ "firstName":"Anna" , "lastName":"Smith" },' +
'{ "firstName":"Peter" , "lastName":"Jones" } ]}';

var obj = JSON.parse(text);


	// Retrieve <canvas> element
	var canvas = document.getElementById('webgl');

	// Get the rendering context for WebGL
	var gl = getWebGLContext(canvas);
		if (!gl) {
			console.log('Failed to get the rendering context for WebGL');
			return;
		}

	// Initialize shaders
	if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
		console.log('Failed to initialize shaders.');
		return;
	}

	// Set the vertex coordinates and color (blue triangle is in front)
	n = initVertexBuffers(gl);
	if (n < 0) {
		console.log('Failed to set the positions of the vertices');
		return;
	}

	// Get the storage locations of u_ViewMatrix and u_ProjMatrix
	var u_ViewMatrix = gl.getUniformLocation(gl.program,'u_ViewMatrix');
	var u_ProjMatrix = gl.getUniformLocation(gl.program,'u_ProjMatrix');

	if (u_ViewMatrix < 0) {
	    console.log('Failed to get the storage location of u_ViewMatrix');
	    return;
	}

	if (u_ProjMatrix < 0) {
	    console.log('Failed to get the storage location of u_ProjMatrix');
	    return;
	}

	//var viewMatrix = new Matrix4(); // The view matrix
	var projMatrix = new Matrix4(); // The projection matrix
	// Calculate the view and projection matrix
	viewMatrix.setLookAt(0, 0, 15, 0, 0, -1, 0, 1, 0);
	projMatrix.setPerspective(15, canvas.width/canvas.height, 1, 1000);
	
	// Pass The view matrix and projection matrix to u_ViewMatrix and u_ProjMatrix
	gl.uniformMatrix4fv(u_ViewMatrix, false, viewMatrix.elements);
	gl.uniformMatrix4fv(u_ProjMatrix, false, projMatrix.elements);

	// Para liberar el canvas
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
  
    // Para que lo de delante tape lo de detrás
	gl.enable(gl.DEPTH_TEST);
	
	draw(gl);

	canvas.onkeydown = function(ev){ keydown(ev, gl, n, u_ViewMatrix,viewMatrix); };

	// Register function (event handler) to be called on a mouse press
    canvas.onmousemove = function(ev) { alert('se miueveo'); };
}


function initVertexBuffers(gl) {
	var verticesColors = new Float32Array([

	0.75, 1.0, 0.0, 0.4, 0.4, 1.0, // The blue triangle in front
	0.25, -1.0, 0.0, 0.4, 0.4, 1.0,
	1.25, -1.0, 0.0, 1.0, 0.4, 0.4,
	// Three triangles on the right side
	0.75, 1.0, -4.0, 0.4, 1.0, 0.4, // The green triangle in back
	0.25, -1.0, -4.0, 0.4, 1.0, 0.4,
	1.25, -1.0, -4.0, 1.0, 0.4, 0.4,
	0.75, 1.0, -2.0, 1.0, 1.0, 0.4, // The yellow triangle in middle
	0.25, -1.0, -2.0, 1.0, 1.0, 0.4,
	1.25, -1.0, -2.0, 1.0, 0.4, 0.4,

	// Three triangles on the left side
	-0.75, 1.0, -4.0, 0.4, 1.0, 0.4, // The green triangle in back
	-1.25, -1.0, -4.0, 0.4, 1.0, 0.4,
	-0.25, -1.0, -4.0, 1.0, 0.4, 0.4,
	-0.75, 1.0, -2.0, 1.0, 1.0, 0.4, // The yellow triangle in middle
	-1.25, -1.0, -2.0, 1.0, 1.0, 0.4,
	-0.25, -1.0, -2.0, 1.0, 0.4, 0.4,
	-0.75, 1.0, 0.0, 0.4, 0.4, 1.0, // The blue triangle in front
	-1.25, -1.0, 0.0, 0.4, 0.4, 1.0,
	-0.25, -1.0, 0.0, 1.0, 0.4, 0.4,
	]);

	var n = 18; // Three vertices per triangle * 6

	// Create a buffer object
	var vertexBuffer = gl.createBuffer();
	if (!vertexBuffer) {
		console.log('Failed to create the buffer object of vertexes');
		return -1;
	}
	
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	
	// Write date into the buffer objects
	gl.bufferData(gl.ARRAY_BUFFER, verticesColors, gl.STATIC_DRAW);

	var FSIZE = verticesColors.BYTES_PER_ELEMENT;
	
	var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
	if (a_Position < 0) {
		console.log('Failed to get the storage location of a_Position');
		return;
	}

	var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
	if (a_Color < 0) {
		console.log('Failed to get the storage location of a_Color');
		return;
	}

	// Assign the buffer object to a_Position variable
	gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, FSIZE * 6, 0);
	// Enable the assignment to a_Position variable
	gl.enableVertexAttribArray(a_Position);

	// Assign the buffer object to a_Position variable
	gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 6, FSIZE*3);
	// Enable the assignment to a_Position variable
	gl.enableVertexAttribArray(a_Color);

	return n;
}

function keydown(ev, gl, n, u_ViewMatrix, viewMatrix) {
	if(ev.keyCode == 39) { // The right arrow key was pressed
		g_eyeX += 0.01;
	} else
	if (ev.keyCode == 37) { // The left arrow key was pressed
		g_eyeX -= 0.01;
	} else { return ; } // Prevent unnecessary drawing
	draw(gl, n, u_ViewMatrix, viewMatrix); // Draw a triangle
}

//function draw(gl){
	//// Draw the rectangles
	//gl.clear(gl.COLOR_BUFFER_BIT);
	//gl.clear(gl.DEPTH_BUFFER_BIT);
//	
	//gl.drawArrays(gl.TRIANGLES, 0, n);
//
//}