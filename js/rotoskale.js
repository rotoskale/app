function startGame() {
	gameWidth = 200;
	gameHeight = 200;
	gameMargin = 20; //marge pour al generation des points. ie. les points ne peuvent pas etre à moins de 20px d'un bord.
	
	var canvasDiv = document.getElementById("gameview");
	var inputsDiv = document.getElementById("inputs");
	
	document.getElementById('letsgo').addEventListener("click", bclick);
	
    var canvas = document.createElement("canvas");
	canvas.width = gameWidth;
	canvas.height = gameHeight;
	canvas.className = "game";
	ctx = canvas.getContext("2d");
	canvasDiv.appendChild(canvas);
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

/** MAIN GAME CLASSES ========================================= **/
class cGame {
    constructor(timer, canvas) {
        this.timer = timer;
		this.canvas = canvas;
        this.round = 0;
        this.score = 0;
    }

    start() {
        return this.make + " " + this.model;
    }	
}

/** MAIN GAME CLASSES (end) ==================================== **/


/** HELPER FUNCTIONS **/
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

/* OK */
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

/* OK */
function getDistance(pointA, pointB) {
	return Math.sqrt( (pointA.x-pointB.x)*(pointA.x-pointB.x) + (pointA.y-pointB.y)*(pointA.y-pointB.y) );
}


