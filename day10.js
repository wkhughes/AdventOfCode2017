(() => {
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
  
  const fullKnotHash = (numbers, input) => {
    const asciiCodes = inputToAsciiCodes(input);
    const suffixedAsciiCodes = appendKnotHashInputSuffix(asciiCodes);
    const sparseHash = getHash(numbers, suffixedAsciiCodes, 64);
    const denseHash = toDenseHash(sparseHash);
    return asHexString(denseHash);
  }

  const input = document.body.textContent.trim();
  const lengths = input.split(",").map(Number);
  const numbers = [...Array(256).keys()];
  
  const hashedNumbers = getHash(numbers, lengths, 1);
  const part1Solution = hashedNumbers[0] * hashedNumbers[1];
  const part2Solution = fullKnotHash(numbers, input);
  
  console.log("Part 1 Solution: " + part1Solution + "\nPart 2 Solution: " + part2Solution);
})();