在nginx.conf中可以直接放入lua代码，但是不能直接运行
在nginx-lua-http模块，提供了几条指令
+ content_by_lua：是在http请求处理的内容深层阶段用lua处理

为了输出的文本可以在浏览器直接使用，我们使用default_type:text/html

在openresty的lua模块中提供了几个api:

1、ngx.say()：生成http响应，输出在http请求中的body中的，而不是放入到请求header中，所以可以直接显示内容
2、我们可以使用他提供给我们的api,完成很多功能，直接访问redis,mysql，不同的响应通过程序，组合成http返回给用户

# 第二部分Nginx架构基础

## nginx运行在企业内网的最外层，他处理的流量是最大的，为什么nginx采用max_worker,为什么work要采用cpu的核数

+ 在处理静态资源的时候，当系统内存不足时，像send_file这样的调用，aio会变成阻塞的调用，所以需要有一个线程池

## nginx有两种进程结构

为什么使用多进城，而不是多线程
> 这要从nginx的最核心的一个问题来解答，nginx要保持它的高可用性，高可靠性；
> 如果线程之间是共享同一个地址空间的， 当某一个第三方模块引发的一个地址空间断错，地址越界时，会导致整个nginx全部挂掉

为什么要有多个worker进程

因为nginx采用事件驱动的模型以后，他希望每一个进程从头到尾占用一个cpu，所以往往不知要把worker的数量配置cpu的核数，还需要每一个worker和某一个cpu核绑定，减少缓存失效的命中率


nginx要保持高可用

nginx有master进程，worker进程。cache进程（cache manager和 cache loader），这些进程之前的通信是通过共享内存实现的

为什么有很多worker进程数呢，因为要保持和cpu核数一直
worker进程是处理所有的请求的

+ 单进程结构(生产环境)

+ 多进城结构


# nginx进程信号

##  监控worker进程
  + CHLD

+ 管理worker进程

+ 接收信号

  +  TERM,INT
  + QUIT  
  + HUP
  + USR1
  + USR2
  + WINCH

## worker进程

+ 接收信号
  + TERM,INT
  + QUIT  
  + USR1
  + WINCH

## NGINX命令

启动nginx,nginx会在文件中记录他自己的pid（在安装目录下的loggers）



worker_shutdown_timeout：最长等待时间，因为有时候某个请求一直在，当重启的时候，产生新的workder进程，被占用的worker进程不会优雅的销毁，需要等待当前进程上的请求全部处理完后，所以这个命令是，我最多等待的时间


**优雅的关闭是指关闭worker进程，http请求，nginx是监听不到websocket请求的，nginx做tcp层，或者udp反向代理，也没有办法识别一个请求需要多少报文才算结束


