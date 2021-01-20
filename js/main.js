document.addEventListener('keydown', inputManager);

var beepM = new Audio("/wav/move.wav");
var beepC = new Audio("/wav/catch.wav");
var beepF = new Audio("/wav/fail.wav");
const screenObj = document.getElementById("screen");
const bodyObj = document.getElementById("body");
const scoreObj = document.getElementById("score");
const timeObj = document.getElementById("time");
const timeColonObj = document.getElementById("timeColon");
const c1Obj = document.getElementById("c1");
const c2Obj = document.getElementById("c2");
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

function inputManager (e) {
    switch (e.key) {
        case "a":
            gameStartA();
            break;
        case "b":
            gameStartB();
            break;
        case "t":
            displayTime();
            break;
        case "ArrowLeft":
            move(-1);
            break;
        case "ArrowRight":
            move(1);
            break;
    }
}

async function displayTime() {
    var now = new Date();
    timeObj.innerHTML = " " + now.getHours() + now.getMinutes()
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
    await sleep(800);
    t = 500;
    if (gN!=gameN) return;
    tickA2(gN);
}

async function gameStartB() {
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