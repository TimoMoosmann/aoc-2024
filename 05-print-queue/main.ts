import { readFile } from "fs/promises";

solveA(false);
// get rules for update line
// find starting number from update line

async function parseInput(test: boolean) {
    const path = test
        ? 'inputs/test_input'
        : 'inputs/input';

    const file = await readFile(path, { encoding: 'utf-8' });

    let isFirstBlock = true;

    const rules: Set<string> = new Set();
    const updates:string[][] = [];
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
        } else {
            const parts = line.split(',');
            updates.push(parts);
        }
    }

    return {
        rules,
        updates
    };
}

async function solveA(test: boolean) {
    const {rules, updates} = await parseInput(test);

    const middleValues: number[] = [];

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
}