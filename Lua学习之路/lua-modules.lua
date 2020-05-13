#! /usr/local/bin/lua

--[[
  模块类似于一个封装库，从lua5.1开始，lua加入了标准的模块管理机制，可以把一些公用的代码放在一个文件里，以API接口的形式
  在其他地方调用，有利于代码的重用和降低代码耦合度

  lua的模块是由变量，函数等已知元素组成的table,因此创建一个模块很简单，就是创建一个table,然后把需要导出的常量，函数放入其中，最后返回这个tablel.
--]]

-- 文件名为module.lua
-- 定义一个名为md的模块

md = {}

-- 定义常量

md.constant = "这是一个常量"

-- 定义一个函数

function md.func1()
  io.write("这是一个公有函数！\n")
  -- body
end

local function func2()
  print("这是一个私有函数！")
end

function md.func3()
  func2()
end
return md


-- require 函数

-- lua提供了一个名为requrie的函数用来加载模块，要加载一个模块，只需要简单地调用就可以了。例如


require('<模块名>')

require '<模块名>'

-- 执行require后 会返回一个由模块常量或者函数组成的table,并且还会定义一个包含该table的全局变量

-- 或者给加载的模块定义一个别名变量

local m = require('md')

-- 加载机制

-- require 用于搜索 Lua 文件的路径是存放在全局变量 package.path 中，当 Lua 启动后，会以环境变量 LUA_PATH 的值来初始这个环境变量。如果没有找到该环境变量，则使用一个编译时定义的默认路径来初始化。

-- 如果没有 LUA_PATH 这个环境变量，也可以自定义设置，在当前用户根目录下打开 .profile 文件（没有则创建，打开 .bashrc 文件也可以），例如把 "~/lua/" 路径加入 LUA_PATH 环境变量里：

--[[
  
#LUA_PATH
export LUA_PATH="~/lua/?.lua;;"

文件路径以 ";" 号分隔，最后的 2 个 ";;" 表示新加的路径后面加上原来的默认路径。

source ~/.profile


/Users/dengjoe/lua/?.lua;./?.lua;/usr/local/share/lua/5.1/?.lua;/usr/local/share/lua/5.1/?/init.lua;/usr/local/lib/lua/5.1/?.lua;/usr/local/lib/lua/5.1/?/init.lua

那么调用 require("module") 时就会尝试打开以下文件目录去搜索目标。
/Users/dengjoe/lua/module.lua;
./module.lua
/usr/local/share/lua/5.1/module.lua
/usr/local/share/lua/5.1/module/init.lua
/usr/local/lib/lua/5.1/module.lua
/usr/local/lib/lua/5.1/module/init.lua


如果找过目标文件，则会调用 package.loadfile 来加载模块。否则，就会去找 C 程序库。



--]]


-- C 包

-- lua 与 C 是很容易结合的，使用C为lua写包

--[[
  
Lua在一个叫loadlib的函数内提供了所有的动态连接的功能。这个函数有两个参数:库的绝对路径和初始化函数。所以典型的调用的例子如下:
local path = "/usr/local/lua/lib/libluasocket.so"
local f = loadlib(path, "luaopen_socket")


--]]
