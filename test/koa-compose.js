var index = -1;
function compose() {
  return dispatch(0)
}
function dispatch(i) {
  if (i <= index) return Promise.reject(new Error('next() called multiple times'))
  index = i
  var fn = middleware[i]
  if (i === middleware.length) fn = next
  if (!fn) return Promise.resolve('fn is undefined')
  try {
    return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
  } catch (err) {
    return Promise.reject(err)
  }
}

function f1(context, next) {
  console.log('middleware 1'); 1
  next().then(data => console.log(data)); 12// next 是 f2()
  console.log('middleware 1'); 8
  return 'middleware 1 return';
}
function f2(context, next) {
  console.log('middleware 2'); 2
  next().then(data => console.log(data)); 11// next 是 f3()
  console.log('middleware 2'); 7
  return 'middleware 2 return';
}
function f3(context, next) {
  console.log('middleware 3'); 3
  next().then(data => console.log(data)); 10  // next 是 下面next() 函数
  console.log('middleware 3'); 6
  return 'middleware 3 return'; //  return 'middleware 3 return';
}
var middleware = [
  f1, f2, f3
]

var context = {};
var next = function (context, next) {    // next 是 dispatch(4)
  console.log('middleware 4'); 4
  next().then(data => console.log(data)); 9 // return Promise.resolve('fn is undefined')  但是这是promise所以后面打印
  console.log('middleware 4'); 5
  return 'middleware 4 return'; //  return  return 'middleware 4 return';
};
compose().then(data => console.log(data)); 13