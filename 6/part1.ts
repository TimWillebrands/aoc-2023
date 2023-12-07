const inputFull: string = await Deno.readTextFile(Deno.args[0])
    
const games = inputFull
    .split('\n')
    .map(line => line.match(/\d+/g)?.map(Number))

const records = games[0]
    ?.map((time, i) => [time, games[1]![i]] as [number,number])
    .map(([time,dist]) => {
        let wins = 0
        for(let i=0;i<=time;i++){
            if((time-i)*i > dist) wins++
        }
        return wins
    })
    .reduce((prev, curr) => prev*curr)

console.log(records)