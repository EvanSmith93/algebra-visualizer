class ScaleSide {
	constructor(y, x, constant) {
		this.y = y;
		this.x = x;
		this.constant = constant;
	}

	/*sumUp(xValue) {
		return (this.x * xValue) + this.constant;
	}*/

	writeOut() {
		const yStr = this.y + "y ";
		const xStr = ((this.x >= 0) ? "+ " : "- ") + roundTo(abs(this.x), 2) + "x ";
	 	const constStr = ((this.constant >= 0) ? "+ " : "- ") + roundTo(abs(this.constant), 2);

		return yStr + xStr + constStr;
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

		this.leftHalf = new ScaleSide(1, 0, 0);
		this.rightHalf = new ScaleSide(0, 1, 0);

		console.log(makeScaleData());
		this.setBlocks(makeScaleData());

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

	setBlocks(data) {
		this.leftHalf.y = data.leftHalf.y;
		this.leftHalf.x = data.leftHalf.x;
		this.leftHalf.constant = data.leftHalf.const;
		this.rightHalf.y = data.rightHalf.y;
		this.rightHalf.x = data.rightHalf.x;
		this.rightHalf.constant = data.rightHalf.const;
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

			const divideBy = this.leftHalf.y;
			this.leftHalf.y /= divideBy;
			this.rightHalf.x /= divideBy;
			this.rightHalf.constant /= divideBy;
			return true;

		} else {
			return false;
		}
	}

	graph() {
		const yDif = this.leftHalf.y - this.rightHalf.y;
		const xDif = this.rightHalf.x - this.leftHalf.x;
		const constDif = this.rightHalf.constant - this.leftHalf.constant;

		console.log(xDif / yDif, constDif / yDif);
		createGraph(xDif / yDif, constDif / yDif);
	}
}