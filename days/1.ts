import { readFile } from "../common/utils.ts";

export function human(test){
    let list1: number[] = [];
    let list2: number[] = [];
    
    // read lists
    readFile('1', test).forEach((line: string) => {
        const [id1, id2] = line.split('   ');
        list1.push(parseInt(id1));
        list2.push(parseInt(id2));
    });

    // order the lists
    list1 = list1.sort();
    list2 = list2.sort();

    // calc distance
    let distance = 0;
    list1.forEach((value, index) => {
        const id2 = list2[index];
        distance += Math.abs(id2-value);
    })
    console.log(`Part 1: Total distance between the lists is ${distance}`);

    // create a map of the ids in list 1
    const map: Record<number, number> = {}
    list1.forEach(key => map[key] = 0);
    list2.forEach(key => {
        if (!isNaN(map[key])) {
            map[key]+=key
        }
    });
    // calc sum
    const similarity = Object.values(map).reduce((prev, curr) => prev+curr, 0);
    console.log(`Part 2: Similarity score is ${similarity}`);
}

import fs from "node:fs";

// First try of the AI version. Contains a mistake, can you find it ;)?
export function aiFailed1() {
  // Read input from the file './inputs/1.txt'
  const input = fs.readFileSync('./inputs/1.txt', 'utf8').trim().split('\n');
  
  // Parse the input into two lists
  const leftList = [];
  const rightList = [];
  
  input.forEach(line => {
    const [left, right] = line.split('\t').map(Number);
    leftList.push(left);
    rightList.push(right);
  });

  // Part 1: Calculate the total distance between the lists
  function calculateTotalDistance(left, right) {
    left.sort((a, b) => a - b);
    right.sort((a, b) => a - b);
    
    let totalDistance = 0;
    for (let i = 0; i < left.length; i++) {
      totalDistance += Math.abs(left[i] - right[i]);
    }
    return totalDistance;
  }

  // Part 2: Calculate the similarity score
  function calculateSimilarityScore(left, right) {
    const rightCount = {};
    
    // Count the occurrences of each number in the right list
    right.forEach(num => {
      rightCount[num] = (rightCount[num] || 0) + 1;
    });

    let similarityScore = 0;
    
    // For each number in the left list, calculate the similarity score
    left.forEach(num => {
      similarityScore += num * (rightCount[num] || 0);
    });

    return similarityScore;
  }

  // Calculate the results for both parts
  const part1Result = calculateTotalDistance(leftList, rightList);
  const part2Result = calculateSimilarityScore(leftList, rightList);

  // Print the results
  console.log(`Part 1: ${part1Result}`);
  console.log(`Part 2: ${part2Result}`);
}

// Second try of AI after elaborating the test data
export function ai() {
    // Read input from the file './inputs/1.txt'
    const input = fs.readFileSync('./inputs/1.txt', 'utf8').trim().split('\n');
    
    // Parse the input into two lists
    const leftList = [];
    const rightList = [];
    
    input.forEach(line => {
      // Split the line by three spaces (or any amount of whitespace)
      const [left, right] = line.split(/\s+/).map(Number);
      leftList.push(left);
      rightList.push(right);
    });
  
    // Part 1: Calculate the total distance between the lists
    function calculateTotalDistance(left, right) {
      left.sort((a, b) => a - b);
      right.sort((a, b) => a - b);
      
      let totalDistance = 0;
      for (let i = 0; i < left.length; i++) {
        totalDistance += Math.abs(left[i] - right[i]);
      }
      return totalDistance;
    }
  
    // Part 2: Calculate the similarity score
    function calculateSimilarityScore(left, right) {
      const rightCount = {};
      
      // Count the occurrences of each number in the right list
      right.forEach(num => {
        rightCount[num] = (rightCount[num] || 0) + 1;
      });
  
      let similarityScore = 0;
      
      // For each number in the left list, calculate the similarity score
      left.forEach(num => {
        similarityScore += num * (rightCount[num] || 0);
      });
  
      return similarityScore;
    }
  
    // Calculate the results for both parts
    const part1Result = calculateTotalDistance(leftList, rightList);
    const part2Result = calculateSimilarityScore(leftList, rightList);
  
    // Print the results
    console.log(`Part 1: ${part1Result}`);
    console.log(`Part 2: ${part2Result}`);
  }


/** --- Conclusion Day 1 ---
The solution written by myself was obviously a lot slower to create. I ran into a few small issues that 
i didnt thought about at the start, for example numbers that show up in list 2 that are not in list 1. However, 
I think that the solution created by me is readable and understandable.

The solution written by AI was very easy to create. Given the problem and test data, the first solution the ai 
came with was not correct. However, after elaborating the test data, the AI came up with a correct solution. 
It was fun to see that the approach to the first problem was basically the same as the one I came up with.
I like how the AI solution split up the parts in functions, however i think the approach to the 
second problem is a bit more complicated than it needs to be.

Also, next time i should ask to write the solution in Typescript :D
*/