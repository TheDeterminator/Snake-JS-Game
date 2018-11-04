var snake
var speed = 10

function setup() {
    createCanvas(600, 600)
    snake = new Snake() // For some reason you don't put 'var' in front here, why?
    frameRate(10)
}

function draw() {
    background(51)
    snake.update()
    snake.show()
}

function keyPressed() { // Built-in p5 click event that execute Snake method to move Snake object
    switch(keyCode) {
	case UP_ARROW:
	    snake.move(0, -1)
	    break
	case DOWN_ARROW:
	    snake.move(0, 1)
	    break
	case LEFT_ARROW:
	    snake.move(-1, 0)
	    break
	case RIGHT_ARROW:
	    snake.move(1,0)
    }
}

// TODO: Use createVector(x,y) instead of seperate x_pos and y_pos for the snake's position

function Snake() { // The snake object, may want to go back and make this a class object
    this.x_pos = 0 // x-coordinate of the snake object
    this.y_pos = 0 // y-coordinate of the snake object
    this.x_direction = 1 //
    this.y_direction = 0 //

    this.update = function() {
	this.x_pos = this.x_pos + this.x_direction*speed
	this.y_pos = this.y_pos + this.y_direction*speed

	this.x_pos = constrain(this.x_pos, 0, width-10)
	this.y_pos = constrain(this.y_pos, 0, height-10)
    }

    this.show = function() {
	fill(255)
	// TODO: Change the "10"s to a variable "blockSize" so that you can use them for food and snake body
	rect(this.x_pos, this.y_pos, 10, 10) // Creates a rectangle at the given coordinates with the given size
    }

    this.move = function(x,y) {
	this.x_direction = x
	this.y_direction = y
    }
} 


