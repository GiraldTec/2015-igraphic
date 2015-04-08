// HelloTriangle.js
// Vertex shader program
var VSHADER_SOURCE =
'attribute vec4 a_Position;\n' +
'void main() {\n' +
' gl_Position = a_Position;\n' +
' gl_PointSize = 10.0;\n' +
'}\n';

// Fragment shader program
var FSHADER_SOURCE =
'void main() {\n' +
' gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
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

	// Set the positions of vertices
	var n = initVertexBuffers(gl);
	if (n < 0) {
		console.log('Failed to set the positions of the vertices');
		return;
	}

	// Register function (event handler) to be called on a mouse press
	canvas.onmousedown = function(ev) { click(ev, gl, canvas, n); };

	// Set the color for clearing <canvas>
	gl.clearColor(0.0, 0.0, 0.0, 1.0);


}


function initVertexBuffers(gl) {
	var vertices = new Float32Array([
	0.5, 0.0, 0.0, 0.5, -0.5, 0.5, -0.5, 0.0, 0.0, -0.5, 0.5, -0.5
	]);
	var n = 6; // The number of vertices

	// Create a buffer object
	var vertexBuffer = gl.createBuffer();
	if (!vertexBuffer) {
		console.log('Failed to create the buffer object of vertexes');
		return -1;
	}

	// Bind the buffer object to target
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	
	// Write date into the buffer objects
	gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
	var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
	if (a_Position < 0) {
		console.log('Failed to get the storage location of a_Position');
		return;
	}

	// Assign the buffer object to a_Position variable
	gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
	// Enable the assignment to a_Position variable
	gl.enableVertexAttribArray(a_Position);

	return n;
}

var mode = 0;

function click(ev, gl, canvas, n) {
	// Clear <canvas>
	gl.clear(gl.COLOR_BUFFER_BIT);

	switch(mode) {
	    case 1:
	        // Draw a triangle
			gl.drawArrays(gl.LINES, 0, n);
	        break;
	    case 2:
	        // Draw a triangle
			gl.drawArrays(gl.LINE_STRIP, 0, n);
	        break;
	    case 3:
	        // Draw a triangle
			gl.drawArrays(gl.LINE_LOOP, 0, n);
	        break;
	    case 4:
	        // Draw a triangle
			gl.drawArrays(gl.TRIANGLES, 0, n);
	        break;
	    case 5:
	        // Draw a triangle
			gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
	        break;
	    case 6:
	        // Draw a triangle
			gl.drawArrays(gl.TRIANGLE_FAN, 0, n);
	        break;
	    default:
	   		// Draw a triangle
			gl.drawArrays(gl.POINTS, 0, n);
			break;
	}

	mode++;
	mode = mode % 7;
}