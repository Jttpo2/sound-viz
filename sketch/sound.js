new p5();

let backgroundColor;

let song;
let amp;
let vol;
let volHistory = [];

let circle = true;

let button;

function preload() {
	song = loadSound('assets/pisces.mp3');
}

function setup() {
	let canvas = createCanvas(
		window.innerWidth * 7/10,
		window.innerHeight * 7/10
		);

	backgroundColor = color(200);

	song.play();

	amp = new p5.Amplitude();


	button = createButton('Toggle');
	button.mousePressed(toggleSong);
}

function draw() {
	background(backgroundColor);
	
	vol = amp.getLevel();
	volHistory.push(vol);
	limitVolHistory();

	displayGraph();
}

function windowResized() {
	resizeCanvas(
		window.innerWidth,
		window.innerHeight);
}

function toggleSong() {
	if (song.isPlaying()) {
		song.pause();
	} else {
		song.play();
	}
}

function limitVolHistory() {
	let maxSize;
	if (circle) {
		maxSize = 360;
	} else {
		maxSize = width;
	}

	if (volHistory.length > maxSize) {
		volHistory.splice(0, volHistory.length - maxSize);
	}
}

function displayGraph() {
	
	if (circle) {
		noFill();
		stroke(50);
		strokeWeight(1);

		translate(width/2, height/2);

		beginShape();
		for (let i=0; i<360; i++) {
			let r = map(volHistory[i], 0, 1, 0, 200);
			let x = r * cos(i);
			let y = r * sin(i);

			vertex(x, y);
		}
		endShape();

	} else {
		stroke(50);
		noFill();
		beginShape();
		for (let i=0; i<volHistory.length; i++) {
			let y = map(volHistory[i], 0, 1, height/2, 0);
			vertex(i, y);
		}
		endShape();	
	}
	
}

function displayMouth() {
	fill(0);
	noStroke();
	ellipse(width/2, height/2, width*8/10, vol*1000);
}