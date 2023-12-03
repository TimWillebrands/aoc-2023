const inputFull: string = await Deno.readTextFile(Deno.args[0]);

const lineWidth = inputFull.substring(0, inputFull.indexOf("\n")).length;
const grid = inputFull.split("\n").map((line) => [...line]);

function getNumbers(line: string[]) {
  const center = Math.floor(line.length/2)
  const lineWidth = 8
  const numbers = line.reduce((state, pt, i, arr) => {
    const pt1Num = Number(pt);
    const pt2Num = Number(arr[i + 1]);
    if (!isNaN(pt1Num)) {
      state.curr += pt;
    }

    if ((state.curr !== "" || !isNaN(pt2Num)) && !state.isNearSymbol) {
      state.isNearSymbol ||= (i - lineWidth) === center;
      state.isNearSymbol ||= (i + lineWidth) === center;
      state.isNearSymbol ||= (i + 1 - lineWidth) === center;
      state.isNearSymbol ||= (i + 1 + lineWidth) === center;
      state.isNearSymbol ||= i === center;
      state.isNearSymbol ||= (i + 1) === center;
    }

    if (isNaN(pt2Num) && state.curr !== "") {
      state.isNearSymbol && state.agg.push(Number(state.curr));
      state.curr = "";
      state.isNearSymbol = false;
    }

    return state;
  }, {
    curr: "",
    isNearSymbol: false,
    agg: new Array<number>(),
  }).agg

  return numbers.length === 2 
    ? numbers.reduce((prev, curr) => prev * curr)
    : 0
}

const gears = [...inputFull.replaceAll("\n", "")]
  .reduce((agg, curr, i) => curr === "*" ? [...agg, i] : agg, [] as number[])
  .map((gearIndex) => {
    const i = gearIndex % lineWidth;
    const topLine = grid[Math.floor(gearIndex / lineWidth) - 1].slice(i-3, i+4);
    const line = grid[Math.floor(gearIndex / lineWidth)].slice(i-3, i+4);
    const bottomLine = grid[Math.floor(gearIndex / lineWidth) + 1].slice(i-3, i+4);

    return getNumbers(['.', ...topLine, '.', ...line, '.', ...bottomLine])
  })
  .reduce((prev, curr) => prev + curr)

console.log(gears);
