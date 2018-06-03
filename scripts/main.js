var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var pause = document.getElementById("pause");
var reset = document.getElementById("reset");
var button ;
var isPaused = false;


var inter;
ctx.translate(0,canvas.height);
ctx.scale(1,-1);
var score = [0,0];
var noOfShots = [3,3];
var ballRadius = 5;
var x = [60, canvas.width-60];
var y = [70, 70];
var ux = [5, -5];
var uy = [5, 5];
var dx = [ux[0], ux[1]];
var dy = [uy[0], uy[1]];
var v = 12;
var isRunning = [false, false];
var t0 = [0, 0];
var playerNo = 0;
var wEdge = [canvas.width-20-80, 100];
var hEdge = [70, 70];
var isOver;

drawTank();
drawMount();
drawB(0);
drawB(1);
var cr = ["#0095DD", "#F5B041"]
alert("Press Screen to decide direction of shot. Player 1 goes first");
function drawBall(bno) {
	if(!isRunning[bno])
	{
		isRunning[bno] = true;
		t0[bno] = performance.now();
	}
    drawB(bno);
}

function draw() {
	
    ctx.fillStyle = "#F5DFDA";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    var sMessage = "Player 1: " + score[0] + ", Player 2: " + score[1]; 
    document.getElementById("demo").innerHTML = sMessage ;
    document.getElementById("cl").innerHTML = " No. of Shots Left : Player 1: " + noOfShots[0] + ", Player 2: " + noOfShots[1];
    drawBall(playerNo);
    drawTank();
    drawMount();
    isOver = false;
    if( ((playerNo == 0 && x[playerNo] + dx[playerNo] > wEdge[playerNo]) || (playerNo == 1 && x[playerNo] + dx[playerNo] < wEdge[playerNo] )) && y[playerNo] + dy[playerNo] < 70 )
    	{
    		score[playerNo]++;
    		var sMessage = "Player 1: " + score[0] + ", Player 2: " + score[1]; 
    		document.getElementById("demo").innerHTML = sMessage ;
    		document.getElementById("cl").innerHTML = " No. of Shots Left : Player 1 : " + noOfShots[0] + ", Player 2: " + noOfShots[1];
    		alert(sMessage);
        	resetScreen();
        	isOver = true;
    		
    		
    	}
    if(x[playerNo] + dx[playerNo] > canvas.width-ballRadius || x[playerNo] + dx[playerNo] < ballRadius) 
    {
        dx[playerNo] = -dx[playerNo];
    }
    if(y[playerNo] + dy[playerNo] < ballRadius) 
    {
        alert("BALL LOST");
       	resetScreen();
       	isOver = true;
    }
    else if(y[playerNo] + dy[playerNo] > canvas.height-ballRadius) {
 	          dy[playerNo] = -dy[playerNo];
    }

    if(isRunning[playerNo])
    {
	    var t = performance.now();
	    t = (t - t0[playerNo]) / 1000;
	    x[playerNo] += dx[playerNo];
	    y[playerNo] += dy[playerNo];
	    dy[playerNo] = Math.floor( uy[playerNo] - 9.81*t );
	    checkImpact();
	}
	

    if(noOfShots[1] == 0 && isOver == true)
			{
				if(score[0] > score[1])
					alert("GAME OVER: Player 1 Wins");
				else if(score[0] < score[1])
					alert("GAME OVER: Player 2 Wins");
				else
					alert("GAME OVER: Tie");
       		 	resetScreen();
    			noOfShots[0] = noOfShots[1] = 3;
    			score[0] = score[1] = 0;
    			resetScreen();
			}
	//var coords1 = "X coords: " + x[0] + " " + x[1] + ", Y coords: " + y[0] + " " + y[1] + " , Score: " + score[0] + " " + score[1] + " , Shots Left: " + noOfShots[0] + " " + noOfShots[1];
    //document.getElementById("demo").innerHTML = coords1;
}

canvas.addEventListener('click', function(e) 
{
	if(!isRunning[0] && !isRunning[1])
	{
		noOfShots[playerNo]--;
		var x1 = e.clientX;
		var y1 = e.clientY;
		var x0 = [68, 8 + canvas.width-20-40];
		var y0 = 477;
		if(playerNo == 0)
			var angleRad = Math.atan((y0-y1)/(x1-x0[playerNo]));
		else
			var angleRad = Math.atan(-1 * (y0-y1)/(x1-x0[playerNo]));
		ux[playerNo] = Math.floor(v * Math.cos(angleRad));
		uy[playerNo] = Math.floor(v * Math.sin(angleRad));
		if(playerNo == 0)
			dx[playerNo] = ux[playerNo];
		else
			dx[playerNo] = -1 * ux[playerNo];
		dy[playerNo] = uy[playerNo];
		//var coords = "X coords: " + x1 + ", Y coords: " + y1 + "Angle: " + angleRad*180/Math.PI;
	    //document.getElementById("cl").innerHTML = coords;
		inter = setInterval(draw, 10);
	}
});

canvas.addEventListener('mousemove', function(e) 
{
    var x11 = e.clientX;
    var y11 = e.clientY;
    //var coords11 = "X coords: " + x11 + ", Y coords: " + y11 ;
    //document.getElementById("coord").innerHTML = coords11;
});

function drawTank()
{
	ctx.fillStyle = "#3498DB";
	ctx.fillRect(20, 20, 80, 50);
	ctx.beginPath();
	ctx.fillStyle = "#F5B041";
	ctx.rect(canvas.width-20-80,20,80,50);
	ctx.fill();
	ctx.closePath();
}

function drawMount()
{
	ctx.beginPath();
	ctx.moveTo(174,canvas.height-547);
	ctx.lineTo(222,canvas.height-411);
	ctx.lineTo(256,canvas.height-432);
	ctx.lineTo(295,canvas.height-312);
	ctx.lineTo(313,canvas.height-320);
	ctx.lineTo(391,canvas.height-202);
	ctx.lineTo(465,canvas.height-162);
	ctx.lineTo(505,canvas.height-216);
	ctx.lineTo(560,canvas.height-298);
	ctx.lineTo(625,canvas.height-345);
	ctx.lineTo(648,canvas.height-439);
	ctx.lineTo(707,canvas.height-483);
	ctx.lineTo(748,canvas.height-547);
	ctx.closePath();
	ctx.fillStyle = "#283747";
	ctx.fill();

}

function checkImpact()
{
	ctx.beginPath();
	ctx.moveTo(174,canvas.height-547);
	ctx.lineTo(222,canvas.height-411);
	ctx.lineTo(256,canvas.height-432);
	ctx.lineTo(295,canvas.height-312);
	ctx.lineTo(313,canvas.height-320);
	ctx.lineTo(391,canvas.height-202);
	ctx.lineTo(465,canvas.height-162);
	ctx.lineTo(505,canvas.height-216);
	ctx.lineTo(560,canvas.height-298);
	ctx.lineTo(625,canvas.height-345);
	ctx.lineTo(648,canvas.height-439);
	ctx.lineTo(707,canvas.height-483);
	ctx.lineTo(748,canvas.height-547);
	if(ctx.isPointInPath(x[playerNo]+8,canvas.height-y[playerNo]))
	{
		alert("NO POINT");
       	resetScreen();
       	isOver = true;	
	}
}

function resetScreen()
{
	x[0] = 60;
	x[1] = canvas.width-60;	
	y[0] = y[1] = 70;
	isRunning[0] = isRunning[1] = false;
	clearInterval(inter);
	ctx.fillStyle = "#F5DFDA"
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	drawB(0);
	drawB(1);
	drawTank();
	drawMount();
	playerNo = (playerNo + 1) % 2;
}

function drawB(col) 
{
	ctx.beginPath();
	ctx.arc(x[col], y[col], ballRadius, 0, Math.PI*2);
	if(col == 0)
		ctx.fillStyle = "#0095DD";
	else
		ctx.fillStyle = "#F5B041";
	ctx.fill();
	ctx.closePath();
}

