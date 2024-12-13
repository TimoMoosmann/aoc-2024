import { readFileSync } from "fs"

solveOne(false);
solveTwo(false);

function solveOne(isTest: boolean) {
    const equations = parseInput(getInputUrl(isTest));

    let result = 0;

    for (const equation of equations) {
        if (canBeSolved(
            equation,
            ['+', '*'],
            new Map([
                ['+', (a: number, b: number) => a + b],
                ['*', (a: number, b: number) => a * b],
            ])

        )) {
            result += equation.testValue;
        }
    }

    console.log('Solution of part One: ' + result);
}

function solveTwo(isTest: boolean) {
    const equations = parseInput(getInputUrl(isTest));

    let result = 0;

    for (const equation of equations) {
        if (canBeSolved(
            equation,
            ['+', '*', '||'],
            new Map([
                ['+', (a: number, b: number) => a + b],
                ['*', (a: number, b: number) => a * b],
                ['||', (a: number, b: number) => parseInt(`${a}${b}`)],
            ])

        )) {
            result += equation.testValue;
        }
    }

    console.log('Solution of part Two: ' + result);
}

function getInputUrl(isTest: boolean) {
    return isTest ? 'inputs/test_input' : 'inputs/input';
}

function parseInput(inputPath: string) {
    const input = readFileSync(inputPath, 'utf8');

    return input.split('\n')
        .filter((line) => line.length > 0)
        .map((line) => {
            const sides = line.split(':');
            const testValue = parseInt(sides[0]);
            const numbers = sides[1].trim().split(/\s+/);
            return {
                testValue,
                numbers: numbers.map((number) => parseInt(number)),
            };
    })
}

interface Equation {
    testValue: number;
    numbers: number[];
}

function* generateAllCombinations(symbols: string[], length: number) {
    const combination = Array(length).fill(symbols[0]);

    do {
        yield combination;
    } while(updateCombination(symbols, combination));
}

function updateCombination(symbols: string[], combination: string[]) {
    for (const [index, currentSymbol] of combination.entries()) {
        for (const [symbolIndex, symbol] of symbols.entries()) {
            if (currentSymbol === symbol) {
                if (symbolIndex === symbols.length - 1) {
                    combination[index] = symbols[0];
                } else {
                    combination[index] = symbols[symbolIndex + 1];
                    return true;
                }
            }
        }
    }

    return false;
}

function canBeSolved(
    equation: Equation,
    symbols: string[],
    symbolOperations: Map<string, (a: number, b: number) => number>
) {
    for (const combination of generateAllCombinations(
        symbols,
        equation.numbers.length - 1
    )) {
        const result = equation.numbers.reduce((acc, number, index) => {
            const symbol = combination[index - 1];
            if (!symbolOperations.has(symbol)) {
                throw new Error('Missing symbol operation...');
            }
            const operation = symbolOperations.get(combination[index - 1])!;
            return operation(acc, number);
        });

        if (result === equation.testValue) {
            return true;
        }
    }

    return false;
}

