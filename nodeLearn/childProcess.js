// spawn exec都是通过生成一个子进程，去执行指定的命令，不过他们的用法稍有不同，在命令的指定上，exec相对灵活，等于一个shell的命令行， 如 ps -ef | grep node

// ps 将某个进程显示出来
// -A 显示所有程序
// -e 此参数的效果和指定A参数想通
// -f 显示UID,ppIPC与STIME栏位

/**
 * spawn 的option默认认为
 * 
 {
   cwd:undefined

 }
在child_process.exec() 在 linux unix macos上，效率更高，因为它不需要衍生shell,在windows上 需要使用child_process.spawn()命令，或者使用child_process.exec().或衍生cmd.exec

| wc 输出文件的 行数  多少字 多少字节
 */
let options = {
  env: process.env,
  encoding: 'utf-8',
  timeout: 1002,
  maxBuffer: 300 * 1024,
  killSignal: 'SIGTERM'
}
// const { exec } = require('child_process')
// exec('ls -alf /usr', options, (error, stdout, stderr) => {
//   if (error) {
//     console.log(error)
//     return false;
//   }
//   // console.log(stdout)
// });

// exec('cat app.js | wc -c', options, (error, stdout, stderr) => {
//   if (error) {
//     console.error(`exec error: ${error}`);
//     return;
//   }
//   console.log(`stdout: ${stdout}`);
//   console.log(`stderr: ${stderr}`);
// });


const util = require('util');
const exec = util.promisify(require('child_process').exec);
async function lsExample () {
  const { stdout, stderr } = await exec('ls -alf')
  console.log(stdout)
  console.log(stderr)
}
// lsExample()

const { execFile } = require('child_process')
// execFile的第一个是一个可执行文件，与exec的区别，不衍生一个shell，而是指定的可执行的file被直接衍生为一个新的进程，比
execFile('node', ['--version'], (error, stdout, stderr) => {
  // console.log(error)
  // console.log(stdout)
  // console.log(stderr)
})

const { fork } = require('child_process')

// fork('./buffer')  约等于 spawn('node',['./buffer'])

// spawn执行一个命令 需要on监听 一个异步的异步函数

// exec执行一个命令 ，是一个异步函数，在callback 执行后续的操作 execFile 不衍生一个shell命令，然后file 直接建立一个新的进程

// fork 是spawn的一个特殊形式,专门衍生新的nodejs进程，返回一个子进程childProcess,返回的ChildProcess会有一个额外的内置的通信通道，它允许消息在父进程和子进程之间来回传递

// fork('./buffer') 

/**
 * 4、spawn 命令 child_process.spawn
 * spawn 方法使用给定的command 和 args中的命令行参数来衍生一个新的进程，如果省略args,则默认是一个空数组
 * options 默认为
  const defaults = {
    cwd:undefined,
    env:process.env
  }
 */

const { spawn } = require('child_process')

// let ls = spawn('ls', ['-lh', './'], options); // 返回childProcess
// ls.stdout.on('data', data => {
//   console.log(data.toString())
// })
// ls.stderr.on('data', data => {
//   console.log(data)
// })

let ps = spawn('ps', ['ax']);
let grep = spawn('grep', ['ssh'])

ps.stdout.on('data', data => {
  grep.stdin.write(data)
})
ps.stderr.on('data', data => {
  console.log(data.toString())
})
ps.on('close', code => {
  if (code != 0) {
    console.log(`ps 进程退出码：${code}`);
  }
  grep.stdin.end();
})

grep.stdout.on('data', data => {
  console.log(data.toString());
})
grep.stderr.on('data', data => {
  console.log(data.toString())
})
grep.on('close', code => {
  if (code !== 0) {
    console.log(`grep 进程退出码：${code}`);
  }
})

/**
 * 5、detached
 * 在windows上detached为true,可以使子进程在父进程退出后继续运行。子进程有自己的控制台窗口，一旦启用一个子进程，他将不能被禁用。
 * 在非windows上，如果将options.detached设置为true,则子进程会成为新的进程组和会话的领导者。注意子进程在父进程退出后可以继续运行，不管他们是否被分离
 * 默认情况下，父进程会等待被分离的子进程退出。为了防止父进程等待规定的subprocess,可以使用subprocess,可以使用subprocess.unref()方法，
 * 这样做会导致父进程的事件循环不包含子进程的引用计数，使得父进程独立于子进程退出，除非自己成和父进程之间建立了IPC信道
 */

// process.argv[0] 是node的运行目录 比如 proces.argv[0] /usr/local/Cellar/node/9.11.1/bin/node
// process.argv[0] 是运行的当前目录，比如 /Users/makan/github/nodeLearn/child.js
// console.log(process.argv[0])
// console.log(process.argv[1])

// 将子进程的输出重定向到文件，
const fs = require('fs');
const out = fs.openSync('./out.log', 'a');
const err = fs.openSync('./err.log', 'a');
// const subprocess = spawn(process.argv[0], ['buffer.js'], {
//   detached: true,
//   stdio: ['ignore', out, err]
// })
// subprocess.unref()


/**
 * 6、options.stdio选项用于配置子进程与父进程之间建立的管道，默认情况下，
 * 子进程的stdin,stdout和stderr会重定向到ChildProcess对象相应的subprocess.stdin,subprocess.stdout,subprocess.stderr流。这等同于将options.stdio设置为【'pipe','pipe','pipe'】
 * option.stdio的值是一个每个索引都对应一个子进程fd的数组，fd的0，1，2分别对应的stdin,stdout,stderr。额外的fd可以被指定来创建父进程和子进程之间的额外管道，
 * 
 * stdio:['pipe','pipe','pipe'] fd的数组[0,1,2]
 * 
 * 当在父进程和子进程之间建立了一个IPC通道，且子进程是一个node.js进程，则子进程会带着未引用的IPC通道，（使用unref()）启动，直到子进程为process.on('disconnect')事件或者process.on('message')
 * 事件注册了一个时间句柄。这使得子进程可以在进程没有打开的IPC通道保持打开的情况下正常退出
 */

// spawn('prg', [], { stdio: ['pipe', null, null, null, 'pipe'] });


/**
 * 7、execFileSync(file[,args][,options])
 */

const { execFileSync } = require('child_process');

let node = execFileSync('node', ['--version'])

console.log(node.toString())


/**
 * 8、ChildProcess 类，其实例是EventEmitter,代表衍生的子进程。
 * childProcess的实例不被直接创建，而是使用child_process.spawn(),child_process.exec(),child_process.execFile()或者child_process.fork()方法创建ChildProcess实例
 * 
 * 8.1、close事件
 * code :如果子进程退出自身，则该值是退出码。
 * signal 子进程被终止的信号
 * 当子进程的stdio流被关闭触发close,和exit 不同，因为多个进程可能共享一个stdio流
 * 
 * 8.2 disconnet 事件
 * 8.3 error事件
 * 1、进程无法被衍生
 * 2、进程无法被杀死
 * 3、向子进程发送消息失败
 * 注意：在错误发生后，‘exit事件可能会也可能不会触发，当同时监听了‘exit’ 和 error事件，谨防处理函数被多次调用
 * 
 * 8.4 exit事件
 * 8.5 message事件
 * 8.6 subprocess.channel
 * 8.7 subprocess.connected 
 * 8.8 subprocess.disconnect
 * 8.9 subprocess.kill
 * 9.0 subprocess.killed
 * 9.1 subprocess.pid
 * 9.2 subprocess.send
 */

// 注意 父进程与子进程简历IPC通道，例如使用child_process.fork() subprocess.send() 方法可用于发送消息到子进程，当子进程是一个nodejs实例时，消息可以通过process.on('message')事件接收 

// let mes = fork(`${__dirname}/sub`)

// mes.on('message', m => {
//   console.log('父进程接受消息：', m)
// })
// mes.send({ message: '我是来自父进程的消息hello world' })

// const subprocess = fork('./subprocess')
// const server = require('net').createServer();
// server.on('connection', socket => {
//   socket.end('被父进程处理')
// })
// server.listen(1337, () => {
//   subprocess.send('server',server)
// })

// 发送socket 

// const normal = fork('./subprocess', ['normal'])
// const special = fork('./subprocess', ['special'])
// const server = require('net').createServer({ pauseOnConnect: true });
// server.on('connection', socket => {
//   // 特殊优先级
//   if (socket.remoteAddress === '10.222.22.77') {
//     special.send('socket', socket)
//   }
//    // 普通优先级
//    normal.send('socket', socket);
// })
// server.listen(13009)
