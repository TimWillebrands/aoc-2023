const inputFull: string = await Deno.readTextFile(Deno.args[0]);

const input = inputFull
  .split("\n")
  .filter((line) => line !== "" && line !== " ")
  .map((line: string) => ({
    id: line.substring(line.indexOf(" "), line.indexOf(":")),
    reveals: line.substring(line.indexOf(":") + 1).split(";").map((reveal) => ({
      r: Number(reveal.match(/(\d+)\s+red/)?.[1] ?? 0),
      g: Number(reveal.match(/(\d+)\s+green/)?.[1] ?? 0),
      b: Number(reveal.match(/(\d+)\s+blue/)?.[1] ?? 0),
    }))
      .reduce((prev, curr) => ({
        r: Math.max(prev.r, curr.r),
        g: Math.max(prev.g, curr.g),
        b: Math.max(prev.b, curr.b),
      })),
  }))
  .reduce(
    (agg, game) => agg + (game.reveals.r * game.reveals.g * game.reveals.b),
    0,
  );

console.log(input);
