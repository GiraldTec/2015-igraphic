function draw(gl){
	// Draw the rectangles
	gl.clear(gl.COLOR_BUFFER_BIT);
	gl.clear(gl.DEPTH_BUFFER_BIT);
	
	gl.drawArrays(gl.TRIANGLES, 0, n);

}