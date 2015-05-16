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
			floor : '',
			ceiling : '',
			wall : '',
			north : 'yes',
			south : 'yes',
			west : 'yes',
			east : 'yes'
		}
		zone['floor'] = zoneStats[0];
		zone['ceiling'] = zoneStats[1];
		zone['wall'] = zoneStats[2];

		zone['x'] = xCoord;
		zone['y'] = yCoord;

		if(xCoord-1>=0 && map[yCoord][xCoord-1].split('-')[0] != 0) zone['west']='no';
		if(xCoord+1<maxC && map[yCoord][xCoord+1].split('-')[0] != 0) zone['east']='no';
		if(yCoord-1>=0 && map[yCoord-1][xCoord].split('-')[0] != 0) zone['north']='no';
		if(yCoord+1<maxR && map[yCoord+1][xCoord].split('-')[0] != 0) zone['south']='no';
		if(zone['floor']==3)
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