import { readFile } from "fs/promises";

function parseArgs() {
    const configuration = {
        isTest: false,
        part: 1,
    }
    process.argv.forEach(function (val) {
        if (val === 'test') {
            configuration.isTest = true;
        }

        if (val === 'part2') {
            configuration.part = 2;
        }
    });

    return configuration;
}

async function main() {
    const configuration = parseArgs();
    const inputFileName = configuration.isTest ? 'test_input' : 'input';
    const inputFilePath = 'inputs/' + inputFileName;
    
    let result;
    if (configuration.part === 1) {
        result = await part1(inputFilePath);
    } else {
        result = await part2(inputFilePath);
    }

    let title = 'Part ' + configuration.part;
    title += configuration.isTest ? ' test' : '';
    console.log(`${title} result: ${result}`);
}

async function part2(inputFilePath: string) {
    let input = await readFile(inputFilePath, 'utf8');

    let result = 0;
    let active = true;

    while(true) {
        const doOrDontMatch = /do\(\)|don't\(\)/.exec(input);

        if (active) {
            result += getSumOfMultiplications(input.substring(
                0,
                doOrDontMatch?.index
            ))
        }

        if (!doOrDontMatch) {
            break;
        }

        active = doOrDontMatch[0] === 'do()';
        input = input.substring(doOrDontMatch.index + doOrDontMatch[0].length);
    }

    return result;
}

function getSumOfMultiplications(input: string) {
    let result = 0;

    const validMulRegex = /mul\((\d{1,3}),(\d{1,3})\)/g;
    for (const match of input.matchAll(validMulRegex)) {
        const num1 = parseInt(match[1]);
        const num2 = parseInt(match[2]);
        result += num1 * num2;
    }
    return result;
}

async function part1(inputFilePath: string) {
    const input = await readFile(inputFilePath, 'utf8');
    return getSumOfMultiplications(input);
}

main();
