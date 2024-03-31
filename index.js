const canvas = document.getElementById("gameArea");
const ctx = canvas.getContext("2d");

//PHYSICS CONSTANTS
const GRAV = 4;
const BALL_ELAST = .5;



let r = 15; // radius
let vx = 20; // X Velocity
let vy = 20; // Y Velocity
let x = 50; // X Coordinate
let y = r; // Y Coordinate
let coords = [x, y];

let points = [];

function drawGame() {
    requestAnimationFrame(drawGame);
    clearScreen();

    //print Circle
    ctx.fillStyle="green";
    ctx.beginPath();
    ctx.arc(coords[0], coords[1], r, 0, 2 * Math.PI);
    ctx.fill();
    
    coords[0] = coords[0] + vx;
    coords[1] = coords[1] + vy;

    //top&bottom bounding + elasticity
    if (coords[1] > canvas.height - r){
        vy = -vy + BALL_ELAST;
        coords[1] = canvas.height - r;
    }
    if(coords[1] < r){
        vy = -vy - BALL_ELAST;
        coords[1] = r;
    }

    //left&right bounding
    if (coords[0] > canvas.width - r){
        vx = -vx + BALL_ELAST * 2;
        coords[0] = canvas.width - r;
    }
    if (coords[0] < r){
        vx = -vx - BALL_ELAST * 2;
        coords[0] = r;
    }

    //physics
    vy = vy + GRAV;
    if (vx == 0 && vy == 0){
        stop();
    }

}

function clearScreen() {

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    

}

drawGame();
