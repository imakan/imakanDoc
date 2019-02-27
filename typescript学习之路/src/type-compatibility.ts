namespace typeCom {
  // 类型兼容性
  // 结构类型是一种只使用其成员来描述类型的方式，它正好与
  interface Named {
    name: string;
  }

  class Person {
    name: string;
  }
  let p: Named
  p = new Person()

  // TS 结构话类型系统的基本规则是，如果x兼容y,那么y至少具有与x相同的属性，比如
  interface Named {
    name: string
  }
  let x: Named;
  let y = {name:'Alice',location:'Seattle'}
  x = y
}