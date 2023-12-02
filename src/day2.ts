import fs from "fs/promises";

async function part1(data: Buffer) {
  let results = data.toString('utf-8').split("\n").map((line, i) => {
    let [_, tries] = line.split(":");
    for (let oneTry of tries.split(";")) {
      let colors = {
        blue: 0,
        red: 0,
        green: 0
      };
      for (let pick of oneTry.split(",")) {
        let [count, color] = pick.trim().split(" ");
        colors[color] += parseInt(count);
      }
      if (colors.red > 12 || colors.green > 13 || colors.blue > 14) {
        return 0;
      }
    }
    return i + 1;
  });

  return results.reduce((acc, val) => acc + val, 0);
}

async function part2(data: Buffer) {
  let results = data.toString('utf-8').split("\n").map((line, i) => {
    let [_, tries] = line.split(":");
    let mins = {
      blue: 0,
      red: 0,
      green: 0
    }
    for (let oneTry of tries.split(";")) {
      let colors = {
        blue: 0,
        red: 0,
        green: 0
      };
      for (let pick of oneTry.split(",")) {
        let [count, color] = pick.trim().split(" ");
        colors[color] += parseInt(count);
      }
      mins.blue = Math.max(mins.blue, colors.blue);
      mins.red = Math.max(mins.red, colors.red);
      mins.green = Math.max(mins.green, colors.green);
    }
    return mins.blue * mins.red * mins.green;
  });

  return results.reduce((acc, val) => acc + val, 0);
}

fs.readFile("./src/day2.txt").then(async (buffer) => {
  let res1 = await part1(buffer);
  console.log("Part 1:", res1);
  let res2 = await part2(buffer);
  console.log("Part 2:", res2);
});