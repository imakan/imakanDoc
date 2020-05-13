// 主要是在声明的时候添加和读取元数据
import "reflect-metadata";

const INCLASS = "INCLASS";
const INMETHOD = "INCLASS";

@Reflect.metadata(INCLASS, "A")
class Test {
  @Reflect.metadata(INMETHOD, "B")
  public hello(): string {
    return "hello world";
  }
}

// console.log(Reflect.getMetadata(INCLASS, Test));

function logType(target: any, propertyKey: any) {
  console.log(target)
  console.log(propertyKey)
  let t = Reflect.getMetadata("design:type", target, propertyKey);
  console.log(`${propertyKey} type: ${t.name}`)
}

class Demo{
  @logType
  public attr1:number
}