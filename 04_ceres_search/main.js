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
function parseArgs() {
    const configuration = {
        isTest: false,
        part: 1,
    };
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
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const configuration = parseArgs();
        const inputFileName = configuration.isTest ? 'test_input' : 'input';
        const inputFilePath = 'inputs/' + inputFileName;
        let result;
        if (configuration.part === 1) {
            result = yield part1(inputFilePath);
        }
        else {
            result = yield part2(inputFilePath);
        }
        let title = 'Part ' + configuration.part;
        title += configuration.isTest ? ' test' : '';
        console.log(`${title} result: ${result}`);
    });
}
function part2(inputFilePath) {
    return __awaiter(this, void 0, void 0, function* () {
        let input = yield (0, promises_1.readFile)(inputFilePath, 'utf8');
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
    });
}
function getHorizontalMatchesWithCenter(inputLines, needle) {
    const width = inputLines[0].length;
    const height = inputLines.length;
    const state = {
        centers: new Set(),
        currentWord: '',
    };
    for (let xStart = 0; xStart < width; xStart++) {
        let x = xStart;
        let y = 0;
        state.currentWord = '';
        while (x < width && y < height) {
            updateStateWithCenter(inputLines, x, y, needle, state, 'ul_lr');
            y++;
            x++;
        }
    }
    for (let yStart = 1; yStart < height; yStart++) {
        let y = yStart;
        let x = 0;
        state.currentWord = '';
        while (x < width && y < height) {
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
        while (x >= 0 && y < height) {
            updateStateWithCenter(inputLines, x, y, needle, state, 'ur_ll');
            y++;
            x--;
        }
    }
    for (let yStart = 1; yStart < height; yStart++) {
        let x = width - 1;
        let y = yStart;
        state.currentWord = '';
        while (x >= 0 && y < height) {
            updateStateWithCenter(inputLines, x, y, needle, state, 'ur_ll');
            y++;
            x--;
        }
    }
    const urLlCenters = state.centers;
    return [ulLrCenters, urLlCenters];
}
function updateStateWithCenter(inputLines, x, y, needle, state, direction) {
    const newLetter = inputLines[y].charAt(x);
    if (needle.startsWith(state.currentWord + newLetter)) {
        if (state.currentWord.length === needle.length - 1) {
            const center = direction === 'ul_lr'
                ? `${x - 1}_${y - 1}`
                : `${x + 1}_${y - 1}`;
            state.centers.add(center);
            state.currentWord = '';
        }
        else {
            state.currentWord += newLetter;
        }
        return;
    }
    if (needle.startsWith(newLetter)) {
        state.currentWord = newLetter;
    }
    else {
        state.currentWord = '';
    }
}
function part1(inputFilePath) {
    return __awaiter(this, void 0, void 0, function* () {
        const input = yield (0, promises_1.readFile)(inputFilePath, 'utf8');
        const inputLines = input.split('\n');
        inputLines.pop();
        let matches = 0;
        matches += getMatches(inputLines, 'XMAS');
        matches += getMatches(inputLines, 'SAMX');
        return matches;
    });
}
function getMatches(inputLines, needle) {
    const width = inputLines[0].length;
    const height = inputLines.length;
    const state = {
        matches: 0,
        currentWord: '',
    };
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
        while (x < width && y < height) {
            updateState(inputLines, x, y, needle, state);
            y++;
            x++;
        }
    }
    for (let yStart = 1; yStart < height; yStart++) {
        let y = yStart;
        let x = 0;
        state.currentWord = '';
        while (x < width && y < height) {
            updateState(inputLines, x, y, needle, state);
            y++;
            x++;
        }
    }
    for (let xStart = width - 1; xStart >= 0; xStart--) {
        let x = xStart;
        let y = 0;
        state.currentWord = '';
        while (x >= 0 && y < height) {
            updateState(inputLines, x, y, needle, state);
            y++;
            x--;
        }
    }
    for (let yStart = 1; yStart < height; yStart++) {
        let x = width - 1;
        let y = yStart;
        state.currentWord = '';
        while (x >= 0 && y < height) {
            updateState(inputLines, x, y, needle, state);
            y++;
            x--;
        }
    }
    return state.matches;
}
function updateState(inputLines, x, y, needle, state) {
    const newLetter = inputLines[y].charAt(x);
    if (needle.startsWith(state.currentWord + newLetter)) {
        if (state.currentWord.length === needle.length - 1) {
            state.matches++;
            state.currentWord = '';
        }
        else {
            state.currentWord += newLetter;
        }
        return;
    }
    if (needle.startsWith(newLetter)) {
        state.currentWord = newLetter;
    }
    else {
        state.currentWord = '';
    }
}
main();
