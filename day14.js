(() => {  
  const asBinaryDigits = hexString => hexString.split("").map(hex => parseInt(hex, 16).toString(2).padStart(4, "0")).join("").split("");
  const numOnes = binaryDigits => binaryDigits.filter(digit => digit === "1").length;
  const numUsed = grid => grid.reduce((numUsed, row) => numUsed + numOnes(row), 0);
  
  const cellKey = (i, j) => JSON.stringify([i, j]);
  const neighbours = (grid, i, j) => [{ i: i + 1, j }, { i, j: j + 1 }, { i: i - 1, j }, { i, j: j - 1 }].filter(({ i, j }) => i >= 0 && i < grid.length && j >= 0 && j < grid[0].length);
  const isUsed = (grid, i, j) => grid[i][j] === "1";
  const visit = (grid, i, j, visited) => {
    if (visited[cellKey(i, j)]) {
      return visited;
    }
    else {
      const usedNeighbours = neighbours(grid, i, j).filter(({ i, j }) => isUsed(grid, i, j));
      return usedNeighbours.reduce((visited, { i, j }) => visit(grid, i, j, visited), { ...visited, [cellKey(i, j)]: true });
    }
  };
      
  const numRegions = grid => {
    let visited = {};
    let numRegions = 0;
    
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (isUsed(grid, i, j) && !visited[cellKey(i, j)]) {
          numRegions++;
          visited = visit(grid, i, j, visited);
        }
      }
    }
    
    return numRegions;
  }
  
  const inputs = [...Array(128).keys()].map(i => `stpzcrnm-${i}`);
  const numbers = [...Array(256).keys()];
  const grid = inputs.map(input => asBinaryDigits(fullKnotHash(numbers, input)));
  
  console.log("Part 1 Solution: " + numUsed(grid) + "\nPart 2 Solution: " + numRegions(grid));
})();

// Taken from day 10 solution
function fullKnotHash(numbers, input) {
    const reverse = (numbers, index, length) => {
    let reversedNumbers = [...numbers];
    for (let i = 0; i < length / 2; i++) {
      const start = (index + i) % reversedNumbers.length;
      const end = (index + (length - 1 - i)) % reversedNumbers.length;
      
      const endNumber = reversedNumbers[end];
      reversedNumbers[end] = reversedNumbers[start];
      reversedNumbers[start] = endNumber;
    }
    
    return reversedNumbers;
  };

  const getHashState = (numbers, lengths, position, skip) => lengths.reduce((state, length) => ({
    numbers: reverse(state.numbers, state.position, length),
    position: (state.position + state.skip + length) % state.numbers.length,
    skip: state.skip + 1
  }), { numbers, position, skip });
  
  const getHash = (numbers, lengths, numRounds) => {
    let hashState = { numbers, position: 0, skip: 0 };
    for (let i = 0; i < numRounds; i++) {
      hashState = getHashState(hashState.numbers, lengths, hashState.position, hashState.skip);
    }
    
    return hashState.numbers;
  };
  
  const inputToAsciiCodes = input => input.split("").map(character => character.charCodeAt(0));
  const appendKnotHashInputSuffix = input => [...input, 17, 31, 73, 47, 23];
  const getBlocks = values => [...Array(16).keys()].map(blockNumber => values.slice(blockNumber * 16, blockNumber * 16 + 16));
  const xorBlock = block => block.reduce((xorResult, number) => xorResult ^ number, 0);
  const toDenseHash = sparseHash => getBlocks(sparseHash).reduce((denseHash, block) => [...denseHash, xorBlock(block)], []);
  const asHexString = hash => hash.map(number => number.toString(16)).map(hex => hex.padStart(2, "0")).join("");
  
  const asciiCodes = inputToAsciiCodes(input);
  const suffixedAsciiCodes = appendKnotHashInputSuffix(asciiCodes);
  const sparseHash = getHash(numbers, suffixedAsciiCodes, 64);
  const denseHash = toDenseHash(sparseHash);
  return asHexString(denseHash);
}