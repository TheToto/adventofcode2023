import fs from "fs/promises";

async function part1(data: Buffer) {
  let results = data.toString('utf-8').split("\n").map((line, i) => {
    let [_, triesText] = line.split(":");
    let tries = triesText.split(";");
    for (let oneTry of tries) {
      let picks = oneTry.split(",");
      let blues = 0;
      let reds = 0;
      let greens = 0;
      for (let pick of picks) {
        pick = pick.trim();
        let [count, color] = pick.split(" ");
        color = color.trim();
        if (color == "blue") {
          blues += parseInt(count);
        } else if (color == "red") {
          reds += parseInt(count);
        } else if (color == "green") {
          greens += parseInt(count);
        }
      }
      if (reds > 12 || greens > 13 || blues > 14) {
        return 0;
      }
    }
    return i + 1;
  });

  return results.reduce((acc, val) => acc + val, 0);
}

async function part2(data: Buffer) {
  let results = data.toString('utf-8').split("\n").map((line, i) => {
    let [_, triesText] = line.split(":");
    let tries = triesText.split(";");
    let minBlue = 0;
    let minRed = 0;
    let minGreen = 0;
    for (let oneTry of tries) {
      let picks = oneTry.split(",");
      let blues = 0;
      let reds = 0;
      let greens = 0;
      for (let pick of picks) {
        pick = pick.trim();
        let [count, color] = pick.split(" ");
        color = color.trim();
        if (color == "blue") {
          blues += parseInt(count);
        } else if (color == "red") {
          reds += parseInt(count);
        } else if (color == "green") {
          greens += parseInt(count);
        }
      }
      minBlue = Math.max(minBlue, blues);
      minRed = Math.max(minRed, reds);
      minGreen = Math.max(minGreen, greens);
    }
    return minBlue * minRed * minGreen
  });

  return results.reduce((acc, val) => acc + val, 0);
}

fs.readFile("./src/day2.txt").then(async (buffer) => {
  let res1 = await part1(buffer);
  console.log("Part 1:", res1);
  let res2 = await part2(buffer);
  console.log("Part 2:", res2);
});