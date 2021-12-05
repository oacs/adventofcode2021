const { readFileSync } = require("fs");

const [drawNumbersRaw, ...inputArray] = readFileSync("./0x004/test.txt")
  .toString()
  .split("\n");

const drawNumbers = drawNumbersRaw.split(",");

const grabCardtones = (input) =>
  input.reduce((acc, curr, index) => {
    if (curr.length === 0) return acc;
    const i = index % 6;
    const row = curr.split(" ").filter((n) => n != "");
    if (i === 1)
      acc.push({
        rows: [row],
        rowPoints: [0, 0, 0, 0, 0],
        columnsPoints: [0, 0, 0, 0, 0],
        score: [
          [-1, -1, -1, -1, -1],
          [-1, -1, -1, -1, -1],
          [-1, -1, -1, -1, -1],
          [-1, -1, -1, -1, -1],
          [-1, -1, -1, -1, -1],
        ],
      });
    else acc[parseInt(index / 6)].rows.push(row);
    return acc;
  }, []);

const grabWinner = (cardtones) => {
  for (const number of drawNumbers) {
    for (const card of cardtones) {
      for (const [i, row] of card.rows.entries()) {
        for (const [j, n] of row.entries()) {
          if (n === number) {
            card.score[i][j] = number;
            card.rowPoints[i] += 1;
            card.columnsPoints[j] += 1;
            if (card.rowPoints[i] === 5 || card.columnsPoints[j] === 5) {
              return {
                card,
                lastNumber: number,
              };
            }
            break;
          }
        }
      }
    }
  }
  console.log("No winner");
};

const calculateScore = ({ card, lastNumber }) => {
  let score = 0;
  card.score.forEach((row, i) => {
    row.forEach((n, j) => {
      if (n === -1) {
        score += +card.rows[i][j];
      }
    });
  });
  return score * (card.winner || lastNumber);
};
console.log(calculateScore(grabWinner(grabCardtones(inputArray))));

const grabLastWinner = (cardtones) => {
  let lastWinner = null;
  let index = 0;
  while (cardtones.length != 0 || drawNumbers.length == 0) {
    const number = drawNumbers.shift();
    while (index < cardtones.length) {
      const card = cardtones[index];
      let i = 0;
      let j = 0;
      while (i < card.rows.length) {
        while (j < card.rows[i].length) {
          if (card.rows[i][j] === number) {
            card.score[i][j] = number;
            card.rowPoints[i] += 1;
            card.columnsPoints[j] += 1;
            if (card.rowPoints[i] === 5 || card.columnsPoints[j] === 5) {
              card.winner = number;
              lastWinner = { card: cardtones.splice(index, 1)[0] };
              index--;
              j = card.rows[i].length;
              i = card.rows.length;
            }
          }
        }
      }
      index++;
    }
    index = 0;
  }
  return lastWinner;
};

console.log(calculateScore(grabLastWinner(grabCardtones(inputArray))));
