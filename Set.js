const set = new Set([1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4])
Array.from(set)
console.log(set)
// Array.from将Set数据结构和Map数据结构 转换成数组
// Array.from可以转换array-like 和 iterable的对象
// Array.from比扩展运算符更加强大，扩展运算符是遍历接口 iterator,Array.from支持 arrya.like,所谓的类数组的对象，必须有length属性，
// Array.from 有第二个参数，类似于map，对每个成员进行处理
// Array.from() 会将空值转换为undefined
// 解构也可以遍历空值
// 扩展运算符也会讲、
// 不稳定排序的缺点，在多重排序的时候会有问题
console.log(Array.from({ length: 3 }, x => Number(x) + 1))

Array.of(1, 2, 3, 4)

// entries 遍历数组成对象  0 ，1 ，2 
// 排序稳定性,指的是排序关键字相同的项目，排序后的顺序不变
// set 遍历顺序就是插入循序，这种特性 非常有用，比如使用set 保存一组回调函数，调用的时候，就是插入的
// 由于set没有键名。只有键值，或者键名和键值是同一个值
// WeakSet结构与Set类似。也是不重复的值的集合，但是他与Set有两个区别。WeakSet的成员只能是对象，而不能是其他类型的值

// WeakSet不能遍历，因为成员都是弱引用，s