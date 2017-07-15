//declare socket for the client and connect to server
const socket = io.connect('localhost:8080');
var startPage = true;
var canvas, button, input;
let data = {
    x: 0,
    y: 0,
    name: "karan"
};
var friendP;
function setup() {
    canvas = createCanvas(600, 600);
    button
        = createButton('Start Drawing');
    input = createInput("", String);

    setSketchParent();
    background(0);
    takeUserInput();

    socket.on('mouse', (data) => {
            if (friendP) friendP.remove();
            friendP = createP(data.name);
            friendP.style('color','blue');
            friendP.position(canvas.position().x + data.x, canvas.position().y + data.y);
            noStroke();
            fill('blue');
            ellipse(data.x, data.y, 15, 15);
/*            fill('blue')
            text(data.name, data.x, data.y);
            textSize(20);*/
        });
}

function draw() {
}

//draw only on mouse drag
function mouseDragged() {
    if (!startPage) {
        data.x = mouseX;
        data.y = mouseY;
        socket.emit('mouse', data);
        noStroke(); // removes the boundary from the shape
        fill('red');
        ellipse(data.x, data.y, 15, 15);
    }
}

function setSketchParent() {
    canvas.parent('sketch-holder');
    canvas.style('position','absolute');
    button.parent('sketch-holder');
    button.style('position', 'absolute');
    input.parent('sketch-holder');
    input.style('position', 'absolute');
}

////Interface////

/**
 * Declare dom elements to show on the
 * canvas for fetching username.
 */
function takeUserInput() {
    //Button
    button.style('margin-top', height/2 - 70 + "px");
    button.style('margin-left', width/2 + 30 + "px");
    button.mouseClicked(takeUserName);
    button.size(100, 30);

    //Text input
    input.style('margin-top', height/2 - 70 + "px");
    input.style('margin-left', width/2 - 120 + "px");
    input.size(150, 30);
    input.attribute('placeholder', 'Enter your name!');
    input.mousePressed(changeButtonTextColor);
}

/**
 * Verify if user provided an input
 */
function takeUserName() {
    if (input.value() == "") {
        button.style('color', 'red');
        input.attribute('placeholder', 'Please Enter Name');
    } else {
        var welcomePara = document.getElementById('welcomeTag');
        var username = input.value();
        username = username.charAt(0).toUpperCase() + username.slice(1);
        welcomePara.innerHTML = "Welcome " + username + "! Start Drawing!";
        console.log(canvas.position().x + ": " + canvas.position().y)
        data.name = username;
        startPage = false;
        input.remove();
        button.remove();
    }
}

/**
 * If the color of button is red change back to
 * black on user mouse press on input
 */
function changeButtonTextColor() {
    button.style('color', 'black');
}