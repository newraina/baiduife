/**
 * Created by newraina on 2015/10/7.
 */

//棋盘格数组
var board = [];

//分数统计
var score = 0;

//默认棋盘格的背景色
var BOARDBACKGROUNDCOLOR = '#CCC0B3';

//初始化
addLoadEvent(init);

//响应按键
window.document.onkeydown = function () {
    //为什么不加function这个外框
    //keyControl函数就会不等键盘按下就直接运行呢?
    keyControl();
};

