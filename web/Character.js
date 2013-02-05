var Character = function(parent){
	if(typeof(parent) == "undefined"){
		return;
	}
	this.x = 128;
	this.y = 128;
	this.parent = parent;
	this.elm = $("<div>").addClass("character");
	this.elm.append('<div style="position:absolute;top:-5px;left:-5px;background:red;width:10px;height:10px;"/>');

	this.elm.css("width","128px").css("height","128px").css("position","absolute");
	this.setPosition(200, 100);
	this.parent.append(this.elm);

	this.positionListenerList = [];
};

Character.prototype.addPositionListener = function(listener){
	this.positionListenerList.push(listener);
};

Character.prototype.setPosition = function(x, y){
	this.x = parseFloat(x);
	this.y = parseFloat(y);
	this.elm.css("left", Math.round(x) + "px");
	this.elm.css("top", Math.round(y) + "px");
	/*this.elm.css("z-index", Math.round(20 * (y - Player.MIN_Y) / (Player.MAX_Y - Player.MIN_Y)));
	for(var i = 0; i  < this.positionListenerList.length; i++){
		this.positionListenerList[i](this.x, this.y);
	}*/
};
Character.prototype.moveTo = function(x, y){
	var _this = this;
	if(this.animHandler){
		this.animHandler.stop(false, false);
	}
	this.animHandler = $.ease({
		x: this.x,
		y: this.y
	}, {
		x: x, 
		y: y
	}, function(o){
		_this.setPosition(o.x, o.y);
	},
	{
		easing: "easeOutCirc",
		duration: 100
	});
};
Character.prototype.move = function(x, y){
//	if(Math.abs(x) + Math.abs(y) > 15){
//		this.moveTo(this.x + x, this.y + y);
//	}else{
		if(this.controlMove(this.y , y, this.x , x))
			this.setPosition(this.x + x, this.y + y);
		else if(this.controlMove(this.y , 0, this.x , x))
			this.setPosition(this.x + x, this.y);
		else if(this.controlMove(this.y , y, this.x , 0))
			this.setPosition(this.x, this.y + y);
//	}
};

Character.prototype.controlMove = function(x,dx,y,dy)
{
	var a = Math.floor( (x) /64);
	var b = Math.floor( (y) /64);
	
	var i = Math.floor( (x+dx) /64);
	
	var j = Math.floor( (y+dy) /64);

	console.log("actual : "+ a + ':'+ b);
	console.log("control : "+ i + ':'+ j);
	if(i < tab.length && i>=0)
		if(j< tab[i].length && j >=0)
			if(tab[i][j] == 0)
				return true;
	return false;
}


