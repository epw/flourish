var canvas;
var main_loop;

var growers = [];

function Grower (x, y) {
    this.x = x;
    this.y = y;
}
Grower.prototype.draw = function (ctx) {
    ctx.beginPath ();
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.arc (this.x, this.y, 5, 0, Math.PI * 2, false);
    ctx.fill();
}

function draw () {
    ctx = canvas.getContext ('2d');

    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fillRect (0, 0, canvas.width, canvas.height);

    for (g in growers) {
	growers[g].draw (ctx);
    }
}

function update () {
    draw ();
}

function init () {
    canvas = $("#canvas")[0];

    growers.push (new Grower (400, 300));

    main_loop = setInterval (update, 1000.0 / 30);
}

$(document).ready (init);
