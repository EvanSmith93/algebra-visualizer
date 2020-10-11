/*
Tipable scale with greater than, less than, or equal sign.
Add X blocks and 1 blocks to tip the scale. Ballons are used for negative numbers.
Complete 'isolate the x' challenges.

If I have time: Type in your own equation.

*/

var trace = {
  x: [-1, 5],
  y: [-1, 8],
  type: 'scatter',
  mode: 'lines',
  line: {
  	color: 'rgb(240, 240, 240)',
  	width: 5
  }
};

var data = [trace];
var layout = {
	showlegend: false,
	width: 650,
	height: 400,
	font: { color: "#000000" },
	paper_bgcolor: '#aaaaaa',
	plot_bgcolor: '#aaaaaa',
}

Plotly.newPlot(document.getElementById("graph"), data, layout, {staticPlot: true});

function setup() {
  var canvas = createCanvas(750, 320);
  canvas.parent("mainWindow");

  noStroke();
  textAlign(CENTER, CENTER);
}

/*const Tips = {
	left: "left",
	right: "right",
	center: "center"
};*/

var blockStack = function(xPos, yPos, amount, symbol, color) {
	if (amount >= 0) {
			// positive
			for(var i = 0; i < amount; i++) {
				const pos = { x: xPos + (30 * (i % 3)), y: yPos - (30 * floor(i / 3)) };

				if (i == floor(amount) && amount % 1 != 0) {
					fill(255, 255, 255, 0);
					stroke(color);
					rect(pos.x - 13, pos.y - 13, 26, 26, 3);

					noStroke();

					fill(color);
					rect(pos.x - 13, pos.y - 13 + (26 * (1 - (amount % 1))), 26, 26 * (amount % 1), 3);
				} else {
					fill(color);
					rect(pos.x - 14, pos.y - 14, 28, 28, 3);
				}

				fill(255, 255, 255);
				textSize(20);
				text(symbol, pos.x, pos.y);
			}
		} else {
			// negative
			var alpha = color;
			alpha.setAlpha(80);

			for(var i = 0; i > amount; i--) {
				const j = i * -1;
				const pos = { x: xPos + (30 * (j % 3)), y: yPos - (30 * floor(j / 3)) };

				if (i == floor(amount) + 1 && amount % 1 != 0) {
					fill(255, 255, 255, 0);
					stroke(alpha);
					rect(pos.x - 13, pos.y - 13, 26, 26, 3);

					noStroke();

					fill(alpha);
					rect(pos.x - 13, pos.y - 13 + (26 * (1 - (abs(amount) % 1))), 26, 26 * (abs(amount) % 1), 3);
				} else {
					fill(alpha);
					rect(pos.x - 14, pos.y - 14, 28, 28, 3);
				}

				fill(255, 255, 255);
				textSize(20);
				text("-" + symbol, pos.x, pos.y);
			}
		}
}

class ScaleSide {
	constructor(y, x, constant) {
		this.y = y;
		this.x = x;
		this.constant = constant;
	}

	//sumUp(xValue) {
		//return (this.x * xValue) + this.constant;
	//}

	writeOut() {
		const yStr = this.y + "y ";
		const xStr = ((this.constant > 0) ? "+ " : "- ") + abs(this.x) + "x ";
	 	const constStr = ((this.constant > 0) ? "+ " : "- ") + abs(this.constant);

		return yStr + xStr + constStr;

		/*if (this.constant > 0) {
			return this.x + "X + " + this.constant;
		} else if (this.constant == 0) {
			return this.x + "X"
		} else {
			return this.x + "X - " + abs(this.constant);
		}*/
	}

	draw(xPos, yPos) {
		// stacks
		blockStack(xPos, yPos, this.y, "Y", color(255, 0, 0));
		blockStack(xPos + 100, yPos, this.x, "X", color(0, 255, 0));
		blockStack(xPos + 200, yPos, this.constant, "1", color(0, 0, 255));

		// bottom line
		rect(xPos - 20, yPos + 25, 300, 4, 2);
	}
}


class Scale {
	constructor(x, y) {
		this.x = x;
		this.y = y;

		this.leftHalf = new ScaleSide(5, 5, 7);
		this.rightHalf = new ScaleSide(1, 2, 3);

		//this.xValue = 2;

		//this.tipsTo = this.leftHalf.sumUp(this.xValue) > this.rightHalf.sumUp(this.xValue) ? Tips.left : this.leftHalf.sumUp(this.xValue) == this.rightHalf.sumUp(this.xValue) ? Tips.center : Tips.right;
	}

	getSign() {
		/*switch (this.tipsTo) {
			case Tips.center:
				return "=";
			case Tips.left:
				return ">";
			case Tips.right:
				return "<";
			}*/
		return "=";
	}

	draw() {

		// circle
		fill(240, 240, 240);
		ellipse(this.x, this.y, 60, 60);

		// >, <, or = sign
		fill(0, 0, 0);
		textSize(40);
		text(this.getSign(), this.x, this.y);

		// left and right sides
		this.leftHalf.draw(this.x - 330, this.y + 20);
		this.rightHalf.draw(this.x + 65, this.y + 20);

		// bottom equation
		textSize(35);
		text(this.writeOut(), this.x, this.y + 90);
	}

	writeOut() {
		return this.leftHalf.writeOut() + "  " + this.getSign() + "  " + this.rightHalf.writeOut();
	}

	// adds 'num' of Y to both sides
	addY(num) {
		this.leftHalf.y += num;
		this.rightHalf.y += num;
	}

	// adds 'num' of X to both sides
	addX(num) {
		this.leftHalf.x += num;
		this.rightHalf.x += num;
	}

	// adds 'num' of  constant to both sides
	addConst(num) {
		this.leftHalf.constant += num;
		this.rightHalf.constant += num;
	}

	divideYs() {
		if (this.leftHalf.y == 0 && this.rightHalf.x == 0 && this.rightHalf.constant == 0) {

			const divideBy = this.rightHalf.y;
			this.rightHalf.y /= divideBy;
			this.leftHalf.x /= divideBy;
			this.leftHalf.constant /= divideBy;
			return true;

		} else if (this.rightHalf.y == 0 && this.leftHalf.x == 0 && this.leftHalf.constant == 0) {

			const divideBy = abs(this.leftHalf.y);
			this.leftHalf.y /= divideBy;
			this.rightHalf.x /= divideBy;
			this.rightHalf.constant /= divideBy;
			return true;

		} else {
			return false;
		}
	}

}

var myScale = new Scale(375, 170);

// buttons
document.getElementById('addYButton').onclick = function() {
	myScale.addY(1);
}

document.getElementById('subYButton').onclick = function() {
	myScale.addY(-1);
}

document.getElementById('addXButton').onclick = function() {
	myScale.addX(1);
}

document.getElementById('subXButton').onclick = function() {
	myScale.addX(-1);
}

document.getElementById('addConstButton').onclick = function() {
	myScale.addConst(1);
}

document.getElementById('subConstButton').onclick = function() {
	myScale.addConst(-1);
}

document.getElementById('divide').onclick = function() {
	if (!myScale.divideYs()) {
		alert("Put all Ys on one side, and put all Xs and 1s on the other side before dividing.")
	}
}

function draw() {
	background(170);
	myScale.draw();
}