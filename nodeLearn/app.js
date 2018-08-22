/**
 * Created by makan on 2017/11/24.
 */
const prot = 8080
const http = require('http')
let chalk = require('chalk')
let crypto = require('crypto')
const express = require('express');
const app = express();
let message = ''
let key = "2018"
let decipher = function (encrypted) {
  const _d = crypto.createDecipher('aes192', key);
  let decrypted = _d.update(encrypted, 'hex', 'utf8');
  decrypted += _d.final('utf8');
  return decrypted
}
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-type': 'text/html' });
  res.write('成功了');
})
process.on('message', (m) => {
  message = m
  console.log(chalk.red('\n 现在访问：localhost:8080/index?url='+m))
});
app.get('/index',(req, res, next) => {
  let m = decipher(message)
  res.redirect(m+'?a=1')
})
app.listen(prot)