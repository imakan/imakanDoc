// ts中的元祖 tuple是在array的基础上为每个元素设置类型和长度
// 在ts类型过程中，T extend (param:infer P) => any 表示， T 可以赋值给(param:infer P) => any
// [string,number] 可以赋值给Array<string|number>
type ElementOf<T> = T extends Array<infer E> ? E : never;
type TTuple = [string, number];
type ToUnion = ElementOf<TTuple>; // string | number

type ReturnsType<T> = T extends (...args: any[]) => infer P ? P : T;

type ShiftAction<T extends any[]> = ((...args: T) => any) extends (
  args1: any,
  ...rest: infer R
) => any
  ? R
  : never;
type tuple = ["vue", "react", "angular"];
type resultWithShiftAction = ShiftAction<tuple>; // ["react", "angular"]

type UnshiftAction<T extends any[], K> = ((
  args: K,
  ...rest: T
) => any) extends (...a: infer R) => any
  ? R
  : never;

type resultWithUnshiftAction = UnshiftAction<tuple, "jquery">; // ["jquery", "vue", "react", "angular"]

// 取到数组的最后一位
type ReplaceValByOwnKey<T, S extends any> = { [P in keyof T]: S[P] };

type PopAction<T extends any[]> = ReplaceValByOwnKey<ShiftAction<T>, T>;

type resultWithPopAction = PopAction<tuple>; // ["vue", "react"]

type PushAction<T extends any[], E> = ReplaceValByOwnKey<
  UnshiftAction<T, any>,
  T & { [k: string]: E }
>;

type resultWithPushAction = PushAction<tuple, "jquery">; // ["vue", "react", "angular", "jquery"]
