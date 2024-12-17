// Read file of the day and return as an array of strings
export function readFile(day: string){
    return Deno.readTextFileSync(`./inputs/${day}.txt`).split('\n');
}