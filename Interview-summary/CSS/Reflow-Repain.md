# 回流 和 重绘
浏览器解析大致分为四个步骤：

![浏览器解析示意图](/asset/1.png)

* 1、解析DOM树

* 2、构建DOM树

* 2、布局DOM树

* 4、绘制DOM树

Reflow 以及 Repain 主要是在第三步和第四步。

##  Reflow(回流)：

对于DOM结构中的元素都有自己的盒子，这些需要浏览器根据各种样式（浏览器自己的，开发人员自定义的）来计算并根据计算定位元素，大小，颜色

##  Repain(重绘)：

当各种盒子的位置、大小以及其他属性，例如颜色，字体大小都确定下来后，浏览器就会把这些元素按照各自的特征绘制一遍，于是页面就出现了


##  总结

* 1、当渲染树中的一部分或者全部因为元素的大小，布局，隐藏等改变而需要重新构建。这就成为回流（reflow）。每个页面至少需要一次回流，就是页面第一次加载的时候。在回流的时候，浏览器会使渲染树中受到影响的部分失效，并重新构建这部分渲染树，完成回流后，浏览器就会重新绘制这部分到屏幕中，改过程称为重绘
* 2、当渲染树中的一些元素需要更新属性，而这些属性只是影响元素的外观，风格，而不是影响布局，比如background-color。则就称之为重绘


***注意：回流必定会导致重绘，重绘不一定会导致回流***

引起Repain和Reflow的一些操作

Reflow的成本比Reapin的成本高的多，DOM Tree里面的每个节点都会有reflow方法，一个节点的reflow很有可能导致子节点，父节点以及兄弟节点的回流
* 当你增加，删除，修改DOM节点时，会导致Reflow和Repain

* 当你移动DOM的位置，或者搞个动画时候

* 当你修改/删除css样式的时候

* 当你Resize窗口的时候（移动端没有这个问题），或者滚动的时候

* 当你修改网页的默认字体的时候

* 当你设置style属性的值

***注意：display:none 会导致reflow以及repain，而visiability:hidden 只会导致repain,因为布局位置没有变化***


##  如何减少Reflow和Repain

Reflow是不可避免的，只能将Reflow对性能的影响降到最低，比如：

1、不要一条一条地修改DOM的样式。与其这样不如预先定义好css的class,然后修改DOM的className.将多个修改合并成一次操作

2、让要操作的元素进行“离线处理”，处理完后一起更新
* 使用DocumentFragment进行缓存操作，引发一次回流和重绘 document.createDocumentFrament

* 使用display:none技术，只引发两次回流和重绘

* 使用cloneNode 和 replaceChild技术，引发一次回流和重绘

3、尽可能的修改层级比较低的DOM节点，因为DOM树中的一级会导致所有层级的改变

4、避免使用css的JavaScript表达式，如果css里有expression，每一次都会重新计算一遍

5、不要经常访问会引起浏览器flush队列的属性，如果你确实要访问，就先读取到变量中进行缓存，以后用的时候直接读取变量就可以了，见下面代码：

```
// 别这样写，大哥
for(循环) {
    el.style.left = el.offsetLeft + 5 + "px";
    el.style.top  = el.offsetTop  + 5 + "px";
}

// 这样写好点
var left = el.offsetLeft,top  = el.offsetTop,s = el.style;
for(循环) {
    left += 10;
    top  += 10;
    s.left = left + "px";
    s.top  = top  + "px";
}
```