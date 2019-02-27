export class ParseIntBasedZipCodeValidator {
  isAcceptable(s: string) {
      return s.length === 5 && parseInt(s).toString() === s;
  }
}

// 导出原先的验证器但做了重命名
export {ZipCodeValidator as RegExpBasedZipCodeValidator} from "./ZipCodeValidator";