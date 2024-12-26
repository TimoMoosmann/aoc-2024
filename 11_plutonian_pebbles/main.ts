export async function solveA(inputPath: string): Promise<number> {
    const stoneRow = await parseStoneRow(inputPath);

    return countStoneRow(stoneRow, 25);
}

export async function solveB(inputPath: string): Promise<number> {
    const stoneRow = await parseStoneRow(inputPath);

    return countStoneRow(stoneRow, 75);
}

function countStoneRow(stoneRow: number[], targetDepth: number) {
    let result = 0;

    const resultCache = new Map<string, number>();

    for (const stone of stoneRow) {
        result += countStones(stone, 0, targetDepth, resultCache);
    }

    return result;
}

function countStones(
    node: number,
    depth: number,
    targetDepth: number,
    resultCache: Map<string, number>,
): number {
    if (depth === targetDepth) {
        return 1;
    }

    const identifier = getIdentifier(node, depth);

    if (resultCache.has(identifier)) {
        return resultCache.get(identifier)!;
    }

    let result: number;
    if (node === 0) {
        result = countStones(1, depth + 1, targetDepth, resultCache);
    } else if (hasEvenNumberOfDigits(node)) {
        const stoneString = node.toString();
        const left = parseInt(stoneString.slice(0, stoneString.length / 2));
        const right = parseInt(stoneString.slice(stoneString.length / 2));

        result = countStones(left, depth + 1, targetDepth, resultCache) +
            countStones(right, depth + 1, targetDepth, resultCache);
    } else {
        result = countStones(node * 2024, depth + 1, targetDepth, resultCache);
    }

    resultCache.set(identifier, result);
    return result;
}

function getIdentifier(node: number, depth: number) {
    return `${node}_ ${depth}`;
}

function updateStoneRow(stoneRow: number[]) {
    const updatedRow: number[] = [];
    for (const stone of stoneRow) {
        updatedRow.push(...updateStone(stone));
    }

    return updatedRow;
}

function updateStone(stone: number) {
    if (stone === 0) {
        return [1];
    } else if (hasEvenNumberOfDigits(stone)) {
        const stoneString = stone.toString();
        const left = parseInt(stoneString.slice(0, stoneString.length / 2));
        const right = parseInt(stoneString.slice(stoneString.length / 2));

        return [left, right];
    } else {
        return [stone * 2024];
    }
}

function hasEvenNumberOfDigits(nu: number) {
    return nu.toString().length % 2 === 0;
}

async function parseStoneRow(inputPath: string) {
    const input = await Deno.readTextFile(inputPath);
    const stoneRow = input.split(/\s+/);
    stoneRow.pop();
    return stoneRow.map((stoneString) => parseInt(stoneString));
}

if (import.meta.main) {
    const partOneSolution = await solveA(Deno.args[0]);
    console.log("Solution for parte one: ", partOneSolution);

    const partTwoSolution = await solveB(Deno.args[0]);
    console.log("Solution for parte two: ", partTwoSolution);
}
