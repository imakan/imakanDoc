function Foo<T>() {
  return function (param: T) {
    return param;
  };
}

const myFooStr = Foo<string>();

type Excludes<T, U> = T extends U ? never : T;
