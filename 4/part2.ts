const inputFull: string = await Deno.readTextFile(Deno.args[0]);

const input = inputFull
  .split("\n")
  .filter((line) => line !== "" && line !== " ")
  .map((line: string) => ({
    id: line.substring(line.indexOf(" "), line.indexOf(":")),
    winning: line.substring(line.indexOf(':'), line.indexOf('|')).match(/\d+/g)?.map(Number) ?? [],
    numbers: line.substring(line.indexOf('|')).match(/\d+/g)?.map(Number) ?? [],
  }))
  .map(line => ({
    id: Number(line.id),
    instances: 1,
    winnings: line.numbers.reduce((wins, ownNumber) => line.winning.includes(ownNumber) ? wins+1: wins,0)
  }))

const map = input.reduce((map, card) => map.set(card.id, card) , new Map<number, (typeof input)[number]>())

for (const card of input) {
  for(let i = card.id+1; i<= card.id+card.winnings; i++){
    const next = map.get(i)
    if(next !== undefined){
      next.instances += card.instances
    }
  } 
}

console.log([...map.values()].reduce((score, card) => score + card.instances, 0));
