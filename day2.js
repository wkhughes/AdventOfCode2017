(() => {
  const input = document.body.textContent.trim();
  const spreadsheet = input.split("\n").map(row => row.split("\t").map(Number));
  
  console.log("Part 1 Solution:", part1Solution(spreadsheet), "\nPart 2 Solution:", part2Solution(spreadsheet));
})();

function part1Solution(spreadsheet) {
  const rowMaxValues = spreadsheet.map(row => Math.max(...row));
  const rowMinValues = spreadsheet.map(row => Math.min(...row));
  const rowMinMaxDifferences = rowMaxValues.map((max, index) => max - rowMinValues[index]);
  
  return rowMinMaxDifferences.reduce((differencesSum, difference) => differencesSum + difference, 0);
}

function part2Solution(spreadsheet) {
  const isDistinctDivisor = (dividend, divisor) => dividend !== divisor && dividend % divisor === 0;
  
  const getRowDividend = row => row.filter(value => row.some(divisor => isDistinctDivisor(value, divisor)))[0];
  const getRowDivisor = row => row.filter(value => row.some(divisor => isDistinctDivisor(divisor, value)))[0];
  
  const evenlyDividedResults = spreadsheet.map(row => getRowDividend(row) / getRowDivisor(row));
  
  return evenlyDividedResults.reduce((dividedSum, dividedResult) => dividedSum + dividedResult, 0);
}