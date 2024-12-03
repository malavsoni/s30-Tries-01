import { Trie } from "./implement_trie";

function longestWord(words: string[]): string {
  let result = "";
  words.sort();

  let set = new Set<string>();
  for (let index = 0; index < words.length; index++) {
    let slice = words[index].slice(0, words[index].length - 1);
    if (words[index].length == 1 || set.has(slice)) {
      if (words[index].length > result.length) result = words[index];
      set.add(words[index]);
    }
  }

  return result;
}

function longestWord_with_trie(words: string[]): string {
  let result = "";

  // n(log n)
  words.sort();

  let trie = new Trie();

  for (let index = 0; index < words.length; index++) { // O(nxl)
    let word = words[index];
    trie.insert(word); // o(nxl)
    let current = trie.root;
    let count = 0;
    for (let i = 0; i < word.length; i++) {
      let wordIndex = word.charCodeAt(i) - "a".charCodeAt(0);
      if (
        current.children[wordIndex] != null &&
        current.children[wordIndex].is_end == true
      ) {
        current = current.children[wordIndex];
        count++;
      } else {
        break;
      }
    }
    if (count == word.length && count > result.length) {
      result = word;
    }
  }

  return result;
}

describe("Longest Word", () => {
  it("Happy Path", () => {
    expect(
      longestWord(["a", "banana", "app", "appl", "ap", "apply", "apple"])
    ).toStrictEqual("apple");
  });

  it("Happy Path - With Trie", () => {
    expect(
      longestWord_with_trie([
        "a",
        "banana",
        "app",
        "appl",
        "ap",
        "apply",
        "apple",
      ])
    ).toStrictEqual("apple");
  });
});
