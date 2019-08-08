# 问：异步加载JS有哪些方式

+ 1、async(html5)和defer(html4)

+ 2、动态创建script，然后动态赋值src

+ 3、XHR异步请求，使用eval加载脚本

# async和defer的区别

+ defer是文档下载完之后，在window.onload之前执行，执行顺序是按照文档的排列顺序加载
+ async的script标签，一旦下载完是会阻塞渲染的，async的script标签的加载顺序是无序的


