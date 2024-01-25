document.querySelector("body").addEventListener("mousemove", e => eyeball(e));
function eyeball(e) {
  var eye = document.querySelectorAll(".eye");
  eye.forEach(function(eye) {
    // x & y are variables and x represents the x coordinate of the mouse and y represents the coordinate of the mouse.
    let x = eye.getBoundingClientRect().left + eye.clientWidth / 2;
    let y = eye.getBoundingClientRect().top + eye.clientHeight / 2;
    let radian = Math.atan2(e.pageX - x, e.pageY - y);
    //   rot is a variable (short for rotate)
    let rot = radian * (180 / Math.PI) * -1 + 270;
    eye.style.transform = "rotate(" + rot + "deg)";
  });
}