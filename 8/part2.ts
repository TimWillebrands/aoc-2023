const inputFull: string = await Deno.readTextFile(Deno.args[0]);
const lines = inputFull.replace(/\r\n?/g, '\n').split('\n')

const instructions = [...lines[0]].map(dir => dir === 'R' ? 1 : 0)
const map = lines
    .slice(2)
    .map(line => line.match(/\b(\w{3})\b/g))
    .reduce((agg, line) => agg.set(line![0], [line![1], line![2]]), new Map<string, [string, string]>())

const starts = [...map.keys()]
    .filter(loc => loc.includes('A'))
    .map(start => {
        let steps = 0
        let curr = start

        while (!curr.includes('Z')) {
            const dir = instructions[steps % instructions.length]
            const dest = map.get(curr)![dir]

            curr = dest
            steps++
        }
        return steps
    })
    
console.log(starts) // | https://www.calculatorsoup.com/calculators/math/lcm.php