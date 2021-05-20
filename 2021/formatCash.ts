const formatCash = (num: number | string) => {
  let temp = num
    .toString()
    .split("")
    .reverse()
    .reduce((pr, cr, index) => {
      return index % 3 ? pr + "" + cr : pr + "," + cr;
    });
  return temp.split("").reverse().join("");
};

const formatCash2 = (num: string | number) => {
  return num.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1,");
};

console.log(formatCash2(1234567000));
