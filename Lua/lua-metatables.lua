#! /usr/local/bin/lua

-- 在Lua table 中我们可以访问对应的key来得到value的值，但是却无法对两个table进行操作，因此lua提供了元素metatable，允许我们改变table的行为，每个行为关联对应的元方法


--[[
例如，使用元素我们可以定义Lua如何计算两个table的相加操作a+b
当lua试图对两个表进行相加是，先检查两者之一是否有元素，之后检查是否有一个“_add”的字段，若找到，则调用对应的值。“_add”等即时字段。其对应的值往往是一个函数或者table就是元方法  
有两个很重要的函数来处理元表(metatable)：

setmetatable(table,metatable):对指定table设置元表，如果元表metatable中存在__metatable键值，setmetatable会失败

getmetatable(table):返回对象的元表(metatable)
--]]

mytable = {}

mymetatable = {}

setmetatable(mytable,mymetatable)   -- mytable = setmetatable({},{})


local m = getmetatable(mytable)   

-- __index 元方法

-- 当通过键来访问table的时候，如果这个键没有值，那么Lua就会寻找该table的metatable(假定有metatable)中的__index键。如果__index包含一个表格,Lua会在表格中查找相应的键

other = { foo = 3 } 
t = setmetatable({},{__index = other})
print(t.foo)


--[[
  总结__index：
  lua查找一个表元素的规则，其实就是如下3个步骤：
  1、在表中查找，如果找到，返回该元素，找不到则继续
  2、判断该表是否有元表，如果没有元表，返回nil,有元表则继续
  3、判断元表是否有__index方法，如果__index方法为nil,则返回nil,如果__index方法是一个表，则重复1，2，3；如果__index是一个函数，则返回该函数的返回值
--]]



-- __newindex元方法


--[[
  
__newindex元方法用来对表更新，__index则用来对表访问
当你给表的一个缺少的索引赋值，解释器就会查找__newindex元方法，如果存在则调用这个函数而不是进行赋值操作
--]]
mymetatable = {}
mytable = setmetatable({key1 = "value1"}, { __newindex = mymetatable })

print(mytable.key1)

mytable.newkey = "新值2"
print(mytable.newkey,mymetatable.newkey)

mytable.key1 = "新值1"
print(mytable.key1,mymetatable.key1)

--[[
以上实例中表设置了元方法 __newindex，在对新索引键（newkey）赋值时（mytable.newkey = "新值2"），会调用元方法，而不进行赋值。而如果对已存在的索引键（key1），则会进行赋值，而不调用元方法 __newindex。  
--]]


-- 为表添加操作符

-- 计算表中最大值，table.maxn在lua5.2以上版本中已经无法使用
-- 自定义计算表中最大值函数，table_maxn,即计算表的元素个数


-- 计算表中最大值，table.maxn在Lua5.2以上版本中已无法使用
-- 自定义计算表中最大键值函数 table_maxn，即计算表的元素个数
function table_maxn(t)
  local mn = 0
  for k, v in pairs(t) do
      if mn < k then
          mn = k
      end
  end
  return mn
end

-- 两表相加操作
mytable = setmetatable({ 1, 2, 3 }, {
__add = function(mytable, newtable)
  for i = 1, table_maxn(newtable) do
    table.insert(mytable, table_maxn(mytable)+1,newtable[i])
  end
  return mytable
end
})

secondtable = {4,5,6}

mytable = mytable + secondtable
  for k,v in ipairs(mytable) do
print(k,v)
end

--[[
__add	对应的运算符 '+'.
__sub	对应的运算符 '-'.
__mul	对应的运算符 '*'.
__div	对应的运算符 '/'.
__mod	对应的运算符 '%'.
__unm	对应的运算符 '-'.
__concat	对应的运算符 '..'.
__eq	对应的运算符 '=='.
__lt	对应的运算符 '<'.
__le	对应的运算符 '<='.
--]]


-- __call 元方法

--  __call 元方法在 Lua 调用一个值时调用。以下实例演示了计算表中元素的和：


-- 计算表中最大值，table.maxn在Lua5.2以上版本中已无法使用
-- 自定义计算表中最大键值函数 table_maxn，即计算表的元素个数
function table_maxn(t)
  local mn = 0
  for k, v in pairs(t) do
      if mn < k then
          mn = k
      end
  end
  return mn
end

-- 定义元方法__call
mytable = setmetatable({10}, {
__call = function(mytable, newtable)
  sum = 0
  for i = 1, table_maxn(mytable) do
      sum = sum + mytable[i]
  end
  for i = 1, table_maxn(newtable) do
      sum = sum + newtable[i]
  end
  return sum
end
})
newtable = {10,20,30}
print(mytable(newtable))


-- __tostring 元方法

__tostring 元方法用于修改表的输出行为。以下实例我们自定义了表的输出内容：

mytable = setmetatable({ 10, 20, 30 }, {
  __tostring = function(mytable)
    sum = 0
    for k, v in pairs(mytable) do
        sum = sum + v
    end
    return "表所有元素的和为 " .. sum
  end
})
print(mytable)
