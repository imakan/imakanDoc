/**
 * Buffer简介：
 * 在TypeArray之前，js没办法操作或者读取二进制数据流的机制，buffer作为nodejs的API的一部分引入。用于TCP流、文件系统
 * 操作，以及其他上下文中与八位字节流进行交互（Unit8Array）,Buffer类似与数组从0-255，如果超过255，会用&操作符 进行强行转换到255
 * 注意点就是  buffer类一旦创建就没办法改变大小
 */

//  方法

// 从内存中申请空间，创建一个长度为10，且用零填充的Buffer
Buffer.alloc(10);
// 创建一个长度为10，且用0x1填充的buffer
Buffer.alloc(10, 1);

// 此方法比alloc更快，但是可能包含旧数据，需要用fill或者write重写
Buffer.allocUnsafe(10, 1);

// 创建一个包含[0x1,0x2,0x3,0x4]
Buffer.from([1, 2, 3, 4]);

Buffer.from("tést");

const buff1 = Buffer.from("1234");
const buff2 = Buffer.from("0123");
const arr = Array.prototype.concat.call([],buff1,buff2)

console.log(arr)
console.log(Array.prototype.sort.apply(arr,Buffer.compare))
