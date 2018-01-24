(() => {
  const spin = x => programs => [...programs.slice(-x), ...programs.slice(0, -x)];
  const exchange = (a, b) => programs => {
    let exchangedPrograms = programs.slice();
    [exchangedPrograms[a], exchangedPrograms[b]] = [programs[b], programs[a]];
    return exchangedPrograms;
  };
  const partner = (a, b) => programs => exchange(programs.indexOf(a), programs.indexOf(b))(programs);
  
  const parseSpin = text => {
    let matches = text.match(/^s(\d+)$/);
    return matches ? spin(Number(matches[1])) : null;
  };
  const parseExchange = text => {
    let matches = text.match(/^x(\d+)\/(\d+)$/);
    return matches ? exchange(Number(matches[1]), Number(matches[2])) : null;
  };
  const parsePartner = text => {
    let matches = text.match(/^p([a-z]+)\/([a-z]+)$/);
    return matches ? partner(matches[1], matches[2]) : null;
  };
  const parseCommand = text => [parseSpin, parseExchange, parsePartner].map(parse => parse(text)).find(command => command);
  const parseInput = input => input.split(",").map(parseCommand);
  
  const dance = (programs, commands) => commands.reduce((programs, command) => command(programs), programs);
  const danceRepeatedly = numDances => (programs, commands) => {
    const seenPrograms = [];
    
    for (let i = 0; i < numDances; i++) {
      if (seenPrograms.includes(programs.join(""))) {
        return seenPrograms[numDances % i].split("");
      }
      else {
        seenPrograms.push(programs.join(""));
        programs = dance(programs, commands);
      }
    }
    
    return programs;
  };
  
  const programs = "abcdefghijklmnop".split("");
  const input = document.body.textContent.trim();
  const commands = parseInput(input);
  
  console.log("Part 1 Solution: " + dance(programs, commands).join("") + "\nPart 2 Solution: " + danceRepeatedly(1e9)(programs, commands).join(""));
})();