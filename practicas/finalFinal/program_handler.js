// Program Handler

function ProgramHandler (gl) {

	this.flat = flatProgram(gl, VSHADER_FLAT, FSHADER_FLAT);
  this.multinormal = multinormalProgram(gl, VSHADER_MULTINORMAL, FSHADER_MULTINORMAL);

}


function flatProgram(gl, vs, fs){

  var prog = createProgram(gl, vs, fs);
  prog.a_Position = gl.getAttribLocation(prog, 'a_Position');
  prog.u_Normal = gl.getUniformLocation(prog, 'u_Normal');
  prog.u_color = gl.getUniformLocation(prog, 'u_Color');
  prog.u_MvpMatrix = gl.getUniformLocation(prog, 'u_MvpMatrix');
  prog.u_ModelMatrix = gl.getUniformLocation(prog, 'u_ModelMatrix');
  prog.u_NormalMatrix = gl.getUniformLocation(prog, 'u_NormalMatrix');
  if ( prog.a_Position < 0 || !prog.u_Normal || !prog.u_color || !prog.u_MvpMatrix || !prog.u_ModelMatrix || !prog.u_NormalMatrix ){
    console.log('Failed to get the storage location of attribute or uniform variable from prog'); 
    return undefined;
  }

  return prog;
}

function multinormalProgram(gl, vs, fs){

  var prog = createProgram(gl, vs, fs);
  prog.a_Position = gl.getAttribLocation(prog, 'a_Position');
  prog.a_Normal = gl.getAttribLocation(prog, 'a_Normal');
  prog.u_color = gl.getUniformLocation(prog, 'u_Color');
  prog.u_MvpMatrix = gl.getUniformLocation(prog, 'u_MvpMatrix');
  prog.u_ModelMatrix = gl.getUniformLocation(prog, 'u_ModelMatrix');
  prog.u_NormalMatrix = gl.getUniformLocation(prog, 'u_NormalMatrix');
  if ( prog.a_Position < 0 || prog.a_Normal < 0 || !prog.u_color || !prog.u_MvpMatrix || !prog.u_ModelMatrix || !prog.u_NormalMatrix ){
    console.log('Failed to get the storage location of attribute or uniform variable from multinormal '); 
    return undefined;
  }

  return prog;
}




