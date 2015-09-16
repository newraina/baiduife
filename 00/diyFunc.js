/**
 * Created by newraina on 2015/9/10.
 */
/*辅助函数*/

function processMouseOn(element, mouseoverclassname) {
    //处理鼠标移入移出事件
    element.onmouseover = function () {
        addClass(element, mouseoverclassname);
    };
    element.onmouseout = function () {
        resertClass(element, mouseoverclassname);
    }
}

function processMouseClick(element, mouseclickname) {
    element.onmousedown = function () {
        // 已经按下的键再次按下时会弹起
        var temp = element.className;
        if (temp.search(mouseclickname) != -1) {
            /*   while (temp.search(mouseclickname) != -1) {
             resertClass(element, mouseclickname);
             为什么这里用了一个循环就会死循环？
             本意是确保元素的指定类名确实被去掉了
             }*/
            resertClass(element, mouseclickname);
        } else  addClass(element, mouseclickname);

        // 按下一个键时其他键弹起
        var parent = element.parentElement;
        temp = parent.getElementsByTagName("img");
        for (var i = 0; i < temp.length; i++) {
            if (temp[i].className.search(mouseclickname) != -1 && temp[i] != element) {
                resertClass(temp[i], mouseclickname);
            }
        }

        // 如果按下的是电脑边的按键，则显示对应位置的消息框
        // 考虑增加渐隐效果
        if (parent.id == "computer") {
            for (var k = 0; k < temp.length; k++) {
                var message = document.getElementsByClassName("arrow_box");
                var tempTimeThing;
                message[0].style.visibility = "visible";
                if (temp[k].className.search("mouseClick") != -1) {
                    if (temp[k].className.search("jiandao") != -1) {
                        message[0].style.top = "-170px";
                        clearTimeout(tempTimeThing);
                        tempTimeThing = setTimeout("youAreNotComputer()", 1100);
                    }
                    if (temp[k].className.search("shitou") != -1) {
                        message[0].style.top = "-40px";
                        clearTimeout(tempTimeThing);
                        tempTimeThing = setTimeout("youAreNotComputer()", 1100);
                    }
                    if (temp[k].className.search("bu") != -1) {
                        message[0].style.top = "90px";
                        clearTimeout(tempTimeThing);
                        tempTimeThing = setTimeout("youAreNotComputer()", 1100);
                    }

                    //setTimeout('message[0].style.visibility = "hidden"', 1500);
                    //为什么用上面这句会显示message未定义？明明上面定义了呀
                    //因为setTimeOut括号里要填一个函数，在这个函数内部，message并不是全局变量，
                    //因此会显示未定义，如果要直接使用这个变量，应该将其作为函数的参量
                }
            }
        }

        // 如果已经出拳，则开始电脑出拳的动画效果
        if (parent.id == "me") {
            clearTimeout(tempAnimation);
            game();
        }
    }
}

function youAreNotComputer() {
//    点到了电脑那边的按钮显示提示框后的
//    清除属性动作
    document.getElementsByClassName("arrow_box")[0].style.visibility = "hidden";
    var elements = computer.getElementsByTagName("img");
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].className.search("mouseClick") != -1) {
            resertClass(elements[i], "mouseClick");
        }
    }
}
function resertClass(element, value) {
    // 去掉指定的类名
    var old_class_name = element.className;
    element.className = old_class_name.replace(value, "").replace(/(^\s*)|(\s*$)/g, "");
}

function addClass(element, value) {
    // 向element增加class为value的类名
    if (!element.className) {
        element.className = value;
    } else {
        var newClassName = element.className;
        newClassName += " ";
        newClassName += value;
        element.className = newClassName;
    }
}

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
