# HTTP状态码

## 1XX 信息状态码

> * 100 客户端应当继续发送请求，这个临时相应是用来通知客户端它的部分请求已经被服务器接收，且仍未被拒绝。客户端应当继续发送请求的剩余部分，或者如果请求已经完成，忽略这个请求。服务器必须在请求完成后向客户端发送有个最终相应，
> * 101 服务器已经了解了客户端的请求，并将通过Upgrade消息通知客户端采用不同的协议来完成这个请求。
> * 102 代表处理将被继续执行

##	2XX 处理成功状态码

> * 200 请求成功
> * 201 Created
> * 202 Accepted
> * 203 Non-Authoritative Information
> * 204 No Content
> * 205	Reset Content
> *	206 服务器已经成功处理了部分Get请求。类似于FlashGet或者迅雷这类的HTTP下载工具都是使用此类相应实现断点续传或者将一个大文档分解为多个下载段同时下载

##	3XX 重定向

> *	300 Multiple Choices  被请求的资源有一系列可供选择的回馈信息
> *	301 Moved Permanently 被请求的资源已永久移动到新位置
> *	302 Found 请求重定向
> *	303	对应当前请求的响应可以在另一个 URI 上被找到
> *	304	Not Modified，资源没有改变，从缓存里读取
> *	305 Use Proxy 被请求的资源必须通过指定的代理才能被访问
> *	307	请求的资源现在临时从不同的URI 响应请求 Temporary Redirect

##	4XX 客户端错误

> *	400  服务器不理解请求的语法。
> *	401 Unauthorized
> *	402 Payment Required
> *	403 服务器拒绝请求
> *	404 服务器找不到请求的网页。服务器上不存在的网页经常会返回此代码。
> *	405 Method Not Allowed
> *	406 Not Acceptable
> *	407 Proxy Authentication Required
> *	408 Request Timeout
> *	409 Conflict
> *	410 Gone
> *	411 Length Required
> *	412 Precondition Failed
> *	413 Request Entity Too Large
> *	414 Request-URI Too Long
> *	415 Unsupported Media Type
> *	416 Requested Range Not Satisfiable
> *	417 Expectation Failed

## 5XX 服务端错误

> *	500 Internal Server Error
> *	501 Not Implemented
> *	502 Bad Gateway 网关或者代理工作的服务器无响应
> *	503 Service Unavailable
> *	504 Gateway Timeout
> *	505 HTTP Version Not Supported


