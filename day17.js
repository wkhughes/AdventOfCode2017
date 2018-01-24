(() => {
  const insert = (buffer, position, value) => [...buffer.slice(0, position), value, ...buffer.slice(position)];
  const spin = (step, finalValue) => [...new Array(finalValue + 1).keys()].reduce(({ buffer, position }, value) => ({
    buffer: insert(buffer, position, value),
    position: (position + step + 1) % (buffer.length + 1)
  }), { buffer: [], position: 0 });
  const valueAfter = (buffer, value) => buffer[(buffer.indexOf(value) + 1) % buffer.length];
  
  const valueAfterZero = (step, finalValue) => {
    let length = 0;
    let position = 0;
    let afterZero = 0;
    
    for (let value = 0; value <= finalValue; value++) {
      if (position === 0) {
        afterZero = value;
      }
      
      length++;
      position = (position + step + 1) % length;
    }
    
    return afterZero;
  };
  
  console.log("Part 1 Solution: " + valueAfter(spin(301, 2017).buffer, 2017) + "\nPart 2 Solution: " + valueAfterZero(301, 50E6));
})();