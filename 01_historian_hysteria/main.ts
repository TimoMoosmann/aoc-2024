// read input into two lists
// sort them
// reduce one arry by summing up the distances to the values from the second array
//
import { readFile } from 'node:fs/promises';

async function main() {
    const part1Result = await part1();
    console.log('Result for part 1: ' + part1Result);

    const part2Result = await part2();
    console.log('Result for part 2: ' + part2Result);
}

async function part1() {
    let group1Ids, group2Ids;
    [group1Ids, group2Ids] = await readInput('inputs/input');
    return getDistance(group1Ids, group2Ids);
}

async function part2() {
    let group1Ids, group2Ids;
    [group1Ids, group2Ids] = await readInput('inputs/input');
    return getSimilarityScore(group1Ids, group2Ids);
}


async function readInput(name: string) {
    const input = await readFile(name, { encoding: 'utf8' });

    const group1Ids = [];
    const group2Ids = [];

    for (const line of input.split('\n')) {
        if (line.length < 1) {
            break;
        }

        const cols = line.split(/\s+/);
        group1Ids.push(parseInt(cols[0]));
        group2Ids.push(parseInt(cols[1]));
    }

    return [group1Ids, group2Ids];
}

function getDistance(group1Ids: number[], group2Ids: number[]) {
    group1Ids.sort();
    group2Ids.sort();

    return group1Ids.reduce((dist, currentId, currentIdx) => {
        const currentDist = Math.abs(currentId - group2Ids[currentIdx]);
        return dist + currentDist;
    }, 0);
}

function getSimilarityScore(group1Ids: number[], group2Ids: number[]) {
    const rightSideAppearanceCount = new Map();

    for (const rightSideId of group2Ids) {
        const countForCurrentId = rightSideAppearanceCount.get(rightSideId);
        if (countForCurrentId === undefined) {
            rightSideAppearanceCount.set(rightSideId, 1)
        } else {
            rightSideAppearanceCount.set(rightSideId, countForCurrentId + 1);
        }
    }

    let similarityScore = 0;
    for (const leftSideId of group1Ids) {
        const countForCurrentId = rightSideAppearanceCount.get(leftSideId);
        if (countForCurrentId !== undefined) {
            similarityScore += leftSideId * countForCurrentId;
        }
    }

    return similarityScore;
}

main();

