const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 512;
canvas.height = 512;
var lifePoint = 20 ;
class Coordinate {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
const keys = [];
var barrels = [
{
    x:10,
    y:10,
    width: 40,
    height: 40,
    default_x : 10,
    default_y : 10,
    dirX :4,
    dirY : 0
},
{
    x:100,
    y:200,
    width: 40,
    height: 40,
    default_x : 100,
    default_y : 200,
    dirX :4,
    dirY : 5
},
];
const hole = {
    x: 300,
    y : 300,
    width : 50,
    height : 50
};
const player = {
    x: 200,
    y: 200,
    width: 40,
    height: 56,
    frameX: 0,
    frameY: 0,
    speed: 10,
    moving: false
};
var tree = [
    {
        x: 200,
        y: 400,
        dead: false,
        width: 35,
        height: 42,
        frameX: 0,
        frameY: 0
    },
    {
        x: 200,
        y: 100,
        dead: false,
        width: 35,
        height: 42,
        frameX: 0,
        frameY: 0
    }

];
tree = [];
const barrelSprite = new Image();
barrelSprite.src = "barrel.png";
const personSprite = new Image();
personSprite.src = "tree.png";
const playerSprite = new Image();
playerSprite.src = "hulk.png";
const background = new Image();
background.src = "ground_01.png";

function drawHole(){
    ctx.fillStyle = 'black';
    ctx.fillRect(hole.x, hole.y, hole.width, hole.height);
}
function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
    //ctx.strokeRect(dX, dY, dW, dH);
}
/*function animate(){
   ctx.clearRect(0, 0, canvas.width,canvas.height);
    ctx.drawImage(background,0,0,canvas.width,canvas.height);
    
    drawSprite(playerSprite,player.frameX * player.width ,player.frameY * player.height,player.width,player.height,player.x,player.y,player.width,player.height);
    movePlayer();
    handlePlayerFrame();
    requestAnimationFrame(animate);
    //animate();
}

animate();*/

/*setInterval(function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    drawSprite(playerSprite, player.frameX * player.width, player.frameY * player.height, player.width, player.height, player.x, player.y, player.width, player.height);
    movePlayer();
    handlePlayerFrame();

}, 300);*/
window.addEventListener("keydown", function (e) {

    if (e.keyCode == 38 || e.keyCode == 40 || e.keyCode == 37 || e.keyCode == 39) {
        console.log("down");
        keys[e.keyCode] = true;
        player.moving = true;
    }

});
window.addEventListener("keyup", function (e) {
    delete keys[e.keyCode];
    console.log(e.keyCode);
    player.moving = false;
});

function movePlayer() {
    //up
    if (keys[38] && player.y > 0 && player.moving) {
        let last_pos = player.y;
        let last_fram = player.frameY;
        player.y -= player.speed;
        player.frameY = 3;
        if (detectColision()) {

            player.y = last_pos;
            player.frameY = last_fram;
        }
        //detectColision_Barrel('UP');
    }
    //Down
    if (keys[40] && player.y < canvas.height - player.height && player.moving) {
        let last_pos = player.y;
        let last_fram = player.frameY;
        player.y += player.speed;
        player.frameY = 0;
        if (detectColision()) {
            player.y = last_pos;
            player.frameY = last_fram;
        }
        //detectColision_Barrel('DOWN');

    }
    //left
    if (keys[37] && player.x > 0 && player.moving) {
        let last_pos = player.x;
        let last_fram = player.frameY;
        player.x -= player.speed;
        player.frameY = 1;
        if (detectColision()) {
            player.x = last_pos;
            player.frameY = last_fram;
        }
        //detectColision_Barrel('LEFT');

    }

    //Right
    if (keys[39] && player.x < canvas.width - player.width && player.moving) {
        let last_pos = player.x;
        let last_fram = player.frameY;
        player.x += player.speed;
        player.frameY = 2;
        if (detectColision()) {
            player.x = last_pos;
            player.frameY = last_fram;
        }
        //detectColision_Barrel('RIGHT');

    }
    detectColision_Barrel('RIGHT');
}
function handlePlayerFrame() {
    if (player.frameX < 3 && player.moving) player.frameX++;
    else player.frameX = 0;
}

let fps, fpsInterval, startTime, now, then, elapsed;

function starAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    animate();
    //mooveBare();
}
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function createRandomPerson() {
    const x = getRndInteger(100, 700);
    const y = getRndInteger(100, 400);
    person = {
        x: x,
        y: y,
        dead: false,
        width: 32,
        height: 48,
        frameX: 0,
        frameY: 0
    };
    console.log(x + " " + y);
}
function checkConditionCollide(player, person) {
    let coordonne_haut_gauche = new Coordinate(player.x, player.y);
    let coordonne_haut_droit = new Coordinate(player.x + player.width, player.y);
    let coordonne_bas_gauche = new Coordinate(player.x, player.y + player.height);
    let coordonne_bas_droit = new Coordinate(player.x + player.width, player.y + player.height);
    if (
        (coordonne_haut_gauche.x >= person.x && coordonne_haut_gauche.x <= person.x + person.width &&
            coordonne_haut_gauche.y >= person.y && coordonne_haut_gauche.y <= person.y + person.height
        ) ||
        (coordonne_haut_droit.x >= person.x && coordonne_haut_droit.x <= person.x + person.width &&
            coordonne_haut_droit.y >= person.y && coordonne_haut_droit.y <= person.y + person.height
        )
        ||
        (coordonne_bas_gauche.x >= person.x && coordonne_bas_gauche.x <= person.x + person.width &&
            coordonne_bas_gauche.y >= person.y && coordonne_bas_gauche.y <= person.y + person.height
        )
        ||
        (coordonne_bas_droit.x >= person.x && coordonne_bas_droit.x <= person.x + person.width &&
            coordonne_bas_droit.y >= person.y && coordonne_bas_droit.y <= person.y + person.height
        )
    ) {
        return true;
    }
}
function checkConditionCollide2(player, person) {
    let coordonne_haut_gauche = new Coordinate(player.x, player.y);
    let coordonne_haut_droit = new Coordinate(player.x + player.width, player.y);
    let coordonne_bas_gauche = new Coordinate(player.x, player.y + player.height);
    let coordonne_bas_droit = new Coordinate(player.x + player.width, player.y + player.height);
    if (
        (coordonne_haut_gauche.x >= person.x && coordonne_haut_gauche.x <= person.x + person.width &&
            coordonne_haut_gauche.y >= person.y && coordonne_haut_gauche.y <= person.y + person.height
        ) &&
        (coordonne_haut_droit.x >= person.x && coordonne_haut_droit.x <= person.x + person.width &&
            coordonne_haut_droit.y >= person.y && coordonne_haut_droit.y <= person.y + person.height
        )
        &&
        (coordonne_bas_gauche.x >= person.x && coordonne_bas_gauche.x <= person.x + person.width &&
            coordonne_bas_gauche.y >= person.y && coordonne_bas_gauche.y <= person.y + person.height
        )
        &&
        (coordonne_bas_droit.x >= person.x && coordonne_bas_droit.x <= person.x + person.width &&
            coordonne_bas_droit.y >= person.y && coordonne_bas_droit.y <= person.y + person.height
        )
    ) {
        return true;
    }
}
function detectColision() {
    for(let person of tree){
        if (checkConditionCollide(player, person) || checkConditionCollide(person, player)
        ) {
            console.log("Player : " + player.x + " " + player.y + "  and Person : " + person.x + " " + person.y);
            console.log("collision");
            //person.dead = true;
            //player.moving = false;
            return true;

        }
        
    }   
}
function detectColision_Barrel(keyCode) {
    for(let barrel of barrels){
        if (checkConditionCollide(barrel, player)  || checkConditionCollide(player, barrel)
        ) {
            console.log("Player : " + player.x + " " + player.y + "  and Barrel : " + barrel.x + " " + barrel.y);
            console.log("collision");
            //barrel.x = barrel.default_x;
            //barrel.y = barrel.default_y;
            removeElementFromArray(barrels,barrel);
            lifePoint--;
            document.getElementById("life").textContent="Vie: "+lifePoint;
            }

        }
        return false;
    }

function removeElementFromArray(array,element){
    const index = array.indexOf(element);
    if (index > -1) {
    array.splice(index, 1);
    }
}
function mooveBare(){
    //ctx.clearRect(barrels[0].x-1, barrels[0].y, barrels[0].width, barrels[0].height);
    var that = this;
    for(let barrel of barrels){
        if(barrel.x>512 || barrel.y>512){
            removeElementFromArray(barrels,barrel);
        }
        ctx.drawImage(barrelSprite, barrel.x, barrel.y, barrel.width, barrel.height);
            barrel.x +=barrel.dirX;
            barrel.y +=barrel.dirY;
        
    }
    //requestAnimationFrame(mooveBare);
}
function animate() {

    now = Date.now();
    elapsed = now - then;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    mooveBare();
    PlayerControl();
    requestAnimationFrame(animate);
}
function PlayerControl(){
    
    drawSprite(playerSprite, player.frameX * player.width, player.frameY * player.height, player.width, player.height, player.x, player.y, player.width, player.height);
    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
        movePlayer();
    
        handlePlayerFrame();
    }
    
}
function fillBarrel(){
    setInterval(() => {
        console.log("hello");
        const x = getRndInteger(0, 500);
    const y = getRndInteger(0, 500);
    const randomdirX = getRndInteger(2, 6);
    const randomdirY = getRndInteger(2, 6);
        barrels.push({
            x:x,
            y:y,
            width: 40,
            height: 40,
            default_x : x,
            default_y : y,
            dirX :randomdirX,
            dirY : randomdirY
        })
    }, 500);
}
starAnimating(20);
fillBarrel();