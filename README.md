# music_play
静态页面展示: https://alvinbb.github.io/music_play/public/index.html

## 本地运行步骤
静态页面无后台数据，启用后台步骤如下:
- 将lib/sql目录下的sql文件导入数据库
- 进入music_play目录，运行服务器，命令如下
``` bash
$ cd path/music_play
$ npm run start
```
- 打开chrome浏览器，在地址栏输入http://127.0.0.1:8080 可浏览动态页面

## 简单的文档

### Query类

在path：public/script/global.js文件中定义了Query类，封装了对DOM节点进行操作的方法，用法和jQuery类似

#### 支持的属性和方法

- $(query).length 获取封装的DOM对象个数，当为一个时length为0

- $(query) 查询DOM节点，封装Query对象

- $(query).get[index] 获取DOM对象

- $(query).addClass(className) 添加class

- $(query).removeClass(className) 删除class

- $(query).toggleClass(className) 切换class

- $(query).getStyle(styleProp) 获取样式

- $(query).setStyle(styleProp) 设置样式

- $(query).siblings 获取兄弟元素

- $(query).html(str) 设置或返回innerHTML

- $(query).bindEvent(event,callBack) 事件监听

- $(query).unBindEvent(event,callBack) 事件监听移除

- $(query).getHrefId() 获取a标签#后的内容

- $(query).togglePlaceholder(placeholder) 输入框placeholder

- $(query).responseSize(type,offset) 响应式宽高

- $(query).showTargetHideSiblings() 显示目标隐藏兄弟

### $f 对象

不是对DOM对象操作的通用方法，封装在对象上，该对象注册global.$f上

#### $f 对象中的方法

- $f.addLoadEvent(func) 将函数添加到window.onload事件中

- $f.addResizeEvent(call
Back) 将函数添加到window.onresize事件中

- $f.watch(obj,attr,callBack) 监听指定对象的属性，变化时执行回调

- $f.serialize(obj) 序列化对象

- $f.ajax:(obj) 封装ajax请求