(() => {  
  const loWord = value => value & 0xFFFF;
  const loWordsMatch = (a, b) => loWord(a) === loWord(b);
  const pairMatches = pair => loWordsMatch(pair.a, pair.b);
  const getNextValue = (factor, divisor) => lastValue => (lastValue * factor) % divisor;
  
  const getNumMatches = (pairGenerator, numToJudge) => [...new Array(numToJudge).keys()].reduce(numMatches => pairMatches(pairGenerator.next().value) ? numMatches + 1 : numMatches, 0);
  
  const divisor = 2147483647;
  const generatorASpecification = { startWith: 618, factor: 16807, validMultiple: 4 };
  const generatorBSpecification = { startWith: 814, factor: 48271, validMultiple: 8 };
  
  const standardGeneratorA = generator(generatorASpecification.startWith, getNextValue(generatorASpecification.factor, divisor), () => true);
  const standardGeneratorB = generator(generatorBSpecification.startWith, getNextValue(generatorBSpecification.factor, divisor), () => true);
  const standardPairGenerator = pairGenerator(standardGeneratorA, standardGeneratorB);
  
  const pickyGeneratorA = generator(generatorASpecification.startWith, getNextValue(generatorASpecification.factor, divisor), value => value % generatorASpecification.validMultiple === 0);
  const pickyGeneratorB = generator(generatorBSpecification.startWith, getNextValue(generatorBSpecification.factor, divisor), value => value % generatorBSpecification.validMultiple === 0);
  const pickyPairGenerator = pairGenerator(pickyGeneratorA, pickyGeneratorB);
  
  console.log("Part 1 Solution: " + getNumMatches(standardPairGenerator, 40000000)  + "\nPart 2 Solution: " + getNumMatches(pickyPairGenerator, 5000000));
})();

function* generator(startWith, getNextValue, isValid) {
  let lastValue = startWith;
  while (true) {
    lastValue = getNextValue(lastValue);
    if (isValid(lastValue)) {
      yield lastValue;
    }
  }
}

function* pairGenerator(generatorA, generatorB) {
  while (true) {
    yield { a: generatorA.next().value, b: generatorB.next().value };
  }
}