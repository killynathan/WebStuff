//variables
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//constants
const HEIGHT = 540;
const WIDTH = 300;
const ROWS = 10;
const COLUMNS = 18;
const BLOCK_HEIGHT = HEIGHT / COLUMNS;
const BLOCK_WIDTH = WIDTH / ROWS;

//block representation
const EMPTY = 0;
const GREEN = 1;
const BLUE = 2;
const PURPLE = 3;
const YELLOW = 4;
const RED = 5;
const MAIN = 6;

const SQUARE = 20;
const L = 21;
const LINE = 22;

var frame = 0;



//grid to represent game
var grid = {
	grid: null,

	init: function() {
		this.grid = [];
		for (var i = 0; i < ROWS; i++) {
			this.grid.push([]);
			for (var j = 0; j < COLUMNS; j++) {
				this.grid[i].push(EMPTY);
			}
		}
	},

	get: function(x,y) {
		if (x >= 0 && y >= 0 && x < ROWS && y < COLUMNS) {
			return this.grid[x][y];
		}
	},

	set: function(x,y,value) {
		if (x >= 0 && y >= 0 && x < ROWS && y < COLUMNS) {
			this.grid[x][y] = value;
		}
	}
};

var block = {
	type: 0,
	color: 0,
	vel: 0,
	startX: 0,
	startY: 0,
	rep: [],

	init: function(type, color, startX, startY) {
		this.type = type;
		this.color = color;
		this.vel = 1;
		this.startX = startX;
		this.startY = startY;
		this.in_use = true;
		this.rep = [];
		switch(type) {
			case SQUARE:
				this.rep.push({x: startX, y: startY});
				this.rep.push({x: startX-1, y: startY});
				this.rep.push({x: startX, y: startY+1});
				this.rep.push({x: startX-1, y: startY+1});
			default:
				this.rep.push({x: startX, y: startY});
				break;
		}
		for (var i = 0; i < this.rep.length; i++) {
			grid.set(this.rep[i].x, this.rep[i].y, block.color);
		}
	},

	isMainBlock: function(x, y) {
		for (var i = 0; i < this.rep.length; i++) {
			if (x === this.rep[i].x && y === this.rep[i].y) return true;
		}
		return false;
	},

	getRep: function() {
		return this.rep;
	}
}

function isFilledBlock(x, y) {
	return (grid.get(x, y) != EMPTY && !block.isMainBlock(x, y));
}

function blockBelow() {
	var blockRep = block.getRep();
	var x, y;
	for (var i = 0; i < blockRep.length; i++) {
		x = blockRep[i].x;
		y = blockRep[i].y;
		if (((y + 1) < COLUMNS) && isFilledBlock(x, y + 1) && !block.isMainBlock(x, y + 1)) return true;
	}
	return false;
}

function main() {
	init();
	loop();
}

function init() {
	grid.init();
	block.init(SQUARE, 1, 5, 0);
}

function loop() {
	frame++;
	update();
	draw();
	window.requestAnimationFrame(loop, canvas);	
}

function moveDown() {
	var blockRep = block.getRep();
	for (var i = 0; i < blockRep.length; i++) {
		grid.set(blockRep[i].x, blockRep[i].y, EMPTY);
	}
	for (var i = 0; i < blockRep.length; i++) {
		blockRep[i].y += block.vel;
		grid.set(blockRep[i].x, blockRep[i].y, block.color);
	}
}

function blockReachedBottom() {
	var blockRep = block.getRep();
	for (var i = 0; i < blockRep.length; i++) {
		if (blockRep[i].y === COLUMNS - 1) {
			return true;
		}
	}
	return false;
}

function checkForCompleteRow() {
	var count = 0;
	var completedRows = [];
	for (var i = COLUMNS - 1; i >= 0; i--) {
		for (var j = 0; j <= ROWS - 1; j++) {
			if (grid.get(j, i) != EMPTY && !block.isMainBlock(j, i)) count++;
		}
		if (count === ROWS) completedRows.push(i);
		count = 0;
	}
	return completedRows;
}

function update() {
	//update block
	//clear if full row
	if (frame % 10 === 0) { //40
		if (blockReachedBottom() || blockBelow()) {
			block.init(SQUARE, 1, 5, 0);
		}
		else {
			moveDown()
		}
	}
	if (checkForCompleteRow().length != 0) alert("test");

}

function draw() {
	for (var i = 0; i < ROWS; i++) {
		for (var j = 0; j < COLUMNS; j++) {
			switch(grid.get(i,j)) {
				case GREEN:
					ctx.fillStyle = "green";
					ctx.strokeStyle = "black";
					break;
				case BLUE:
					ctx.fillStyle = "blue";
					ctx.strokeStyle = "black";
					break;
				case PURPLE:
					ctx.fillStyle = "purple";
					ctx.strokeStyle = "black";
					break;	
				case YELLOW:
					ctx.fillStyle = "yellow";
					ctx.strokeStyle = "black";
					break;	
				case RED:
					ctx.fillStyle = "red";
					ctx.strokeStyle = "black";
					break;	
				default:
					ctx.fillStyle = "white";
					ctx.strokeStyle = "white";
					break;
			}
			ctx.fillRect(i  * BLOCK_WIDTH, j * BLOCK_HEIGHT, BLOCK_WIDTH, BLOCK_HEIGHT);
			ctx.strokeRect(i  * BLOCK_WIDTH, j * BLOCK_HEIGHT, BLOCK_WIDTH, BLOCK_HEIGHT);
		}
	}
}

function canMoveLeft() {
	var blockRep = block.getRep();
	var x;
	var y;
	for (var i = 0; i < blockRep.length; i++) {
		x = blockRep[i].x;
		y = blockRep[i].y;
		if ((x >= 1 && isFilledBlock(x - 1, y)) || x <= 0) {
			return false;
		}
	}
	return true;
}

function canMoveRight() {
	var blockRep = block.getRep();
	var x;
	var y;
	for (var i = 0; i < blockRep.length; i++) {
		x = blockRep[i].x;
		y = blockRep[i].y;
		if ((x < ROWS - 1 && isFilledBlock(x + 1, y)) || x >= ROWS - 1) {
			return false;
		}
	}
	return true;
}

function moveRight() {
	var blockRep = block.getRep();
	if (canMoveRight()) {
		for (var i = 0; i < blockRep.length; i++) {
			grid.set(blockRep[i].x, blockRep[i].y, EMPTY);
		}
		for (var i = 0; i < blockRep.length; i++) {
			blockRep[i].x += 1;
			grid.set(blockRep[i].x, blockRep[i].y, block.color);
		}
	}
}

function moveLeft() {
	var blockRep = block.getRep();
	if (canMoveLeft()) {
		for (var i = 0; i < blockRep.length; i++) {
			grid.set(blockRep[i].x, blockRep[i].y, EMPTY);
		}
		for (var i = 0; i < blockRep.length; i++) {
			blockRep[i].x -= 1;
			grid.set(blockRep[i].x, blockRep[i].y, block.color);
		}
	}
}

document.addEventListener("keydown", function(e) {
		var blockRep = block.getRep();
		if (e.keyCode === 38) { // DOWN
			snake.direction = UP;
		}
		else if (e.keyCode === 40) { // UP
			snake.direction = DOWN;
		}
		else if (e.keyCode === 39) { // RIGHT
			moveRight();
		}
		else if (e.keyCode === 37) { // LEFT=
			moveLeft();
		}
});

main();