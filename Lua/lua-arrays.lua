#! /usr/local/bin/lua

-- lua数组：数组就是相同数据类型的元素按一定顺序排列的集合，可以是一维数组和多维数组，lua数组的索引值可以使用整数表示，数组的大小不是固定的

-- 一维数组，其逻辑结构是线性

local array = {'ma',"kan"}

for k,v in pairs(array)
do
  -- print(v)
end

-- 在lua中数组的索引是从1开始的，当然你可以指定从0开始，也可以用负数作为数组索引值

local array1 = {}

for i = -2,2
do
  array1[i] = i*2
end

for i = -2,2 do
  -- print(i,array1[i])
end

-- 多维数组

