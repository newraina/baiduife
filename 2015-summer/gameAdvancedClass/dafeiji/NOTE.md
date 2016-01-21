# meta标签

所有浏览器都支持。位于文档头部，head元素内。用于提供有关页面的元信息，比如针对搜索引擎更新频度的描述和关键词

# viewport

[移动前端开发之viewport的深入理解](http://www.cnblogs.com/2050/p/3877280.html)

一个常用的针对移动网页优化过的页面的viewport meta标签大致如下：

`<meta name="viewport" content="width=device-width, initial-scale=1">`

`<meta name="viewport" content="initial-scale=1">`也可以达到同样的效果，IE除外

- width：viewport的大小，可以是指定的数字，或者特殊值如device-width为设备宽度（单位为缩放100%时的css的像素）
- height：同width，很少使用
- initial-scale页面第一次load时的缩放比例
- maximum-scale允许用户缩放的最大比例
- minimum-scale最小比例
- user-scale用户是否可以手动缩放