
***E::before 设置在对象前（依据对象树的逻辑结构）发生的内容。用来和content属性一起用。***

***E::after设置在对象后（依据对象树的逻辑结构）发生的内容，用来和content属性一起使用。*** 

content用来和:after和:before伪元素一起使用，在对象前或者后显示内容

```css
content:noramal | string | arre() | url() | counter(0 | none )

```

其中，normal为默认值，表示不做任何指定内容或改动；string表示指定添加的文本内容；attr()表示插入轩泽的元素的属性值；url()表示插入一个外部资源，如图像，音频等；counter()指定一个计算器作为添加内容；none表示无任何内容。 

举个例子，在其中插入图片，就可以写 content： url(img/pic.png);

