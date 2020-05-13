import fs  = require('fs');

import path = require('path')

export const JsTsReg = /\.js$|\.ts$/;
/**
 * @desc 判断是否是 js 或 ts 文件
 */
export function isJsTsFile(filename: string) {
  return JsTsReg.test(filename);
}

let getBuiltInModuleNames = (path: string) => {
  return fs
    .readdirSync(path)
    .filter(file => isJsTsFile(file))
    .map(file => file.replace(JsTsReg, ""));
};

getBuiltInModuleNames(path.join(__dirname, './'))


console.log(getBuiltInModuleNames(path.join(__dirname, './')))