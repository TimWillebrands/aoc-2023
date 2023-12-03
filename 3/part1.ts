const inputFull: string = await Deno.readTextFile(Deno.args[0]);

const lineWidth = inputFull.substring(0, inputFull.indexOf("\n")).length;
const all = [...inputFull.replaceAll("\n", "")];
const symbols = all
  .filter((char) => char !== undefined && char !== "." && isNaN(Number(char)))
  .filter((char, i, arr) => arr.indexOf(char) === i);

const input = all
  .reduce((state, pt, i, arr) => {
    const pt1Num = Number(pt);
    const pt2Num = Number(arr[i + 1]);
    if (!isNaN(pt1Num)) {
      state.curr += pt;
    }

    if ((state.curr !== "" || !isNaN(pt2Num)) && !state.isNearSymbol) {
      state.isNearSymbol ||= symbols.includes(arr[i - lineWidth]);
      state.isNearSymbol ||= symbols.includes(arr[i + lineWidth]);
      state.isNearSymbol ||= symbols.includes(arr[i + 1 - lineWidth]);
      state.isNearSymbol ||= symbols.includes(arr[i + 1 + lineWidth]);
      state.isNearSymbol ||= symbols.includes(arr[i]);
      state.isNearSymbol ||= symbols.includes(arr[i + 1]);
    }

    if (isNaN(pt2Num) && state.curr !== "") {
      state.agg.push({ num: Number(state.curr), isPart: state.isNearSymbol });
      state.curr = "";
      state.isNearSymbol = false;
    }

    return state;
  }, {
    curr: "",
    isNearSymbol: false,
    agg: new Array<{ num: number; isPart: boolean }>(),
  }).agg
  .reduce((agg, value) => value.isPart ? agg + value.num : agg, 0);

console.log(symbols, input);
