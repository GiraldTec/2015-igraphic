// Program Handler

function ProgramHandler (gl) {

	this.basic = basicProgram(gl, VSHADER_SOURCE, FSHADER_SOURCE);

}


function basicProgram(gl, vs, fs){

  var prog = createProgram(gl, vs, fs);
  prog.a_Position = gl.getAttribLocation(prog, 'a_Position');
  prog.u_Normal = gl.getUniformLocation(prog, 'u_Normal');
  prog.u_color = gl.getUniformLocation(prog, 'u_color');
  prog.u_MvpMatrix = gl.getUniformLocation(prog, 'u_MvpMatrix');
  prog.u_ModelMatrix = gl.getUniformLocation(prog, 'u_ModelMatrix');
  prog.u_NormalMatrix = gl.getUniformLocation(prog, 'u_NormalMatrix');
  if (!prog.a_Position || !prog.u_Normal || !prog.u_color || !prog.u_MvpMatrix || !prog.u_ModelMatrix || !prog.u_NormalMatrix ) {
    console.log('Failed to get the storage location of attribute or uniform variable from prog'); 
    return undefined;
  }

  return prog;
}






