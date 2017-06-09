class Mic {
	constructor() {
		this.mic = new p5.AudioIn();
		this.mic.start();

		this.vol = 0;
	}

	update() {
		this.vol = this.mic.getLevel();
	}

	display() {
		fill(0);
		noStroke();
		ellipse(width/2, height/2, width*8/10, this.vol*1000);
	}

	run() {
		this.update();
		this.display();
	}
}