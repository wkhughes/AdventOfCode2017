(() => {
  const lineRegex = /^(\d+) <-> (.+)$/;
  const matchesToObject = matches => ({ id: matches[1], connectedIds: matches[2].split(", ").map(Number) });
  const parseInput = input => input.split("\n").map(line => line.match(lineRegex)).map(matchesToObject);
  const resolveConnected = (programsById, root, visitedIds) => {
    visitedIds[root.id] = true;
    return { ...root, connected: root.connectedIds.filter(id => !visitedIds[id]).map(id => resolveConnected(programsById, programsById[id], visitedIds)) }
  };
  const size = program => program.connected.reduce((connectedSize, connectedProgram) => connectedSize + size(connectedProgram), 0) + 1;
  const visitGroups = programs => programs.reduce(({ numGroups, visitedIds }, program) => {
    if (visitedIds[program.id]) {
      return { numGroups, visitedIds };
    }
    else {
      resolveConnected(programsById, program, visitedIds);
      return { numGroups: numGroups + 1, visitedIds };
    }
  }, { numGroups: 0, visitedIds: {} });
  const getNumGroups = programs => visitGroups(programs).numGroups;

  const input = document.body.textContent.trim();
  const programs = parseInput(input);
  const programsById = programs.reduce((programsById, program) => ({ ...programsById, [program.id]: program }), {});
  const programZero = resolveConnected(programsById, programsById[0], {});
  
  console.log("Part 1 Solution: " + size(programZero) + "\nPart 2 Solution: " + getNumGroups(programs));
})();