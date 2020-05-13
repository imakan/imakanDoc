interface iterable {
  [Symbol.iterator]: Iterator;
}

interface Iterator {
  next(value?: any): IterationResult;
}
interface IterationResult {
  value: any;
  done: boolean;
}
