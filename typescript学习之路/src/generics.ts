namespace generics {
    // 我们需要一种方法使返回值的类型与传入参数类的类型是相同的，这里我们使用了类型变量，他是一种特殊的变量，只用于表示类型而不是值
    function identity<T>(arg: T): T {
        return arg
    }
    identity('maaa')
    identity<number>(1111)
    // function loggingIdentity<T>(arg: T[]): T[] {
    //   return arg
    // }
    // 泛型接口
    interface GenericaIndentity<T> {
        (arg: T): T
    }
    function indentity<T>(arg: T): T {
        return arg
    }
    let myIndentity: GenericaIndentity<number> = indentity
    // 泛型类

    class GenericNumber<T>{
        zeroValue: T
        add: (x: T, y: T) => T
    }
    interface Lengthwise {
        length: number;
    }

    function loggingIdentity<T extends Lengthwise>(arg: T): T {
        console.log(arg.length);  // Now we know it has a .length property, so no more error
        return arg;
    }
    loggingIdentity({ length: 10, value: 3 });

    function i<T>(arg: T): T {
        return arg
    }

    function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
        return obj[key];
    }

    let x = { a: 1, b: 2, c: 3, d: 4 };
    getProperty(x, "a");
}