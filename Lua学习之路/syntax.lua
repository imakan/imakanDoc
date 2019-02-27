#! /usr/local/bin/lua

-- 一、基本语法

--[[
1、首行书写/usr/local/bin/lua 是告诉执行器，需要什么解释器去编译改代码

2、同时lua给我们提供了交互式编程方式 lua -i 

3、lua中的关键字、保留字：and break do else elseif end false for functon if in local nil not  or repeat return then true until while 

4、lua中的注释符
4.1、单行注释：-- 
4.2、多行注释: --([两个中括号])--([两个中括号])

5、全局变量
在lua中默认变量都是全局的，只要给一个变量赋值后，那么就自动创建了全局变量，访问一个没有初始化的全局变量也不会出错，只不过得到的结果是：nil
--]]



-- print('makan')
-- print('ma')

b = nil

print(b)