/**
 * Created by newraina on 2015/9/10.
 */
/*处理鼠标点击的函数*/

function mouseClick() {

    var me_img = me.getElementsByTagName("img");
    for (var i = 0; i < me_img.length; i++) {
        processMouseClick(me_img[i], "mouseClick");
    }

    var computer_img = computer.getElementsByTagName("img");
    for (var j = 0; j < computer_img.length; j++) {
        processMouseClick(computer_img[j], "mouseClick");
    }
}


