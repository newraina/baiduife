/**
 * Created by newraina on 2015/10/7.
 */

function addLoadEvent(func) {
    // 绑定func函数到window.onload事件处理函数
    // 如果已经绑定过函数，则把新函数追加到现有指令末尾
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function () {
            oldonload();
            func();
        }
    }
}

function init() {
    //初始化board
    for (var i = 0; i < 4; i++) {
        if (!(board[i] instanceof Array)) {
            board[i] = [];
        }
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0;
        }
    }
    //棋盘格上随机两个格子赋值为2
    newBoardCell();
    newBoardCell();
    //显示棋盘格上已经赋值的格子(值大于0判定为已赋值)
    updateBoardView(1);

    window.document.onkeydown = function () {
        keyControl()
    };
    document.getElementById('game_message').style.display = 'none';
}

function newBoardCell() {
    //棋盘格上随机一个格子赋值为2
    var rand_site = randSiteGenerator();
    board[rand_site[0]][rand_site[1]] = randNumGenerator();
}

function randSiteGenerator() {
    //生成一个随机位置
    //生成时避开已经存在数字的部分

    //保存已经被占用的方块位置
    var occupy = [];
    var occupy_count = 0;
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] > 0) {
                occupy[occupy_count] = i;
                occupy[occupy_count + 1] = j;
                occupy_count += 2;
            }
        }
    }
    //如果方块全部被占用,则返回
    if (occupy.length == 32) {
        return false;
    }
    //保存生成结果的数组
    var temp = [];
    do {
        for (var k = 0; k < 2; k++) {
            temp[k] = Math.floor(Math.random() * 4);
        }
    } while (isInArray(temp[0], temp[1], occupy));
    return temp;
}

function randNumGenerator() {
    //0.1的概率生成4
    //0.9的概率生成2
    var temp = Math.random();
    if (temp > 0.9) {
        return 4;
    }
    else {
        return 2;
    }
}

function isInArray(a, b, temp_array) {
    //判断a,b是否是array中连续的两个数
    //a必须在奇数位上(对应数组下标必须为偶数)
    for (var i = 0; i < temp_array.length; i += 2) {
        if (a == temp_array[i] && b == temp_array[i + 1]) {
            return true;
        }
    }
    return false;
}

function updateBoardView(animation_switch) {
    //显示棋盘格上已经赋值的格子(值大于0判定为已赋值)
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] > 0) showGameCell(i, j, animation_switch);
            else resetGameCell(i, j);
        }
    }
}

function showGameCell(x, y, animation_switch) {
    //给指定的棋盘格子写入数字,指定新的类
    var temp_board_cell = document.getElementById('game_border').children[x].children[y];
    if (temp_board_cell.innerHTML != board[x][y]) {
        temp_board_cell.innerHTML = board[x][y];
        if (board[x][y] > 100) temp_board_cell.style.fontSize = '50px';
        if (board[x][y] > 1000) temp_board_cell.style.fontSize = '38px';
        temp_board_cell.style.backgroundColor = getBackgroundColor(board[x][y]);
        temp_board_cell.style.color = getNumColor(board[x][y]);
        if (animation_switch == 1) {
            //添加appear动画
            temp_board_cell.style.webkitAnimation = 'appear 200ms ease 1ms';
            temp_board_cell.style.oAnimation = 'appear 200ms ease 100ms';
            temp_board_cell.style.animation = 'appear 200ms ease 100ms';
        }
    }
}

function resetGameCell(x, y) {
    // 重置指定的棋盘格子
    // 背景色还原,数字清空
    // 清除动画属性
    var temp_board_cell = document.getElementById('game_border').children[x].children[y];
    board[x][y] = 0;
    temp_board_cell.innerHTML = '';
    temp_board_cell.removeAttribute('style');
    temp_board_cell.style.backgroundColor = BOARDBACKGROUNDCOLOR;
}

function resetBoard() {
    //board数组归零
    //分数归零
    //棋盘格类名全部重置
    //同时执行init重新生成board
    var temp_board_cell;
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            temp_board_cell = document.getElementById('game_border').children[i].children[j];
            board[i][j] = 0;
            temp_board_cell.innerHTML = '';
            temp_board_cell.removeAttribute('style');
            temp_board_cell.style.backgroundColor = getBackgroundColor(0);
        }
    }
    resetScore();
    init();
}

function getNumColor(num) {
    //2, 4为深色
    //其他数字为浅色
    if (num < 5)  return '#776E65';
    else return '#F9F6F2';
}
function getBackgroundColor(num) {
    //每个不同的num对应不同的背景色
    switch (num) {
        case 0:
            return '#CCC0B3';
        case 2:
            return "#eee4da";
            break;
        case 4:
            return "#ede0c8";
            break;
        case 8:
            return "#f2b179";
            break;
        case 16:
            return "#f59563";
            break;
        case 32:
            return "#f67c5f";
            break;
        case 64:
            return "#f65e3b";
            break;
        case 128:
            return "#edcf72";
            break;
        case 256:
            return "#edcc61";
            break;
        case 512:
            return "#9c0";
            break;
        case 1024:
            return "#33b5e5";
            break;
        case 2048:
            return "#09c";
            break;
        case 4096:
            return "#a6c";
            break;
        case 8192:
            return "#93c";
            break;
    }
}

function keyControl() {
    if (!isGameOver()) {
        switch (event.keyCode) {
            //左
            case 37:
                if (canMergeLeft() || canMoveLeft()) {
                    moveLeft();
                    updateBoardView(0);
                    newBoardCell();
                    updateBoardView(1);
                    updateScore();
                } else showTip(1);
                if (isGameOver()) showGameOver();
                break;
            //上
            case 38:
                if (canMergeTop() || canMoveUp()) {
                    moveTop();
                    updateBoardView(0);
                    newBoardCell();
                    updateBoardView(1);
                    updateScore();
                } else showTip(1);
                if (isGameOver()) showGameOver();
                break;
            //右
            case 39:
                if (canMergeRight() || canMoveRight()) {
                    moveRight();
                    updateBoardView(0);
                    newBoardCell();
                    updateBoardView(1);
                    updateScore();
                } else showTip(1);
                if (isGameOver()) showGameOver();
                break;
            //下
            case 40:
                if (canMergeDown() || canMoveDown()) {
                    moveDown();
                    updateBoardView(0);
                    newBoardCell();
                    updateBoardView(1);
                    updateScore();
                } else showTip(1);
                if (isGameOver()) showGameOver();
                break;
            default :
                break;
        }
    }
    else
        showGameOver();
}

function moveLeft() {
    for (var i = 0; i < 4; i++) {
        board[i] = mergeNum(board[i], 0);
    }
}

function moveTop() {
    var one_line = [];
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            one_line[j] = board[j][i];
        }
        one_line = mergeNum(one_line, 0);
        for (var k = 0; k < 4; k++) {
            board[k][i] = one_line[k];
        }
    }
}

function moveRight() {
    for (var i = 0; i < 4; i++) {
        board[i] = mergeNum(board[i], 1);
    }
}

function moveDown() {
    var one_line = [];
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            one_line[j] = board[j][i];
        }
        one_line = mergeNum(one_line, 1);
        for (var k = 0; k < 4; k++) {
            board[k][i] = one_line[k];
        }
    }
}

function mergeNum(line, direction) {
    //按照2048规则合并相邻的相同数字
    //将修改后的数组返回
    var temp = line;
    if (direction == 0) {
        //向左合并
        for (var c = 0; c < temp.length - 1; c++) {
            for (var e = c + 1; e < temp.length; e++) {
                if (temp[e] > 0) {
                    if (temp[c] == temp[e]) {
                        temp[c] *= 2;
                        score += temp[c];
                        temp[e] = 0;
                        c = e;
                    }
                    break;
                }
            }
        }
        //将数字按照指定的方向靠拢
        for (var i = 0, j = 0; i < temp.length; i++) {
            if (temp[i] > 0) {
                temp[j] = temp[i];
                if (i != j)  temp[i] = 0;
                j++;
            }
        }
    } else if (direction == 1) {
        //向右合并
        for (var d = temp.length - 1; d > 0; d--) {
            for (var f = d - 1; f > -1; f--) {
                if (temp[f] > 0) {
                    if (temp[d] == temp[f]) {
                        temp[d] *= 2;
                        score += temp[d];
                        temp[f] = 0;
                        d = f;
                    }
                    break;
                }
            }
        }
        //将数字按照指定的方向靠拢
        for (var m = temp.length - 1, n = temp.length - 1; m > -1; m--) {
            if (temp[m] > 0) {
                temp[n] = temp[m];
                if (m != n)  temp[m] = 0;
                n--;
            }
        }
    }
    return temp;
}

function isGameOver() {
    return (isNoSpace() && !canMerge());
}

function showGameOver() {
    var game_message = document.getElementById('game_message');
    game_message.style.display = 'block';
    window.document.onkeydown = function () {
    };
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] > 2047)
                game_message.innerHTML = 'YOU WIN!';
            else
                game_message.innerHTML = 'GAME OVER!';
        }
    }
}

function isNoSpace() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] == 0)
                return false;
        }
    }
    return true;
}

function canMerge() {
    return (canMergeLeft() || canMergeRight() || canMergeTop() || canMergeDown());
}

function canMergeRight() {
    for (var i = 0; i < 4; i++) {
        for (var j = 3; j > 0; j--) {
            for (var m = j - 1; m > -1; m--) {
                if (board[i][j] > 0 && board[i][m] > 0) {
                    if (board[i][j] == board[i][m]) {
                        return true;
                    }
                    break;
                }
            }
        }
    }
    return false;
}

function canMergeLeft() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 3; j++) {
            for (var m = j + 1; m < 4; m++) {
                if (board[i][j] > 0 && board[i][m] > 0) {
                    if (board[i][j] == board[i][m]) {
                        return true;
                    }
                    break;
                }
            }
        }
    }
    return false;
}

function canMergeTop() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 3; j++) {
            for (var m = j + 1; m < 4; m++) {
                if (board[j][i] > 0 && board[m][i] > 0) {
                    if (board[j][i] == board[m][i]) {
                        return true;
                    }
                    break;
                }
            }
        }
    }
    return false;
}

function canMergeDown() {
    for (var i = 0; i < 4; i++) {
        for (var j = 3; j > 0; j--) {
            for (var m = j - 1; m > -1; m--) {
                if (board[j][i] > 0 && board[m][i] > 0) {
                    if (board[j][i] == board[m][i]) {
                        return true;
                    }
                    break;
                }
            }
        }
    }
    return false;
}

function canMoveLeft() {
    // 在指定方向上, 如果有：一个有数字的方格前面至少有一个空方格
    // 则表示可以移动, 下面三个类似函数同理
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[i][j] > 0) {
                for (var m = 0; m < j; m++) {
                    if (board[i][m] == 0)
                        return true;
                }
            }
        }
    }
    return false;
}

function canMoveRight() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 3; j++) {
            if (board[i][j] > 0) {
                for (var m = 3; m > j; m--) {
                    if (board[i][m] == 0)
                        return true;
                }
            }
        }
    }
    return false;
}

function canMoveDown() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 3; j++) {
            if (board[j][i] > 0) {
                for (var m = 3; m > j; m--) {
                    if (board[m][i] == 0)
                        return true;
                }
            }
        }
    }
    return false;
}

function canMoveUp() {
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[j][i] > 0) {
                for (var m = 0; m < j; m++) {
                    if (board[m][i] == 0)
                        return true;
                }
            }
        }
    }
    return false;
}

function showTip(select) {
    var tip = document.getElementById('tip');
    if (select == 1) {
        tip.style.display = 'block';
        setTimeout('tip.style.display = "none"', 800);
    }
}

function updateScore() {
    var score_num = document.getElementById('score').childNodes[1];
    if (score >= 1000 && score < 10000) {
        score_num.style.fontSize = '20px';
        score_num.style.paddingLeft = '4px';
    }
    if (score >= 10000) {
        score_num.style.fontSize = '17px';
        score_num.style.paddingLeft = '3px';
    }
    score_num.innerHTML = score.toString();
}

function resetScore() {
    var score_num = document.getElementById('score').childNodes[1];
    score_num.innerHTML = '0';
    score_num.style = '';
}