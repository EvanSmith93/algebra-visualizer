/*
Tipable scale with greater than, less than, or equal sign.
Add X blocks and 1 blocks to tip the scale. Ballons are used for negative numbers.
Complete 'isolate the x' challenges.

If I have time: Type in your own equation.

*/

function setup() {
  createCanvas(800, 400);
  noStroke();
  textAlign(CENTER, CENTER);
  //rectAlign(CENTER, CENTER);
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
		
		//fill(65, 42, 42);
		//rect(this.x - 10, this.y, 20, 200, 5);
		//rect(this.x - 30, this.y + 190, 60, 20, 5);

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
}

var scale = new Scale(400, 200);

doctument.getElementByID('addXButton').onclick = function() {
	
}

function draw() {
	background(220);
	scale.draw();
}