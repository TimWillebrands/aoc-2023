const inputFull: string = await Deno.readTextFile(Deno.args[0]);
const cards = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J']
    .reverse()
    .reduce((map, card, i) => map.set(card, i.toString(16)) ,new Map<string, string>())
    
const stuff = inputFull
    .split('\n')
    .map(line => [[...line.substring(0,line.indexOf(' '))], Number(line.substring(line.indexOf(' ')))] as const)
    .map(hand => [...hand, 
        [...hand[0]
            .filter(card => card !== 'J')
            .reduce(
                (agg, card) => agg.set(card, (agg.get(card) ?? 0) + 1) 
                ,new Map<string, number>())
            .values()
        ].sort().reverse(),
        hand[0].filter(card => card === 'J').length
    ] as const)
    .map(hand => hand[0].join('') === 'JJJJJ' ? [hand[0], hand[1], [5], 0] as const: hand)
    .map(hand => ({
        bid: hand[1],
        score: ((hand[2]![0] + hand[3]) * 0x1000000) 
            + (((hand[2]?.[1]-1) * 0x100000)||0)
            + parseInt(hand[0].map(card => cards.get(card)).join(''), 16),
        hand: hand[0].join(''),
    }))
    .map(hand => ({...hand, scoreHex: '0x'+hand.score.toString(16)}))
    .sort((a,b) => a.score - b.score )
    .reduce((total, hand, rank) => total + (hand.bid*(rank+1)),0)

console.log(stuff)