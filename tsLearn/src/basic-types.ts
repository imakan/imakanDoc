module Validation{
  let isDone: boolean = true
  let strName: string = '111'
  let name: string = 'aaa'
  let age: number = 1
  let sentence: string = "Hello, my name is " + name + ".\n\n" + "I'll be " + (age + 1) + " years old next month."
  // 有两种方式定义数组，第一种是 直接number[]  第二种是数组泛型 Array<number>
  let list: number[] = [1, 2, 3, 4]
  let list1: Array<number> = [1, 2, 3, 4]

  // 元祖 Tuple 元祖类型允许表示一个已知元素数量和类型的数组，各个元素的类型不必相同，比如，你可以定义一对值分别为String 和 number 类型的元祖

  let list2: [string, number] = ['a', 2]
  list2[2] = 11
  list2[3] = 'aaa'   // 联合类型

  //  枚举类型。枚举类型是对JavaScript标准数据类型的一个补充，像C# 等其他语言一样，使用枚举类型可以为一组数值赋予有好的名字

  enum Color { Red = 'a', Green = 'b', Blue = 'c' }
  let c: Color = Color.Green;

  // Any 有时候 我们想要为那些在编程阶段还不清除类型的变量指定一个类型，这些值可能来自于动态的内容，比如来自用户输入或者第三方代码库，这种情况下，我们不希望类型检查

  // any 和 object 不一样，虽然object 的类型可以赋值任何类型，但是不能调用它上面的任意的方法，即便它真的有这些方法

  let notSure: any = 4

  let list3: any[] = [1, 2, 3, ['a'], 'b']
  console.log(list3)

  // Void 表示没有任何类型，当一个函数没有返回值是，通常会见到返回值类型是void 
  function warnUser(): void {
    console.log(111)
  }
  let unusable: void = undefined

  let u: undefined = undefined

  let n: null = null

  //  Never类型表示的是那些永不存在的类型。例如。never类型是那些总是会抛出异常或者根本就不会有返回值的函数表达式


  // 类型断言

  let someValue: any = 45

  let num: number = (<number>someValue).valueOf()

  let num1: number = (someValue as number).valueOf()

  let o = {
    a: "foo",
    b: 12,
    c: "bar"
  };
  let { a, b }: { a: string, b: number } = o;
  type C = { a: string, b?: number }
  function f({ a, b }: C): void {

  }
  class C1 {
    p = 12;
    m() {
    }
  }
  let c1 = new C1();
  let clone = { ...c1 };
  clone.p; // ok
}