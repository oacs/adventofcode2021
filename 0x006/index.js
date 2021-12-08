const { readFileSync } = require("fs");

const inputArray = readFileSync("./0x006/input.txt")
  .toString()
  .split("\n")[0]
  .split(",");

const calculateSonsRecursive = (status, daysLeft) => {
  if (daysLeft <= status) {
    return 1;
  }
  return (
    calculateSonsRecursive(9, daysLeft - status) +
    calculateSonsRecursive(7, daysLeft - status)
  );
};

const calculateSons = (status, daysLeft) => {
  const cache = {};
  const calculateSonsRecursiveMemo = (status, daysLeft) => {
    if (daysLeft <= status) {
      return 1;
    }
    if (cache[daysLeft + "," + status]) {
      return cache[daysLeft + "," + status];
    }
    cache[daysLeft + "," + status] =
      calculateSonsRecursiveMemo(9, daysLeft - status) +
      calculateSonsRecursiveMemo(7, daysLeft - status);
    return cache[daysLeft + "," + status];
  };
  return calculateSonsRecursiveMemo(status, daysLeft);
};

const firstStar = inputArray.reduce((acc, curr) => {
  return acc + calculateSonsRecursive(curr, 80);
}, 0);
const secondStar = inputArray.reduce((acc, curr) => {
  return acc + calculateSons(parseInt(curr), 256);
}, 0);

console.log({ firstStar, secondStar });
