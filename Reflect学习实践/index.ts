import "reflect-metadata";

@modifyClass('param')
class A {

}
@modifyClass('param')
class B {

}

function modifyClass(param: any) {
  return (target: any) => {
    Reflect.defineMetadata(Symbol.for('META_PARAM'), param, target.prototype)
  }
}

// console.log(Reflect.getMetadata(Symbol.for('META_PARAM'), A.prototype))
