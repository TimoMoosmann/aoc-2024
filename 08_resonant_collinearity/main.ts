import { readFileSync } from "fs";
import { addPositions, isInBounds, Pos, posIdentifier, subPositions } from "./types/pos";

solveA(false);
solveB(false);

function solveA(isTest: boolean) {
    const [frequencies, width, height] = parseInput(isTest);

    const antinodes = new Set<string>();

    for (const frequencyNodes of frequencies.values()) {
        for (let i = 0; i < frequencyNodes.length - 1; i++) {
            for (let j = i + 1; j < frequencyNodes.length; j++) {
                const node1 = frequencyNodes[i];
                const node2 = frequencyNodes[j];

                const separation = {
                    x: node2.x - node1.x,
                    y: node2.y - node1.y,
                };

                const antinode1 = {
                    x: node1.x - separation.x,
                    y: node1.y - separation.y,
                };

                const antinode2 = {
                    x: node2.x + separation.x,
                    y: node2.y + separation.y,
                }

                if (isInBounds(antinode1, width, height)) {
                    antinodes.add(posIdentifier(antinode1));
                }

                if (isInBounds(antinode2, width, height)) {
                    antinodes.add(posIdentifier(antinode2));
                }

            }
        }
    }

    console.log('Solution for part One: ' + antinodes.size);
}

function solveB(isTest: boolean) {
    const [frequencies, width, height] = parseInput(isTest);

    const antinodes = [];

    for (const frequencyNodes of frequencies.values()) {
        for (let i = 0; i < frequencyNodes.length - 1; i++) {
            for (let j = i + 1; j < frequencyNodes.length; j++) {
                const node1 = frequencyNodes[i];
                const node2 = frequencyNodes[j];

                const separation = {
                    x: node2.x - node1.x,
                    y: node2.y - node1.y,
                };

                antinodes.push(
                    ...getNodesInLine(node1, separation, width, height)
                );
            }
        }
    }

    const result = new Set(antinodes).size;
    console.log('Solution for part Two: ' + result);
}

function getNodesInLine(
    node: Pos,
    separation: Pos,
    width: number,
    height: number
) {
    const nodeIdentifiers: string[] = [];
    const originalNode = { ...node };

    do {
        nodeIdentifiers.push(posIdentifier(node));
        node = subPositions(node, separation);
    } while (isInBounds(node, width, height));

    node = addPositions(originalNode, separation);
    while (isInBounds(node, width, height)) {
        nodeIdentifiers.push(posIdentifier(node));
        node = addPositions(node, separation);
    }

    return nodeIdentifiers;
}

function parseInput(isTest: boolean): [Map<string, Pos[]>, number, number] {
    const inputPath = isTest ? 'inputs/test_input': 'inputs/input';

    const input = readFileSync(inputPath, 'utf8');

    const lines = input.split('\n');
    lines.pop();

    const width = lines[0].length;
    const height = lines.length;

    const frequencies = new Map<string, Pos[]>();

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            const symbol = lines[y].charAt(x);
            if (symbol != '.') {
                if (frequencies.has(symbol)) {
                    frequencies.get(symbol)!.push({x, y});
                } else {
                    frequencies.set(symbol, [{x, y}]);
                }
            }
        }
    }

    return [frequencies, width, height];
}

