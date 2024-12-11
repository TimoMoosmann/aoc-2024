"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = require("fs/promises");
solveA(false);
// get rules for update line
// find starting number from update line
function parseInput(test) {
    return __awaiter(this, void 0, void 0, function* () {
        const path = test
            ? 'inputs/test_input'
            : 'inputs/input';
        const file = yield (0, promises_1.readFile)(path, { encoding: 'utf-8' });
        let isFirstBlock = true;
        const rules = new Set();
        const updates = [];
        for (const line of file.split(/\r\n|\n/)) {
            if (line.length < 2) {
                if (isFirstBlock) {
                    isFirstBlock = false;
                }
                continue;
            }
            if (isFirstBlock) {
                const parts = line.split('|');
                rules.add(parts[0] + '_' + parts[1]);
            }
            else {
                const parts = line.split(',');
                updates.push(parts);
            }
        }
        return {
            rules,
            updates
        };
    });
}
function solveA(test) {
    return __awaiter(this, void 0, void 0, function* () {
        const { rules, updates } = yield parseInput(test);
        const middleValues = [];
        outer: for (const update of updates) {
            let result = true;
            for (let i = 0; i < update.length; i++) {
                for (let j = i + 1; j < update.length; j++) {
                    if (!rules.has(update[i] + '_' + update[j])) {
                        result = false;
                        continue outer;
                    }
                }
            }
            if (result) {
                const middleValue = update[Math.floor(update.length / 2)];
                middleValues.push(parseInt(middleValue));
            }
        }
        console.log(middleValues.reduce((carry, val) => carry + val));
    });
}
