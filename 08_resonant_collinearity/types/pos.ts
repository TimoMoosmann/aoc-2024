export interface Pos {
    x: number,
    y: number,
}

export function posIdentifier(pos: Pos) {
    return `${pos.x}_${pos.y}`;
}

export function addPositions(pos1: Pos, pos2: Pos) {
    return {
        x: pos1.x + pos2.x,
        y: pos1.y + pos2.y,
    }
}

export function subPositions(pos1: Pos, pos2: Pos) {
    return {
        x: pos1.x - pos2.x,
        y: pos1.y - pos2.y,
    }
}

export function isInBounds(pos: Pos, width: number, height: number) {
    return pos.x >= 0 
        && pos.x < width
        && pos.y >= 0
        && pos.y < height;
}

