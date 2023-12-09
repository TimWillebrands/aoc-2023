const inputFull: string = await Deno.readTextFile(Deno.args[0]);

function calcDiff(measurements: number[]){
    const diffs = new Array<number>();
    for(let i = 0; i < measurements.length-1; ++i){
        diffs.push(measurements[i+1]-measurements[i])        
    }
    return diffs
}

function findNext(measurements: number[], last?: number){
    const diffs = calcDiff(measurements)
    console.log('l', last,'m', measurements, '\td', diffs, '\n')
    
    if(last === undefined)
        return findNext(diffs, measurements[measurements.length-1])         

    if(diffs.every((m) => diffs.indexOf(m) === 0))
        return measurements[measurements.length-1] + diffs[diffs.length-1] + last

    return findNext(diffs, last + measurements[measurements.length-1])         
}
    
const sensor = inputFull
    .split('\n')
    .map(line => line.match(/-?\d+/g)!.map(Number))
    .map(measurements => findNext(measurements))
    .reduce((a,b) => a + b)

console.log(sensor)
// console.log(findNext(sensor[0]))