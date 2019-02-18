/**
 * 除了parse,print,builder以外，Recast的三项主要功能：
 * 1、run:通过命令行读取js文件，并转化成ast以供处理
 * 2、tnt:通过assert()和check(),可以验证ast的类型
 * 3、visit:遍历ast树，获取有效的AST对象并进行更改
 */

function add(a, b) {
  return a + b
}
function sub(a, b) {
  return a - b
}
function commonDivision(a, b) {
  while (b !== 0) {
    if (a > b) {
      a = sub(a, b)
    } else {
      b = sub(b, a)
    }
  }
  return a
}