/**
 * Created by newraina on 2015/9/10.
 */
/*���������ͣ�ĺ���*/

function mouseOver() {
    //��ͣ��������
    var me_img = me.getElementsByTagName("img");
    for (var i = 0; i < me_img.length; i++) {
        var temp_element = me_img[i];
        processMouseOn(temp_element, "mouseOver");
    }
    var computer_img = computer.getElementsByTagName("img");
    for (var j = 0; j < computer_img.length; j++) {
        temp_element = computer_img[j];
        processMouseOn(temp_element, "mouseOver");
    }
}