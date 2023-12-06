const inputFull: string = await Deno.readTextFile(Deno.args[0]);

function getRoute(routes: [number, number, number][], value: number) {
    const fit = routes
        .find(route => value >= route[1] && value <= route[1] + route[2])

    return fit ? fit[0] + (value - fit[1]) : value
}

const almanac = inputFull
    .split(":")
    .slice(2)
    .map(m => m
        .split('\n')
        .map(map => map.match(/\d+/g)?.map(Number) ?? [])
        .filter(map => map.length > 0) as [number, number, number][]
    )

const seeds = (inputFull
    .substring(0, inputFull.indexOf('\n'))
    .match(/\d+/g)
    ?.map(Number) ?? [])
    .reduce((agg, seedSeed, seedI, arr) => {
        if (seedI % 2 === 0) {
            agg.push([seedSeed, arr[seedI + 1]])
        }
        return agg
    }, new Array<[number, number]>())
    .map(seedRange => function* generator() {
        const cap = seedRange[0] + seedRange[1]
        let counter = seedRange[0];
        while (counter < cap) {
            yield counter++;
        }
    })
    
let minLoc = Number.MAX_SAFE_INTEGER
let t = 1

console.log('There are in total this many seedpairs:', seeds.length)

for await(const seedIter of seeds){
    const tt = t++;
    let localMin = Number.MAX_SAFE_INTEGER
    let iter = 0;
    
    for await(const seed of seedIter()){
        const loc = almanac.reduce((value, route) => getRoute(route, value), seed)
        if(loc < localMin) console.log('We went local lower! seedpair', tt, 'is on iteration', iter,', seed',seed, ',loc', loc, 'and previous:', localMin)
        localMin = Math.min(loc, localMin)

        iter++
    }
    
    minLoc = Math.min(localMin, minLoc)
    console.log('finished seedpair:', tt, 'current lowest loc:', minLoc)
}

console.log(minLoc);