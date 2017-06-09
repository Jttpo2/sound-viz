new p5();

let backgroundColor;

let mic;

function setup() {
	let canvas = createCanvas(
		window.innerWidth,
		window.innerHeight
		);

	backgroundColor = color(200);

	mic = new Mic();
}

function draw() {
	background(backgroundColor);

	mic.run();
}

function windowResized() {
	resizeCanvas(
		window.innerWidth,
		window.innerHeight);
}