/**
 * Created by newraina on 2015/9/14.
 */

function randResult() {
    // 生成随机结果
    var rand = Math.random();
    if (rand < 0.333) return 0;
    else if (rand < 0.666) return 1;
    else return 2;
}

var count = 0;
var v = 60;
var tempRand = randResult();
var oldTempRand;
function game() {
    gameAnimation();
}
function gameAnimation() {
    // 电脑出拳动画
    var elements = computer.getElementsByTagName("img");

    for (var i = 0; i < 3; i++) {
        resertClass(elements[i], "mouseClick");
    }

    addClass(elements[count % 3], "mouseClick");

    count++;

    v = v * 1.12;

    if (count > 12 && (count % 3 == tempRand)) {
        count = 0;
        v = 60;
        oldTempRand = tempRand;
        tempRand = randResult();
    } else {
        tempAnimation = setTimeout('gameAnimation()', v);
    }


}
