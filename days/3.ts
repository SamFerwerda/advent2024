
import { readFile } from "../common/utils.ts";

export function human(test: boolean){
    const memory = readFile('3', test);
    const memoryString = memory.join("");

    // part 1
    const reg = /mul\((\d*?),(\d*?)\)/gm;
    const matches = memoryString.matchAll(reg);

    const amount = matches.reduce((prev, curr) => {
        return prev + parseInt(curr[1])*parseInt(curr[2]);
    }, 0)

    console.log(amount)

    // part 2
    const regex = /mul\((\d*?),(\d*?)\)|do\(\)|don't\(\)/gm;
    const allMatches = memoryString.matchAll(regex);

    let enabled = true;
    const sum = allMatches.reduce((prev, curr) => {
        if (curr[0] === "do()"){
            enabled = true;
        } else if (curr[0] === "don't()"){
            enabled = false;
        } else if (enabled){
            return prev + parseInt(curr[1])*parseInt(curr[2]);
        }
        return prev;
    }, 0)

    console.log(sum);
}

/**
 * First version failed. With output NaN, and this is due to the line const [, x, y] = match.match(mulRegex)!;
 */
export function aiFirst(){
    const memory = readFile('3', false).join("");
    
    // Regex to match valid mul(X,Y) instructions
    const mulRegex = /mul\((\d{1,3}),(\d{1,3})\)/g;
    // Regex to match do() and don't() instructions
    const controlRegex = /(do\(\)|don't\(\))/g;

    let isEnabled = true; // Tracks whether mul instructions are enabled
    let sum = 0;

    // Split the memory into tokens by identifying valid mul and control instructions
    const tokens = [...memory.matchAll(new RegExp(`${mulRegex.source}|${controlRegex.source}`, 'g'))];

    for (const token of tokens) {
        const [match] = token;
        console.log(match);
        if (match.startsWith("mul")) {
            // Extract X and Y from the matched mul(X,Y)
            const [, x, y] = match.match(mulRegex)!;
            console.log(x, y)
            if (isEnabled) {
                sum += parseInt(x) * parseInt(y);
            }
        } else if (match === "do()") {
            isEnabled = true;
        } else if (match === "don't()") {
            isEnabled = false;
        }
    }

    console.log(sum);
}

/**
 * Second version failed. Due to the assignment example only have 3 digit numbers, the ai only allows 3 digit numbers to match the regex. Which causes a lot of 
 * correct mul(x,y) to go unnoticed.
 */
export function aiSecond(){
    const memory = readFile('3', false).join("");
    
    // Regex to match valid mul(X,Y) instructions
    const mulRegex = /mul\((\d{1,3}),(\d{1,3})\)/g;
    // Regex to match do() and don't() instructions
    const controlRegex = /(do\(\)|don't\(\))/g;

    let isEnabled = true; // Tracks whether mul instructions are enabled
    let sum = 0;

    // Split the memory into tokens by identifying valid mul and control instructions
    const tokens = [...memory.matchAll(new RegExp(`${mulRegex.source}|${controlRegex.source}`, 'g'))];

    for (const token of tokens) {
        const [match] = token;
        if (match.startsWith("mul")) {
            const mulMatch = mulRegex.exec(match);
            if (mulMatch) {
                const x = parseInt(mulMatch[1]);
                const y = parseInt(mulMatch[2]);

                if (isEnabled) {
                    sum += x * y;
                }
            }
        } else if (match === "do()") {
            isEnabled = true;
        } else if (match === "don't()") {
            isEnabled = false;
        }
    }

    console.log(sum);
}

/**
 * third version failed. The number retrieved is way to low still, and this time because the const mulMatch = mulRegex.exec(match); sometimes matches and sometimes doesnt match properly. Causing
 * some mul(x,y) to be skipped.
 */
export function aiThird(){
    const memory = readFile('3', false).join("");
    
    // Regex to match valid mul(X,Y) instructions
    const mulRegex = /mul\((\d+),(\d+)\)/g;
    // Regex to match do() and don't() instructions
    const controlRegex = /(do\(\)|don't\(\))/g;

    let isEnabled = true; // Tracks whether mul instructions are enabled
    let sum = 0;

    // Split the memory into tokens by identifying valid mul and control instructions
    const tokens = [...memory.matchAll(new RegExp(`${mulRegex.source}|${controlRegex.source}`, 'g'))];

    for (const token of tokens) {
        const [match] = token;
        if (match.startsWith("mul")) {
            const mulMatch = mulRegex.exec(match);
            if (mulMatch) {
                const x = parseInt(mulMatch[1]);
                const y = parseInt(mulMatch[2]);

                if (isEnabled) {
                    sum += x * y;
                }
            }
        } else if (match === "do()") {
            isEnabled = true;
        } else if (match === "don't()") {
            isEnabled = false;
        }
    }

    console.log(sum);
}

/**
 * Success with Ai! Finally :)
 */
export function ai(){
    const memory = readFile('3', false).join("");
    
    // Regex to match valid mul(X,Y) instructions
    const mulRegex = /mul\((\d+),(\d+)\)/g;
    // Regex to match do() and don't() instructions
    const controlRegex = /(do\(\)|don't\(\))/g;

    let isEnabled = true; // Tracks whether mul instructions are enabled
    let sum = 0;

    // Split the memory into tokens by identifying valid mul and control instructions
    const tokens = [...memory.matchAll(new RegExp(`${mulRegex.source}|${controlRegex.source}`, 'g'))];

    for (const token of tokens) {
        const [match] = token;
        if (match.startsWith("mul")) {
            const [, x, y] = /mul\((\d+),(\d+)\)/.exec(match)!;
            const xNum = parseInt(x);
            const yNum = parseInt(y);

            if (isEnabled) {
                sum += xNum * yNum;
            }
        } else if (match === "do()") {
            isEnabled = true;
        } else if (match === "don't()") {
            isEnabled = false;
        }
    }

    console.log(sum);
}

/**
 * CONCLUSION
 * 
 * This problem was very simple, just basic regex rules which made the human version easy to create. The AI version took a little longer due to the debuggin why it didnt work, after some time
 * also the ai version was working. A note about the ai version was the lack of specific requirement in the assignment, such as how big the numbers are allowed to be etc. 
 * 
 * Differnce between the human and AI code is minimal, i again choose for the Array operator Reduce which i think in this case is same level als readable as the AI for loop (and it saves me the assining to sum variable)
 */