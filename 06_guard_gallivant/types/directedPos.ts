import { Pos } from './pos';

const directions = [
    new Pos(0, -1),
    new Pos(1, 0),
    new Pos(0, 1),
    new Pos(-1, 0),
];

export class DirectedPos {
    private directionIndex = 0;

    constructor(
        public pos: Pos,
    ) {}

    turnRight() {
        this.directionIndex = this.directionIndex >= 3
            ? 0
            : this.directionIndex + 1;
    }

    getNextStep() {
        return this.pos.step(directions[this.directionIndex]);
    }

    getIdentifier() {
        return this.pos.getIdentifier() + '_' + this.directionIndex;
    }
}

