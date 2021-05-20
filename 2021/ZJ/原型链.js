"use strict";
function Foo() {
  getName = function () {
    console.log(1);
  };
  return this;
}

Foo.getName = function () {
  console.log(2);
};

Foo.prototype.getName = function () {
  console.log(3);
};

var getName = function () {
  console.log(4);
};
function getName() {
  console.log(5);
}

// 输出2
Foo.getName();

// 输出 4
// 变量提升  函数提升优先级高于变量提升
getName();

// 输出 1  分两部分看Foo() getName() Foo() 但是没有被New  this是全局
Foo().getName();

//
// 由于 getName被重新赋值 返回1
getName();

// 输出2
new Foo.getName();
var a = Foo.getName;
new a();
