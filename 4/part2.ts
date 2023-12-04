const inputFull: string = await Deno.readTextFile(Deno.args[0]);
const scores = [0,1,2,4,8,16,32,64,128,256,512]

const input = inputFull
  .split("\n")
  .filter((line) => line !== "" && line !== " ")
  .map((line: string) => ({
    id: line.substring(line.indexOf(" "), line.indexOf(":")),
    winning: line.substring(line.indexOf(':'), line.indexOf('|')).match(/\d+/g)?.map(Number) ?? [],
    numbers: line.substring(line.indexOf('|')).match(/\d+/g)?.map(Number) ?? [],
  }))
  .map(line => ({
    id: line.id,
    winnings: line.numbers.reduce((wins, ownNumber) => line.winning.includes(ownNumber) ? wins+1: wins,0)
  }))
  .reduce((score, line) => score + scores[line.winnings], 0)

console.log(input);