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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var promises_1 = require("fs/promises");
function main() {
    return __awaiter(this, arguments, void 0, function (isTest) {
        var part1Results, part2Results;
        if (isTest === void 0) { isTest = false; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, part1({ isTest: isTest })];
                case 1:
                    part1Results = _a.sent();
                    console.log('Part 1 results: ' + part1Results);
                    return [4 /*yield*/, part2({ isTest: isTest })];
                case 2:
                    part2Results = _a.sent();
                    console.log('Part 2 results: ' + part2Results);
                    return [2 /*return*/];
            }
        });
    });
}
function getReports(inputFileName) {
    return __awaiter(this, void 0, void 0, function () {
        var input, reports, _i, _a, reportLine, report_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, (0, promises_1.readFile)(inputFileName, 'utf8')];
                case 1:
                    input = _b.sent();
                    reports = [];
                    for (_i = 0, _a = input.split('\n'); _i < _a.length; _i++) {
                        reportLine = _a[_i];
                        if (reportLine.length < 1) {
                            break;
                        }
                        report_1 = reportLine.split(/\s+/).map(function (reportVal) { return parseInt(reportVal); });
                        reports.push(report_1);
                    }
                    return [2 /*return*/, reports];
            }
        });
    });
}
function part1() {
    return __awaiter(this, arguments, void 0, function (options) {
        var inputFileName, reports;
        if (options === void 0) { options = { isTest: false }; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    inputFileName = options.isTest ? 'test_input' : 'input';
                    return [4 /*yield*/, getReports('inputs/' + inputFileName)];
                case 1:
                    reports = _a.sent();
                    return [2 /*return*/, reports.reduce(function (acc, report) { return acc + Number(isReportValid(report)); }, 0)];
            }
        });
    });
}
function isReportValid(report) {
    var isDirectionAscending = report[0] < report[1];
    for (var i = 0; i < report.length - 1; i++) {
        var leftVal = report[i];
        var rightVal = report[i + 1];
        if (!isRightDirection(isDirectionAscending, leftVal, rightVal)) {
            return false;
        }
        if (Math.abs(rightVal - leftVal) > 3) {
            return false;
        }
    }
    return true;
}
function isReportValidTolerant(report) {
    var isDirectionAscending;
    if (report[0] === report[1]) {
        return isReportValid(report.slice(1));
    }
    else {
        isDirectionAscending = report[0] < report[1];
    }
    for (var i = 0; i < report.length - 1; i++) {
        var leftVal = report[i];
        var rightVal = report[i + 1];
        if (!isRightDirection(isDirectionAscending, leftVal, rightVal)
            || Math.abs(rightVal - leftVal) > 3) {
            return isReportValid(__spreadArray(__spreadArray([], report.slice(0, i), true), report.slice(i + 1), true))
                || isReportValid(__spreadArray(__spreadArray([], report.slice(0, i + 1), true), report.slice(i + 2), true))
                || isReportValid(report.slice(1));
        }
    }
    return true;
}
function isRightDirection(isDirectionAscending, leftVal, rightVal) {
    return isDirectionAscending
        ? leftVal < rightVal
        : rightVal < leftVal;
}
function part2() {
    return __awaiter(this, arguments, void 0, function (options) {
        var inputFileName, reports;
        if (options === void 0) { options = { isTest: false }; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    inputFileName = options.isTest ? 'test_input' : 'input';
                    return [4 /*yield*/, getReports('inputs/' + inputFileName)];
                case 1:
                    reports = _a.sent();
                    return [2 /*return*/, reports.reduce(function (acc, report) { return acc + Number(isReportValidTolerant(report)); }, 0)];
            }
        });
    });
}
main();
