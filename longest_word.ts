import { Trie } from "./implement_trie";

function longestWord(words: string[]): string {
  let result = "";
  let trie = new Trie();
  for (let index = 0; index < words.length; index++) {
    trie.insert(words[index]);
  }

  return result;
}

describe("Longest Word", () => {
  it("Happy Path", () => {
    expect(
      longestWord(["a", "banana", "app", "appl", "ap", "apply", "apple"])
    ).toStrictEqual("apple");
  });
});
