(() => {
  const lineRegex = /^(\d+): (\d+)$/;
  const matchesToObject = matches => ({ depth: Number(matches[1]), range: Number(matches[2]) });
  const parseInput = input => input.split("\n").map(line => line.match(lineRegex)).map(matchesToObject);
  
  const caughtByLayer = ({ range, depth }, startPicosecond) => (startPicosecond + depth) % ((range - 1) * 2) === 0;
  const getSeverity = layers => layers.filter(layer => caughtByLayer(layer, 0)).reduce((severity, { range, depth }) => severity + range * depth, 0);
  const getMinimumDelay = layers => {
    let delay = 0;
    while (layers.some(layer => caughtByLayer(layer, delay))) {
      delay++;
    }
    return delay;
  };
  
  const input = document.body.textContent.trim();
  const layers = parseInput(input);
  
  console.log("Part 1 Solution: " + getSeverity(layers) + "\nPart 2 Solution: " + getMinimumDelay(layers));
})();