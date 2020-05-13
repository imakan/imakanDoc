#	执行上下文栈

比如：
当执行到一个函数是，引擎就会创建一个执行上下文，用执行上下文栈来执行函数

***执行上下文栈最底层永远是全局对象***

举例说明：

## 一

函数执行，会创建一个执行上下文，然后压入栈中，当函数执行完后，这个执行上下文会被弹出来

```es6
function f1(){
  f2()
}

function f2(){
  f3()
}

function f3(){
  console.log('执行我了')
}

f1();
```

首先，f1执行，会创建f1函数的执行上下文对象，压入栈
```es6
ECstack.push(<f1> functionContext)
```
f1调用了f2函数，同样也要创建f2的执行上下文对象，压入栈
```es6
ECstack.push(<f2> functionContext)
```
我擦，f2竟然又调用了f3，这个只好也创建f3的执行上下文对象，压入栈
```es6
ECstack.push(<f4=3> functionContext)
```

最后执行完了，一次弹栈
```es6
ECstack.pop() //f3出栈
ECstack.pop() //f2出栈
ECstack.pop() //f1出栈
```

此时栈中还有什么？？？

***全局对象***


##  二

```es6
var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f();
}
checkscope();

//先把scope全局变量压入栈 
ECStack.push(<scope> globalContext);
//函数checkscope压入栈
ECStack.push(<checkscope> functionContext)
//全局变量更改压入栈
ECStack.push(<scope> globalContext)
//调用f 压入f的上下文
ECStack.push(<f> functionContext)


var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f;
}
checkscope()();


先把scope全局变量压入栈 
ECStack.push(<scope> globalContext)
//函数checkscope压入栈
ECStack.push(<checkscope> functionContext)
//全局变量更改压入栈
ECStack.push(<scope> globalContext)
ECStack.pop()
ECStack.push(<f> functionContext)
ECStack.pop()

```