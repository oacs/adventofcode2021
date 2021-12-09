const { readFileSync } = require("fs");

const inputArray = readFileSync("./0x007/input.txt")
  .toString()
  .split("\n")[0]
  .split(",")
  .map((i) => parseInt(i));

const findMin = (arr) => {
  let min = Infinity;
  for (let i = 0; i < arr.length; i++) {
    const current = arr[i];
    const diff = arr.reduce((acc, item) => acc + Math.abs(item - current), 0);
    if (diff < min) {
      min = diff;
    }
  }
  return min;
};
let cache = {};
const factMemoize = (key) => {
  if (cache[key]) {
    return cache[key];
  }
  let result = 0;
  for (let i = 1; i <= key; i++) {
    result += i;
  }
  cache[key] = result;
  return cache[key];
};

const findMin2 = (arr) => {
  let min = Infinity;
  const sorted = arr.reduce((acc, num) => (acc > num ? acc : num));
  for (let i = 0; i < sorted; i++) {
    const diff = arr.reduce(
      (acc, item) => acc + factMemoize(Math.abs(item - i)),
      0
    );
    if (diff < min) {
      min = diff;
      num = i;
    }
  }
  return min;
};

const firstStar = findMin(inputArray);
const secondStar = findMin2(inputArray);
console.log({ firstStar, secondStar });
