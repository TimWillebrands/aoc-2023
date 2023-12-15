const inputFull: string = await Deno.readTextFile(Deno.args[0]);
type S = "#" | "." | "?";

function checkPath(spring: S[], groups: number[], cursor = 0, acc = 0):number{
  console.log(' '.repeat(cursor)+'V')
  console.log(spring.join(''), groups, cursor, acc)
  if(isNaN(cursor)) throw 'bullshit'
  if(cursor >= spring.length){
    if(groups.length === 0){
      console.log('winrar', acc + 1)
      return acc+1
    }  
    console.log('non win end', acc)
    return acc
  }

  const group = groups[0];
  
  let fits = true
  let mustFit = false
  for(let i = cursor; i<(cursor+group); i++){
    mustFit ||= spring[i] === '#' 

    if(spring[i] === '.' || spring[i] === undefined){
      fits = false
      break
    } 
  }

  if(!fits){
    console.log('its to large senpai!', group, spring[cursor])
    return checkPath(spring, groups, cursor+1, acc)
  }

  {
    const s = spring.map((c,i) => 
      i >= cursor && i < (cursor+group) ? '#' : i === cursor+group ? '.' : c)
    const skip = spring[cursor+group] === '?' ? 1 : 0
    console.log('push', group, spring[cursor], spring[cursor+group], cursor)
    acc =+ checkPath(s, groups.slice(1), cursor+(group??1)+skip, acc)
  }

  if(!mustFit){
    console.log('skip', group)
    const s = spring.map((c,i) => i === cursor ? '.' : c)
    acc =+ checkPath(s, groups, cursor+1, acc) // Kan smuhrter
  }

  return acc
}

const stuff = inputFull
  .split("\n")
  .filter((line) => line !== "")
  .map((line) => line.split(" "))
  .map((line) => ({
    spring: [...line[0]] as S[],
    groups: line[1].match(/-?\d+/g)!.map(Number),
  }))
  // .slice(1,2)
  .map((record) => checkPath(record.spring, record.groups));

console.log(stuff);

/*
?
|\
# .
  |\
. # .
# . #






*/
