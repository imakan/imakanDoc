#! /usr/local/bin/lua

--[[
table是Lua的一种数据结构用来帮助我们创建不同的数据类型，如：数组，字典等。
lua table 使用关联性数组，你可以用任意类型的值来操作数组的索引，但这个值不能是nil
lua table是不固定大小的，你可以根据自己需要进行扩容
lua 也是通过table来解决模块，pack和对象的，例如string.format表示用format来索引table string
--]]

-- table 表的构造
-- 构造器是创建和初始化表的表达式，表是Lua特有功能强大的东西，最简单的构造函数是{}，创建一个空表，可以直接初始化数组

-- 初始化表
mytable = {}

-- 指定值
mytable[1] = 'lua'

-- 移除引用
mytable = nil
-- lua垃圾回收会释放内存，


-- 注意 注意 注意：如果table a 赋值给table b ，当a设置为nil时，table b 此时没有影响

-- Table操作：常规方法

--[[
  1、table.concat:函数列出参数中指定table的数组部分从start位置到end位置的所有元素，元素间咦指定的分割符隔开
  2、table.insert：在table数组的指定位置插入值为value的一个元素。默认为数组部分末尾
  3、table.maxn(table)废弃
  4、table.remove(table,pos)：返回table数组部分位于pos位置的元素，其后的元素会被前移，默认为table的长度，也就是最后一个元素删起
  5、table.sort(table,comp):对给定的table进行排序
--]]


fruits = {"banana","orange","apple"}
-- 返回 table 连接后的字符串
print("连接后的字符串 ",table.concat(fruits))
print("连接后的字符串 ",table.concat(fruits,", "))

print("连接后的字符串 ",table.concat(fruits,", ", 2,3))

--  注意注意：当我们获取table的长度的时候无论是用# 还是table.getn其都会在索引终端的地方停止计数，而导致无法正确的取得table的长度
