// 子进程有自己的process.send()方法，允许子进程发送消息回父进程
process.on('message', (m) => {
  console.log('子进程接受消息：', m)
})

process.send({ foo: 'bar', baz: NaN })