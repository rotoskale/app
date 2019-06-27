var gGmame;
var gTimerDIV;
var gCanvas;
var gCanvasDiv;
var gInputsDiv;
var gScale;   
var gRotation;

var ginfoScore;
var ginfoRotate;
var ginfoScale;

/* A deplacer dans l'init., basé sur la largeur de l'écran. Responsive stylee BB */
var gameWidth = 200;
var gameHeight = 200;
var gameMargin = 20; //marge pour al generation des points. ie. les points ne peuvent pas etre à moins de 20px d'un bord.	
var gRoundTime = 5;

function startGame() {
	
	gScale    = document.getElementById('scaleRange');
	gRotation = document.getElementById('rotateRange');
	
	gCanvasDiv = document.getElementById("gameview");
	var gInputsDiv = document.getElementById("inputs");
	
	document.getElementById('letsgo').addEventListener("click", bclick);
	
	/* footer bébé ! */
	document.getElementById('footer').innerHTML = "[v 0.1 pre-alpha - 1978 - 2039 &copy;Nobody  since it\'s <a href='https://unlicense.org/'>Unlicensed</a>]";
	
	
    gCanvas = document.createElement("canvas");
	gCanvas.width = gameWidth;
	gCanvas.height = gameHeight;
	gCanvas.className = "game";
	ctx = gCanvas.getContext("2d");
	gCanvasDiv.appendChild(gCanvas);
	
	gGame = new Game();
	gTimerDIV = document.getElementById('gametimer');
	
	document.getElementById("scaleRange").addEventListener("input", function(e) {
		e.preventDefault();
		var msg = document.getElementById("scaleRange").value.trim();
		if (msg) {
			document.getElementById("infoScale").innerText = "Scale: "+ parseInt(msg)/10;
		}
	}, false);
	
	document.getElementById("rotateRange").addEventListener("input", function(e) {
		e.preventDefault();
		var msg = document.getElementById("rotateRange").value.trim();
		if (msg) {
			document.getElementById("infoRotate").innerText = "Rotate: " + msg;
		}
	}, false);
	
}

function bclick() {
	gGame.start();
}




/** MAIN GAME CLASSES ========================================= **/
function Game() {
    this.score = 0;		//on commence avec un score à zéro
    this.level = 1;		//on commence au niveau 1
	this.running = 0; 	//par defaut il n'est pas lancé
	
    this.start = function() {
		gTimerDIV.innerText = "get ready";
		timeLeft = 10;
		this.generateRound();
		document.getElementById('letsgo').disabled = true;
		gScale.disabled = false;
		gScale.disabled = false;
		
		var timerId = setInterval(countdown, 1000);
		
		function countdown() {
			gCanvas.style.background = 'rgb('+(255/10)*timeLeft+','+ (255/10)*timeLeft + ',' + (255/10)*timeLeft + ')'; 
			if (timeLeft == 0) {
				gTimerDIV.innerText = "DONE!";
				clearTimeout(timerId);
				
				document.getElementById('letsgo').disabled = false;
				gScale.disabled = true;
				gScale.disabled = true;	

				getScore();
			} 
			else {
				gTimerDIV.innerText = timeLeft;
				timeLeft--;
			}	
		};
    };	
};
Game.prototype.generateRound = function() {
	
	//Lavement!
	ctx.clearRect(0, 0, gCanvas.width, gCanvas.height);
	
    pointOrigin = new Point(gameWidth/2, gameHeight/2, "#F17F42");
	pointStart = new Point(Math.floor(gameMargin + (Math.random() * (gameWidth-(2*gameMargin))) + 1),gameMargin + Math.floor((Math.random() * (gameHeight - (2*gameMargin))) + 1), "red");
	pointGoal = new Point(Math.floor(gameMargin + (Math.random() * (gameWidth-(2*gameMargin))) + 1),gameMargin + Math.floor((Math.random() * (gameHeight - (2*gameMargin))) + 1), "green");
	drawPoint(ctx, pointOrigin);	
	drawPoint(ctx, pointStart);	
	drawPoint(ctx, pointGoal);	
	
	drawArrow(ctx, pointOrigin, pointStart, "red", 2);
	drawArrow(ctx, pointOrigin, pointGoal, "green", 2);
}

//TODO: ressortir les points en global sinon on perd l'info pour calculer la distance.
function getScore() {
	var tmp_rot_point = getRotatedPoint(gRotation.value);
	drawPoint(ctx, tmp_rot_point);
	var finalPoint = getScaledPoint(tmp_rot_point, gScale.value);
	drawPoint(ctx, finalPoint);
	return getDistance(
}


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
	ctx.arc(point.x, point.y, 2, 0, 2 * Math.PI, true);
	ctx.fillStyle = point.color;
	ctx.fill();
}

function drawArrow(ctx, point1, point2, color, width) {
	ctx.beginPath();
	ctx.strokeStyle=color;
	ctx.lineWidth = width;
	var headlen = 6;   // length of head in pixels
    var angle = Math.atan2(point2.y-point1.y, point2.x-point1.x);
    ctx.moveTo(point1.x, point1.y);
    ctx.lineTo(point2.x, point2.y);
	ctx.stroke();	
}

/* OK */
function getDistance(pointA, pointB) {
	return Math.sqrt( (pointA.x-pointB.x)*(pointA.x-pointB.x) + (pointA.y-pointB.y)*(pointA.y-pointB.y) );
}


