let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

canvas.width = window.innerWidth - 30;
canvas.height = window.innerHeight;

canvas.style.border = "5px solid red";

let canvas_width = canvas.width;
let canvas_height = canvas.height;

let shapes = [];
let current_shape_index = null;
let is_dragging = false;

let startX;
let startY;

shapes.push({ x: 200, y: 50, width: 200, height: 200, color: "red" });
shapes.push({ x: 10, y: 10, width: 100, height: 100, color: "blue" });

let is_mouse_in_shape = function (x, y, shape) {
  let shape_left = shape.x;
  let shape_right = shape.x + shape.width;
  let shape_top = shape.y;
  let shape_bottom = shape.y + shape.height;

  if (x > shape_left && x < shape_right && y > shape_top && y < shape_bottom) {
    return true;
  }
  return false;
};

let mouse_down = function (event) {
  event.preventDefault();

  startX = parseInt(event.clientX);
  startY = parseInt(event.clientY);

  let index = 0;
  for (let shape of shapes) {
    if (is_mouse_in_shape(startX, startY, shape)) {
      console.log("yes");

      current_shape_index = index;
      is_dragging = true;
      return;
    } else {
      console.log("no");
    }
    index++;
  }
};

let mouse_up = function (event) {
  if (!is_dragging) {
    return;
  }
  event.preventDefault();
  is_dragging = false;
};

let mouse_out = function (event) {
  if (!is_dragging) {
    return;
  }
  event.preventDefault();
  is_dragging = false;
};

let mouse_move = (event) => {
  if (!is_dragging) {
    return;
  } else {
    event.preventDefault();
    let mouseX = parseInt(event.clientX);
    let mouseY = parseInt(event.clientY);

    let dx = mouseX - startX;
    let dy = mouseY - startY;

    let current_shape = shapes[current_shape_index];
    console.log("current_shape", current_shape);
    current_shape.x  += dx;
    current_shape.y += dy;

    draw_shapes()

    startX = mouseX
    startY = mouseY
   }
};

canvas.onmousedown = mouse_down;
canvas.onmouseup = mouse_up;
canvas.onmouseout = mouse_out;
canvas.onmousemove = mouse_move;

const draw_shapes = () => {
  context.clearRect(0, 0, canvas_width, canvas_height);
  for (let shape of shapes) {
    context.fillStyle = shape.color;
    context.fillRect(shape.x, shape.y, shape.width, shape.height);
  }
};

draw_shapes();
