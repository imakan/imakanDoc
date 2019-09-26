

// Exclude<T,U> ，Exclude 排除
type T00 = Exclude<'a' | 'b' | 'c' | 'd','a' | 'c' | 'f'>  // 'b' | 'd' 
// 用到了Exclude这个条件类型，会寻找到在T类型中的，但是不在U类型中的成员，最终将获取到的Union类型 'b' | 'd'给T00

// Extract提炼
type T01 = Extract<'a' | 'b' | 'c' | 'd','a' | 'c' | 'f'>
// 用到了Extract这个条件类型，会寻找在T中存在的成员同时也在U中存在的成员

type T02 = NonNullable<string | number | undefined>
// 用到了NonNullable清除了null以及undefined

type T03 = ReturnType<() => string>

class C {
  x = 0;
  y = 0
}
type T04 = InstanceType<typeof C>


interface Student {
  name: string;
  age: number;
}

type T05 = Pick<Student,'name'>
type T010 = Omit<Student,'name'>


// 正常的Pick内置对象是，返回我们选择的对象属性，比如 Pick<Student,'name'> 是返回Student中name的键值属性，也就是name:string，如果实现Omit的话，我们需要返回age:number，所以：

// Pick是选出在T中的属性键值，而Omit是选出不再里面的，所以我们用到了Exclude

// type Omit<T,K extends keyof T> = Pick<T,Exclude<keyof T,K>>

interface T06 {
  a:number;
  b:string;
  c:boolean;
  d:any[]
}

type OmitType = Omit<T06,'a'>

