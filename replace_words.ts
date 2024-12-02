import { Trie } from "./implement_trie";

function replaceWords(dictionary: string[], sentence: string): string {
  let trie = new Trie();
  for (let index = 0; index < dictionary.length; index++) {
    trie.insert(dictionary[index]);
  }

  let words: string[] = sentence.split(" ");

  let result = "";
  for (let index = 0; index < words.length; index++) {
    if (index != 0) result += " ";
    let replacement = getShortedWord(words[index], trie);
    result += replacement;
  }
  return result;
}

function getShortedWord(word: string, trie: Trie): string {
  let current = trie.root;
  let strBuilder = "";
  for (let i = 0; i < word.length; i++) {
    let charCode = word.charCodeAt(i);
    let index = charCode - "a".charCodeAt(0);
    if (current.children[index] == null) {
      return word;
    }
    strBuilder += word.charAt(i);
    current = current.children[index];
    if (current.is_end) {
      return strBuilder;
    }
  }
  return word;
}

describe("Word Replacement", () => {
  it("Happy Path", () => {
    expect(
      replaceWords(
        ["cat", "bat", "rat"],
        "the cattle was rattled by the battery"
      )
    ).toStrictEqual("the cat was rat by the bat");
  });
});
