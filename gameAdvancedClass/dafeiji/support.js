/**
 * Created by newraina on 2015/10/28 0028.
 */

function addLoadEvent(func) {
    // 绑定函数到onload事件上
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            oldonload();
            func()
        }
    }
}

function init() {
//    让画布适应窗口大小
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

//    绘制背景
    drawBGImage();
}

function drawBGImage() {
//    绘制背景
    if(!bgready) return false;
    ctx.drawImage(bgimage, 0, 0);
}