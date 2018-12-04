process.on('message', (m, socket) => {
  if (m === 'socket') {
    socket.end(`请求被 ${process.argv[2]} 优先级处理`);
  }
});
process.on('message', (m, socket) => {
  if (m === 'socket') {
    if (socket) {
      // 检查客户端 socket 是否存在。
      // socket 在被发送与被子进程接收这段时间内可被关闭。
      socket.end(`请求被 ${process.argv[2]} 优先级处理`);
    }
  }
});