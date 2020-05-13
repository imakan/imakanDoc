namespace decorator {
  // 装饰器是一种特殊类型的声明，他能够被附加到类声明，方法，访问福，属性或者参数上，
  // 装饰器使用expression 这种形式，expression求值后必须为一个函数，重点 ，它会在运行时被调用
  // 被装饰的信息做为参数被传入
  // 例如有一个@sealed装饰器，我们会这样定义sealed函数
  function sealed(target) { // 这是一个装饰器工厂
    function color(value: string) { // 这是一个装饰器

    }
  }
  // 装饰器组合
  // 多个装饰器可以同时应用到一个声明上，就像下面的实例：
  // @f @g x
  // 多个装饰器，求值方式与复合函数相似，在这个模型下，当复合f和g时，复合的结果（f*g）(x)等同于f(g(x))
  function f() {
    console.log("f(): evaluated");
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
      console.log("f(): called");
    }
  }

  function g() {
    console.log("g(): evaluated");
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
      console.log("g(): called");
    }
  }

  // class C {
  //   @f()
  //   @g(
  // }
  
}