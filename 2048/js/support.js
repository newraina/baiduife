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
    updateBoardView();
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

function updateBoardView() {
    //显示棋盘格上已经赋值的格子(值大于0判定为已赋值)
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] > 0) showGameCell(i, j);
            else resetGameCell(i, j);
        }
    }
}

function showGameCell(x, y) {
    //给指定的棋盘格子写入数字,指定新的类
    var temp_board = document.getElementById('game_border');
    temp_board.children[x].children[y].innerHTML = board[x][y];
    temp_board.children[x].children[y].className = 'game_cell_selec';
    temp_board.children[x].children[y].style.backgroundColor = getBackgroundColor(board[x][y]);
}

function resetGameCell(x, y) {
    // 重置指定的棋盘格子
    // 背景色还原,数字清空
    var temp_board = document.getElementById('game_border');
    temp_board.children[x].children[y].innerHTML = '';
    temp_board.children[x].children[y].className = 'game_cell';
    temp_board.children[x].children[y].style.backgroundColor = BACKGROUNDCOLOR;
}

function resetBoard() {
    //board数组归零
    //棋盘格类名全部重置
    //同时执行init重新生成board
    var temp_board = document.getElementById('game_border');
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0;
            temp_board.children[i].children[j].innerHTML = '';
            temp_board.children[i].children[j].className = 'game_cell';
            temp_board.children[i].children[j].style.backgroundColor = '#f4da9e';
        }
    }
    init();
}

function getBackgroundColor(num) {
    //每个不同的num对应不同的背景色
    switch (num) {
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
    switch (event.keyCode) {
        //左
        case 37:
            moveLeft();
            newBoardCell();
            updateBoardView();
            break;
        //上
        case 38:
            moveTop();
            newBoardCell();
            updateBoardView();
            break;
        //右
        case 39:
            moveRight();
            newBoardCell();
            updateBoardView();
            break;
        //下
        case 40:
            moveDown();
            newBoardCell();
            updateBoardView();
            break;
        default :
            break;
    }
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
    var temp = line;
    //按照2048规则合并相邻的相同数字
    //将修改后的数组返回
    if (direction == 0) {
        //向左合并
        for (var c = 0; c < temp.length - 1; c++) {
            if (temp[c] == temp[c + 1]) {
                temp[c] *= 2;
                temp[c + 1] = 0;
                c++;
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
            if (temp[d] == temp[d - 1]) {
                temp[d] *= 2;
                temp[d - 1] = 0;
                d--;
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
