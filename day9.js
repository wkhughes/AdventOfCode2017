(() => {  
  const initalState = {
    score: 0,
    depth: 0,
    ignoreNext: false,
    inGarbage: false,
    numGarbageCharacters: 0
  };
  
  const getState = stream => stream.split("").reduce((state, character) => {
    const { score, depth, ignoreNext, inGarbage, numGarbageCharacters } = state;

    if (ignoreNext) {
      return { ...state, ignoreNext: false }
    }
    
    switch (character) {
      case "!":
        return { ...state, ignoreNext: true };
      case ">":
        return { ...state, inGarbage: false };
    }
    
    if (!inGarbage) {
      switch (character) {
        case "<":
          return { ...state, inGarbage: true };
        case "{":
          return { ...state, depth: depth + 1 };
        case "}":
          return { ...state, score: score + depth, depth: depth - 1 };
      }
    }
    
    if (inGarbage) {
      return { ...state, numGarbageCharacters: numGarbageCharacters + 1 }
    }
    
    return state;
  }, initalState);
  
  const getScore = stream => getState(stream).score;
  const getNumGarbageCharacters = stream => getState(stream).numGarbageCharacters;
  
  const stream = document.body.textContent.trim();
  
  console.log("Part 1 Solution: " + getScore(stream) + "\nPart 2 Solution: " + getNumGarbageCharacters(stream));
})();