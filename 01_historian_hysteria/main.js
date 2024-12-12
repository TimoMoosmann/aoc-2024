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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// read input into two lists
// sort them
// reduce one arry by summing up the distances to the values from the second array
//
var promises_1 = require("node:fs/promises");
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var part1Result, part2Result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, part1()];
                case 1:
                    part1Result = _a.sent();
                    console.log('Result for part 1: ' + part1Result);
                    return [4 /*yield*/, part2()];
                case 2:
                    part2Result = _a.sent();
                    console.log('Result for part 2: ' + part2Result);
                    return [2 /*return*/];
            }
        });
    });
}
function part1() {
    return __awaiter(this, void 0, void 0, function () {
        var group1Ids, group2Ids;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, readInput('inputs/input')];
                case 1:
                    _a = _b.sent(), group1Ids = _a[0], group2Ids = _a[1];
                    return [2 /*return*/, getDistance(group1Ids, group2Ids)];
            }
        });
    });
}
function part2() {
    return __awaiter(this, void 0, void 0, function () {
        var group1Ids, group2Ids;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, readInput('inputs/input')];
                case 1:
                    _a = _b.sent(), group1Ids = _a[0], group2Ids = _a[1];
                    return [2 /*return*/, getSimilarityScore(group1Ids, group2Ids)];
            }
        });
    });
}
function readInput(name) {
    return __awaiter(this, void 0, void 0, function () {
        var input, group1Ids, group2Ids, _i, _a, line, cols;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, (0, promises_1.readFile)(name, { encoding: 'utf8' })];
                case 1:
                    input = _b.sent();
                    group1Ids = [];
                    group2Ids = [];
                    for (_i = 0, _a = input.split('\n'); _i < _a.length; _i++) {
                        line = _a[_i];
                        if (line.length < 1) {
                            break;
                        }
                        cols = line.split(/\s+/);
                        group1Ids.push(parseInt(cols[0]));
                        group2Ids.push(parseInt(cols[1]));
                    }
                    return [2 /*return*/, [group1Ids, group2Ids]];
            }
        });
    });
}
function getDistance(group1Ids, group2Ids) {
    group1Ids.sort();
    group2Ids.sort();
    return group1Ids.reduce(function (dist, currentId, currentIdx) {
        var currentDist = Math.abs(currentId - group2Ids[currentIdx]);
        return dist + currentDist;
    }, 0);
}
function getSimilarityScore(group1Ids, group2Ids) {
    var rightSideAppearanceCount = new Map();
    for (var _i = 0, group2Ids_1 = group2Ids; _i < group2Ids_1.length; _i++) {
        var rightSideId = group2Ids_1[_i];
        var countForCurrentId = rightSideAppearanceCount.get(rightSideId);
        if (countForCurrentId === undefined) {
            rightSideAppearanceCount.set(rightSideId, 1);
        }
        else {
            rightSideAppearanceCount.set(rightSideId, countForCurrentId + 1);
        }
    }
    var similarityScore = 0;
    for (var _a = 0, group1Ids_1 = group1Ids; _a < group1Ids_1.length; _a++) {
        var leftSideId = group1Ids_1[_a];
        var countForCurrentId = rightSideAppearanceCount.get(leftSideId);
        if (countForCurrentId !== undefined) {
            similarityScore += leftSideId * countForCurrentId;
        }
    }
    return similarityScore;
}
main();
