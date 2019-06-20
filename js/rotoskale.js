function startGame() {
	gameWidth = 200;
	gameHeight = 200;
	gameMargin = 20; //marge pour al generation des points. ie. les points ne peuvent pas etre à moins de 20px d'un bord.
	
	var debugTB1 = document.getElementById('debug1');
	var debugTB2 = document.getElementById('debug2');
	var debugTB3 = document.getElementById('debug3');
	var debugTB4 = document.getElementById('debug4');
	var debugTB5 = document.getElementById('debug5');
	
	var canvasDiv = document.getElementById("gameview");
	var inputsDiv = document.getElementById("inputs");
	
	document.getElementById('letsgo').addEventListener("click", bclick);
	
    var canvas = document.createElement("canvas");
	canvas.width = gameWidth;
	canvas.height = gameHeight;
	canvas.className = "game";
	ctx = canvas.getContext("2d");
	//document.body.insertBefore(canvas, document.body.childNodes[0]);
	canvasDiv.appendChild(canvas);
	
	pointStart = new Point(Math.floor(gameMargin + (Math.random() * (gameWidth-(2*gameMargin))) + 1),gameMargin + Math.floor((Math.random() * (gameHeight - (2*gameMargin))) + 1), "#F17F42");
	pointEnd = new Point(Math.floor(gameMargin + (Math.random() * (gameWidth-(2*gameMargin))) + 1),gameMargin + Math.floor((Math.random() * (gameHeight - (2*gameMargin))) + 1), "#ce6d39");
	pointGoal = new Point(Math.floor(gameMargin + (Math.random() * (gameWidth-(2*gameMargin))) + 1),gameMargin + Math.floor((Math.random() * (gameHeight - (2*gameMargin))) + 1), "black");
	
	drawPoint(ctx, pointStart);
	drawPoint(ctx, pointEnd);
	drawPoint(ctx, pointGoal);
	
	drawArrow(ctx, pointStart, pointEnd, "red", 2);
	drawArrow(ctx, pointStart, pointGoal, "green", 2);
	
	var d1 = getDistance(pointStart, pointEnd);
	writeDebug(debugTB1, "Distance initiale:"+d1);
	
	var d2 = getDistance(pointStart, pointGoal);
	writeDebug(debugTB2, "Distance finale:"+d2+" ratio:"+(d2/d1));	
}

function bclick() {
	//alert(pointStart.x);
	var tScale    = document.getElementById('scale').value;
	var tRotation = document.getElementById('rotation').value;
	
	//alert(tRotation);
	
	var tmp_rot_point = getRotatedPoint(tRotation);
	drawPoint(ctx, tmp_rot_point);

	var finalPoint = getScaledPoint(tmp_rot_point, tScale);
	drawPoint(ctx, finalPoint);
}

function getRotatedPoint(pRotation) {
	
    var radians = (Math.PI / 180) * pRotation;
	cos = Math.cos(radians);
	sin = Math.sin(radians);
	var nx = (cos * (pointEnd.x - pointStart.x)) + (sin * (pointEnd.y -  pointStart.y)) + pointStart.x;
	var ny = (cos * (pointEnd.y -  pointStart.y)) - (sin * (pointEnd.x - pointStart.x)) +  pointStart.y;
	
    return new Point(nx,ny,"#FFFF00");
}

function getScaledPoint(tmpPoint, pScale) {
	var nx = pointStart.x + ((tmpPoint.x - pointStart.x)*pScale);
	var ny = pointStart.y + ((tmpPoint.y - pointStart.y)*pScale);
	
	return new Point(nx,ny,"#00FFFF"); 
}

//un bien beau point...
function Point(x, y, color) {
  this.x = x;
  this.y = y;
  this.color = color;
}

function drawPoint(ctx, point) {
	ctx.beginPath();
	ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI, true);
	ctx.fillStyle = point.color;
	ctx.fill();
}

function drawArrow(ctx, point1, point2, color, width) {
	ctx.beginPath();
	var gradient=ctx.createLinearGradient(point1.x, point1.y, point2.x, point2.y);
	gradient.addColorStop("0","black");

	gradient.addColorStop("1.0",color);
	ctx.strokeStyle=gradient;
	ctx.lineWidth = width;

	var headlen = 6;   // length of head in pixels
    var angle = Math.atan2(point2.y-point1.y, point2.x-point1.x);
    ctx.moveTo(point1.x, point1.y);
    ctx.lineTo(point2.x, point2.y);
    ctx.lineTo(point2.x-headlen*Math.cos(angle-Math.PI/6),point2.y-headlen*Math.sin(angle-Math.PI/6));
    ctx.moveTo(point2.x, point2.y);
    ctx.lineTo(point2.x-headlen*Math.cos(angle+Math.PI/6),point2.y-headlen*Math.sin(angle+Math.PI/6));	
	ctx.stroke();	
}

function getDistance(pointA, pointB) {
	return Math.sqrt( (pointA.x-pointB.x)*(pointA.x-pointB.x) + (pointA.y-pointB.y)*(pointA.y-pointB.y) );
}

function writeDebug(pTextbox, pMessage) {
	pTextbox.value = pMessage;
}

//Math.floor((Math.random() * 10) + 1);
