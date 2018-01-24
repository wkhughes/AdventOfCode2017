(() => {
  const directionToOffsets = direction => {
    switch (direction) {
      case "n":
        return { x: 0, y: 1, z: -1 };
      case "ne":
        return { x: 1, y: 0, z: -1 };
      case "se":
        return { x: 1, y: -1, z: 0 };
      case "s":
        return { x: 0, y: -1, z: 1 };
      case "sw":
        return { x: -1, y: 0, z: 1 };
      case "nw":
        return { x: -1, y: 1, z: 0 };
      default:
        throw new Error(`Unknown direction ${direction}`);
    }
  };
  
  const applyOffsets = (coordinates, offsets) => ({
    x: coordinates.x + offsets.x,
    y: coordinates.y + offsets.y,
    z: coordinates.z + offsets.z,
  });
  
  const distanceFromOrigin = coordinates => Object.values(coordinates).map(Math.abs).reduce((a, b) => a + b, 0) / 2;
  const updateMaxDistance = ({ coordinates, maxDistance }) => ({ coordinates, maxDistance: Math.max(maxDistance, distanceFromOrigin(coordinates)) });
  const takePath = directions => directions.map(directionToOffsets).reduce(
    ({ coordinates, maxDistance }, offsets) => updateMaxDistance({ maxDistance, coordinates: applyOffsets(coordinates, offsets) }),
    { coordinates: { x: 0, y: 0, z: 0 }, maxDistance: 0 }
  );
  
  const input = document.body.textContent.trim();
  const directions = input.split(",");
  
  const part1Solution = distanceFromOrigin(takePath(directions).coordinates);
  const part2Solution = takePath(directions).maxDistance;
  
  console.log("Part 1 Solution: " + distanceFromOrigin(takePath(directions).coordinates) + "\nPart 2 Solution: " + part2Solution);
})();