const inputFull: string = await Deno.readTextFile(Deno.args[0]);
type Pt = Readonly<[number, number]>

const
    top     = ['|', '7', 'F', 'S'] as const,
    right   = ['-', 'J', '7', 'S'] as const,
    bottom  = ['|', 'L', 'J', 'S'] as const,
    left    = ['-', 'F', 'L', 'S'] as const,
    X       = [] as const

// [0/top,1/right,2/bottom,3/left]
const symbols = {
    '|': [top, X, bottom, X],
    '-': [X, right, X, left],
    'L': [top, right, X, X],
    'J': [top, X, X, left],
    '7': [X, X, bottom, left],
    'F': [X, right, bottom, X],
    '.': null,
    'S': [top, right, bottom, left],
} as const

const grid = inputFull
    .split('\n')
    .map(line => [...line].filter(cell => cell !== '\r'))

const sy = grid.findIndex(row => row.includes('S')),
    s = [grid.findIndex(row => row.includes('S')), grid[sy].findIndex(cell => cell === 'S')] as const;

function isInSet(pt: Pt, set: Pt[]){
    return set.findIndex(p2 => pt[0] === p2[0] && p2[1] === pt[1]) < 0
}

function dirs(pt: Pt, route: Pt[]) {
    return ([
        [pt[0] - 1, pt[1]], [pt[0] + 1, pt[1]],
        [pt[0], pt[1] - 1], [pt[0], pt[1] + 1]
    ] as const)
    .filter(p => isInSet(p, route))
}

function cell(pt: Pt) {
    if (pt[0] < 0 || pt[1] < 0 || pt[0] >= grid[0].length || pt[1] >= grid.length) {
        return null
    }
    return grid[pt[1]][pt[0]] as keyof typeof symbols
}

function dir(pt: Pt, d: Pt) {
    const h = pt[0] - d[0], v = pt[1] - d[1]
    if (v > 0) return 0
    if (v < 0) return 2
    if (h > 0) return 3
    return 1
}

function canNavigate(pt: Pt, d: Pt) {
    const symCurr = cell(pt)!, symDest = cell(d);
    if (symDest === null || symDest === '.') return false;

    return symbols[symCurr]![dir(pt, d)].includes(symDest as never)
}

function findLoop(src: Pt) {
    const route = new Array<Pt>()

    let d = dirs(src, route).find(pt => canNavigate(src, pt))    
    
    while(d !== undefined){
        route.push(d)
        d = dirs(d, route).find(pt => canNavigate(d, pt))    
    }

    return route
}

const loop = findLoop(s)
const bounds = loop.reduce((agg, pt) => ({
    xmin: Math.min(agg.xmin, pt[0]),
    xmax: Math.max(agg.xmax, pt[0]),
    ymin: Math.min(agg.ymin, pt[1]),
    ymax: Math.max(agg.ymax, pt[1]),
}), {xmin: 999999, xmax:-9999999, ymin:9999999, ymax: -9999999})

console.log('finished', loop.length/2, bounds)