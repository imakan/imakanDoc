const cluster = require('cluster')
/*
const cluster = require('cluster')
const http = require('http')
const numCPUS = require('os').cpus().length

if (cluster.isMaster) {
  console.log(`主进程 ${process.pid} 正在运行`)
  for (let i = 0; i < numCPUS; i++) {
    cluster.fork() //启动工作进程的
  }
  cluster.on('exit', (worker, code, signal) => {
    console.log(`工作进程 ${worker.process.pid} 已经退出`)
  })
} else {
  http.createServer((req,res) => {
    res.writeHead(200),
    res.end('hello world')
  }).listen(8000)
  console.log(`工作进程 ${process.pid} 已启动`)
}

*/
/**
 * 工作进程是由fork方法创建的，因此他们可以使用IPC和父进程通信，从而使各个进程交替处理连接服务
  cluster模块支持两种连接分发模式

  第一种：除了windows外，所有平台的默认方法，使循环法。由主进程负责监听端口，接收新连接后再将连接循环分发给工作进程，

  第二种方法是，主进程创建监听socket后发送给感兴趣的工作进程，有工作进程负责直接接收连接

  nodejs 不支持路由逻辑。因此在设计应用时，不应该过分依赖内存数据对象

 */



/**
 * 
  Class Worker

  cluster.fork() 返回的是一个Worker 
  Worker 中有disconnet ,error,exit listening,message,online 方法
 */

/**
 * 1、worker.disconnect 
 * 在工作进程中，disconnect 会关闭所有的server.然后等待这些server的close 时间进行，然后关闭IPC
 * 在主线程中，会向工作线程中send一个消息。然后工作线程根据判断去做衍生新的进程
需要注意的是，当一个server关闭后，它将不再接收信德 连接，但新连接会被其他正在监听的工作进程接收，已建议的连接可以正常关闭，当所有连接都关闭后，通往该工作进程的IPC管道将会关闭

工作进程不会自动关闭客户端连接，disconnect()方法在退出前不会等待客户端连接关闭
 */

if (cluster.isMaster) {
  const numCPUs = require('os').cpus().length;
  const worker = cluster.fork()
  let timeout;
  worker.on('listening', (address) => {
    worker.send('shutdown');
    worker.disconnect();
    timeout = setTimeout(() => {
      worker.kill();
    }, 2000);
  });
  worker.on('disconnect', () => {
    clearTimeout(timeout);
  });
  cluster.on('exit', (worker, code, signal) => {
    if (worker.exitedAfterDisconnect === true) {
      console.log('Oh, it was just voluntary – no need to worry');
    }
  });
  cluster.on('disconnect', (worker) => {
    console.log(`The worker #${worker.id} has disconnected`);
  });
} else if (cluster.isWorker) {
  const net = require('net')
  const server = net.createServer((socket) => {
    // 连接永远不会结束
  });

  server.listen(8000);
  process.on('message', msg => {
    if (msg === 'shutdown') {
      console.log('关闭了服务')
    }
  })
}

/**
 2、exitAfterDisconnect
 当调用 .kill或者.disconnect方法时被设置

3、worker.id

4、 worker.isConnected
当工作进程通过IPC管道连接到主进程时，这个方法返回true
一个工作进程在创建后会自动连接到它的主进程。当 disconnect 事件被触发时才会断开连接



5、worker.isDead()
当工作进程被终止时，包括自动退出或被发送信号，这个方法返回true


6、worker.kill signal = 'SIGTERM'  与 worker.destroy()等义
这个方法将会kill工作进程
在主线程中，通过断开与worker.process的连接来实现，一旦断开连接后，通过signal来杀死工作进程
在工作进程中，通过断开IPC管道来实现，然后以代码0退出进程

7、worker.process

8、worker.send()
*/
if (cluster.isMaster) {
  const worker = cluster.fork();
  worker.send('hi there');

} else if (cluster.isWorker) {
  process.on('message', (msg) => {
    process.send(msg);
  });
}

/**
 * cluster.schedulingPolicy
 * 
 * cluster.SCHED_NODE
 * cluster.SCHED_RR(默认 负载均衡 Round-Robin)
 */
