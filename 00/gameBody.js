/**
 * Created by newraina on 2015/9/14.
 */

function randResult() {
    // 生成随机结果
    var rand = Math.random();
    if (rand < 0.333) return "0";
    else if (rand < 0.666) return "1";
    else return "2";
}

function game(){
    var count = 0;
    var v = 50;
    var tempRand = randResult();

    gameAnimation(count, v,  tempRand);
}


function gameAnimation(count, v, tempRand) {
    // 电脑出拳动画
    var elements = computer.getElementsByTagName("img");

    for (var i = 0; i < 3; i++) {
        resertClass(elements[i], "mouseClick");
    }

    addClass(elements[count % 3], "mouseClick");

    count++;
    if (v > 320 && count%3 == tempRand) {
        return true;
    }
    else {
        v = v * 1.08;
    }
    tempAnimation = setTimeout("gameAnimation()", v);
}