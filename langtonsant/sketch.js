let res = 10;
let grid;
let ant;

const WHITE = 0;
const DARK = 1;

const RIGHT = 0;
const DOWN = 1;
const LEFT = 2;
const UP = 3;

function setup() {
  createCanvas(800, 800);
  frameRate(30);
  let cols = width / res;
  let rows = height / res;
  this.grid = this.initializeGrid(cols, rows);
  this.ant = new Ant(Math.floor(cols / 2), Math.floor(rows) / 2, this.grid);
}

function draw() {
  background('black');
  for(let i = 0; i < this.grid.length; i++){
    for(let j = 0; j < this.grid[i].length; j++){
      let x = i * res;
      let y = j * res;
      if(this.grid[i][j].state === WHITE){
        fill('white');
      } else {
        fill('grey');
      } 

      if(this.ant.x === i && this.ant.y === j){
        fill('red');
      }
      rect(x, y, res-1, res-1);
    }
  }

  this.ant.rotate();
  this.ant.flipState();
  this.ant.move();
}

function initializeGrid(cols, rows) {
	let array = new Array(cols); 
	for(let i = 0; i < rows; i++) {
    array[i] = new Array(rows); 
    for(let j = 0; j < rows; j++){
      array[i][j] = new Cell();
    }
  }
	return array; 
}


function Cell() {
  this.state = WHITE; 

  this.flip = function() {
    this.state = (this.state + 1) % 2;
  }
}

function Ant(x, y, grid) {
  this.x = x;
  this.y = y;
  this.direction = RIGHT;
  this.grid = grid;

  /*
   At a white square, turn 90° right, flip the color of the square, move forward one unit
   At a black square, turn 90° left, flip the color of the square, move forward one unit
  */
  this.rotate = function(){
    if(this.grid[this.x][this.y].state === WHITE) {
      this.direction = (this.direction + 1 + 4) % 4;
    } else if (this.grid[this.x][this.y].state === DARK) {
      this.direction = (this.direction - 1 + 4) % 4;
    }
  }

  this.move = function(){

    switch(this.direction){
      case RIGHT: this.x = (this.x + 1) % this.grid.length; break;
      case DOWN: this.y = (this.y + 1) % this.grid[0].length; break;
      case LEFT: this.x = (this.x - 1) % this.grid.length; break;
      case UP: this.y = (this.y - 1) % this.grid[0].length; break;
    }
  }

  this.flipState = function(){
    this.grid[this.x][this.y].flip();
  }
}