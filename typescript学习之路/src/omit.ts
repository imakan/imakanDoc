

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