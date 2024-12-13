export class Pos {
    constructor(
        public x: number,
        public y: number
    ) {}

    getIdentifier() {
        return `${this.x}_${this.y}`;
    }

    equals(pos: Pos) {
        return this.x === pos.x
            && this.y === pos.y;
    }

    step(step: Pos) {
        return new Pos(
            this.x + step.x,
            this.y + step.y,
        );
    }
}

