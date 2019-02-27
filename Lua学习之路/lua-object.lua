-- 简单的实例

-- 以下简单的类包含了三个属性，area,length和breadth,printArea方法用于打印计算结果

-- Meta class
Rectangle = {}

-- 派生类的方法 new 
function Rectangle:new (o,length,breadth)
  o = o or {}
  --  self = Rectangle
  setmetatable(o, self)
  self.__index = self
  self.length = length or 0
  self.breadth = breadth or 0
  self.area = length * breadth
  return o
end

-- 派生类的方法 printArea
function Rectangle:printArea()
  print("矩形面积为 ",self.area)
end

r = Rectangle:new(nil,10,20)

print(r.length)

-- 访问成员  我们可以使用冒号：来访问类的成员函数
r:printArea()
