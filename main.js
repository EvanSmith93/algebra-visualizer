function setup() {
  var canvas = createCanvas(750, 320);
  canvas.parent("mainWindow");

  noStroke();
  textAlign(CENTER, CENTER);
}

// I did not write this function myself. Sorce link: https://stackoverflow.com/questions/15762768/javascript-math-round-to-two-decimal-places
function roundTo(n, digits) {
    var negative = false;
    if (digits === undefined) {
        digits = 0;
    }
    if (n < 0) {
        negative = true;
        n = n * -1;
    }
    var multiplicator = Math.pow(10, digits);
    n = parseFloat((n * multiplicator).toFixed(11));
    n = (Math.round(n) / multiplicator).toFixed(digits);
    if (negative) {
        n = (n * -1).toFixed(digits);
    }
    return n;
}

var randRange = function(min, max) {
	return Math.random() * (max - min) + min;
}

var blockStack = function(xPos, yPos, amount, symbol, color) {
	if (amount >= 0) {
			// positive
			for(var i = 0; i < amount; i++) {
				const pos = { x: xPos + (30 * (i % 3)), y: yPos - (30 * floor(i / 3)) };

				if (i == floor(amount) && amount % 1 != 0) {
					// partial block
					fill(255, 255, 255, 0);
					stroke(color);
					rect(pos.x - 13, pos.y - 13, 26, 26, 3);

					noStroke();

					fill(color);
					rect(pos.x - 13, pos.y - 13 + (26 * (1 - (amount % 1))), 26, 26 * (amount % 1), 3);
				} else {
					// full block
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
					// partial block
					fill(255, 255, 255, 0);
					stroke(alpha);
					rect(pos.x - 13, pos.y - 13, 26, 26, 3);

					noStroke();

					fill(alpha);
					rect(pos.x - 13, pos.y - 13 + (26 * (1 - (abs(amount) % 1))), 26, 26 * (abs(amount) % 1), 3);
				} else {
					// full block
					fill(alpha);
					rect(pos.x - 14, pos.y - 14, 28, 28, 3);
				}

				fill(255, 255, 255);
				textSize(20);
				text("-" + symbol, pos.x, pos.y);
			}
		}
}

var makeScaleData = function() {
	const left = {
		y: Math.floor(randRange(-6, 7)),
		x: Math.floor(randRange(-6, 7)),
		const: Math.floor(randRange(-6, 7))
	}

	var right = {
		y: Math.floor(randRange(-6, 7)),
		x: Math.floor(randRange(-6, 7)),
		const: Math.floor(randRange(-6, 7))
	}

	while (right.y == left.y) {
		right.y = Math.floor(randRange(-6, 7));
	}

	return {leftHalf: left, rightHalf: right}
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

document.getElementById('divideButton').onclick = function() {
	if (!myScale.divideYs()) {
		alert("Put all Ys on one side, and put all Xs and 1s on the other side before dividing.")
	}
}

document.getElementById('newProblemButton').onclick = function() {
	myScale.setBlocks(makeScaleData());
	myScale.graph();
}

myScale.graph();

function draw() {
	background(170);
	myScale.draw();
}