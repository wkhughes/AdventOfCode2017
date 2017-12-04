const input = document.body.textContent.trim();
const inputDigits = input.split("").map(Number);

const getPairs = (values, shift) => values.map((value, index) => ({ current: value, next: values[(index + shift) % values.length] }));
const sumIdenticalPairs = pairs => pairs.map(pair => pair.current === pair.next ? pair.current : 0).reduce((sum, pairValue) => sum + pairValue);

const part1Solution = sumIdenticalPairs(getPairs(inputDigits, 1))
const part2Solution = sumIdenticalPairs(getPairs(inputDigits, inputDigits.length / 2))

console.log("Part 1 Solution:", part1Solution, "\nPart 2 Solution:", part2Solution);
