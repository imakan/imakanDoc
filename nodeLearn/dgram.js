/**
UDP：
用户数据包协议，一种面向无连接的传输层协，提供不可靠的消息传送服务。UDP协议使用端口号不同的应用保留其各自的数据传输通道，也就是，UDP使用自己的端口，不使用应用的端口号，所以他比tcp，占用资源更少，传输速度更快。

单播：指定IP数据报在以太网中被ARP解析成MAC地址。然后将此MAC地址设置为目标地址发出去。以太网下其他的主机看到，会和自己的MAC地址做迪比，如果不一样，则忽略该数据帧

广播：向广播地址192.168.10.255(例如),该以太网下所有的主机地址都会和广播地址匹配成功，端口8060的会保留该数据，否则将数据丢弃

组播：向一个组播地址发送UDP数据包，该组网络下的所有主机都会受到影响，主机根据端口号来判断是否丢弃该数据，组播过程原理和广播类似

*/




// dgram 模块提供了UDP数据包
const dgram = require('dgram')
const server = dgram.createSocket('udp4') //创建socket实例 ipv4 == udp4 ipv6 == udp6
server.on('error', err => {
  console.log(`服务器异常：\n${err.stack}`)
  server.close()
})
server.on('message', (msg, rinfo) => {
  console.log(`服务地址：${rinfo.address}`)
  console.log(`服务接受类型：${rinfo.family}`)
  console.log(`服务端口号：${rinfo.port}`)
  console.log(`服务接受信息大小：${rinfo.size}`)
  console.log(`服务器收到：${msg}`)
})
server.on('listening', _ => {
  const address = server.address()
  console.log(`服务器监听 ${address.address}:${address.port}`);
})

server.bind(1234, '127.0.0.1',() => {
  server.addMembership('224.0.0.114');
});
// server.bind(() => {
//   console.log(server.address())
// })


/**
 * dgram.Socket类
 * dgram.Socket类对象封装了数据包函数功能的EventEmitter
 * dgram.Socket 实例是通过dgram.createSocket()创建的
 * 
 * socket 监听方法： close message error listening 
 * 
 */


// * socket 上的方法
// * socket.addMembership(multicastAddress[,multicastInterface])
/**
 * 通知内核将multicastAddress和multicastInterface提供的多路传送集合通过IP_ADD_MEMBERSHIP这个socket选项结合起来。若multicastinterface参数未指定，操作系统将会选择一个接口并想其添加成员
 * 要为所有可用的接口添加成员，可以在每个接口上调用一次addMembership方法
 */

 //socket.address

 //socket.bind([port][,address][,callback])
 /**
  * port 整数，address 地址  callback 没参数，当绑定完成时会被调用
  */
//  对于UDP socket 该方法会令dgram.Socket在指定的port和可选的address上监听数据包信息，若port未指定或0，操作系统会尝试绑定一个随机的端口。若address未指定，操作系统会尝试在所有地址上监听。绑定完成时会触发一个l
// listening 事件，并会调用callback方法。

// 注意 同时监听 listenings 事件在socket.bind方法中传入callback 参数并不会带来坏处，但也不是很有用，也就是说 只要一个

// 一个被绑定的数据包socket会令node.js进程保持运动以接收数据


/**
 * socket.bind(options[,callback])
 options {
   port:'',
   address:'',
   exclusive:Boolean   
 }

 在配合cluster模块使用gdram.socket会使node.js进程运行以接受数据消息
 */

 //socket.close([callback]) 关闭改socket并监听其上的数据。如果提供了一个回调函数，它就相当于‘close’事件添加了一个监听器

 //socket.dropMembership(multicaseAddress[,muiticastInterface])


 //socket.getRecvBufferSize() socket接收到的字节大小。
 //socket.getSendBufferSize() 发送的字节大小

 /**

 默认情况下，绑定一个socket会在socket运行时组织node进程退出，socket.unref()方法用于将socket从维持node进程的引用列表中解除。socket.ref()方法用于将socket重新添加这个引用列表中。并恢复其默认行为
 返回一个队socket的引用，所以可以链式调用
  */

// WebSocket.setBroadcast(flag)  设置或者清除SO_BROADCAST选项，当设置为true,UDP包可能会被发送到一个本地接口的广播地址





