/**
 * Created by newraina on 2015/10/28 0028.
 */

function addLoadEvent(func) {
    // �󶨺�����onload�¼���
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
//    �û�����Ӧ���ڴ�С
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

//    ���Ʊ���
    drawBGImage();
}

function drawBGImage() {
//    ���Ʊ���
    if(!bgready) return false;
    ctx.drawImage(bgimage, 0, 0);
}