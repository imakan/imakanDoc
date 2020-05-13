#! /usr/local/bin/lua

-- lua函数
-- 在lua中，函数是对语句和表达式进行抽象的主要方法

-- 函数定义

--[[
  
lua编程语言函数定义格式如下
optional_function_scope function function_name(argument1,argument2...argumentn)
  function_body
  return result_params_comma_separated
end
--]]

-- 1、optional_function_scope：指定函数是全局函数还是局部函数，默认是全局函数，局部函数请用local指定
-- 2、function_name:指定函数名称
-- 3、arguments:函数的参数
-- 4、function_body 函数体，函数中需要执行的代码语句块
-- 5、result_params_comma_separated:返回值，注意 注意 注意：lua中可以返回多个值，用逗号隔开


myprint = function(param)
  -- print("这是打印函数 -   ##",param,"##")
end

function add(num1,num2,functionPrint)
  result = num1 + num2
  -- 调用传递的函数参数
  return functionPrint(result)
end
myprint(10)
-- myprint 函数作为参数传递
add(2,5,myprint)


-- 多值返回

-- lua函数可以返回多个结果值，比如string.find,其返回匹配串”开始和结束的下标“(如果不存在匹配返回nil)

s,e = string.find( "www.runoob.com", "runoob" )
-- print(s,e)

-- 在lua函数中，在return后列出要返回的值即可返回多值

--  pairs 与 ipairs的区别 
--[[
pairs以及ipairs都是遍历table的函数，其区别pairs可以遍历全部的key-value，而且除了迭代器本身以及遍历表本身还可以返回nil
ipairs则只能从1开始自动累加，遍历相应的table[i]的值，如果table中不存在index则退出
--]]
function maximum(a)
  local mi = 1 --因为表域的下标是从1开始的
  local m = a[mi]
  for k,v in ipairs(a)
  do
    if v > m
    then
      mi = k
      m = v
    end
  end
  return mi,m
end
print(maximum({8,10,23,12,5}))


-- 可变参数
-- lua函数可以接受可变数目的参数，和c语言类似。在函数列表中是用三点...表示函数有可变的参数
-- 可变参数 在循环的时候  请使用{} 而不是(),或者将参数赋值  arg = {...}

function addSum(...)
  local s = 0;
  for k,v in pairs{...}
  do
   s = s + v;
  end
  return s;
end

print(addSum(3,4,5,6,7))


function average(...)
  local result = 0;
  local arg = {...}
  for k,v in pairs(arg)
  do
    result = result + v
  end
  -- print("总共传入了 "..#arg.." 个数")
  print("总共传入了 "..select("#", ...).." 个数");
  return result/#arg
end

print("平均值为",average(10,5,3,4,5,6))

--  注意  注意 注意 我们也可以通过select("#",...)获取可变参数的数量



-- 有时候我们可能需要几个固定参数加上可变参数，国定参数必须要在可变参数之前
function fwrite(fmt,...) --->固定参数fmt
  return io.write(string.format( fmt,... ))
end

fwrite("runoob\n") ---> fmt = 'runoob'，没有变长参数
fwrite("%d%d\n",1,2)

-- 注意：通常在可变参数的时候 我们直接遍历{...}，但是可能存在nil,我们使用select函数来访问变长参数:select("#",...)或者
-- select(n,...)
--[[
1、select("#",...)返回可变参数的长度
2、select(n,...) 用于访问n到select("#",...)的参数  
--]]

-- 调用select时，必须有一个固定的参数，也就是在select的第一个参数，可以为#或者数字
-- 如果select的第一个参数为数字，那么返回当前数字的可变参数



do 
  function foos(...)
    for i =1,select("#",...) ---> 获取参数总数
    do
      local arg = select(i,...); ---> 读取参数
      print("arg", arg);
    end
  end
  foos(1,2,3,4)
end