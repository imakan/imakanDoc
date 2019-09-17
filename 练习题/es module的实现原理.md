我们知道浏览器是不能直接使用文件的，但是我们使用import { a } from 'a.js',是esmodule帮我们解析成module records的数据结构，让浏览器识别我们的数据结构，然后通过module instance (state +code)的方式运行代码

1、构造-查找代码，下载并将所有的文件解析为module records,让浏览器识别我们的数据结构
2、实例化代码，module instance, 主要是（code + state）
3、Evaluation,运行代码

esmodule的原理，我们都知道浏览器是不能直接读取文件的，所以需要提前解析成浏览器识别的数据结构，这个数据结构我们成为module records，然后初始化，我们称为module instance,也就是我们所谓的state + code 