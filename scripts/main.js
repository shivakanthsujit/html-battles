var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var inter;
ctx.translate(0,canvas.height);
ctx.scale(1,-1);
var score = 0;
function drawTank()
{
	ctx.fillStyle = "#3498DB";
	ctx.fillRect(20, 20, 80, 50);

	ctx.beginPath();
	ctx.fillStyle = "#3498DB";
	ctx.rect(canvas.width-20-80,20,80,50);
	ctx.fill();
	ctx.closePath();

	
}
drawTank();
var ballRadius = 5;
var x = 60;
var y = 70;
var ux = 5;
var uy = 5;
var dx = ux;
var dy = uy;
var v = 10;

ctx.beginPath();
ctx.arc(x, y, ballRadius, 0, Math.PI*2);
ctx.fillStyle = "#0095DD";
ctx.fill();
ctx.closePath();
var isRunning = false;
var t0 ;
function drawBall() {
	if(!isRunning)
	{
		isRunning = true;
		t0 = performance.now();
	}
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.fillStyle = "#F5DFDA"
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawTank();
    
    if( x + dx > canvas.width-20-80 && y + dy < 70 )
    	{
    		score++;
    		document.getElementById("demo").innerHTML = score;
    		alert("Score: "+score);
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
    		
    	}
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy < ballRadius) {
        //document.location.reload();
        alert("GAME OVER");
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

    }
    else if(y + dy > canvas.height-ballRadius) {
 	          dy = -dy;
    }

    if(isRunning)
    {
    var t = performance.now();
    t = (t - t0)/1000;
    
    x += dx;
    y += dy;
    dy = Math.floor( uy - 9.81*t );
	}
	var coords1 = "X coords: " + x + ", Y coords: " + y + " , Score: "+score;
    document.getElementById("demo").innerHTML = coords1;

}

canvas.addEventListener('click', function(e) {
	var x1 = e.clientX;
	var y1 = e.clientY;
	//isRunning = true;
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


