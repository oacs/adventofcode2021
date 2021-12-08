const { readFileSync } = require("fs");

const inputArrayRaw = readFileSync("./0x005/input.txt").toString().split("\n");

const coords = inputArrayRaw
  .map((coords) => coords.split(" -> "))
  .map((coords) => coords.map((coord) => coord.split(",")))
  .map((coords) =>
    coords.map((coord) => coord.map((coord) => parseInt(coord)))
  );

coords.pop();
//console.log(coords);
// First try
const firstTry = coords.reduce((acc, [[x1, y1], [x2, y2]]) => {
  let staticCoord = null;
  let variableCoords = null;

  if (x1 === x2) {
    staticCoord = x1;
    variableCoords = [y1, y2].sort((a, b) => a - b);
    if (!acc[x1]) {
      acc[x1] = {};
    }
  } else if (y1 === y2) {
    staticCoord = y1;
    variableCoords = [x1, x2].sort((a, b) => a - b);
  } else {
    return acc;
  }

  for (let i = variableCoords[0]; i <= variableCoords[1]; i++) {
    if (staticCoord === x1) {
      acc[x1][i] = (acc[x1][i] ?? 0) + 1;
    } else {
      if (!acc[i]) {
        acc[i] = {};
      }
      acc[i][y1] = (acc[i][y1] ?? 0) + 1;
    }
  }

  return acc;
}, {});
const firstTryCount = Object.keys(firstTry).reduce((acc, x) => {
  const count = Object.keys(firstTry[x]).reduce(
    (acc2, y) => (acc2 += +(firstTry[x][y] > 1)),
    0
  );
  return acc + count;
}, 0);

//console.log(firstTryCount);

// Second try
const secondTry = coords.reduce((acc, [[x1, y1], [x2, y2]]) => {
  let staticCoord = x1;
  let variableCoords = [y1, y2].sort((a, b) => a - b);
  if (y1 === y2) {
    staticCoord = y1;
    variableCoords = [x1, x2].sort((a, b) => a - b);
  } else if (x1 !== x2) {
    return acc;
  }
  for (
    let i = Math.min(variableCoords[0], variableCoords[1]);
    i <= variableCoords[1];
    i++
  ) {
    const path = staticCoord === x1 ? `${x1},${i}` : `${i},${y1}`;
    acc[path] = (acc[path] ?? 0) + 1;
  }
  return acc;
}, {});

const secondTryCount = Object.keys(secondTry).reduce(
  (acc, x) => (secondTry[x] > 1 ? acc + 1 : acc),
  0
);
//console.log({ secondTryCount, length: Object.keys(secondTry).length });

// Last try
const calcInterceptions = (coords, includeDiagonals = false) => {
  const matrix = coords.reduce((acc, [[x1, y1], [x2, y2]]) => {
    if (y1 === y2 || x1 === x2) {
      for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
        for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
          const path = `${x},${y}`;
          acc[path] = (acc[path] ?? 0) + 1;
        }
      }
    } else if (includeDiagonals) {
      const slope = (y2 - y1) / (x2 - x1);
      if (Math.atan(Math.abs(slope)) === Math.PI / 4) {
        for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
          const y = slope * (x - x1) + y1;
          const path = `${x},${y}`;
          acc[path] = (acc[path] ?? 0) + 1;
        }
      }
    }
    return acc;
  }, {});
  return Object.keys(matrix).reduce(
    (acc, x) => (matrix[x] > 1 ? acc + 1 : acc),
    0
  );
};

const firstStar = calcInterceptions(coords);
const secondStart = calcInterceptions(coords, true);
console.log({ firstStar, secondStart });
