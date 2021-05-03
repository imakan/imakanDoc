>说起BFC,要说下box，box是css的布局的基本单位和对象，页面是由若干个box组成，元素的标签和display属性决定了，决定了这个box的类型，不同的box参与不同的 Formatting context

常见的Formatting Context有，BFC(block formatting context)、IFC(inline formatting context)、FFC(flex formatting context)、GFC(grid formatting context)

# 如何生成BFC
+ 1、根元素
+ 2、overflow：hidden
+ 3、float
+ 4、position:absolutiong flexed
+ 5、display：block,inlien-block,table-cell,table-caption

# BFC的应用
+ BFC内，两个盒子的垂直距离是有margin决定的，如果有一个margin-top margin-bottom 距离由大的那个主导，也为了防止重叠
+ 浮动元素参与计算，清除内部浮动问题自适应多栏布局
+ 自适应多栏布局