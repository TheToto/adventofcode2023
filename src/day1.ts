import fs from "fs/promises";

const newLineCharCode = "\n".charCodeAt(0);
const zeroCharCode = "0".charCodeAt(0);
const nineCharCode = "9".charCodeAt(0);

async function part1() {
  let data = await fs.readFile("./input.txt");
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

  console.log("Part 1:", acc);
}

part1();