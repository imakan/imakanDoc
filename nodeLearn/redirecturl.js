'use strict'
let cp = require('child_process')
require('shelljs/global');
let co = require('co')
let prompt = require('co-prompt')
let chalk = require('chalk')
let crypto = require('crypto')
let key = "2018"

let opneServer = function (_tplName) {
  return new Promise((resolve, reject) => {
    let n = cp.fork('app.js')
    n.send(_tplName)
    resolve();
  });
}
let cipher = function (word) {
  let _c = crypto.createCipher('aes192', key)
  let encrypted = _c.update(word, 'utf8', 'hex')
  encrypted += _c.final('hex')
  return encrypted
}

co(function* () {
  // 处理用户输入
  let tplName = yield prompt('请输入您的地址: ')
  let _tplName = cipher(tplName)
  yield  opneServer(_tplName)
})
