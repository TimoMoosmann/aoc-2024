import { readFile } from "fs/promises";

solveA(false);
solveB(false);

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

    const result = middleValues.reduce((carry, val) => carry + val);
    console.log('Result of part One: ' + result);
}

async function solveB(test: boolean) {
    const {rules, updates} = await parseInput(test);

    const middleValues: number[] = [];

    for (const update of updates) {
        if (swapWrongNumbers(update, rules)) {
            continue
        }

        while (!swapWrongNumbers(update, rules)) {}
        
        const middleValue = update[Math.floor(update.length / 2)];
        middleValues.push(parseInt(middleValue));
    }

    const result = middleValues.reduce((carry, val) => carry + val);
    console.log('Result of part Two: ' + result);
}

function swapWrongNumbers(update: string[], rules: Set<string>) {
    for (let i = 0; i < update.length; i++) {
        for (let j = i + 1; j < update.length; j++) {
            if (!rules.has(update[i] + '_' + update[j])) {
                const left = update[i];
                update[i] = update[j];
                update[j] = left;
                return false
            }
        }
    }

    return true;
}
