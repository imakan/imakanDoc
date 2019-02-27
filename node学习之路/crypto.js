const crypto = require('crypto')

const key = '2018#scret!#_client'

const hash = crypto.createHmac('sha256',key).update('1231231231').digest('hex')

// console.log(hash)

/**
 * crypto 提供Certificate 类 用于处理
 */
const { Certificate } = require('crypto');

// cipher 加密 decipher 解密
// const cipher = crypto.createCipher('aes192','我是加密key')
// let encrypted = ''
// cipher.on('readable', _ => {
//   const data = cipher.read()
//   if(data){
//     encrypted += data.toString('hex')
//   }
// })
// cipher.on('end', _ => {
//   console.log(encrypted)
// })
// cipher.write('some clear text data');
// cipher.end();



/**
 1、cipher.final，参数可选，outputEncoding
 返回任何加密的内容，如果outputEncoding参数是’latin1‘,'base64'或者’hex‘,返回字符串，如果没有提供outputEncoding，则返回buffer
 一旦cipher.final() 方法已被调用，Cipher 对象就不能在用于加密数据，如果视图再次调用cipher.final(),将会抛出一个错误
 */
const cipher = crypto.createCipher('aes192',key)
let encrypted =  cipher.update('我是要再次加密的东东','utf8','hex')
encrypted += cipher.final('hex')
/**
 cipher.setADD(),当加密模式是GCM或者CCM的时候，setADD方法设置认证参数，当使用CCM模式时，必须指定明文长度

 setADD要在update方法之前
 */
 

 /**
  * getAuthTag()
  */
//  console.log(cipher.getAuthTag())


/**
 * cipher.setAutoPadding()
 * 当使用块加密算法时，Cipher类会自动添加padding到输入数据中，来适配相应块大小，可调用cipher.setAutoPadding(false)禁用padding，
 * 设置为false,对非标准填充是有用的，例如使用0x0代替pkcs填充
 */
console.log(encrypted)


/**
******* 

cipher.update(data[,inputEncoding][,outputEncoding])

//cipher.update('我是要加密的内容','utf8','hex')
用data更新密码。如果给出了inputEncoding的论证,他的值必须是‘utf8’，‘ascii’,或者‘latin1’,而data参数是使用指定编码的字符串。
如果不给出inputEncoding,则data必须是buffer、TypedArray,或者DataView。如果data是一个Buffer、TypedArray,或者DataView，那么inputEncoding就被忽略

outputEncoding指定了加密数据的输出格式，没有指定则为buffer

可以被多次调用
*******
 * */



 /********************Decipher *****************************/
const decipher = crypto.createDecipher('aes192',key)
let decryped = decipher.update(encrypted,'hex','utf8')
decryped += decipher.final('utf8')
console.log(decryped)



