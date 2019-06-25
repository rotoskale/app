var gGmame;
var gTimerDIV;
var gCanvas;
var gCanvasDiv;
var gInputsDiv;
var gScale    = document.getElementById('scale');
var gRotation = document.getElementById('rotation');
/* A deplacer dans l'init., basé sur la largeur de l'écran. Responsive stylee BB */
var gameWidth = 200;
var gameHeight = 200;
var gameMargin = 20; //marge pour al generation des points. ie. les points ne peuvent pas etre à moins de 20px d'un bord.	

function startGame() {
	
	gCanvasDiv = document.getElementById("gameview");
	var gInputsDiv = document.getElementById("inputs");
	
	document.getElementById('letsgo').addEventListener("click", bclick);
	
    gCanvas = document.createElement("canvas");
	gCanvas.width = gameWidth;
	gCanvas.height = gameHeight;
	gCanvas.className = "game";
	ctx = gCanvas.getContext("2d");
	gCanvasDiv.appendChild(gCanvas);
	
	gGame = new Game();
	gTimerDIV = document.getElementById('gametimer')
}

function bclick() {
	
	gGame.start();
	/*
	//alert(pointStart.x);
	var tScale    = document.getElementById('scale').value;
	var tRotation = document.getElementById('rotation').value;
	
	//alert(tRotation);
	
	var tmp_rot_point = getRotatedPoint(tRotation);
	drawPoint(ctx, tmp_rot_point);

	var finalPoint = getScaledPoint(tmp_rot_point, tScale);
	drawPoint(ctx, finalPoint);
	*/
}

/** MAIN GAME CLASSES ========================================= **/
function Game() {
    this.score = 0;		//on commence avec un score à zéro
    this.level = 1;		//on commence au niveau 1
	this.running = 0; 	//par defaut il n'est pas lancé
	
    this.start = function() {
		gTimerDIV.innerText = "pause";
		
		timeLeft = 10;
		//gCanvas.background-color = rgb(255,0,0);
		//gCanvas.setAttribute('background-color', "#FF0000");
		
		this.generateRound();
		var timerId = setInterval(countdown, 1000);
		
		function countdown() {
			gCanvas.style.background = 'rgb('+(255/10)*timeLeft+','+ (255/10)*timeLeft + ',' + (255/10)*timeLeft + ')'; 
			if (timeLeft == 0) {
				gTimerDIV.innerText = "DONE!";
				clearTimeout(timerId);
				//doSomething();
			} 
			else {
				gTimerDIV.innerText = timeLeft;
				timeLeft--;
			}	
		};
    };	
};
Game.prototype.generateRound = function() {
    pointOrigin = new Point(gameWidth/2, gameHeight/2, "#F17F42");
	pointStart = new Point(Math.floor(gameMargin + (Math.random() * (gameWidth-(2*gameMargin))) + 1),gameMargin + Math.floor((Math.random() * (gameHeight - (2*gameMargin))) + 1), "red");
	pointGoal = new Point(Math.floor(gameMargin + (Math.random() * (gameWidth-(2*gameMargin))) + 1),gameMargin + Math.floor((Math.random() * (gameHeight - (2*gameMargin))) + 1), "green");
	drawPoint(ctx, pointOrigin);	
	drawPoint(ctx, pointStart);	
	drawPoint(ctx, pointGoal);	
	
	drawArrow(ctx, pointOrigin, pointStart, "red", 2);
	drawArrow(ctx, pointOrigin, pointGoal, "green", 2);
}
/** Exemple pour ajouter une fonction après coup */
/*
Hero.prototype.greet = function() {
    return `${this.score} says hello.`;
}
*/
/** MAIN GAME CLASSES (end) ==================================== **/


/** HELPER FUNCTIONS **/
function getRotatedPoint(pRotation) {
	
    var radians = (Math.PI / 180) * pRotation;
	cos = Math.cos(radians);
	sin = Math.sin(radians);
	var nx = (cos * (pointStart.x - pointStart.x)) + (sin * (pointStart.y -  pointStart.y)) + pointStart.x;
	var ny = (cos * (pointStart.y -  pointStart.y)) - (sin * (pointStart.x - pointStart.x)) +  pointStart.y;
	
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


