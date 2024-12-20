import { readFile } from "../common/utils.ts";

export function human(test: boolean){
    const reports = readFile('2', test);

    function isSafeReport(list: Array<number>, withRemoval: boolean){
        let safeReportByRemoval = false;
        let slope = 0;
        const faultyLevel = list.some((curr, index) => {
            // skip first element
            if (!index){
                return false;
            }

            const diff = curr - list[index-1];

            if (slope === 0){
                slope = diff > 0 ? 1 : -1;
            }
            if (diff*slope < 0 || diff === 0 || Math.abs(diff) > 3){
                if (withRemoval){
                    safeReportByRemoval = isSafeReport(list.toSpliced(index, 1) ,false) || isSafeReport(list.toSpliced(index-1, 1) ,false) || isSafeReport(list.toSpliced(index-2, 1) ,false);
                }
                return true
            }
            return false;

        });
        return safeReportByRemoval || !faultyLevel;
    }

    function noSaveReports(withRemoval: boolean){
        return reports.reduce((prev:number, curr:string) => {
            const safeReport = isSafeReport(curr.split(" ").map(Number),withRemoval) ? 1 : 0;
            return prev + safeReport;
        }, 0);
    }

    console.log(`Part 1 - ${noSaveReports(false)}`);
    console.log(`Part 2 - ${noSaveReports(true)}`);
}

import * as fs from "node:fs";

/**
 * First try of Ai, resulting in an answer of 189 and 216. Which is incorrect. Now comes the difficult part of finding WHY it is incorrect. My initial thought was that 
 * it wasnt readying the input properly but that seems to work fine. So now comes the debugging session, something i see happen often with AI. After a small scan through the code
 * i noticed that the line (if diff < 1 || diff > 3) is not working as it is supposed too. Marking any decreasing row as unsafe. What i will tell AI: "With your code example, any decreasing row will be marked
 * unsafe. Rewrite the isSafe method so that it also correctly markes decreasing rows."
 */
export function aiFirstTry(){
    const inputData = fs.readFileSync('./inputs/2.txt', 'utf-8');
    const reports = inputData
        .replace(/\r/g, '') // Handle Windows-style line endings
        .trim()
        .split('\n')
        .map(line => line.split(' ').map(Number));

    function isSafe(report: number[]): boolean {
        if (report.length < 2) return false; // No comparison possible
        let increasing = true;
        let decreasing = true;

        for (let i = 1; i < report.length; i++) {
            const diff = report[i] - report[i - 1];
            if (diff < 1 || diff > 3) return false;
            if (diff < 0) increasing = false;
            if (diff > 0) decreasing = false;
        }

        return increasing || decreasing;
    }

    function isSafeWithDampener(report: number[]): boolean {
        if (isSafe(report)) return true;

        for (let i = 0; i < report.length; i++) {
            const newReport = report.slice(0, i).concat(report.slice(i + 1));
            if (isSafe(newReport)) return true;
        }

        return false;
    }

    let partOneSafeCount = 0;
    let partTwoSafeCount = 0;

    for (const report of reports) {
        if (isSafe(report)) partOneSafeCount++;
        if (isSafeWithDampener(report)) partTwoSafeCount++;
    }

    console.log(partOneSafeCount);
    console.log(partTwoSafeCount);
}

/**
 * Second try of AI: The code generated now is still not working properly, it gives 393 and 554 as results (while it should be 356 and 413). Back to debugging...
 * After looking at the new line generated i noticed that it now didnt take diff of 0 into account anymore. So provided that example.
 */
export function aiSecond(){
    const inputData = fs.readFileSync('./inputs/2.txt', 'utf-8');
    const reports = inputData
        .replace(/\r/g, '') // Handle Windows-style line endings
        .trim()
        .split('\n')
        .map(line => line.split(' ').map(Number));

    function isSafe(report: number[]): boolean {
        if (report.length < 2) return false; // No comparison possible
        let increasing = true;
        let decreasing = true;

        for (let i = 1; i < report.length; i++) {
            const diff = report[i] - report[i - 1];
            if (diff < -3 || diff > 3) return false; // Ensure differences are within bounds
            if (diff < 0) increasing = false; // Marks that the sequence is not strictly increasing
            if (diff > 0) decreasing = false; // Marks that the sequence is not strictly decreasing
        }

        return increasing || decreasing;
    }

    function isSafeWithDampener(report: number[]): boolean {
        if (isSafe(report)) return true;

        for (let i = 0; i < report.length; i++) {
            const newReport = report.slice(0, i).concat(report.slice(i + 1));
            if (isSafe(newReport)) return true;
        }

        return false;
    }

    let partOneSafeCount = 0;
    let partTwoSafeCount = 0;

    for (const report of reports) {
        if (isSafe(report)) partOneSafeCount++;
        if (isSafeWithDampener(report)) partTwoSafeCount++;
    }

    console.log(partOneSafeCount);
    console.log(partTwoSafeCount);
}

/**
 * Second try of AI: The code generated now is still not working properly, it gives 393 and 554 as results (while it should be 356 and 413). Back to debugging...
 * 
 */
export function ai(){
    const inputData = fs.readFileSync('./inputs/2.txt', 'utf-8');
    const reports = inputData
        .replace(/\r/g, '') // Handle Windows-style line endings
        .trim()
        .split('\n')
        .map(line => line.split(' ').map(Number));

    function isSafe(report: number[]): boolean {
        if (report.length < 2) return false; // No comparison possible
        let increasing = true;
        let decreasing = true;

        for (let i = 1; i < report.length; i++) {
            const diff = report[i] - report[i - 1];
            if (diff < -3 || diff > 3 || diff === 0) return false; // Ensure differences are within bounds
            if (diff < 0) increasing = false; // Marks that the sequence is not strictly increasing
            if (diff > 0) decreasing = false; // Marks that the sequence is not strictly decreasing
        }

        return increasing || decreasing;
    }

    function isSafeWithDampener(report: number[]): boolean {
        if (isSafe(report)) return true;

        for (let i = 0; i < report.length; i++) {
            const newReport = report.slice(0, i).concat(report.slice(i + 1));
            if (isSafe(newReport)) return true;
        }

        return false;
    }

    let partOneSafeCount = 0;
    let partTwoSafeCount = 0;

    for (const report of reports) {
        if (isSafe(report)) partOneSafeCount++;
        if (isSafeWithDampener(report)) partTwoSafeCount++;
    }

    console.log(partOneSafeCount);
    console.log(partTwoSafeCount);
}


/**
 * CONCLUSION
 * 
 * While doing this coding challenge I already noticed that i started to use a few things that I saw the AI use, like function within the function and also the .map(Number). 
 * The problem had quite some edge cases, and the hard part was also that the examples didnt have all those edge cases, making the development a bit harder than problem of day 1. 
 * After all, solved the problem. 
 * 
 * When looking at the AI version of the problem, the ai needed some more tries than with problem 1 and without the proper indicator of WHAT went wrong the code didnt change much. 
 * It was only after I directly said something about a failing report that should be safe that the code would be regenerated and eventually working properly. When looking at the Ai
 * version compared to my own I have to be honest that i find the ai version more readable and understandable. The array operations are nice but make it a bit complex to read in my solution.
 * However, what I did notice is that the AI version checks EVERY potential report if you allow the removal of 1 element. Which is weird, because you dont have to look at all the elements. 
 * Thats a pretty big overhead especially if the size of the report would increase. For example in the row 1 2 3 4 6 7 8 9 10 11 12 13 14 5 you would never have to check all the prior
 * elements except for 13 14 5. Meaning that in my code, no matter the size of the report you will always only check 3 other reports. While with the Ai version you will need to check at most N reports.
 * This doesnt really impact the speed now, with the small report sizing. But i still found it interesting. 
 */