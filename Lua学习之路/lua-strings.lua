#! /usr/local/bin/lua

-- Lua字符串
-- 在lua语言中字符串可以使用三种方式表示
--[[
1、单引号间的一串字符
2、双引号间的一串字符
3、[[和间的一串字符  
--]]

string1 = 'lua'
string2 = "lua2"
string3 = [[lua3]]
print(string3)


-- 字符串操作
--[[
1、string.upper(argument): 转大写
2、string.lower(argument):转小写  gsub替换
3、string.gsub(mainString,findString,replaceString,num):在字符串中替换，mainString为目标字符串，findString想要找到要替换的字符串，replaceString,替换为什么字符串，num,替换几个，比如找到5个，num为3，则直替换3个（可以忽略，则全部替换）
4、string.find(str,substr,init,end):在一个字符串中查找，
5、string.reverse(arg)字符串反转
6、string.format(...)返回一个类似printf的格式化字符串
7、string.char(arg)和string.byte(arg,int):char是将数字转换为字符并连接，byte是将字符转换为数字，int是表示转换第几个数字,如果不写int，则默认转换第一个字符
8、string.len(arg)：计算字符串长度
9、string.rep(string,n)返回字符串string的n个拷贝
10、..连接两个字符串
11、string.gmatch(str,pattern):
-- 返回一个迭代器函数，每一次调用这个函数，返回一个在字符串str找到的下一个符合pattern描述的子串，如果都没有找到则返回nil
12、string.match(str,pattern,init)查找字符串str的第一个匹配的字符，init可选，默认为1
13、string.sub()字符串截取
--]]

print(string.format("%d, %s", string.match("I have 2 questions for you.", "(%d+) (%a+)")))

print(string.match("I have 2 questions for you.", "%d+ %q+"))

-- 注意 注意 注意：%a是匹配字母

-- ，-是匹配任意字符
-- %q是双引号间的string

--[[
%c - 接受一个数字, 并将其转化为ASCII码表中对应的字符
%d, %i - 接受一个数字并将其转化为有符号的整数格式
%o - 接受一个数字并将其转化为八进制数格式
%u - 接受一个数字并将其转化为无符号整数格式
%x - 接受一个数字并将其转化为十六进制数格式, 使用小写字母
%X - 接受一个数字并将其转化为十六进制数格式, 使用大写字母
%e - 接受一个数字并将其转化为科学记数法格式, 使用小写字母e
%E - 接受一个数字并将其转化为科学记数法格式, 使用大写字母E
%f - 接受一个数字并将其转化为浮点数格式
%g(%G) - 接受一个数字并将其转化为%e(%E, 对应%G)及%f中较短的一种格式
%q - 接受一个字符串并将其转化为可安全被Lua编译器读入的格式
%s - 接受一个字符串并按照给定的参数格式化该字符串
为进一步细化格式, 可以在%号后添加参数. 参数将以如下的顺序读入:

(1) 符号: 一个+号表示其后的数字转义符将让正数显示正号. 默认情况下只有负数显示符号.
(2) 占位符: 一个0, 在后面指定了字串宽度时占位用. 不填时的默认占位符是空格.
(3) 对齐标识: 在指定了字串宽度时, 默认为右对齐, 增加-号可以改为左对齐.
(4) 宽度数值
(5) 小数位数/字串裁切: 在宽度数值后增加的小数部分n, 若后接f(浮点数转义符, 如%6.3f)则设定该浮点数的小数只保留n位, 若后接s(字符串转义符, 如%5.3s)则设定该字符串只显示前n位.  

--]]

-- 匹配模式
-- lua中的匹配模式直接用常规的字符串来描述。它用于模式匹配函数 string.find，string.gmatch,string.gsub，string.match
-- 可以使用字符类。字符类的意思是说，这个是一个正则规则，这个字符包含了我们想要匹配的内容。比如 date = "%d%d/%d%d/%d%d%d%d"


-- 单字符（除了^$()%.[]*+-?外）：与该字符自身匹配

--[[
1、.点：与任何字符匹配
2、%a:与任何字母匹配
3、%c:与任何控制符匹配（例如\n）
4、%d：与任何数字匹配
5、%l：与任何小写字母匹配
6、%p:与任何标点（punctuation）匹配
7、%s:与任何空白符匹配
8、%u与任何大写字母匹配
9：%w与任何字母或者数字匹配
10、%x与任何十六进制数配对
11、%z与任何代表0的字符配对
12、[数个字符类]：与任何【】中包含的字符类匹配，例如【%w_】与任何字母/数字，或下划线符号(_)匹配
13：【^数个字符类】不包含


注意 注意 注意：当上述的字符类用大写书写时，表示与非此类字符类的任何字符匹配，例如：%S表示与任何非空白字符匹配，%A,非字母的字符
--]]

print(string.gsub("hello, up-down!", "%A", ".")) -- 返回的数字是代表替换的次数

-- ‘%’ 用作特殊字符的转义字符，因此‘%.’匹配点；‘%%’匹配字符‘%’。。转义字符‘%’不仅可以用来转义特殊字符，还可以用于所有的非字母的字符