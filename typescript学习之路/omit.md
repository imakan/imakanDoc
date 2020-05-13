+ Exclude<T,U>:用于从类型T中取出不在类型T中的成员，即取出T中存在，但是在U中不存在的成员

+ Extract<T,U>:用于从类型T中取出可以分配给U类型的成员，即T中存在的，U中也存在的成员，交集

+ NonNullable<T>：用于从类型T中去除`null`和`undefined`类型

+ ReturnType<T>：获取函数类型的返回类型，一般用法：ReturnType<typeof 函数名>

+ InstanceType<T>：获取构造函数的实例类型

实现 `Omit`就是删除指定对象，返回剩下的对象；

具体实例见 `omit.ts`