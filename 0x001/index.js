const { readFileSync } = require("fs");

const inputArray = readFileSync("./0x001/input.txt").toString().split("\n");

const firstStar = inputArray.reduce(
  ({ upper, prev }, curr) => {
    const num = parseInt(curr);
    return { prev: num, upper: (upper += num > prev) };
  },
  { upper: -1, prev: 0 }
);

const secondStar = inputArray.reduce(
  (upper, curr, i, array) => (upper += parseInt(curr) < array[i + 3]),
  0
);

console.log("firstStar", firstStar);
console.log("secondStar", secondStar);
