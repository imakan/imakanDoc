'use strict'
/******************策略类************************/
var strategies = {
  isNonEmpty(value, errorMsg) {
    if (value === '') {
      return errorMsg
    }
  },
  minlength(value, length, errorMsg) {
    if (value.length < length) {
      return errorMsg
    }
  },
  isMobile(value, errorMsg) {
    if (!/(^1[3|5|8|9|6])[0-9]{9}$/.test(value)) {
      return errorMsg
    }
  }
}
/******************Validator类************************/
var Validator = function () {
  this.cache = [];
}
Validator.prototype.add = function (dom, rules) {
  var self = this;
  for (var i = 0, rule; rule = rules[i++];) {
    (function (rule) {
      var strategyAry = rule.strategy.split(':');
      var errorMsg = rule.errorMsg;
      self.cache.push(function () {
        var strategy = strategyAry.shift();
        strategyAry.unshift(dom.value);
        strategyAry.push(errorMsg);
        return strategies[strategy].apply(dom, strategyAry)
      })
    })(rule)
  }
}
Validator.prototype.start = function () {
  for (var i = 0, validatorFunc; validatorFunc = this.cache[i++];) {
    var errorMsg = validatorFunc();
    if (errorMsg) {
      return errorMsg
    }
  }
}
/******************客户端调用代码************************/
var registerForm = document.getElementById('registerForm');
var validataFunc = function () {
  var validator = new Validator();
  validator.add(registerForm.username, [{
    strategy: 'isNonEmpty',
    errorMsg: '用户名不能为空'
  }, {
    strategy: 'minlength:6',
    errorMsg: '用户名长度不能小于10位'
  }]);
  validator.add(registerForm.password, [{
    strategy: 'minlength:6',
    errorMsg: '密码长度不能小于6位'
  }])
  validator.add(registerForm.phoneNumber, [{
    strategy: 'isMobile',
    errorMsg: '手机号不正确'
  }])
  var errorMsg = validator.start();
  return errorMsg;
}

registerForm.onsubmit = function () {
  var errorMsg = validataFunc();
  if (errorMsg) {
    alert(errorMsg);
    return false;
  }
}