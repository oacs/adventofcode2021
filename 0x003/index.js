const { readFileSync } = require("fs");

const inputArray = readFileSync("./0x003/input.txt").toString().split("\n");

const binToNumber = (bin) => parseInt(bin.join(""), 2);
inputArray.pop();

const grabCommonBits = (acc, curr) =>
  curr.split("").map((bit, i) => (acc[i] ?? 0) + parseInt(bit));
const firstStar = inputArray
  .reduce(grabCommonBits, [])
  .map((bit) => +(bit >= inputArray.length / 2));

console.log(
  "First star:",
  binToNumber(firstStar.map((char) => char ^ 1)) * binToNumber(firstStar)
);
console.log(firstStar ^ 1);
console.log(binToNumber(firstStar.map((char) => char ^ 1)));
const grabCommonBitAtIndex = (index) => (acc, curr) =>
  parseInt(curr[index]) + acc;

const secondStar = (bits, lessCommon, i = 0) => {
  if (bits.length === 1) return parseInt(bits[0], 2);

  const filter = +(
    (bits.reduce(grabCommonBitAtIndex(i), 0) >= bits.length / 2) ^
    lessCommon
  );

  return secondStar(
    bits.filter((bit) => bit[i] == filter),
    lessCommon,
    ++i
  );
};

console.log(
  "Second star:",
  secondStar(inputArray, false) * secondStar(inputArray, true)
);
