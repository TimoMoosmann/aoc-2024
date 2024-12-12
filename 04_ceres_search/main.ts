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
    
    let result: number;
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
    const inputLines = input.split('\n');
    inputLines.pop();

     const masResults = getHorizontalMatchesWithCenter(inputLines, 'MAS');
     const samResults = getHorizontalMatchesWithCenter(inputLines, 'SAM');

    const ulLrCenters = new Set([...masResults[0], ...samResults[0]]);
    const urLlCenters = new Set([...masResults[1], ...samResults[1]]);

    let matches = 0;

    for (const center of ulLrCenters) {
        if (urLlCenters.has(center)) {
            matches++;
        }
    }

    return matches;
}

function getHorizontalMatchesWithCenter(inputLines: string[], needle: string) {
    const width = inputLines[0].length;
    const height = inputLines.length;

    const state = {
        centers: new Set<string>(),
        currentWord: '',
    }

    for (let xStart = 0; xStart < width; xStart++) {
        let x = xStart;
        let y = 0;
        state.currentWord = '';
        while(x < width && y < height) {
            updateStateWithCenter(inputLines, x, y, needle, state, 'ul_lr');
            y++;
            x++;
        }
    }

    for (let yStart = 1; yStart < height; yStart++) {
        let y = yStart;
        let x = 0;
        state.currentWord = '';
        while(x < width && y < height) {
            updateStateWithCenter(inputLines, x, y, needle, state, 'ul_lr');
            y++;
            x++;
        }
    }

    const ulLrCenters = state.centers;
    state.centers = new Set();

    for (let xStart = width - 1; xStart >= 0; xStart--) {
        let x = xStart;
        let y = 0;
        state.currentWord = '';
        while(x >= 0 && y < height) {
            updateStateWithCenter(inputLines, x, y, needle, state, 'ur_ll');
            y++;
            x--;
        }
    }

    for (let yStart = 1; yStart < height; yStart++) {
        let x = width - 1;
        let y = yStart;
        state.currentWord = '';
        while(x >= 0 && y < height) {
            updateStateWithCenter(inputLines, x, y, needle, state, 'ur_ll');
            y++;
            x--;
        }
    }

    const urLlCenters = state.centers;
    return [ulLrCenters, urLlCenters];
}

function updateStateWithCenter(
    inputLines: string[],
	x: number,
	y: number,
	needle: string,
	state: {
        centers: Set<string>,
        currentWord: string,
    },
    direction: 'ul_lr' | 'ur_ll'
) {
    const newLetter = inputLines[y].charAt(x);
    if (needle.startsWith(state.currentWord + newLetter)) {
        if (state.currentWord.length === needle.length - 1) {
            const center = direction === 'ul_lr'
                ? `${x - 1}_${y - 1}`
                : `${x + 1}_${y - 1}`;
            state.centers.add(center);
            state.currentWord = '';
        } else {
            state.currentWord += newLetter
        }
        return;
    }

    if (needle.startsWith(newLetter)) {
        state.currentWord = newLetter;
    } else {
        state.currentWord = '';
    }
}

async function part1(inputFilePath: string) {
    const input = await readFile(inputFilePath, 'utf8');
    const inputLines = input.split('\n');
    inputLines.pop();

    let matches = 0;

    matches += getMatches(inputLines, 'XMAS');
    matches += getMatches(inputLines, 'SAMX');

    return matches;
}


function getMatches(inputLines: string[], needle: string) {
    const width = inputLines[0].length;
    const height = inputLines.length;

    const state = {
        matches: 0,
        currentWord: '',
    }

    // iterate vertically
    for (let x = 0; x < width; x++) {
        state.currentWord = '';
        for (let y = 0; y < height; y++) {
            updateState(inputLines, x, y, needle, state);
        }
    }

    // iterate horizontally
    for (let y = 0; y < height; y++) {
        state.currentWord = '';
        for (let x = 0; x < width; x++) {
            updateState(inputLines, x, y, needle, state);
        }
    }

    for (let xStart = 0; xStart < width; xStart++) {
        let x = xStart;
        let y = 0;
        state.currentWord = '';
        while(x < width && y < height) {
            updateState(inputLines, x, y, needle, state);
            y++;
            x++;
        }
    }

    for (let yStart = 1; yStart < height; yStart++) {
        let y = yStart;
        let x = 0;
        state.currentWord = '';
        while(x < width && y < height) {
            updateState(inputLines, x, y, needle, state);
            y++;
            x++;
        }
    }

    for (let xStart = width - 1; xStart >= 0; xStart--) {
        let x = xStart;
        let y = 0;
        state.currentWord = '';
        while(x >= 0 && y < height) {
            updateState(inputLines, x, y, needle, state);
            y++;
            x--;
        }
    }

    for (let yStart = 1; yStart < height; yStart++) {
        let x = width - 1;
        let y = yStart;
        state.currentWord = '';
        while(x >= 0 && y < height) {
            updateState(inputLines, x, y, needle, state);
            y++;
            x--;
        }
    }

    return state.matches;
}

function updateState(inputLines: string[], x: number, y: number, needle: string, state: {
    matches: number,
    currentWord: string,
}) {
    const newLetter = inputLines[y].charAt(x);
    if (needle.startsWith(state.currentWord + newLetter)) {
        if (state.currentWord.length === needle.length - 1) {
            state.matches++;
            state.currentWord = '';
        } else {
            state.currentWord += newLetter
        }
        return;
    }

    if (needle.startsWith(newLetter)) {
        state.currentWord = newLetter;
    } else {
        state.currentWord = '';
    }
}

main();
