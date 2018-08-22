// dns模块包含两类函数：
// 第一类使用底层操作系统工具进行域名解析，且无需进行网络通信，这类函数只有一个：dns.lookup()
// 例如 查找baiu.com

const dns = require('dns')
const { Resolver } = require('dns');
const resolver = new Resolver();

/**
 第二类函数，连接到一个真实的DNS服务器进行域名解析，且始终使用网络进行DNS查询，这类函数包含了DNS模块中除了dns.lookup()以外的所有函数
 这些函数使用与dns.lookup()不同的配置文件（例如/etc/hosts）。这类函数适合于那些不想使用系统底层工具进行域名解析，而是想使用网络进行dns查询的开发者
 （放弃，会有上游问题）
 */
resolver.setServers(['123.125.115.110']);
// This request will use the server at 4.4.4.4, independent of global settings.
dns.lookup('baidu.com', (err, address, family) => {
  console.log(err, address, family)
})
dns.lookupService('10.210.234.62', 8080, (err, hostname, service) => {
  console.log(hostname, service);
  // Prints: localhost ssh
});
dns.getServers()