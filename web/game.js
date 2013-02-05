window.requestAnimFrame = (function() {
	  return window.requestAnimationFrame ||
	         window.webkitRequestAnimationFrame ||
	         window.mozRequestAnimationFrame ||
	         window.oRequestAnimationFrame ||
	         window.msRequestAnimationFrame ||
	         function(callback, element) {
	           window.setTimeout(callback, 1000/60);
	         };
})();

var terrain = [ [ 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 2, 0, 1, 2, 1, 0 ],
		[ 0, 0,0, 0, 1, 2, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2 ],
		[ 0, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 0, 0, 0, 0, 0 ] ];

var tab = [ [ 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 2, 0, 1, 2, 1, 0 ],
		[ 0, 0,0, 0, 1, 2, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2 ],
		[ 0, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 0, 0, 0, 0, 0 ] ];

$(document).ready(function() {
	var game = $("#start");
	for ( var i = 0; i < tab.length; i++) {
		for ( var e = 0; e < tab[i].length; e++) {
			var t = $("<div/>").css("width", "64px").css("height",
					"64px").css("background", "url(grass.jpg)").css(
					"position", "absolute").css("top", i * 64 + 'px')
					.css("left", e * 64 + 'px');
			game.append(t);

			switch (tab[i][e]) {
			case 0:
				break;
			case 1:
				var o = $("<img/>").css("width", "64px").css("height",
						"64px").attr("src", "bush1.png").css(
						"position", "absolute").css("top", 0 + 'px')
						.css("left", 0 + 'px');

				t.append(o);
				break;
			case 2:
				var k = $("<img/>").css("width", "64px").css("height",
						"64px").attr("src", "rock2f.png").css(
						"position", "absolute").css("top", 0 + 'px')
						.css("left", 0 + 'px');
				t.append(k);
				break;
			}
		}
	}

	var p = new Player(game);
	
	localTime = 0;
	globalTime = 0;
	requestAnimFrame(function loop() {
		var now = Date.now();
		var globalTimeDelta = now - globalTime;
		var localTimeDelta = Math.min(50, globalTimeDelta);
		localTime += localTimeDelta;

		p.update(localTimeDelta / 1000);
		
		requestAnimFrame(loop);
	});
});
