var CANVAS_W = 1200;
var CANVAS_H = 600;

var BALL_COLOR = [125, 253, 254];
var BALL_SIZE = 20;
var JUMP_SPEED = -8;
var FALL_SPEED = 3;

var BLK_COLOR = [125, 253, 254];
var BLK_GAP = 200;
var BLK_GAP_MIN = 50;
var BLK_GAP_MAX = CANVAS_H / 2;
var BLK_FQ = 150;
var BLK_SPEED = 5;
var BLK_Y = 100;
var BLK_NUM = 100;

var CHEATED = 0;

class Ball {
    constructor() {
        this.x = BALL_SIZE * 2;
        this.y = height / 2;
        this.size = BALL_SIZE;
        this.speed = 5;
    }

    display() {
        var img = loadImage('img/wat.jpg');
        fill(BALL_COLOR);
        noStroke();
        ellipse(this.x, this.y, this.size, this.size);
        image(img, 0, 0);
    }

    move() {
        if (keyCode === UP_ARROW)
            this.y += JUMP_SPEED;
        else
            return false;
    }

    drop() {
        this.y += FALL_SPEED;
        if (this.y > height || this.y < 0)
            return 0;
        return 1;
    }

    isvalid(blk_arr) {
        for (var i = 0; i < blk_arr.length; i++) {
            if (this.x == blk_arr[i][0] && !CHEATED) {
                if (this.y - BALL_SIZE / 2 < blk_arr[i][1] || this.y + BALL_SIZE / 2 > blk_arr[i][2])
                    return 0;
            }
        }
        return 1;
    }
}

class Block {
    constructor() {
        this.x = width / 2;
        this.y_arr = [];
        for (var i = 0; i < BLK_NUM; i++)
            this.y_arr.push(random(BLK_GAP_MIN, BLK_GAP_MAX));
    }

    display() {
        var blk_arr = [];
        stroke(BLK_COLOR);
        for (var i = 0; i < BLK_NUM; i++) {
            var offs_y = BLK_FQ * i;
            line(this.x + offs_y, 0, this.x + offs_y, this.y_arr[i]);
            line(this.x + offs_y, height, this.x + offs_y, this.y_arr[i] + BLK_GAP);

            if (this.x + offs_y > 0) {
                blk_arr.push([this.x + offs_y, this.y_arr[i], this.y_arr[i] + BLK_GAP]);
            }
        }
        this.x -= BLK_SPEED;

        return blk_arr;
    }
}

function setup() {
    createCanvas(CANVAS_W, CANVAS_H);
    ball = new Ball();
    block = new Block();
}

function draw() {
    background(0);
    noFill();
    strokeWeight(5);

    var blk_arr = block.display();

    if (!ball.drop()) {
        alert("HUEHUEHUE");
        noLoop();
    }
    
    if (keyIsPressed)
        ball.move();

    if(!ball.isvalid(blk_arr)){
        alert("HUEHUEHUE");
        noLoop();
    }
    ball.display();
}
