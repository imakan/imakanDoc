import "reflect-metadata";
// Reflect Metadata 简单的来说，就是你可以通过装饰器来给类添加一些自定义的信息，然后通过反射将这些信息提取出来，当然你也可以通过反射来添加这些信息

let logType = (target: any, propertyKey: string) => {
  //  如果logType修饰是类中的属性，那么target是这个类，property是就是属性名字
  // 这里的design:type是内部定义的一个metadateKey，可以直接使用，
  // 由此可见，我们在使用getMetadata中的metadataKey要事先定义好，是用Reflect.definedMetadata
  let t = Reflect.getMetadata("design:type", target, propertyKey);
  console.log(`${propertyKey} type: ${t.name}`);
};

class Demo {
  @logType
  public test() {
    console.log(111);
  }
}

/**
 * 内置的元数据键
 * 类型元数据使用元数据键“design:type”
 * 参数类型元数据使用元数据键“design:paramtypes”
 * 返回值类型元数据使用元数据键’design:returntype‘
 */

let classDecorator = () => {
  return (target: any) => {
    // 在类上定义元数据，key为`classMetadata`,value为`a`
    Reflect.defineMetadata("classDecorator", "a", target);
  };
};

let methodDecorator = () => {
  // 在类的原型属性`someMethod`上定义元数据，key为`methodMetaData`,value为`b`
  return (target: any, key: string, descriptor: any) => {
    Reflect.defineMetadata("methodMetaData", "b", target, key);
  };
};

@classDecorator()
class SomeClass {
  @methodDecorator()
  someMethod() {}
}
console.log(Reflect.getMetadata("classDecorator", SomeClass));
console.log(
  Reflect.getMetadata("methodMetaData", new SomeClass(), "someMethod")
);

// Reflect.metadata(metadataKey,metadataValue)

@Reflect.metadata("name", "geekjc")
class A {
  @Reflect.metadata("name", "hello,geekjc")
  hello() {}
}

const objs = [A, new A, A.prototype];
const res = objs.map(obj => [
  Reflect.getMetadata('name', obj), 
  Reflect.getMetadata('name', obj, 'hello'),
  Reflect.getOwnMetadata('name', obj),
  Reflect.getOwnMetadata('name', obj ,'hello')
]);

// [ 'geekjc',undefined,'geekjc',undefined ]
// [ undefined,'hello,geekjc',undefined,undefined ]


console.log(res)