# Udacity P7 街区地图

## 目录结构
```
.
├── README.md 说明文件
├── css css资源目录
│   ├── dist css压缩发布目录
│   └── src css源文件目录
│       ├── main.css
│       └── style.css
├── index.html 主页
└── js js资源目录
    ├── dist js压缩发布目录
    │   ├── jquery-3.2.1.min.js jquery库
    │   └── knockout-3.4.2.js  knockout库
    └── src  js资源目录
        ├── app.js knockout主程序
        ├── map.js google map主程序
        └── mapfunctions.js 公共函数
```
## 必要说明
index.html中，google api key请换成自己的
```html
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA5xaYjPNeY3TE5ciPmNGIPG_XfA0QZMAQ&callback=initMap" async defer></script>
```
mapfunctions.js 中 Ocp-Apim-Subscription-Key 过期后请自行重新申请
```js
    $.ajax({
        url: "https://api.cognitive.microsoft.com/bing/v5.0/images/search?" + $.param(params),
        beforeSend: function(xhrObj){
            // Request headers key有效期30天，过期后需要重新申请
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","9e9eac512fdb41e0bb268e74fdad6fd0");
        },
        type: "GET"
        // datatype: "json"
    })
```