/**
 * Blob对象表示一个不可变、原始数据的类文件对象
 * File接口基于Blob，继承了Blob并扩展了他的功能，让他支持了用户系统上的文件
 */

//  示例：

var debug = { hello: "world" };
var blob = new Blob([JSON.stringify(debug, null, 2)],{type:'application/json'});
// 可以创建一个url
var url = URL.createObjectURL(blob);

// 从Blob中读取内容的唯一方法就是使用FileReader

var reader = new FileReader();

reader.addEventListener('loaded',(result) => {
  console.log(result)
})

reader.readAsArrayBuffer(blob)