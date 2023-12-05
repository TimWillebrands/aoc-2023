
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

const seeds2 = (inputFull
    .substring(0, inputFull.indexOf('\n'))
    .match(/\d+/g)?.map(Number) ?? [])
    .reduce((moarSeeds, seedSeed, seedI, arr) => {
        if(seedI%2===0) 
        for(let seed = seedSeed; seed < seedSeed+arr[seedI+1]; seed++){
            moarSeeds.push(seed)
        }
        return moarSeeds
    }, new Array<number>())


// const seeds = seeds2
//     .map(seed => almanac.reduce((value, route) => getRoute(route, value),seed))
//     .sort((a,b) => a-b)

console.log(seeds2);