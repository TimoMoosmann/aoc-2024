import { Pos } from "./pos.ts";

const neighborDistances = [
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: -1 },
];

export function getNeighbors(pos: Pos) {
    const neighbors: Pos[] = [];

    for (const neighborDist of neighborDistances) {
        neighbors.push({
            x: pos.x + neighborDist.x,
            y: pos.y + neighborDist.y,
        });
    }
    return neighbors;
}

