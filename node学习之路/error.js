/**
 * Node.js中运行的应用程序一般会遇到以下4类错误
 * 一：标准的Javascript错误：
 * 1、EvalError，当调用eval()失败时抛出
 * 2、SyntaxError 当Javascript语法错误时抛出
 * 3、RangeError 下标错误，也就是当值不在预期范围内时抛出
 * 4、referenceError 引用错误，当使用未定义的变量是抛出
 * 5、TypeError 类型错误，当传入错误类型的参数时抛出
 * 6、URIError  当全局的URI处理函数被误用时抛出
 * 
 * 二：由底层操作触发的系统错误，例如试图打开一个不存在的文件，试图向一个已经关闭的socket发送数据
 * 三：由应用程序代码出发的用户自定义的错误
 * 四：断言错误是错误的一个特殊类别，每当Node.js检测到一个不应该发生的异常逻辑时触发。这类错误通常由assert模块引起
 * 
 * 所有由node.js引起的JavaScript错误与系统错误都继承JavaScript的<Error>类，且保证至少提供类中的属性
 * 所有的JavaScript错误都会被作为异常处理，异常会立即产生并使用标准的JavaScript throw机制抛出一个错误，这些都是使用JavaScript的try/catch
 */

//  大多数Node.js核心API所提供的异步方法都遵从错误信息有限的回调模式惯例

/****
 * JavaScript的try/catch 机制不能用来截获异步方法产生的错误，
 * 
 */