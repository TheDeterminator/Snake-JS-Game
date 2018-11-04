let snake
let food // Variable to hold the food "object" that snake will eat to grow in size
let res = 20 // The resolution or scaling for the games objects
let w
let h

function setup() {
    createCanvas(400, 400)
    w = floor(width/res)
    h = floor(height/res)
    snake = new Snake()
    frameRate(10)
    setFoodLocation()
}

function setFoodLocation() {
    let x = floor(random(w))
    let y = floor(random(h))
    food = createVector(x,y)
}

function keyPressed() { // Built-in p5 click event that execute Snake method to move Snake object
    switch(keyCode) {
	case UP_ARROW:
	    snake.setDir(0, -1)
	    break
	case DOWN_ARROW:
	    snake.setDir(0, 1)
	    break
	case LEFT_ARROW:
	    snake.setDir(-1, 0)
	    break
	case RIGHT_ARROW:
	    snake.setDir(1,0)
	    break
    }
}

function draw() {
    scale(res)
    background(0)
    if (snake.eat(food)) setFoodLocation()
    snake.update()
    snake.show()
    
    if (snake.endGame())
    {
	print("GAME OVER")
	background(5, 200, 0)
	noLoop()
    }

    noStroke()
    fill(255, 0, 0)
    rect(food.x, food.y, 1,1)
}

