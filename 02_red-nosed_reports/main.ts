import { readFile } from "fs/promises";
import test from "node:test";
import { report } from "process";

async function main(isTest = false) {
    const part1Results = await part1({ isTest: isTest });
    console.log('Part 1 results: ' + part1Results);

    const part2Results = await part2({ isTest: isTest });
    console.log('Part 2 results: ' + part2Results);
}

async function getReports(inputFileName: string) {
    const input = await readFile(inputFileName, 'utf8');

    const reports = [];
    for (const reportLine of input.split('\n')) {
        if (reportLine.length < 1) {
            break;
        }
        const report = reportLine.split(/\s+/).map(
            (reportVal) => parseInt(reportVal)
        );
        reports.push(report);
    }

    return reports;
}

async function part1(options = { isTest: false }) {
    const inputFileName = options.isTest ? 'test_input' : 'input';
    const reports = await getReports('inputs/' + inputFileName);

    return reports.reduce(
        (acc, report) => acc + Number(isReportValid(report)),
        0
    );
}

function isReportValid(report: number[]) {
    const isDirectionAscending = report[0] < report [1];

    for (let i = 0; i < report.length - 1; i++) {
        const leftVal = report[i];
        const rightVal = report[i + 1];

        if (!isRightDirection(isDirectionAscending, leftVal, rightVal)) {
            return false;
        }

        if (Math.abs(rightVal - leftVal) > 3) {
            return false;
        }
    }

    return true;
}

function isReportValidTolerant(report: number[]) {
    let isDirectionAscending;
    if (report[0] === report[1]) {
        return isReportValid(report.slice(1));
    } else {
        isDirectionAscending = report[0] < report [1];
    }

    for (let i = 0; i < report.length - 1; i++) {
        const leftVal = report[i];
        const rightVal = report[i + 1];

        if (
            !isRightDirection(isDirectionAscending, leftVal, rightVal)
            || Math.abs(rightVal - leftVal) > 3
        ) {
            return isReportValid(
                [...report.slice(0, i), ...report.slice(i + 1)]
            )
            || isReportValid(
                [...report.slice(0, i + 1), ...report.slice(i + 2)]
            )
            || isReportValid(report.slice(1));
        }
    }

    return true;
}

function isRightDirection(
    isDirectionAscending: boolean,
    leftVal: number,
    rightVal: number
) {
    return isDirectionAscending
        ? leftVal < rightVal
        : rightVal < leftVal;
}


async function part2(options = { isTest: false }) {
    const inputFileName = options.isTest ? 'test_input' : 'input';
    const reports = await getReports('inputs/' + inputFileName);

    return reports.reduce(
        (acc, report) => acc + Number(isReportValidTolerant(report)),
        0
    );
}

main();
