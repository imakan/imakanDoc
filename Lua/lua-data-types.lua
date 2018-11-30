#! /usr/local/bin/lua

-- lua是动态语言，变量不需要类型定义，只需要为变量赋值，值可以储存在变量中，作为参数传递或者结果返回
--[[
lua中有8个基本类型分别为：
nil,无效值，如果一个值没有赋值，则打印出来对应的type类型就是nil
boolean,
number,
string,
function,
userdata(表示任意存储在变量中的c数据结构)  
thread 表示执行的独立线路，用于执行协同程序
table lua中的table其实就是一个关联数组，数组的索引可以是数字或者字符串。在lua里，table的创建是通过构造表达式来完成的，最简单构造表达式是{},用来创建一个空表
--]]

print(type("hello world"))

print(type(0.1+0.2))

print(type(print))

print(type(type))

print(type(true))

print(type(nil))

print(type(type(X)))


-- 对于全局变量和table,nil还有一个“删除”作用，给全局变量或者table表里的变量赋值一个nil值，等同于把他们删除掉，比如：

tab1 = {
  key1 = 'val1',
  key2 = 'val2',
  key3 = 'val3',
}
for k,v in pairs(tab1) do
  print(k..'--'..v)
end

tab1.key1 = nil

print('--------------')

for k,v in pairs(tab1) do
  print(k..'--'..v)
end

print(type(x) == 'nil')

if false or nil then
  print("至少有一个是 true")
else
  print("false 和 nil 都为 false!")
end


html = [[
<html>
<head></head>
<body>
    <a href="http://www.runoob.com/">菜鸟教程</a>
</body>
</html>
]]

print(html)


-- 在对一个数字字符串上进行算术操作时,lua会尝试将这个数字字符串转换成一个数字。
--  注意 注意  注意  如果是一个字符串字幕相加一个数字  请 使用.. 操作符
--  .. 是连接符  连接符  连接符


--  使用 #号 计算字符串的长度 而不是length

-- local 相当于 var 

-- table(表)

-- 在lua里，table是通过构造表达式来完成的，最简单的是一个{},来创建一个空表

local tab1 = {}

local tab2 = {"apple","pear","orange","grape"}

-- lua中的表table是一个关联数组，数组的索引可以是数字，也可以是一个字符串

a = {}

a["key"] = "value"
key = 10 
a[key] = 22
a[key] = a[key] + 11


for k,v in pairs(a) do
  -- print(k.." : "..v)
end

--  重点  重点 重点，在不同语言中索引值一般是从零开始的，在lua中是从1开始的

a3 = {}

for i = -1 ,10 
do
  a3[i] = i
end

for k,v in pairs(a3)
do
  -- print(k.." : "..v)
end


-- function 函数
-- 在lua中，函数是被看作是”第一类值“（First-Class Value）,函数可以存在变量里（内存地址一致）
-- 函数没有花括号，判断也没有花括号，end结尾  then 或者do

function factorial(n) 
  if n == 0 
  then 
    return 1;
  else
    return n * factorial(n-1);
  end
end
-- print(factorial(5))

-- function可以以匿名函数（anonymous function）的方式通过参数传递


function testFun(tab,fun)
  for k,v in pairs(tab) 
  do
    print(fun(k,v));
  end
end

local tab3 = {key1 = "val1",key2 = "val2"}

function test(k,v)
  print(k.." : "..v);
end

testFun(tab3,test)


-- thread 线程

-- 在lua中，最主要的线程是协同线程，他跟线程差不多，拥有自己独立的栈，局部变量和指令指针，可以跟其他协同程序共享全局变量和其他大部分东西

-- 线程和协程的区别：线程可以同时运行多个，而协程任意时刻只能运行一个，并且处于运行状态的协程只有被挂起（suspend）时才会暂停



--  userdata（自定义类型）

-- userdata是一种用户自定义数据，用于表示一种由应用程序或者c/c++语言所创建的类型，可以将任意c/c++的任意数据类型的数据（通常是struct和指针）存储到lua变量中调用