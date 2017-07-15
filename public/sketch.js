//declare socket for the client and connect to server
const socket = io.connect('http://localhost:3000');

function setup() {
    createCanvas(600, 600);
    background(0);
}

function draw() {

}

//draw only on mouse drag
function mouseDragged() {
    var data = {
        x: mouseX,
        y: mouseY
    }
    socket.emit('mouse', data);
    console.log(mouseX + ', ' + mouseY);
    noStroke(); // removes the boundary from the shape
    fill('red');
    ellipse(mouseX, mouseY, 15, 15);
}