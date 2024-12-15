export async function solveA(): Promise<number> {
    const topographicMap = await parseTopographicMap();

    const trailheads = getTrailheads(topographicMap);

    let solution = 0;
    for (const trailheadPos of trailheads) {
        const trailheadEndpoints = getEndpoints(
            {
                pos: trailheadPos,
                level: 0,
            },
            topographicMap,
        );

        solution += new Set(trailheadEndpoints).size;
    }

    return solution;
}

interface Pos {
    x: number;
    y: number;
}

interface TrailPos {
    pos: Pos;
    level: number;
}

function addPos(pos1: Pos, pos2: Pos) {
    return {
        x: pos1.x + pos2.x,
        y: pos1.y + pos2.y,
    };
}

function getPosIdentifier(pos: Pos) {
    return `${pos.x}:${pos.y}`;
}

function getEndpoints(trailPos: TrailPos, topogrpahicMap: number[][]) {
    const neighborDistances = [
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: -1, y: 0 },
        { x: 0, y: -1 },
    ];

    if (trailPos.level === 9) {
        return [getPosIdentifier(trailPos.pos)];
    }

    const endpoints: string[] = [];

    for (const neighborDistance of neighborDistances) {
        const neighborPos = addPos(trailPos.pos, neighborDistance);
        if (
            neighborPos.x < 0 || neighborPos.x >= topogrpahicMap[0].length ||
            neighborPos.y < 0 || neighborPos.y >= topogrpahicMap.length
        ) {
            continue;
        }

        const neighborLevel = topogrpahicMap[neighborPos.y][neighborPos.x];
        if (neighborLevel === trailPos.level + 1) {
            endpoints.push(...getEndpoints({
                pos: neighborPos,
                level: neighborLevel,
            }, topogrpahicMap));
        }
    }

    return endpoints;
}

function getTrailheads(topographicMap: number[][]) {
    const trailheads: Pos[] = [];

    for (let y = 0; y < topographicMap.length; y++) {
        for (let x = 0; x < topographicMap[0].length; x++) {
            if (topographicMap[y][x] === 0) {
                trailheads.push({ x, y });
            }
        }
    }

    return trailheads;
}

async function parseTopographicMap() {
    const input = Deno.args[0];
    const text = await Deno.readTextFile(input);
    const lines = text.split("\n");
    lines.pop();

    const width = lines[0].length;
    const height = lines.length;

    const topographicMap: number[][] = [];

    for (let y = 0; y < height; y++) {
        topographicMap.push([]);
        for (let x = 0; x < width; x++) {
            topographicMap[y][x] = parseInt(lines[y].charAt(x));
        }
    }

    return topographicMap;
}

if (import.meta.main) {
    const partASolution = await solveA();
    console.log("Solution for part One: " + partASolution);
}
