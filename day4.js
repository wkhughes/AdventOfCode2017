(() => {
  const input = document.body.textContent.trim();
  const passphrases = input.split("\n").map(passphrase => passphrase.split(" "));
  
  console.log("Part 1 Solution: " + part1Solution(passphrases) + "\nPart 2 Solution: " + part2Solution(passphrases));
})();

function part1Solution(passphrases) {
  return numValidPassphrases(passphrases, true);
}

function part2Solution(passphrases) {
  return numValidPassphrases(passphrases, false);
}

function numValidPassphrases(passphrases, anagramsAllowed) {
  return passphrases.map(passphrase => isValidPassphrase(passphrase, anagramsAllowed)).filter(isValid => isValid).length;
}

function isValidPassphrase(passphraseWords, anagramsAllowed) {
  const wordCounts = passphraseWords.reduce(
    (wordCounts, word) => {
      if (!anagramsAllowed) {
        word = word.split("").sort().join("");
      }
      
      wordCounts[word] = (wordCounts[word] || 0) + 1;
      return wordCounts;
    },
    {}
  );
  
  return Object.values(wordCounts).filter(count => count > 1).length === 0;
}