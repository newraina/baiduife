var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

// ����ͼƬ
// bgreadyΪָʾͼƬ�Ƿ������ɵı���
var bgready = false;
var bgimage = new Image();
bgimage.onload = function() {
    bgready = true;
};
bgimage.src = 'src/gameArts-hd.png';

// ������Ϸ����
var plane = {};

var enemy = {

};


addLoadEvent(init);



