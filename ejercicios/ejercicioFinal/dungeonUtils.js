var dungeon = {
	rows : 0,
	cols : 0,
	map : {},
	zones : {},
	start :''
}

function makeZone(xCoord,yCoord,maxR,maxC,map){
	var cell = map[yCoord][xCoord];
	var zoneStats = cell.split('-');
	if (zoneStats[0]!='0' && zoneStats[1]!='0' && zoneStats[2]!='0'){
		var zone = {
			x : '',
			y : '',
			t_floor : '',
			t_ceiling : '',
			t_wall : '',
			m_floor : {},
			m_ceiling : {},
			m_n_wall : {},
			m_s_wall : {},
			m_w_wall : {},
			m_e_wall : {},
			north : 'yes',
			south : 'yes',
			west : 'yes',
			east : 'yes'
		}
		zone['t_floor'] = zoneStats[0];
		zone['t_ceiling'] = zoneStats[1];
		zone['t_wall'] = zoneStats[2];

		zone['x'] = xCoord;
		zone['y'] = yCoord;

		if(xCoord-1>=0 && map[yCoord][xCoord-1].split('-')[0] != 0) zone['west']='no';
		if(xCoord+1<maxC && map[yCoord][xCoord+1].split('-')[0] != 0) zone['east']='no';
		if(yCoord-1>=0 && map[yCoord-1][xCoord].split('-')[0] != 0) zone['north']='no';
		if(yCoord+1<maxR && map[yCoord+1][xCoord].split('-')[0] != 0) zone['south']='no';


		zone['m_floor'] = makeFloorMatrix(zone);
		zone['m_ceiling'] = makeCeilingMatrix(zone);
		if(zone['north']=='yes') zone['m_n_wall'] = makeWallMatrix('north',zone);
		if(zone['south']=='yes') zone['m_s_wall'] = makeWallMatrix('south',zone);
		if(zone['west']=='yes') zone['m_w_wall'] = makeWallMatrix('west',zone);
		if(zone['east']=='yes') zone['m_e_wall'] = makeWallMatrix('east',zone);

		if(zone['t_floor']==3)
			dungeon['start']={xCoord,yCoord};
		return zone;
	}else{
		return "no";
	}
}

function makeZones(maxR,maxC,map){
	var cont = 0;
	for (var i=0 ; i<maxR ; i++){
		for (var j=0 ; j<maxC ; j++){
			var ijZone = makeZone(j,i,maxR,maxC,map);
			if (ijZone!="no"){
				dungeon['zones'][cont] = ijZone;
				cont++;
			}
		}
	}
}

function loadDungeonFile(file) {
  var lines = file.split('\n');
  dungeon['rows'] = lines.length;
  for(var i = 0; i < lines.length; i++){
  	var line = lines[i].split(':');
  	if(i==0)dungeon['cols'] = line.length;
		dungeon['map'][i] = line;
		// crear objeto de Mazmorra
  }
  makeZones(dungeon['rows'],dungeon['cols'],dungeon['map']);
  var a = 2;
}


function makeFloorCoordColors(zone){
	var floor =  new Float32Array([
    // Vertex coordinates and color(RGBA)
    0.0, 0.0,  0.0,  0.4,  1.0,  0.4, 
    0.0, 1.0,  0.0,  0.4,  1.0,  0.4,
    1.0, 1.0,  0.0,  1.0,  0.4,  0.4, 
    1.0, 0.0,  0.0,  0.4,  1.0,  0.4]);
	return floor;
}

function makeCeilingCoordColors(zone){
	var floor =  new Float32Array([
    // Vertex coordinates and color(RGBA)
    0.0, 1.0,  0.0,  0.4,  1.0,  0.4,
    0.0, 0.0,  0.0,  0.4,  1.0,  0.4, 
    1.0, 0.0,  0.0,  0.4,  1.0,  0.4,
    1.0, 1.0,  0.0,  1.0,  0.4,  0.4]);
	return floor;
}

function makeWallCoordColors(card,zone){
	var floor =  new Float32Array([
    // Vertex coordinates and color(RGBA)
    0.0, 0.0,  1.0,  0.4,  1.0,  0.4,
    0.0, 0.0,  0.0,  0.4,  1.0,  0.4, 
    1.0, 0.0,  0.0,  0.4,  1.0,  0.4,
    1.0, 0.0,  1.0,  1.0,  0.4,  0.4]);
	return floor;
}