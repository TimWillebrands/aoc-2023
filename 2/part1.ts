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
    })),
  }))
  .filter((game) =>
    !game.reveals.some((reveal) =>
      reveal.r > 12 || reveal.g > 13 || reveal.b > 14
    )
  )
  .reduce((agg, game) => agg + Number(game.id), 0);

console.log(input);
