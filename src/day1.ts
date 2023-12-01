import fs from "fs/promises";

const newLineCharCode = "\n".charCodeAt(0);
const zeroCharCode = "0".charCodeAt(0);
const nineCharCode = "9".charCodeAt(0);

const numbers = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine"
];


async function part1(data: Buffer) {

  let acc = 0;
  let first: number = -1;
  let last: number = -1;
  for (let ch of data) {
    if (ch == newLineCharCode) {
      if (first != -1) {
        acc += first * 10 + last;
      }
      first = -1;
      last = -1;
    }
    if (ch >= zeroCharCode && ch <= nineCharCode) {
      if (first == -1) {
        first = ch - zeroCharCode;
      }
      last = ch - zeroCharCode;
    }
  }
  if (first != -1) {
    acc += first * 10 + last;
  }

  return acc;
}

async function part2(data: Buffer) {
  // Flemme d'optimiser
  let fullText = data.toString('utf-8');

  for (let i = 0; i < numbers.length; i++) {
    fullText = fullText.replaceAll(numbers[i], numbers[i] + (i + 1).toString() + numbers[i]); // Yes, ugly.
  }

  return part1(Buffer.from(fullText));
}

fs.readFile("./input.txt").then(async (buffer) => {
  let res1 = await part1(buffer);
  console.log("Part 1:", res1);
  let res2 = await part2(buffer);
  console.log("Part 2:", res2);
});