import { getNeighbors } from "./neighbors.ts";
import { getPosIdentifier, isInBounds, Pos } from "./pos.ts";

solvePartOne();

async function solvePartOne() {
  const map = await parseMap();
  const mapWidth = map[0].length;
  const mapHeight = map.length;
  const visited = new Set<string>();
  let price = 0;

  for (let x = 0; x < mapWidth; x++) {
    for (let y = 0; y < mapHeight; y++) {
      if (visited.has(getPosIdentifier({ x, y }))) {
        continue;
      }

      const [area, perimeter] = calculateFenceAreaAndPerimeter(
        {x, y},
        map[y].charAt(x),
        map,
        visited
      );

      price += area * perimeter;
    }
  }

  console.log('Solution for part One: ' + price);
}

async function parseMap() {
  const inputFilePath = Deno.args[0];
  const input = await Deno.readTextFile(inputFilePath);
  const map = input.split('\n');
  map.pop();
  return map;
}

function calculateFenceAreaAndPerimeter(
    startPos: Pos,
    plantValue: string,
    map: string[],
    visited: Set<string>,
): [number, number] {
    let perimeter = 0;
    let area = 0;

    const plantPositions = [startPos];
    while (true) {
        const plantPos = plantPositions.pop();

        if (!plantPos) {
            break;
        }

        if (visited.has(getPosIdentifier(plantPos))) {
            continue;
        }

        for (const neighbor of getNeighbors(plantPos)) {
            if (!isInBounds(neighbor, map)) {
                perimeter++;
            } else if (map[neighbor.y].charAt(neighbor.x) === plantValue) {
                plantPositions.push(neighbor);
            } else {
                perimeter++;
            }
        }

        area++;
        visited.add(getPosIdentifier(plantPos))
    }

    return [area, perimeter];
}

