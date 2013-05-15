var canvas;
var main_loop;

var NUM_GROWERS = 10;
var CANVAS_MARGIN = 10;

var growers = [];

function Grower (x, y) {
    this.x = x;
    this.y = y;
    this.size = 5;
    this.growing = false;
}
Grower.prototype.draw = function (ctx) {
    ctx.beginPath ();
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.arc (this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fill();
};
Grower.prototype.update = function () {
    if (this.growing) {
	this.size += .5;
    }
};

function generate_growers () {
    for (var i = 0; i < NUM_GROWERS; i++) {
	var x = Math.floor(Math.random() * (canvas.width - CANVAS_MARGIN * 2) + CANVAS_MARGIN);
	var y = Math.floor(Math.random() * (canvas.height - CANVAS_MARGIN * 2) + CANVAS_MARGIN);
	growers.push (new Grower (x, y));
    }
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

    for (g in growers) {
	growers[g].update ();
    }
}

var mouse = new Object();

function motion (evt) {
    var x = evt.offsetX - 5;
    var y = evt.offsetY - 5;

    for (g in growers) {
	if (hypot (x - growers[g].x, y - growers[g].y) < growers[g].size) {
	    growers[g].growing = true;
	} else {
	    growers[g].growing = false;
	}
    }

    mouse.x = x;
    mouse.y = y;
}

function init () {
    canvas = $("#canvas")[0];

    mouse.x = 0;
    mouse.y = 0;

    $("#canvas").mousemove (motion);

    generate_growers ();

    main_loop = setInterval (update, 1000.0 / 30);
}

$(document).ready (init);
