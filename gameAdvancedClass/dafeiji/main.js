var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

// 加载图片
// bgready为指示图片是否加载完成的变量
var bgready = false;
var bgimage = new Image();
bgimage.onload = function() {
    bgready = true;
};
bgimage.src = 'src/gameArts-hd.png';

// 定义游戏对象
var plane = {};

var enemy = {

};


addLoadEvent(init);



