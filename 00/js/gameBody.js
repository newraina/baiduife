"use strict";

function randResult() {
    // 生成随机结果
    var rand = Math.random();
    if (rand < 0.333) {
        return 0;
    } else if (rand < 0.666) {
        return 1;
    } else {
        return 2;
    }
}
var count = 0;
var v = 60;
var tempRand = randResult();
var oldTempRand;
var win_count = 0;

function game() {
    //结果区域恢复初始显示：游戏开始
    showResult('default');
    gameAnimation();
}

function gameAnimation() {
    // 电脑出拳动画
    var elements = computer.getElementsByTagName("img");
    for (var i = 0; i < 3; i++) {
        resertClass(elements[i], "mouseClick");
    }
    addClass(elements[count % 3], "mouseClick");
    count+=1;
    v = v * 1.12;
    if (count > 12 && ((count-1) % 3 == tempRand)) {
        count = 0;
        v = 60;
        oldTempRand = tempRand;
        tempRand = randResult();

        //比较我和电脑谁出的大
        var me_selec_class = current_mouse_on.className;
        var me_selec;
        var computer_selec = oldTempRand;
        if (me_selec_class.search('jiandao') != -1) {
            me_selec = 0;
        } else if (me_selec_class.search('shitou') != -1) {
            me_selec = 1;
        } else {
            me_selec = 2;
        }

        switch (me_selec - computer_selec) {
            case 0:
                showResult('equal');
                break;
            case 1:
            case -2:
                showResult('me');
                break;
            case -1:
            case 2:
                showResult('computer');
                break;
            default:
        }

    } else {
        tempAnimation = setTimeout('gameAnimation()', v);
    }
}

function showResult(result) {
    var result_word = document.getElementById('result');
    var score = document.getElementById('score-point');

    if (result == 'equal') {
        result_word.innerHTML = '打 <br/> 成 <br/> 平 <br/> 手 <br/> ';
    } else if (result == 'me') {
        result_word.innerHTML = '你 <br/> 赢 <br/> 了 <br/> 哦 <br/> ';
        win_count += 1;
        score.innerHTML = win_count.toString();
    } else if (result == 'computer') {
        result_word.innerHTML = '电 <br/> 脑 <br/> 赢 <br/> 了 <br/> ';
    }else if(result == 'default'){
        result_word.innerHTML = '游 <br/> 戏 <br/> 开 <br/> 始 <br/> ';
    }
}
