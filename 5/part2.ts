
const inputFull: string = await Deno.readTextFile(Deno.args[0]);

function getRoute(routes:[number,number,number][], value:number){
    const fit = routes
        .find(route => value >= route[1] && value <= route[1]+route[2])
        
    return fit ? fit[0]+(value-fit[1]) : value
}

const almanac = inputFull
    .split(":")
    .slice(2)
    .map(m => m
        .split('\n')
        .map(map => map.match(/\d+/g)?.map(Number) ?? [])
        .filter(map => map.length > 0) as [number,number,number][]
    )

const seeds = (inputFull
    .substring(0, inputFull.indexOf('\n'))
    .match(/\d+/g)
    ?.map(Number) ?? [])
    .slice(18) // Le shortcut to see why im off-by-one
    .reduce((location, seedSeed, seedI, arr) => {
        if(seedI%2===0) 
        for(let seed = seedSeed; seed < seedSeed+arr[seedI+1]-1; seed++){
            const loc = almanac.reduce((value, route) => getRoute(route, value),seed)
            if(loc < location){
                console.log('we have a new lowest!', loc, 'for seed:', seed, 'original seed:', seedSeed)
                location = loc 
            }
        }
        return location
    }, Number.MAX_SAFE_INTEGER)

console.log(seeds);