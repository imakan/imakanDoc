#! /usr/local/bin/lua

-- Lua迭代器

-- 迭代器是一种对象，它能够用来遍历标准模板库容器中的部分或者全部元素，每个迭代器对象代表容器中的确定的地址
-- 在lua中迭代器是一种支持指针类型的结构，他可以遍历集合的每一个元素

-- 泛型fo迭代器


--[[
泛型for在自己内部保存迭代函数，实际上它保存三个值：实际上它保存三个值：迭代函数，状态常量，控制变量。
泛型for迭代器提供了集合的key/value对，语法格式：
for k,v in ipairs(table)
do
  print(k,v)
end

执行过程；
1、计算in后面表达式的值，返回是三个值：迭代函数，状态常量，控制变量；与多值赋值一样，如果表达式返回的结果个数不足三个，会自动用nil补足，多出部分会忽略
2、将状态常量和控制变量作为参数调用迭代函数，注意：对于for结构来说，状态常量没有用处，仅仅在初始化时获取他的值并航地给迭代函数
3、将迭代器返回的值赋给变量列表
4、如果返回的第一个值为nil(ipairs)，循环结束，否则继续循环
5、回到第二步再次调用迭代函数

注意 注意：在Lua中我们常常使用函数来描述迭代器，每次调用该函数就返回结合的下一个元素，lua的迭代器包含以下两种类型
1、无状态的迭代器
2、多状态的迭代器

--]]

function square(iteratorMaxCount,currentNumber)
  -- print(iteratorMaxCount,currentNumber)
  if currentNumber<iteratorMaxCount
  then
     currentNumber = currentNumber+1
  return currentNumber, currentNumber*currentNumber
  end
end

for i,n in square,3,0
--  3是常量，0 是控制变量
do
  -- print(i,n)
end


-- 无状态的迭代器
-- 每一次迭代，迭代函数都是用两个变量（状态常量和控制常量）的值作为参数被调用，一个无状态的迭代器只利用这两个值可以获取下一个元素、

-- 迭代的状态包括被遍历的表（循环过程中不会改变的状态常量）和当前的索引下表(控制变量)，ipairs和迭代函数都很简单，比如：

function iter(a,i)
  i = i+1
  local v = a[i]
  if v 
  then 
    print(i,v)
    return i,v
  end
end

function ipairs(a)
  -- 传参是  函数 argument1 argument2
  return iter,a,0
end

local a = 1

-- print(ipairs(a))

-- 多状态的迭代器

--[[
  很多情况下，迭代器需要保存多个状态信息而不是简单地状态常量和控制变量，最简单的方法是使用闭包，还有一种方法就是讲所有的状态信息封到table内，
  将table作为迭代器的状态常量，因为这种情况下可以将所有的信息存放在table内，所以迭代函数不需要第二个参数
--]]

local array = {'Lua','Tutorial'}

--  实现了ipairs
function elementIterator(collect)
  local index = 0;
  local count = #collect
  -- 闭包函数
  return function()
    print(collect)
    index = index + 1
    if index <= count
    then
      return collect[index]
    end
  end
end

for element in elementIterator(array)
do 
  print(element)
end