var canvas;
var main_loop;

var NUM_GROWERS = 10;
var CANVAS_MARGIN = 10;
var GROWER_START_SIZE = 50;
var GROWER_TARGET_SIZE = 75;

var current_growing = null;
var growers = [];

function Grower (x, y) {
    this.x = x;
    this.y = y;
    this.size = GROWER_START_SIZE;
    this.growing = false;
    this.locked = false;
    this.dead = false;
}
Grower.prototype.draw = function (ctx) {
    if (this.dead) {
	return;
    }
    ctx.beginPath ();
    if (this.locked) {
	ctx.fillStyle = "rgb(200, 215, 255)";
    } else {
	ctx.fillStyle = "rgb(255, 255, 255)";
    }
    ctx.arc (this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fill();
};
Grower.prototype.update = function () {
    if (this.dead) {
	return;
    }
    if (this.locked) {
	return;
    }
    if (this.growing) {
	this.size += .5;
    } else {
	if (current_growing) {
	    this.size -= .2;
	} else {
	    this.size -= 0;
	}
    }

    if (this.size <= 0) {
	this.dead = true;
    }
    if (this.size >= GROWER_TARGET_SIZE) {
	this.locked = true;
    }
};

function generate_growers () {
    for (var i = 0; i < NUM_GROWERS; i++) {
	var redo = false;
	var x = Math.floor(Math.random() * (canvas.width - (CANVAS_MARGIN + GROWER_TARGET_SIZE) * 2)
			   + CANVAS_MARGIN + GROWER_TARGET_SIZE);
	var y = Math.floor(Math.random() * (canvas.height - (CANVAS_MARGIN + GROWER_TARGET_SIZE) * 2)
			   + CANVAS_MARGIN + GROWER_TARGET_SIZE);
	for (g in growers) {
	    if (hypot (x - growers[g].x, y - growers[g].y) < GROWER_TARGET_SIZE * 2 + 10) {
		redo = true;
		break;
	    }
	}
	if (redo) {
	    i--;
	    continue;
	}
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

    var found = null;

    for (g in growers) {
	if (growers[g].dead) {
	    continue;
	}

	if (hypot (x - growers[g].x, y - growers[g].y) < growers[g].size) {
	    growers[g].growing = true;
	    found = growers[g];
	} else {
	    growers[g].growing = false;
	}
    }

    current_growing = found;

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
