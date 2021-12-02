const { readFileSync } = require("fs");

const inputArray = readFileSync("./0x002/input.txt").toString().split("\n");

const firstStar = inputArray.reduce(
  ({ x, y }, curr) => {
    const [a, b] = curr.split(" ");
    const num = parseInt(b);
    switch (a) {
      case "forward":
        return { x: x + num, y };
      case "down":
        return { x, y: y + num };
      case "up":
        return { x, y: y - num };
      default:
        return { x, y };
    }
  },
  { x: 0, y: 0 }
);

const secondStar = inputArray.reduce(
  ({ x, y, z }, curr) => {
    const [a, b] = curr.split(" ");
    const num = parseInt(b);
    switch (a) {
      case "forward":
        return { x: x + num, y: y + num * z, z };
      case "down":
        return { x, y, z: z + num };
      case "up":
        return { x, y, z: z - num };
      default:
        return { x, y, z };
    }
  },
  { x: 0, y: 0, z: 0 }
);
console.log(firstStar.x * firstStar.y);
console.log(secondStar.x * secondStar.y, { secondStar });
