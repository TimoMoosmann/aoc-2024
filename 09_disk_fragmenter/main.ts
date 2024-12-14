import { readFileSync } from "fs";

solveA(false);
solveB(false);

function solveA(isTest: boolean) {
    const disk = getDisk(isTest);
    cleanDisk(disk);
    const checkSum = getChecksum(disk);

    console.log('Solution for part One: ' + checkSum);
}

function solveB(isTest: boolean) {
    let disk = getDisk(isTest);

    cleanDiskKeepBlocks(disk);

    const checkSum = getChecksum(disk);
    console.log('Solution for part Two: ' + checkSum);
}

function getDisk(isTest: boolean) {
    const inputPath = isTest ? 'inputs/test_input' : 'inputs/input';
    const input = readFileSync(inputPath, 'utf8');
    const disk: number[] = [];

    let currentId = 0;
    let isSpace = false;
    for (const diskMapSymbol of input) {
        if (diskMapSymbol === '\n') {
            break;
        }

        const diskMapNumber = parseInt(diskMapSymbol);
        for (let i = 0; i < diskMapNumber; i++) {
            if (isSpace) {
                disk.push(-1);
            } else {
                disk.push(currentId);
            }
        }

        if (isSpace) {
            currentId++;
        }
        isSpace = !isSpace;
    }

    return disk;
}

function cleanDisk(disk: number[]) {
    let freeSpacePointer = 0;
    let lastValuePointer = disk.length - 1;

    while (freeSpacePointer < lastValuePointer) {
        if (!(disk[freeSpacePointer] === -1)) {
            freeSpacePointer++;
            continue;
        }

        if (disk[lastValuePointer] === -1) {
            lastValuePointer--;
            continue;
        }

        disk[freeSpacePointer] = disk[lastValuePointer];
        disk[lastValuePointer] = -1;
    }
}

function getChecksum(disk: number[]) {
    return disk.reduce((carry, fileId, position) => {
        if (fileId === -1) {
            return carry;
        } else {
            return carry + (fileId * position);
        }
    }, 0);
}

function cleanDiskKeepBlocks(disk: number[]) {
    let diskIndex = disk.length - 1;

    while (diskIndex >= 0) {
        const fileId = disk[diskIndex];

        if (fileId === -1) {
            diskIndex--;
            continue;
        }

        const [fileStartIndex, fileSize] = getFileFromEndIndex(disk, diskIndex);
        diskIndex -= fileSize;

        const firstFittingSpaceIndex = findFirstFittingSpaceIndex(
            disk,
			fileStartIndex,
			fileSize
        );

        if (firstFittingSpaceIndex !== undefined) {
            moveDiskParts(
                disk,
				fileStartIndex,
				fileSize,
				firstFittingSpaceIndex,
            );
        }
    }
}

function moveDiskParts(
    disk: number[],
    fileStartIndex: number,
    fileSize: number,
    targetIndex: number
) {
    const fileId = disk[fileStartIndex];
    for (let i = 0; i < fileSize; i++) {
        disk[targetIndex + i] = fileId;
        disk[fileStartIndex + i] = -1;
    }
}

function getFileFromEndIndex(disk: number[], fileEndIndex: number) {
    const fileId = disk[fileEndIndex];
    let size = 1;

    while (fileEndIndex - size >= 0) {
        const filePartId = disk[fileEndIndex - size];
        if (filePartId !== fileId) {
            break;
        }
        size++;
    }

    return [fileEndIndex - size + 1, size];
}

function findFirstFittingSpaceIndex(
    disk: number[],
    fileStartIndex: number,
    fileSize: number
) {
    let spaceSize = 0;

    for (let diskIndex = 0; diskIndex < fileStartIndex; diskIndex++) {
        const fileId = disk[diskIndex];

        if (fileId !== -1) {
            spaceSize = 0;
            continue;
        }

        spaceSize++;
        if (spaceSize >= fileSize) {
            return diskIndex - spaceSize + 1;
        }
    }

    return undefined;
}


