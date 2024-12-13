import { readFile } from "fs/promises";
import { Pos } from "./types/pos";
import { DirectedPos } from "./types/directedPos";

solveA(false);
solveB(false);

interface PuzzleMap {
    width: number;
    height: number;
    obstacles: Set<string>;
    start: Pos;
};

async function solveA(isTest: boolean) {
    const puzzleInput = await parseInput(isTest);

    let visitedPositions = new Set<string>;

    const guard = new DirectedPos(puzzleInput.start);

    while (isInBounds(guard.pos, puzzleInput)) {
        visitedPositions.add(guard.pos.getIdentifier());
        move(guard, puzzleInput);
    }

    console.log('Solution of part One: ' + visitedPositions.size);
}

async function solveB(isTest: boolean) {
    const puzzleInput = await parseInput(isTest);

    let possiblePositions = 0;

    for (let x = 0; x < puzzleInput.width; x++) {
        for (let y = 0; y < puzzleInput.height; y++) {
            const newObstaclePos = new Pos(x, y);
            if (newObstaclePos.equals(puzzleInput.start)) {
                continue;
            }

           if (puzzleInput.obstacles.has(newObstaclePos.getIdentifier())) {
               continue;
           }

            puzzleInput.obstacles.add(newObstaclePos.getIdentifier());

            if (hasLoop(puzzleInput)) {
                possiblePositions++;
            }

            puzzleInput.obstacles.delete(newObstaclePos.getIdentifier());
        }
    }
    
    console.log('Solution of part Two: ' + possiblePositions);
}

async function parseInput(isTest: boolean): Promise<PuzzleMap> {
    const inputPath = isTest
        ? 'inputs/test_input'
        : 'inputs/input';

    const input = await readFile(inputPath, 'utf8');
    const inputLines = input.split('\n');
    inputLines.pop();

    const width = inputLines[0].length;
    const height = inputLines.length;

    const obstacles = new Set<string>();
    let start = new Pos(-1, -1);


    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            const element = inputLines[y].charAt(x);
            const pos = new Pos(x, y);
            if (element === '#') {
                obstacles.add(pos.getIdentifier());
            } else if (element === '^') {
                start = pos;
            }
        }
    }

    return {
        width,
        height,
        obstacles,
        start
    };
}

function isInBounds(pos: Pos, puzzleMap: PuzzleMap) {
    return pos.x < puzzleMap.width
        && pos.x >= 0
        && pos.y < puzzleMap.height
        && pos.y >= 0;
}

function move(
    directedPos: DirectedPos,
    puzzleMap: PuzzleMap
) {
    const nextPosSameDirection = directedPos.getNextStep();

    if (puzzleMap.obstacles.has(nextPosSameDirection.getIdentifier())) {
        directedPos.turnRight()
    } else {
        directedPos.pos = nextPosSameDirection;
    }
}

function hasLoop(puzzleMap: PuzzleMap) {
    let guardDirectedPos = new DirectedPos(puzzleMap.start);

    let visitedDirectedPositions = new Set<string>();

    while (true) {
        if (!isInBounds(guardDirectedPos.pos, puzzleMap)) {
            return false;
        }

        move(guardDirectedPos, puzzleMap)

        if (visitedDirectedPositions.has(guardDirectedPos.getIdentifier())) {
            return true
        }

        visitedDirectedPositions.add(guardDirectedPos.getIdentifier());
    }
}

