export const a = 1

const lookup = {
  'one': 1,
  'two': 2,
  'three': 3,
  'four': 4,
  'five': 5,
  'six': 6,
  'seven': 7,
  'eight': 8,
  'nine': 9
} as 

function getNum(char: string, i: number, line: string){
  let num = parseInt(char)
  if(!isNaN(num)) return num;
  
  const match = Object
    .keys(lookup)
    .find(key => line.substring(i, i+key.length) == key)

  if(match) return lookup[match]    

  return null
}

const inputFull = await Deno.readTextFile(Deno.args[0]);
const input = inputFull
  .split("\n")
  .map((line:string) => [...line].reduce((agg, char, i) => {
    const num = getNum(char, i, line)
    if(num === null) return agg;
    if(agg[0] === null) agg[0] = num
    agg[1] = num
    return agg
  }, [null, null] as [null|number, null|number]))
  .map(numbers => parseInt(numbers[0] + '' + numbers[1]))
  .reduce((a,b) => a+b)

console.log(input)