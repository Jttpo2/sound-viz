new p5();

let backgroundColor;

function setup() {
	let canvas = createCanvas(
		window.innerWidth,
		window.innerHeight
		);

	backgroundColor = color(200);
}

function draw() {
	background(backgroundColor);
	
	drawTestSquare();
}

function windowResized() {
	resizeCanvas(
		window.innerWidth,
		window.innerHeight);
}

function drawTestSquare() {
	fill(100); 
	rectMode(CENTER);
	rect(width/2, height/2, 50, 50);
}

