export interface Pos {
    x: number,
    y: number
};

export function isInBounds(pos: Pos, map: string[]) {
    return pos.x >= 0 && pos.y >= 0
        && pos.x < map[0].length && pos.y < map.length;
}

export function getPosIdentifier(pos: Pos) {
    return `${pos.x}_${pos.y}`;
}


