/*
Tipable scale with greater than, less than, or equal sign.
Add X blocks and 1 blocks to tip the scale. Ballons are used for negative numbers.
Complete 'isolate the x' challenges.

If I have time: Type in your own equation.

*/

function setup() {
  createCanvas(600, 300);
  noStroke();
  textAlign(CENTER, CENTER);
}

const Tips = {
	left: "left",
	right: "right",
	center: "center"
};

class ScaleSide {
	constructor(x, constant) {
		this.x = x;
		this.constant = constant;
	}

	sumUp(xValue) {
		return (this.x * xValue) + this.constant;
	}

	draw(xPos, yPos) {
		// X blocks
		if (this.x >= 0) {
			// positive
			for(var i = 0; i < this.x; i++) {
				const pos = { x: xPos + (30 * (i % 3)), y: yPos - (30 * floor(i / 3)) };

				fill(0, 255, 0);
				rect(pos.x - 14, pos.y - 14, 28, 28, 3);

				fill(0, 0, 0);
				textSize(20);
				text("X", pos.x, pos.y);
			}
		} else {
			// negative
			for(var i = 0; i > this.x; i--) {
				const j = i * -1;
				const pos = { x: xPos + (30 * (j % 3)), y: yPos - (30 * floor(j / 3)) };

				fill(0, 255, 0, 60);
				rect(pos.x - 14, pos.y - 14, 28, 28, 3);

				fill(0, 0, 0);
				textSize(20);
				text("-X", pos.x, pos.y);
			}
		}

		// Constant blocks
		if (this.constant >= 0) {
			// positive
			for(var i = 0; i < this.constant; i++) {
				const pos = { x: xPos + (30 * (i % 3)) + 100, y: yPos - (30 * floor(i / 3)) };

				fill(0, 0, 255);
				rect(pos.x - 14, pos.y - 14, 28, 28, 3);

				fill(0, 0, 0);
				textSize(20);
				text("1", pos.x, pos.y);
			}
		} else {
			// negative
			for(var i = 0; i > this.constant; i--) {
				const j = i * -1;
				const pos = { x: xPos + (30 * (j % 3)) + 100, y: yPos - (30 * floor(j / 3)) };

				fill(0, 0, 255, 60);
				rect(pos.x - 14, pos.y - 14, 28, 28, 3);

				fill(0, 0, 0);
				textSize(20);
				text("-1", pos.x, pos.y);
			}
		}

		rect(xPos - 20, yPos + 25, 200, 4, 2);
	}
}


class Scale {
	constructor(x, y) {
		this.x = x;
		this.y = y;

		this.leftHalf = new ScaleSide(-5, -6);
		this.rightHalf = new ScaleSide(3, 2);

		this.xValue = 2;

		this.tipsTo = this.leftHalf.sumUp(this.xValue) > this.rightHalf.sumUp(this.xValue) ? Tips.left : this.leftHalf.sumUp(this.xValue) == this.rightHalf.sumUp(this.xValue) ? Tips.center : Tips.right;
	}

	draw() {

		// circle
		fill(240, 240, 240);
		ellipse(this.x, this.y, 60, 60);

		// >, <, or = sign
		fill(0, 0, 0);
		textSize(40);
		switch (this.tipsTo) {
			case Tips.center:
				text("=", this.x, this.y);
				break;
			case Tips.left:
				text(">", this.x, this.y);
				break;
			case Tips.right:
				text("<", this.x, this.y);
				break;

		}

		// left and right sides
		this.leftHalf.draw(this.x - 230, this.y + 20);
		this.rightHalf.draw(this.x + 65, this.y + 20);
	}

	addX(num) {
		this.leftHalf.x += num;
		this.rightHalf.x += num;
	}

	addConst(num) {
		this.leftHalf.constant += num;
		this.rightHalf.constant += num;
	}

	divideXs() {
		if (this.leftHalf.x == 0 && this.rightHalf.constant == 0) {

			const divideBy = abs(this.rightHalf.x);
			this.leftHalf.constant /= divideBy;
			this.rightHalf.x /= divideBy;
			return true;

		} else if (this.leftHalf.constant == 0 && this.rightHalf.x == 0) {

			const divideBy = abs(this.leftHalf.x);
			this.leftHalf.x /= divideBy;
			this.rightHalf.constant /= divideBy;
			return true;

		} else {
			return false;
		}
	}

}

var myScale = new Scale(300, 200);

// buttons
document.getElementById('addXButton').onclick = function() {
	myScale.addX(1);
}

document.getElementById('subXButton').onclick = function() {
	myScale.addX(-1);
}

document.getElementById('addNumButton').onclick = function() {
	myScale.addConst(1);
}

document.getElementById('subNumButton').onclick = function() {
	myScale.addConst(-1);
}

document.getElementById('divide').onclick = function() {
	if (!myScale.divideXs()) {
		alert("Put all Xs on one side, and 1s on the other side before dividing.")
	}
}

function draw() {
	background(220);
	myScale.draw();
}