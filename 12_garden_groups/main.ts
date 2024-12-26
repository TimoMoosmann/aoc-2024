const inputFilePath = Deno.args[0];
const input = await Deno.readTextFile(inputFilePath);
const map = input.split('\n');
map.pop();

const mapWidth = map[0].length;
const mapHeight = map.length;
const coveredInputs = new Set<string>();
let price = 0;

const neighborDistances = [
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: -1 },
];

for (let x = 0; x < mapWidth; x++) {
    for (let y = 0; y < mapHeight; y++) {
        if (coveredInputs.has(getPosIdentifier({x, y}))) {
            continue;
        }

        const [area, perimeter] = calculateFenceAreaAndPerimeter(
            x,
            y,
            map[y].charAt(x),
            map,
            coveredInputs,
        );

        price += area * perimeter;
    }
}

console.log('Solution for part One: ' + price);

function getPosIdentifier(pos: Pos) {
    return `${pos.x}_${pos.y}`;
}

function calculateFenceAreaAndPerimeter(
    x: number,
    y: number,
    value: string,
    map: string[],
    coveredInputs: Set<string>,
): [number, number] {
    let perimeter = 0;
    let area = 0;

    const plantPositions = [{ x, y }];
    while (true) {
        const plantPos = plantPositions.pop();

        if (!plantPos) {
            break;
        }

        if (coveredInputs.has(getPosIdentifier(plantPos))) {
            continue;
        }

        for (const neighborDist of neighborDistances) {
            const neighbor = {
                x: plantPos.x + neighborDist.x,
                y: plantPos.y + neighborDist.y,
            };

            if (!isInBounds(neighbor, map)) {
                perimeter++;
                continue;
            }

            if (map[neighbor.y].charAt(neighbor.x) === value) {
                plantPositions.push(neighbor);
            } else {
                perimeter++;
            }
        }

        area++;
        coveredInputs.add(getPosIdentifier(plantPos))
    }

    return [area, perimeter];
}

function isInBounds(pos: Pos, map: string[]) {
    return pos.x >= 0 && pos.y >= 0
        && pos.x < map[0].length && pos.y < map.length;
}

interface Pos {
    x: number,
    y: number
};

