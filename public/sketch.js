//declare socket for the client and connect to server
const socket = io.connect('localhost:8080');
var startPage = true;
var button, input;
let data = {
    x: 0,
    y: 0,
    name: "karan"
};

function setup() {
    createCanvas(600, 600);
    background(0);
    takeUserInput();

    if (!startPage) {
        socket.on('mouse', (data) => {
            noStroke();
            fill('blue');
            ellipse(data.x, data.y, 15, 15);
        });
    }
}

function draw() {
}

//draw only on mouse drag
function mouseDragged() {
    if (!startPage) {
        socket.emit('mouse', data);
        noStroke(); // removes the boundary from the shape
        fill('red');
        ellipse(mouseX, mouseY, 15, 15);
    }
}

/**
 * Declare dom elements to show on the
 * canvas for fetching username.
 */
function takeUserInput() {
    //Text input
    input = createInput("", String);
    input.position(width/2 - 120, height/2);
    input.attribute('placeholder', 'Enter your name!');
    input.mousePressed(changeButtonTextColor);

    //Button
    button = createButton('Start Drawing');
    button.position(width/2 + 30, height/2);
    button.mouseClicked(takeUserName);
}

/**
 * Verify if user provided an input
 */
function takeUserName() {
    if (input.value() == "") {
        button.style('color', 'red');
        input.attribute('placeholder', 'Please Enter Name');
    } else {
        data.name = input.value();
    }
}

/**
 * If the color of button is red change back to
 * black on user mouse press on input
 */
function changeButtonTextColor() {
    button.style('color', 'black');
}