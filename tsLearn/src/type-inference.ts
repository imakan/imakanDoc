// 类型推论
// 类型是在哪里如何被推断的

// 基础
// 在TypeScript 在有些没有明确指出类型的地方，类型推论会帮助提供类型
let x: number = 3
// 变量x的类型会被推断为数字，这种推断发生在初始化变量和成员，设置默认参数值和决定返回值时，。
// 最佳通用类型
// 当需要从几个表达式推断类型时候，会使用这些表达式的类型来推断出一个最合适的通用类型 例如
let x1 = [0, 1, null]
// 为了推断x的类型，我们必须考虑所有元素类型，这里有两种选择，number nbull,计算通用类型算法会考虑搜有的候选卡类型，并给出
// 一个兼容所有候选类型的类型
// 由于最终的通用类型取自候选类型，有些候选类型共享相同的通用类型，但是却没有一个类型
// 为了更正，当候选类型不能使用的时候 我们需要明确的指出类型
// let zoo:Animal[] = [new Rhino(),new Elephant()],如果没有找到最佳通用类可行的话，类型推断结果为联合数组类型

// （Rhino | Elephant | Snake）

// 上下文类型
// ts类型推论也可能按照相反的方向进行 
//  按照上下文归类
// function add(x: number, y: number) {
//   return x + y
//   // ts 会自动识别出返回类型为number
// }

window.onmousedown = function (mouseEvent: any) {
  console.log(mouseEvent.button);  //<- Error
};
// 上下文归类会在很多情况下使用到，通常包含函数的参数 赋值表达式的右边，类型断言，对象成员和数组字面量和返回值语句
// 上下文类型也会做为最佳通用类型的候选类型
// 比如

// function createZoo(): Animal[] {
//   return [new Rhino(), new Elephant(), new Snake()]
// }
