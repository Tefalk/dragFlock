// Modified by Thomas Falk 2018.10.18, 2019.01.10
// to add an object to drag
// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Demonstration of Craig Reynolds' "Flocking" behavior
// See: http://www.red3d.com/cwr/
// Rules: Cohesion, Separation, Alignment

// Click mouse to add boids into the system

let flock;

let text;

var dragging = false; // Is the object being dragged?
var rollover = false; // Is the mouse over the ellipse?

var x, y, w, h; // Location and size
var offsetX, offsetY; // Mouseclick offset


function setup() {
  text = createP("Drag the mouse to generate new boids.");
  text.position(10, 365);

  createCanvas(640, 360);
  
  // Starting location
  x = 100;
  y = 100;
  // Dimensions
  w = 30;
  h = 30;
  
  flock = new Flock();
  // Add an initial set of boids into the system
  for (let i = 0; i < 60; i++) {
    let b = new Boid(width / 2, height / 2);
    flock.addBoid(b);
  }
}

function draw() {
  background(51);
  flock.run();
  
  // Is mouse over object
  if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
    rollover = true;
  } else {
    rollover = false;
  }

  // Adjust location if being dragged
  if (dragging) {
    x = mouseX + offsetX;
    y = mouseY + offsetY;
  }

  stroke(0);
  // Different fill based on state
  if (dragging) {
    fill(50);
  } else if (rollover) {
    fill(100);
  } else {
    fill(175, 200);
  }
  rect(x, y, w, h);
}

function mousePressed() {
  // Did I click on the rectangle?
  if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
    dragging = true;
    // If so, keep track of relative location of click to corner of rectangle
    offsetX = x - mouseX;
    offsetY = y - mouseY;
  }
}

function mouseReleased() {
  // Quit dragging
  dragging = false;
}

// Add a new boid into the System
function mouseDragged() {
  flock.addBoid(new Boid(mouseX, mouseY));
}
