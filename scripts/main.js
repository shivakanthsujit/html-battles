var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var inter;
ctx.translate(0,canvas.height);
ctx.scale(1,-1);
var score = 0;
var noOfShots = 3;
var ballRadius = 5;
var x = 60;
var y = 70;
var ux = 5;
var uy = 5;
var dx = ux;
var dy = uy;
var v = 10;
var isRunning = false;
var t0 ;

drawTank();
drawMount();
drawB("#0095DD");

function drawBall() {
	if(!isRunning)
	{
		isRunning = true;
		t0 = performance.now();
	}
    drawB("#0095DD");
}

function draw() {
    ctx.fillStyle = "#F5DFDA";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawTank();
    drawMount();
    
    if( x + dx > canvas.width-20-80 && y + dy < 70 )
    	{
    		score++;
    		document.getElementById("demo").innerHTML = score;
    		alert("Score: " + score);
        	resetScreen();
    		if(noOfShots == 0)
			{
				alert("GAME OVER");
       		 	resetScreen();
    			noOfShots = 3;
			}
    		
    	}
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) 
    {
        dx = -dx;
    }
    if(y + dy < ballRadius) 
    {
        alert("BALL LOST");
       	resetScreen();
    	if(noOfShots == 0)
			{
				alert("GAME OVER");
       		 	resetScreen();
    			noOfShots = 3;
			}

    }
    else if(y + dy > canvas.height-ballRadius) {
 	          dy = -dy;
    }

    if(isRunning)
    {
	    var t = performance.now();
	    t = (t - t0) / 1000;
	    x += dx;
	    y += dy;
	    dy = Math.floor( uy - 9.81*t );
	    checkImpact();
	}
	var coords1 = "X coords: " + x + ", Y coords: " + y + " , Score: "+score + " , Shots Left: " + noOfShots;
    document.getElementById("demo").innerHTML = coords1;
}

canvas.addEventListener('click', function(e) 
{
	noOfShots--;
	var x1 = e.clientX;
	var y1 = e.clientY;
	var x0 = 68;
	var y0 = 477;
	var angleRad = Math.atan((y0-y1)/(x1-x0));
	ux = v * Math.cos(angleRad);
	uy = v * Math.sin(angleRad);
	var dx = ux;
	var dy = uy;
	var coords = "X coords: " + x1 + ", Y coords: " + y1;
    document.getElementById("demo").innerHTML = coords;
	inter = setInterval(draw, 10);
});

canvas.addEventListener('mousemove', function(e) 
{
    var x11 = e.clientX;
    var y11 = e.clientY;
    var coords11 = "X coords: " + x11 + ", Y coords: " + y11 ;
    document.getElementById("coord").innerHTML = coords11;
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
	if(ctx.isPointInPath(x+8,canvas.height-y))
	{
		alert("GAME OVER");
       	resetScreen();	
	}
}

function resetScreen()
{
	x = 60;
	y = 70;
	isRunning = false;
	clearInterval(inter);
	ctx.fillStyle = "#F5DFDA"
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI*2);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
	drawTank();
	drawMount();
}

function drawB(col) 
{
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI*2);
	ctx.fillStyle = col;
	ctx.fill();
	ctx.closePath();
}