function setup() {
    createCanvas(600, 600);
    background(0);
}

function draw() {
    noStroke(); // removes the boundary from the shape
    fill('red');
    ellipse(mouseX, mouseY, 15, 15);
}