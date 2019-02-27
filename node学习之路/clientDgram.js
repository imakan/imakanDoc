const dgram = require('dgram')
const client = dgram.createSocket('udp4')
const buf1 = Buffer.from('Some ');
const buf2 = Buffer.from('bytes');
client.on('error',() => {
  console.log('发送错误')
})
client.on('message',(msg,rinfo) => {
  console.log(`服务器收到：${msg} 来自 ${rinfo.address}:${rinfo.port}`);
})
client.on('close',() => {
  console.log('服务关闭')
})
client.send([buf1, buf2],1234,(error) => {
  if(error) client.close()
})
console.log(process.memoryUsage());
/**
rss（resident set size）：所有内存占用，包括指令区和堆栈。
heapTotal："堆"占用的内存，包括用到的和没用到的。
heapUsed：用到的堆的部分。
external： V8 引擎内部的 C++ 对象占用的内存。
判断内存泄漏，以heapUsed字段为准。
 */
/**
 * es6 提出两种新的数据结构 weakset weakmap 他们对值的引用都是不计入垃圾回收机智的 
 * 所以名字里才有一个weak 弱引用
 */