// Read file of the day and return as an array of strings
export function readFile(day: string, test: boolean): Array<string>{
    return Deno.readTextFileSync(`./${test ? 'testInput' : 'inputs'}/${day}.txt`).replace(/[\r]+/gm, "").split('\n');
}