本质上来讲jsx,只是react.createElement(component,props,...children)方法提供的语法糖

例如：

```jsx
<myButton color='blue' shadowSize={2}>Click Me</myButton>
```

```JavaScript
// 编译后
React.createElement(
  myButton,
  {color: 'blue', shadowSize: 2},
  'Click Me'
)
```

# 指定React元素类型
组件首字母一定一定一定大写，首字母大写
jsx的标签的第一部分决定了React元素的类型。
首字母大写的类型表示jsx标签引用到一个React组件，这些标签将会被编译为直接引用同名变量，所以如果你使用了<foo /> jsx表达式，则Foo必须在作用域中

# React必须在作用域中
文件是jsx,你的文件中必须要引入react，因为jsx是react.createElement的语法糖，

# 点标识发用于jsx类型

你还可以使用jsx中的点表示法来引用react组件。
```JavaScript
import React from 'react';

const MyComponents = {
  DatePicker: function DatePicker(props) {
    return <div>Imagine a {props.color} datepicker here.</div>;
  }
}

function BlueDatePicker() {
  // 这里可以直接使用a.b
  return <MyComponents.DatePicker color="blue" />;
}
```

# 用户定义组件必须首字母大写

当元素类型以小写字母开头时，它表示一个内置的组件，如<div>或者<span>,将导致字符串'div'传递给react.createElement。如果是大写字母开头的类型，如<Foo />编译为React.createElement(Foo)是一个变量

# JSX的属性(Props)
在JSX中有几种不同的方式来指定属性

# 字符串常量
你可以将字符串常量作为属性值传递，下面这两个jsx表达式是等价的
<MyComponent message="asaa">
<MyComponent message={"asaa"}>


# jsx中的子代

在既包括开始标签又包含结束标签的jsx表达式中，这两个标签之间的内容被传递为专门的属性：`props.children`。有几种不同的方法来传递后代

## 字符串字面量

你可以在开始和结束标签之前放入一个字符串，则`props.children`就是那个字符串。这对于许多内置HTML元素很有用。

# JSX子代
你可以提供更多个JSX元素作为子代，这对于嵌套显示组件非常有用：

1、jsx中的子代
在jsx中在两个标签之间的内容被传递为专门的属性：props.children。


jsx的子代有：
字符串字面量、js表达式、函数，(布尔值和null和undefined)作为子代是会被忽略

在jsx中不要用falsy 一定要用boolean表达式