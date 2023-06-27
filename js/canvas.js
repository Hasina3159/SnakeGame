let restart = document.getElementById("restart");
let modal = document.getElementById("modal");
let win = document.getElementById("win");
let score = document.getElementById("score");

restart.addEventListener("click", (e) => {
    modal.style.display = "none";
    init()
})

//-------------------------------------------------
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let body = document.body;
//-------------------------------------------------

let s = [[240, 240], [240, 260],[240, 280],[240,300]];
let xs = 0;
let ys = 0;
let t = 20;
let direction = "Pause"
let l = false;

window.addEventListener("keydown", (e)=>{
    if(direction !== "Pause"){
        if(
            ((direction !== "ArrowUp") && (e.key == "ArrowDown")) ||
            ((direction !== "ArrowDown") && (e.key == "ArrowUp")) ||
            ((direction !== "ArrowLeft") && (e.key == "ArrowRight")) ||
            ((direction !== "ArrowRight") && (e.key == "ArrowLeft")) 
        ){
            direction = e.key;
        }
    }else{
        if(e.key != "ArrowDown"){
            direction = e.key;
        }
    }
})

function init(){
    s = [[240, 240], [240, 260],[240, 280],[240,300]];
    food();
    t = 20;
    direction = "Pause"
    l = false;
}

function up(){
    if(!l){
        s.pop();
    }
    s = [[s[0][0], s[0][1]-t]].concat(s)
}

function down(){
    if(!l){
        s.pop();
    }
    s = [[s[0][0], s[0][1]+t]].concat(s)
}

function left(){
    if(!l){
        s.pop();
    }
    s = [[s[0][0]-t, s[0][1]]].concat(s)
}

function right(){
    if(!l){
        s.pop();
    }
    s = [[s[0][0]+t, s[0][1]]].concat(s)
}

function snake(){
    s.map(i => {
        ctx.fillRect(i[0], i[1], t, t)
        ctx.fillStyle = "gold";
        ctx.fillRect(i[0], i[1], t, t)
    })
}


function move(){
    if(direction=="ArrowUp"){
        up()
    }else if(direction == "ArrowDown"){
        down()
    }else if(direction == "ArrowLeft"){
        left()
    }else if(direction == "ArrowRight"){
        right()
    }
    changeScore();
    gameOver();
    clr();
    affs();
    eat();
    snake();
}

function affs(){
    ctx.fillStyle = "red";
    ctx.fillRect(xs, ys, t, t)
}

function food(){
    xs = Math.random()*500;
    xs = xs - (xs%t);
    ys = Math.random()*500;
    ys = ys - (ys%t);
}

function eat(){
    if(s[0][0] == xs && s[0][1] == ys){
        l = true;
        food()
    }else{
        l = false;
    }
}

function clr(){
    ctx.clearRect(0, 0, 500, 500)
}

function showGO(){
    win.innerHTML =  "Game Over! <br /> Score : " + (s.length-4)*10;
    modal.style.display = "flex";
    direction = "none";
    restart.value = "Restart"
}

function gameOver(){
    var x = s[0][0];
    var y = s[0][1];
    if(((x < 0) || (x >= 500)) || ((y < 0) || (y >= 500))){
        showGO();
    }
    for(var i = 1; i < s.length; i++){
        if(s[i][0] == x && s[i][1] == y){
            showGO();
            return true;
        }
    }
}

function changeScore(){
    score.innerText = "Score : " + (s.length-4)*10;
}

setInterval(move, 100);
food();
