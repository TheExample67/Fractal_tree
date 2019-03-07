canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');

var mouseX;
var mouseY;
var levels = [];
var branches = [];
var No_of_branches = 2;
var No_of_levels = 10;
var ColorTheme = ['#287682', '#14ABBD', '#FFAA00', '#FF6000', '#FF3800'];



//Listeners

window.addEventListener('load', resize, false);
window.addEventListener('resize', resize, false);

window.addEventListener('mousemove', function (evt) {
    var mousePos = getMousePos(canvas, evt);
    mouseX = mousePos.x;
    mouseY = mousePos.y;
}, false);

function getMousePos(canvas, evt) {
    return {
        x: evt.clientX,
        y: evt.clientY
    };
}


function resize() {
    var canvas_height = window.innerHeight;
    var canvas_width = window.innerWidth;
    canvas.width = canvas_width;
    canvas.height = canvas_height;
    init();
}


//Classes
class Branch {
    constructor(x, y, angle, length, color, level) {
        //Position
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.length = length
        //Properties
        this.color = color;
        this.level = level;
    };
    draw() {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = "50px";
        ctx.moveTo(this.x, this.y);
        ctx.lineTo((this.x + (Math.cos(this.angle) * this.length)), this.y - (Math.sin(this.angle) * this.length));
        ctx.stroke();
    }
}

//
function GenerateBranch(count) {
    var prev_x = canvas.width / 2;
    var prev_y = canvas.height;
    var prev_len = canvas.height / 10;
    var prev_ang = Math.PI / 2;
    var lvl = 0;
    branches.push(new Branch(prev_x,prev_y,prev_ang,prev_len,ColorTheme[Math.floor(Math.random() * ColorTheme.length)],0))
    for (let i = 1; i < count; i++) {
        var tempColor = ColorTheme[Math.floor(Math.random() * ColorTheme.length)];
        new_angle = Math.random() * Math.PI/2;
        branches.forEach(branch => {
            if (i-1 == branch.level) {
                new_len = branch.length * 0.86;
                new_x = branch.x + (branch.length * Math.cos(branch.angle));
                new_y = branch.y - (branch.length * Math.sin(branch.angle));



                branches.push(new Branch(
                    new_x,
                    new_y,
                    new_angle,
                    new_len,
                    tempColor,
                    i));
                branches.push(new Branch(
                    new_x,
                    new_y,
                    Math.PI -  new_angle,
                    new_len,
                    tempColor,
                    i));
            }
        });

        prev_x = new_x;
        prev_y = new_y;
        prev_len = new_len;
        prev_ang = new_angle;
    }
}


//General Funcitons
function init() {
    //resize();
    branches = [];
    GenerateBranch(No_of_levels);
    branches.forEach(e => {
        e.draw();
    });
};

function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    branches.forEach(e => {
        e.draw();
    });
};

init();
setInterval(draw(),0);
