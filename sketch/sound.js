new p5();

let backgroundColor;
let opacity = 10;

let song;
let amp;
let vol;
let volHistory = [];

let circle = true;

let fft;
let bands = Math.pow(2, 7);
let smoothing = 0.999;

let w;

let button;

function preload() {
	song = loadSound('assets/pisces.mp3');
}

function setup() {
	angleMode(DEGREES);

	let canvas = createCanvas(
		window.innerWidth, //* 7/10,
		// 700,
		window.innerHeight // * 7/10
		);

	backgroundColor = color(240, opacity);

	song.play();

	amp = new p5.Amplitude();
	fft = new p5.FFT(smoothing, bands);

	w = width/bands;

	// button = createButton('Toggle');
	// button.mousePressed(toggleSong);
}

function draw() {
	background(backgroundColor);

	// handleAmpInput();
	// displayAmpGraph();

	handleFFT();
}

function windowResized() {
	resizeCanvas(
		window.innerWidth,
		window.innerHeight);
}

function handleAmpInput() {
	vol = amp.getLevel();
	volHistory.push(vol);
	limitVolHistory();
}

function toggleSong() {
	if (song.isPlaying()) {
		song.pause();
	} else {
		song.play();
	}
}

function limitVolHistory() {
	let maxSize = width;

	if (volHistory.length > maxSize) {
		volHistory.splice(0, volHistory.length - maxSize);
	}
}

function displayAmpGraph() {
	if (circle) {
		angleMode(RADIANS);
		drawCircleGraph(color(220));		

		angleMode(DEGREES);
		drawCircleGraph(color(200, 0, 0, 80));

		displayLineGraph();
	} else {
		displayLineGraph();
	}
}

function drawCircleGraph(col) {
	noFill();
	stroke(col);
	strokeWeight(1);

	push();
	translate(width/2, height/2);
	rotate(-90);

	beginShape();
	for (let angle=0; angle<360; angle++) {
		let index = max(volHistory.length - 360, 0) + angle;
		let r = map(volHistory[index], 0, 1, 40, 300);
		let x = r * cos(angle);
		let y = r * sin(angle);

		vertex(x, y);
	}
	endShape();
	pop();
}

function displayLineGraph() {
	stroke(100, 50);
	noFill();
	beginShape();
	for (let i=0; i<volHistory.length; i++) {
		let y = map(volHistory[i], 0, 1, height/2, 0);
		vertex(i, y);
	}
	endShape();	
}

function displayMouth() {
	fill(0);
	noStroke();
	ellipse(width/2, height/2, width*8/10, vol*1000);
}

function handleFFT() {
	let spectrum = fft.analyze();
	// console.log(spectrum);
	drawFrequencySpectrum(spectrum);
}

function drawFrequencySpectrum(spectrum) {
	noFill();
	strokeWeight(1);
	
	let y = 0;
	// let greyValue = 0;
	let hue = 0;
	let barAlpha = 70;
	
	let peakAlpha = 90;
	let peakColor = color(200, peakAlpha);
	
	beginShape();
	// Draw frequency bar
	for (let i=0; i<spectrum.length; i++) {
		y = map(spectrum[i], 0, 255, height, 0);
		
		// greyValue = map(spectrum[i], 0, 255, 50, 245);
		hue = map(spectrum[i], 0, 255, 170, 10);
		colorMode(HSB);
		
		// Extra projection lines
		noFill();
		stroke(hue, 20, 100, 10);
		strokeWeight(1);
		// line(0, height, i*w, y+1); // +1 to remove interference with vertices;
		line(width/2, height/2, i*w +w/2, y); // 
		
		// Frequency bars
		let frBarColor = color(hue, 255, 100, barAlpha);
		strokeWeight(1);
		stroke(frBarColor);
		fill(frBarColor);
		rect(i*w, y, w*9.5/10, height-y, 30, 30, 0, 0);
		
		// Peak vertices
		vertex(i*w + w/2, y);

	}

	// Draw peak
	noFill();
	colorMode(RGB);
	stroke(peakColor);
	strokeWeight(w*2/3);
	endShape();
} 