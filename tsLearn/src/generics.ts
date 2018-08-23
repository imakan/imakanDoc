namespace generics {
  // 我们需要一种方法使返回值的类型与传入参数类的类型是相同的，这里我们使用了类型变量，他是一种特殊的变量，只用于表示类型而不是值
  function identity<T>(arg: T): T {
    return arg
  }
  identity('maaa')
  identity<number>(1111)
  function loggingIdentity<T>(arg: T[]):T[] {
    return arg
  }
}