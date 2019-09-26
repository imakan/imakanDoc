# 问HTTP2的好处
1、传输数据量的大幅度减少

+ 以二进制方式传输，之前都是用字符串传输
  
+ 标头压缩，使用HPACK
  
2、多路复用及相关功能

+ 消息优先级
  
3、服务器消息推送

传输是无序的，在一个message没有接受完成后，可以接收其他的message，在缓存中有序组合

我们都知道在HTTP的发展从1.0到1.1引入了post optionsd content-type，状态码等等，但是有个问题就是，在1.1的时候我们发送一个http请求，一次只能处理6个，当请求一个请求因为服务器的处理逻辑比较复杂的时候，当前这个请求会阻塞下面的请求，这个我们称为前端阻塞。

使用http2的话，我们都是只浏览器是不支持未加密的http/2传输，所以使用H2的话，首先要在服务器端生产证书。生成正式用openssl 或者用let is encytp
其实在服务器上我们使用非常简单，就是引用http2，然后把key和secret传进去
我们使用http2的话可以有效地解决这种阻塞

h2的还有一个用法是，使用缓存，我们可以提前pushStream将用户可能会用到的资源提前缓存到前端,
当然如果我们不想使用pushSteam的话，我们使用nginx的http2的模块，直接在请求头中新增header中增加我们要推送的信息，nginx(http_push_preload)会自动帮我们推送到客户端或者用http_push
当前nginx要添加ngx_http_v2_module,ssl以及443端口，
pushSteam