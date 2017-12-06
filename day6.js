(() => {
  const indexOfMostBlocks = banks => banks.indexOf(Math.max(...banks));
  
  // The distance between two indexes when moving forward through a cyclical array
  const positionsBetween = (length, fromIndex, toIndex) => (length + toIndex - fromIndex) % length;
  
  // The number of times a full cycle will occur through the banks array, and how far through the array
  // the last (partial) cycle will go
  const fullRedistributionCycles = (banks, blocks) => Math.floor(blocks / banks.length);
  const lastRedistributionCycleDistance = (banks, blocks) => blocks % banks.length;
  
  // Redistribute by incrementing the block count for every full cycle, then increment the blocks that are within
  // the partial cycle
  const redistributeBlocksAtIndex = (banks, bankIndex, fullRedistributionCycles, lastRedistributionCycleDistance) => banks.map(
    (blocks, index) => (index === bankIndex ? 0 : blocks)
      + fullRedistributionCycles
      + (positionsBetween(banks.length, bankIndex + 1, index) < lastRedistributionCycleDistance ? 1 : 0)
  );
  const redistribute = banks => {
    const mostBlocksIndex = indexOfMostBlocks(banks);
    const mostBlocks = banks[mostBlocksIndex];
    return redistributeBlocksAtIndex(banks, mostBlocksIndex, fullRedistributionCycles(banks, mostBlocks), lastRedistributionCycleDistance(banks, mostBlocks));
  };
  
  const firstRepeatedBanks = banks => {
    const seenBankStates = new Set();
    let bankState = banks.toString();
    let numCycles = 0;
    
    while (!seenBankStates.has(bankState)) {
      seenBankStates.add(banks.toString());
      banks = redistribute(banks);
      bankState = banks.toString();
      
      numCycles++
    }
    
    return { repeatedBanks: banks, numCycles };
  };
  
  const input = document.body.textContent.trim();
  const banks = input.split("\t").map(Number); 
  const repeated = firstRepeatedBanks(banks);
  const repeatedAgain = firstRepeatedBanks(repeated.repeatedBanks);
  
  console.log("Part 1 Solution: " + repeated.numCycles + "\nPart 2 Solution: " + repeatedAgain.numCycles);
})();