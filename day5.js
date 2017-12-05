(() => {
  const input = document.body.textContent.trim();
  const offsets = input.split("\n").map(Number); 
  
  console.log("Part 1 Solution: " + part1Solution([...offsets]) + "\nPart 2 Solution: " + part2Solution([...offsets]));
})();

function part1Solution(offsets) {
  let numSteps = 0;
  for (let address = 0; address >= 0 && address < offsets.length; numSteps++) {
    address += offsets[address]++;
  }
  
  return numSteps;
}

function part2Solution(offsets) {
  let numSteps = 0;
  for (let address = 0; address >= 0 && address < offsets.length; numSteps++) {
    address += offsets[address] < 3 ? offsets[address]++ : offsets[address]--;
  }
  
  return numSteps;
}