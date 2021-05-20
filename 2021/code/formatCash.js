let num = "12123";
num = num.replace(/(\d)(?=(\d{3})+$)/g, "$1,");
console.log(num);
