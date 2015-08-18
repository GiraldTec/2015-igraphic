function Dungeon (){
	this.rows = 0;
	this.cols = 0;
	this.map = [];
	this.zones = [];
	this.start = '';
}

var escala = 0.50;

function Zone (coordX,coordY) {
	this.x = coordX*1.0*escala;
	this.z = coordY*1.0*escala;
	this.y = 0.0*escala;
	this.color = [0.4,  1.0,  0.4];

	var uno = 1*escala;
	this.vertex_floor = [];
	this.vertex_floor[0] = [this.x,this.y,this.z].concat(this.color);
	this.vertex_floor[1] = [this.x+uno,this.y,this.z].concat(this.color);
	this.vertex_floor[2] = [this.x,this.y,this.z+uno].concat(this.color);
	this.vertex_floor[3] = [this.x+uno,this.y,this.z+uno].concat(this.color);

	this.getFloor = getZoneFloor;
}

function getZoneFloor(){
	res=[];
	res = res.concat(this.vertex_floor[0].concat(this.vertex_floor[2]).concat(this.vertex_floor[1]));
	res = res.concat(this.vertex_floor[1].concat(this.vertex_floor[2]).concat(this.vertex_floor[3]));
	//res = res.concat([this.vertex_floor[1],this.vertex_floor[2],this.vertex_floor[3]]);
	return res;
}
function makeZone_Deprecated(xCoord,yCoord,maxR,maxC,map){
	var cell = map[yCoord][xCoord];
	var zoneStats = cell.split('-');
	if (zoneStats[0]!='0' && zoneStats[1]!='0' && zoneStats[2]!='0'){
		var zone = {
			x : '',
			y : '',
			type_floor : '',
			type_ceiling : '',
			type_wall : '',

			vertex_floor : {},
			vertex_ceiling : {},

			vertex_n_wall : {},
			vertex_s_wall : {},
			vertex_w_wall : {},
			vertex_e_wall : {},

			has_north_wall : 'yes',
			has_south_wall : 'yes',
			has_west_wall : 'yes',
			has_east_wall : 'yes'
		}
		zone['type_floor'] = zoneStats[0];
		zone['type_ceiling'] = zoneStats[1];
		zone['type_wall'] = zoneStats[2];

		zone['x'] = xCoord;
		zone['y'] = yCoord;

		if(xCoord-1>=0 && map[yCoord][xCoord-1].split('-')[0] != 0) zone['has_west_wall']='no';
		if(xCoord+1<maxC && map[yCoord][xCoord+1].split('-')[0] != 0) zone['has_east_wall']='no';
		if(yCoord-1>=0 && map[yCoord-1][xCoord].split('-')[0] != 0) zone['has_north_wall']='no';
		if(yCoord+1<maxR && map[yCoord+1][xCoord].split('-')[0] != 0) zone['has_south_wall']='no';


		zone['vertex_floor'] = makeFloorVerTex(zone);
		zone['vertex_ceiling'] = makeCeilingVerTex(zone);
		if(zone['has_north_wall']=='yes') zone['vertex_n_wall'] = makeWallVerTex('has_north_wall',zone);
		if(zone['has_south_wall']=='yes') zone['vertex_s_wall'] = makeWallVerTex('has_south_wall',zone);
		if(zone['has_west_wall']=='yes') zone['vertex_w_wall'] = makeWallVerTex('has_west_wall',zone);
		if(zone['has_east_wall']=='yes') zone['vertex_e_wall'] = makeWallVerTex('has_east_wall',zone);

		if(zone['type_floor']==3)
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
			var ijZone = new Zone(j,i);
			if(map[i][j]!=0){
				dungeon.zones[cont] = ijZone;
				cont++;
			}
		}
	}
}

function loadDungeonFile(file) {
  var lines = file.split('\n');
  dungeon = new Dungeon();
  dungeon.rows = lines.length;
  for(var i = 0; i < lines.length; i++){
  	var line = lines[i].split(':');
  	if(i==0)dungeon.cols = line.length;
		dungeon.map[i] = line;
		// crear objeto de Mazmorra
  }
  window.alert(dungeon.map);
  makeZones(dungeon['rows'],dungeon['cols'],dungeon['map']);
  vectors = [];
  for(i=0; i<dungeon.zones.length; i++){
  	var zoneI = dungeon.zones[i];
  	vectors = vectors.concat(zoneI.getFloor());
  }
  window.alert(vectors.length);

  return vectors;
}
