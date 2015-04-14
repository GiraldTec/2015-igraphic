// MultiAttributeColor.js
// Vertex shader program
var VSHADER_SOURCE =
	'attribute vec4 a_Position;\n' +
	'attribute vec4 a_Color;\n' +
	'varying vec4 v_Color;\n' + // varying variable
	'void main() {\n' +
	' gl_Position = a_Position;\n' +
	' gl_PointSize = 10.00;\n' +
	' v_Color = a_Color;\n' + // Pass the data to the fragment shader
	'}\n';

// Fragment shader program
var FSHADER_SOURCE =
	'precision mediump float;\n' +
	'varying vec4 v_Color;\n' +
	'void main() {\n' +
	' gl_FragColor = v_Color;\n' + // Receive the data from the vertex shader
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

	// Initialize shaders
	if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
		console.log('Failed to initialize shaders.');
		return;
	}

	// Set vertex coordinates and color
	var n = initVertexBuffers(gl);
	if (n < 0) {
		console.log('Failed to set the positions of the vertices');
		return;
	}

    // Set the color for clearing <canvas>
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    // Clear <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Draw a triangle
	gl.drawArrays(gl.TRIANGLES, 0, n);
}

function initVertexBuffers(gl) {
	var verticesColors = new Float32Array([ // Vertex coordinates and color
	0.0, 0.5, 1.0, 0.0, 0.0,
	-0.5, -0.5, 0.0, 1.0, 0.0,
	0.5, -0.5, 0.0, 0.0, 1.0,
	]);
	var n = 3; // The number of vertices
	
	// Create a buffer object
	var vertexColorBuffer = gl.createBuffer();
	if (!vertexColorBuffer) {
		console.log('Failed to create the buffer object of vertexes and colors');
		return -1;
	}

	// Write the vertex coordinates and colors to the buffer object
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, verticesColors, gl.STATIC_DRAW);
	var FSIZE = verticesColors.BYTES_PER_ELEMENT;
	

	// Get the storage location of a_Position, allocate buffer, & enable
	var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
	if (a_Position < 0) {
		console.log('Failed to get the storage location of a_Position');
		return;
	}

	gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 5, 0);
	gl.enableVertexAttribArray(a_Position); // Enable buffer assignment
	
	// Get the storage location of a_Color, assign buffer, and enable
	var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
	if (a_Color < 0) {
		console.log('Failed to get the storage location of a_Color');
		return;
	}
	gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE*5, FSIZE*2);
	gl.enableVertexAttribArray(a_Color); // Enable buffer allocation
	
	return n;
}