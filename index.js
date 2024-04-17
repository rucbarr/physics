const canvas = document.getElementById("gameArea");
const ctx = canvas.getContext("2d");

// CANVAS CONSTANTS
const width = (canvas.width);
const height = (canvas.height);

//PHYSICS CONSTANTS
const GRAV = 4;
const BALL_ELAST = .5;

// random() Helper Function
// INPUT: min(Minumum random number), max(Maximum random number)
// OUTPUT: Number between min and max (inclusive)
function random(min, max) {
    var pos_neg = 1;
    if (min < 0){
        pos_neg = Math.random() < 0.5 ? -1 : 1;
    }
    return Math.floor((Math.random() * (max - min + 1)) + min) * pos_neg;
}

// randomRGB() Helper Function
// INPUT: N/A
// OUTPUT: rgb value formatted in http rgb format eg. "rgb(#, #, #)"
function randomRGB() {
    return `rgb(${random(0, 255)} ${random(0, 255)} ${random(0, 255)})`;
}
class Ball {
    constructor(x, y, vx, vy, color, r) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.color = color;
        this.r = r;
    }
    update(){
        this.x = this.x + this.vx;
        this.y = this.y + this.vy;

        //top&bottom bounding + elasticity
        if (this.y > height - this.r){
            this.vy = -this.vy + BALL_ELAST;
            this.y = height - this.r;
        }
        if(this.y < this.r){
            this.vy = -this.vy - BALL_ELAST;
            this.y = this.r;
        }

        //left&right boundingclearScreen();
        if (this.x > width - this.r){
            this.vx = -this.vx + BALL_ELAST * 2;
            this.x = width - this.r;
        }
        if (this.x < this.r){
            this.vx = -this.vx - BALL_ELAST * 2;
            this.x = this.r;
        }

        //physics
        this.vy = this.vy + GRAV;
    }
    draw(){
        ctx.fillStyle=this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fill();
    }
}

// loop() function
// INPUT: N/A
// OUTPUT: N/A
// Description: loop is used to create the canvas background and to recursively request animation frames. This animates the canvas.
function loop() {

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);

    for (const ball of balls){
        ball.draw();
        ball.update();
    }
    
    requestAnimationFrame(loop);
}

// MAIN FUNCTION
const balls = [];
while (balls.length < 100){
    const ball = new Ball(random(0, width), random(0, height), random(-50, 50), random(-50, 50), randomRGB(), random(1, 50));
    balls.push(ball);
}

loop();