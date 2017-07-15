//declare socket for the client and connect to server
const socket = io.connect('localhost:8080');

function setup() {
    createCanvas(600, 600);
    background(0);
    socket.on('mouse', (data) => {
        noStroke();
        fill('blue');
        ellipse(data.x, data.y, 15, 15);
    });
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
    noStroke(); // removes the boundary from the shape
    fill('red');
    ellipse(mouseX, mouseY, 15, 15);
}