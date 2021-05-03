问：this的指向怎么判定

平时我们都是认为，谁调用的this就是指向那个，但是这种方法有时候不太准确
比如：
1、有时候this返回的是constructor返回的对象 
2、call apply bind之类的 指向第一个参数，但是如果传入的是null 或者undefined,严格模式下，this就是null 和undefined，非严格模式下是global或者window
3、箭头函数没有自己的this,始终指向其父类