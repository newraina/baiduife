/*辅助函数*/
"use strict";

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
