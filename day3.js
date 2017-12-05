(() => {
  const input = 312051;
  console.log("Part 1 Solution: " + part1Solution(input) + "\nPart 2 Solution: " + part2Solution(input));
})();

function part1Solution(input) {
  const coordinates = getSpiralCoordinates(input);
  return Math.abs(coordinates.x) + Math.abs(coordinates.y);
}

function part2Solution(input) {
  // A sparse grid
  class Grid {
    constructor(defaultValue) {
      this.defaultValue = defaultValue;
      this.rows = [];
    }
    
    get(x, y) {
      return this.rows[x] && this.rows[x][y] || this.defaultValue;
    }
    
    set(x, y, value) {
      const row = this.rows[x] || [];
      row[y] = value;
      this.rows[x] = row;
    }
  };
  
  const grid = new Grid(0);
  
  const offsets = [-1, 0, 1];
  const flatten = listOfLists => listOfLists.reduce((concatenated, array) => concatenated.concat(array), []);
  const sumNeighbours = (x, y) => flatten(offsets.map(xOffset => offsets.map(yOffset => grid.get(x + xOffset, y + yOffset)))).reduce((sum, value) => sum + value);
  
  // Set the grid values as defined by the puzzle logic until a cell value larger than the
  // puzzle input is found
  grid.set(0, 0, 1);
  let lastCellValue = 0;
  for (cellIndex = 2; lastCellValue < input; cellIndex++) {
    const { x, y } = getSpiralCoordinates(cellIndex);
    const neighboursSum = sumNeighbours(x, y);
    grid.set(x, y, neighboursSum);
    
    lastCellValue = neighboursSum;
  }
  
  return lastCellValue;
}

function getSpiralCoordinates(input) {
  // If the sqrt returns a square with an even length, it belongs to the next odd square
  // because the square size increases in steps of 2, e.g. 1, 3, 5 etc.
  const ceilRoot = Math.ceil(Math.sqrt(input));
  const squareSideLength = ceilRoot % 2 === 0 ? ceilRoot + 1 : ceilRoot;
  
  // The distance to the center from any axis within the square (e.g. inline with the origin)
  const distanceToCenterFromAxis = (squareSideLength - 1) / 2;
  
  // Get the ordinal of the value within the square, where the first value that 'breaks out'
  // of the inner square has ordinal 1. The square below this (bottom right) has ordinal 0,
  // this is the purpose of modding the ordinal with the largest ordinal number possible
  const innerSquareSideLength = squareSideLength - 2;
  const innerSquareLastNumber = innerSquareSideLength ** 2;
  const ordinalInSquare = (input - innerSquareLastNumber) % ((squareSideLength ** 2) - innerSquareLastNumber);
  
  // Find the distance from the axis for the side of the square the input is in
  const ordinalInLine = ordinalInSquare % (squareSideLength - 1);
  const distanceFromAxis = ordinalInLine - (squareSideLength - 1) / 2;
  
  // Convert the distance from the center and distance to the side's axis to coordinates
  // depending on the side of the square
  const Side = { RIGHT: 0, TOP: 1, LEFT: 2, BOTTOM: 3 };
  const side = Math.floor(ordinalInSquare / (squareSideLength - 1));
  
  switch (side) {
    case Side.TOP:
      return { x: distanceToCenterFromAxis, y: -distanceFromAxis };
    case Side.RIGHT:
      return { x: distanceFromAxis, y: distanceToCenterFromAxis };
    case Side.BOTTOM:
      return { x: -distanceToCenterFromAxis, y: distanceFromAxis };
    case Side.LEFT:
      return { x: -distanceFromAxis, y: -distanceToCenterFromAxis };
    default:
      throw Error(`Undefined side ${side}`);
  }
}
