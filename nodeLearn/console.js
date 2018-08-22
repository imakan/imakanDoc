
// js对象中没有console对象，是宿主对象 浏览器提供的内置对象
// console.log('你好%s', 'asad')

const fs = require('fs')

const output = fs.createWriteStream('./stdout.log')
const errorOutput = fs.createWriteStream('./stderr.log')

//获取console的构造函数，将stdout strerr重定向
const { Console } = require('console');
const logger = Console({ stdout: output, stderr: errorOutput });

logger.info("我是")

console.count("default")