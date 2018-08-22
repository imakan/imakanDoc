
const log = (v) => console.log(v)
// const b = Buffer.allocUnsafe(50).fill('\u0222');
// // console.log(b.toString())
// const buf = Buffer.from('this is a buffer');
// // console.log(buf.includes(97))

// const b1 = Buffer.allocUnsafeSlow(121)
// const str = '\u00bd + \u00bc = \u00be';

// console.log(Buffer.byteLength(str,'gbk'))

// const buf1 = Buffer.from('1234');
// const buf2 = Buffer.from('0123');
// const arr = [buf1, buf2];
// arr.sort(Buffer.compare)


// const buf1 = Buffer.alloc(10).fill('a')
// const buf2 = Buffer.alloc(14).fill('b')
// const buf = Buffer.concat([buf1,buf2],50)

// console.log(buf)


// const buf = Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72])
// console.log(buf)

// const arr = new Uint16Array(2);

// arr[0] = 5000;
// arr[1] = 4000;

// const ab = new ArrayBuffer(10)

// const ab1 = new Uint16Array(10)

// console.log(ab1.buffer)
// // 与 `arr` 共享内存
// const buf = Buffer.from(ab)
// console.log(buf)

// const buf1 = Buffer.from ('1231231')
// const buf2 = Buffer.from(buf1)
// buf1[0] = 0x98;
// log(buf1.toString())
// log(buf2.toString())


// class Foo {
//   [Symbol.toPrimitive]() {
//     return 'this is a test';
//   }
// }
// const buf = Buffer.from(new Foo())
// log(buf.toString())

// console.log(Buffer.poolSize)
// from 新建一个buffer 
//  alloc allowunsafe （size fill encoding）

const arrayBuffer = new ArrayBuffer(16)
const buffer = Buffer.from(arrayBuffer)
console.log(buffer.buffer === arrayBuffer)

const buf = Buffer.from('414243','hex')
const buf1 = Buffer.from('ABC')
console.log(buf)
console.log(buf1)