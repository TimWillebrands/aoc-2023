
const inputFull: string = await Deno.readTextFile(Deno.args[0]);

const almanac = inputFull
    .split(":")
    .slice(2)
    .map(m => m
        .split('\n')
        .map(map => map.match(/\d+/g)?.map(Number) ?? [])
        .filter(map => map.length > 0)
        .reduce((routes, route) => {
            for (let i = 0; i < route[2]; i++) {
                routes.set(route[1] + i, route[0] + i)
            }
            return routes
        }, new Map<number, number>())
    )

const seeds = (inputFull
    .substring(0, inputFull.indexOf('\n'))
    .match(/\d+/g)?.map(Number) ?? [])
    .map(seed => almanac.reduce((value, route) => route.get(value) ?? value ,seed))
    .sort((a,b) => a-b)

console.log(seeds);