var beepM = document.getElementById("beepM");
var beepC = document.getElementById("beepC");
var beepF = document.getElementById("beepF");
const screenObj = document.getElementById("screen");
const bodyObj = document.getElementById("body");
const scoreObj = document.getElementById("score");
const timeObj = document.getElementById("time");
const timeColonObj = document.getElementById("timeColon");
const c1Obj = document.getElementById("c1");
const c2Obj = document.getElementById("c2");
const lButtonObj = document.getElementById("lButton");
const rButtonObj = document.getElementById("rButton");
const buttonAObj = document.getElementById("buttonA");
const buttonBObj = document.getElementById("buttonB");
const buttonTObj = document.getElementById("buttonT");
var b1 = 1;
var b2 = 10;
var b3 = 1;
var v1 = 1;
var v2 = -1;
var v3 = 1;
var a = 2;
var t = 500;
var score = 0;
var gameN = 0;
var gameON = 0;

document.addEventListener('keydown', inputManager);
document.addEventListener('keyup', keyupManager);
lButtonObj.addEventListener('click', function() { move(-1); });
rButtonObj.addEventListener('click', function() { move(1); });
buttonAObj.addEventListener('click', gameStartA);
buttonBObj.addEventListener('click', gameStartB);
buttonTObj.addEventListener('click', displayTime);

function inputManager (e) {
    switch (e.key) {
        case "a":
        case "A":
            buttonAObj.classList.add("button-active");
            gameStartA();
            break;
        case "b":
        case "B":
            buttonBObj.classList.add("button-active");
            gameStartB();
            break;
        case "t":
        case "T":
            buttonTObj.classList.add("button-active");
            displayTime();
            break;
        case "ArrowLeft":
            lButtonObj.classList.add("mButton-active");
            move(-1);
            break;
        case "ArrowRight":
            rButtonObj.classList.add("mButton-active");
            move(1);
            break;
    }
}

function keyupManager (e) {
    switch (e.key) {
        case "a":
        case "A":
            buttonAObj.classList.remove("button-active");
            break;
        case "b":
        case "B":
            buttonBObj.classList.remove("button-active");
            break;
        case "t":
        case "T":
            buttonTObj.classList.remove("button-active");
            break;
        case "ArrowLeft":
            lButtonObj.classList.remove("mButton-active");
            break;
        case "ArrowRight":
            rButtonObj.classList.remove("mButton-active");
            break;
    }
}

async function displayTime() {
    var now = new Date();
    let minutes = now.getMinutes();
    if (minutes<10) minutes="0"+minutes;
    timeObj.innerHTML = " " + now.getHours() + minutes;
    timeColonObj.classList.add("on");
    timeObj.classList.add("on");
    scoreObj.classList.remove("on");
    await sleep(1500);
    timeObj.innerHTML = "";
    timeColonObj.classList.remove("on");
    timeObj.classList.remove("on");
    scoreObj.classList.add("on");
}

async function move(d) {
    if (gameON==0) return;
    let p = a + d;
    if (p<1 || p>3) return;
    document.getElementById("a1"+a).classList.remove("on");
    document.getElementById("a2"+a).classList.remove("on");
    document.getElementById("a1"+p).classList.add("on");
    document.getElementById("a2"+p).classList.add("on");
    if (a==1) {
        document.getElementById("l22").classList.remove("on");
        document.getElementById("l21").classList.add("on");
    } else if (a==3) {
        document.getElementById("l12").classList.remove("on");
        document.getElementById("l11").classList.add("on");
    }
    if (p==1) {
        document.getElementById("l21").classList.remove("on");
        document.getElementById("l22").classList.add("on");
    } else if (p==3) {
        document.getElementById("l11").classList.remove("on");
        document.getElementById("l12").classList.add("on");
    }
    a=p;
}

async function gameStartA() {
    gameON=0;
    gameN++;
    let gN = gameN;
    screenOff();
    b1 = 1;
    b2 = 10;
    v1 = 1;
    v2 = -1;
    a = 2;
    score = 0;
    scoreObj.innerHTML = score;
    await screenOn();
    document.getElementById("b1"+b1).classList.add("on");
    document.getElementById("b2"+b2).classList.add("on");
    gameON=1;
    await sleep(800);
    t = 500;
    if (gN!=gameN) return;
    tickA2(gN);
}

async function gameStartB() {
    gameON=0;
    gameN++;
    let gN = gameN;
    screenOff();
    b1 = 1;
    b2 = 10;
    b3 = 1;
    v1 = 1;
    v2 = -1;
    v3 = 1;
    a = 2;
    score = 0;
    scoreObj.innerHTML = score;
    await screenOn();
    document.getElementById("b1"+b1).classList.add("on");
    document.getElementById("b2"+b2).classList.add("on");
    document.getElementById("b3"+b3).classList.add("on");
    gameON=1;
    await sleep(800);
    t = 350;
    if (gN!=gameN) return;
    tickB3(gN);
}

function tlower() {
    t *= 1-t/8000;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function screenOn() {
    screenObj.classList.add("allon");
    await sleep(1000);
    bodyObj.classList.add("on");
    scoreObj.classList.add("on");
    document.getElementById("a12").classList.add("on");
    document.getElementById("a22").classList.add("on");
    document.getElementById("l11").classList.add("on");
    document.getElementById("l21").classList.add("on");
    screenObj.classList.remove("allon");
}

function screenOff() {
    let onEle = document.querySelectorAll(".on");
    var i;
    for (i = 0; i < onEle.length; i++) {
        onEle[i].classList.remove("on");
    }
}

async function tickA2(gN) {
    let p2 = b2 + v2;
    if (p2>10) {
        if (a==2) {
            v2 *= -1;
            score += 1;
            scoreObj.innerHTML = score;
            tlower();
            beepC.currentTime = 0;
            beepC.play();
        } else {
            document.getElementById("b210").classList.remove("on");
            c2Obj.classList.add("on");
            beepF.play();
            gameON=0;
            return;
        }
    } else if (p2<1) {
        if (a==2) {
            v2 *= -1;
            score += 1;
            scoreObj.innerHTML = score;
            tlower();
            beepC.currentTime = 0;
            beepC.play();
        } else {
            document.getElementById("b21").classList.remove("on");
            c1Obj.classList.add("on");
            beepF.play();
            gameON=0;
            return;
        }
    } else {
        document.getElementById("b2"+b2).classList.remove("on");
        document.getElementById("b2"+p2).classList.add("on");
        b2 = p2;
        beepM.currentTime = 0;
        beepM.play();
    }
    await sleep(t);
    if (gN!=gameN) return;
    tickA1(gN);
}

async function tickA1(gN) {
    let p1 = b1 + v1;
    if (p1>12) {
        if (a==3) {
            v1 *= -1;
            score += 1;
            scoreObj.innerHTML = score;
            tlower();
            beepC.currentTime = 0;
            beepC.play();
        } else {
            document.getElementById("b112").classList.remove("on");
            c2Obj.classList.add("on");
            beepF.play();
            gameON=0;
            return;
        }
    } else if (p1<1) {
        if (a==1) {
            v1 *= -1;
            score += 1;
            scoreObj.innerHTML = score;
            tlower();
            beepC.currentTime = 0;
            beepC.play();
        } else {
            document.getElementById("b11").classList.remove("on");
            c1Obj.classList.add("on");
            beepF.play();
            gameON=0;
            return;
        }
    } else {
        document.getElementById("b1"+b1).classList.remove("on");
        document.getElementById("b1"+p1).classList.add("on");
        b1 = p1;
        beepM.currentTime = 0;
        beepM.play();
    }
    await sleep(t);
    if (gN!=gameN) return;
    tickA2(gN);
}

async function tickB3(gN) {
    let p3 = b3 + v3;
    if (p3>8) {
        if (a==1) {
            v3 *= -1;
            score += 10;
            scoreObj.innerHTML = score;
            tlower();
            beepC.currentTime = 0;
            beepC.play();
        } else {
            document.getElementById("b38").classList.remove("on");
            c2Obj.classList.add("on");
            beepF.play();
            gameON=0;
            return;
        }
    } else if (p3<1) {
        if (a==3) {
            v3 *= -1;
            score += 10;
            scoreObj.innerHTML = score;
            tlower();
            beepC.currentTime = 0;
            beepC.play();
        } else {
            document.getElementById("b31").classList.remove("on");
            c1Obj.classList.add("on");
            beepF.play();
            gameON=0;
            return;
        }
    } else {
        document.getElementById("b3"+b3).classList.remove("on");
        document.getElementById("b3"+p3).classList.add("on");
        b3 = p3;
        beepM.currentTime = 0;
        beepM.play();
    }
    await sleep(t);
    if (gN!=gameN) return;
    tickB2(gN);
}

async function tickB2(gN) {
    let p2 = b2 + v2;
    if (p2>10) {
        if (a==2) {
            v2 *= -1;
            score += 10;
            scoreObj.innerHTML = score;
            tlower();
            beepC.currentTime = 0;
            beepC.play();
        } else {
            document.getElementById("b210").classList.remove("on");
            c2Obj.classList.add("on");
            beepF.play();
            gameON=0;
            return;
        }
    } else if (p2<1) {
        if (a==2) {
            v2 *= -1;
            score += 10;
            scoreObj.innerHTML = score;
            tlower();
            beepC.currentTime = 0;
            beepC.play();
        } else {
            document.getElementById("b21").classList.remove("on");
            c1Obj.classList.add("on");
            beepF.play();
            gameON=0;
            return;
        }
    } else {
        document.getElementById("b2"+b2).classList.remove("on");
        document.getElementById("b2"+p2).classList.add("on");
        b2 = p2;
        beepM.currentTime = 0;
        beepM.play();
    }
    await sleep(t);
    if (gN!=gameN) return;
    tickB1(gN);
}

async function tickB1(gN) {
    let p1 = b1 + v1;
    if (p1>12) {
        if (a==3) {
            v1 *= -1;
            score += 10;
            scoreObj.innerHTML = score;
            tlower();
            beepC.currentTime = 0;
            beepC.play();
        } else {
            document.getElementById("b112").classList.remove("on");
            c2Obj.classList.add("on");
            beepF.play();
            gameON=0;
            return;
        }
    } else if (p1<1) {
        if (a==1) {
            v1 *= -1;
            score += 10;
            scoreObj.innerHTML = score;
            tlower();
            beepC.currentTime = 0;
            beepC.play();
        } else {
            document.getElementById("b11").classList.remove("on");
            c1Obj.classList.add("on");
            beepF.play();
            gameON=0;
            return;
        }
    } else {
        document.getElementById("b1"+b1).classList.remove("on");
        document.getElementById("b1"+p1).classList.add("on");
        b1 = p1;
        beepM.currentTime = 0;
        beepM.play();
    }
    await sleep(t);
    if (gN!=gameN) return;
    tickB3(gN);
}