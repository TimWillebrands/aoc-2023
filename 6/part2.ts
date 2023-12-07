const inputFull: string = await Deno.readTextFile(Deno.args[0])

const [time, dist] = inputFull
    .split('\n')
    .map(line => Number(line.match(/\d+/g)?.join('')))

let wins = 0
for (let i = 0; i <= time; i++) {
    if ((time - i) * i > dist) wins++
}

console.log(wins)