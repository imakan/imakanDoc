/**
 * 比如我们new Array(3) 会有一个怪异行为  会生成3个empty，这个时候我们可以是用Array.of(3)
 * 再比如我们使用Array.from 就是代替Array.prototype.slice.allpy() 这种hack的方式，Array.from 主要是将类数组或者
 * 可迭代对象转化成数组
 * JS的数组可以是连续内存分配 也可以是非连续内存分配的，如果存的是统一的单一类型，那是连续的，如果是不同类型的那么就非连续的，类似于hash存储的
 */