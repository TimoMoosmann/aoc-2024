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
        let result = 0;
        let active = true;
        while (true) {
            const doOrDontMatch = /do\(\)|don't\(\)/.exec(input);
            if (active) {
                result += getSumOfMultiplications(input.substring(0, doOrDontMatch === null || doOrDontMatch === void 0 ? void 0 : doOrDontMatch.index));
            }
            if (!doOrDontMatch) {
                break;
            }
            active = doOrDontMatch[0] === 'do()';
            input = input.substring(doOrDontMatch.index + doOrDontMatch[0].length);
        }
        return result;
    });
}
function getSumOfMultiplications(input) {
    let result = 0;
    const validMulRegex = /mul\((\d{1,3}),(\d{1,3})\)/g;
    for (const match of input.matchAll(validMulRegex)) {
        const num1 = parseInt(match[1]);
        const num2 = parseInt(match[2]);
        result += num1 * num2;
    }
    return result;
}
function part1(inputFilePath) {
    return __awaiter(this, void 0, void 0, function* () {
        const input = yield (0, promises_1.readFile)(inputFilePath, 'utf8');
        return getSumOfMultiplications(input);
    });
}
main();
