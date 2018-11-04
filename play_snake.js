var snake
var speed = 10
var food // Variable to hold the food "object" that snake will eat to grow in size
var blockSize = 10 // The blockSize of the squares that make up the game

function setup() {
    createCanvas(400, 400)
    snake = new Snake()
    frameRate(10)
    setFoodLocation()
}

function setFoodLocation() {
    var cols = floor(width/blockSize)
    var rows = floor(height/blockSize)
    food = createVector(floor(random(cols)), floor(random(rows)))
    food.mult(blockSize)
}

function draw() {
    background(51)

    if (snake.eat(food)) setFoodLocation()

    snake.death()
    snake.update()
    snake.show()
    
    fill(255, 0, 100) // Set color for the food
    rect(food.x, food.y, blockSize, blockSize) // Set position and size for the food

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

function mousePressed() {
    snake.total++
}

// TODO: Use createVector(x,y) instead of seperate x_pos and y_pos for the snake's position

function Snake() { // The snake object, may want to go back and make this a class object
    this.x_pos = 0 // x-coordinate of the snake object
    this.y_pos = 0 // y-coordinate of the snake object
    this.x_direction = 1 //
    this.y_direction = 0 //
    this.total = 0
    this.body = []

    this.update = function() {
	if (this.total === this.body.length) {
	    for (var i = 0; i < this.body.length-1; i++) {
		this.body[i] = this.body[i+1]
	    }
	}
	this.body[this.total-1] = createVector(this.x_pos, this.y_pos)

	this.x_pos = this.x_pos + this.x_direction*speed
	this.y_pos = this.y_pos + this.y_direction*speed

	this.x_pos = constrain(this.x_pos, 0, width-blockSize)
	this.y_pos = constrain(this.y_pos, 0, height-blockSize)
    }

    this.show = function() {
	fill(255)
	for (var i = 0; i < this.body.length; i++) {
		rect(this.body[i].x, this.body[i].y, blockSize, blockSize)
	    }
	fill(255)
	rect(this.x_pos, this.y_pos, blockSize, blockSize) // Creates a rectangle at the given coordinates with the given blockSize
    }

    this.move = function(x,y) {
	this.x_direction = x
	this.y_direction = y
    }

    this.eat = function(pos) {
	var distance = dist(this.x_pos, this.y_pos, pos.x, pos.y) // Find the distatnce between the snake's head and the fruit
	if (distance < 1) {
	    this.total++
	    return true
	} else {
	    return false
	}
    }

    this.death = function() {
	for (var i=0; i < this.body.length; i++) {
	    var pos = this.body[i]
	    var distanceBetweenBodyParts = dist(this.x_pos, this.y_pos, pos.x, pos.y)
	    if (distanceBetweenBodyParts < 1) {
		this.total = 0
		this.body = []
		alert('Fail! Try again')
	    }
	}
    }
} 


