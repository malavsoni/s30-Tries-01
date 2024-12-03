export class TrieNode {
  children: TrieNode[];
  is_end: boolean;

  constructor() {
    this.children = Array.from({ length: 26 });
    this.is_end = false;
  }
}

export class Trie {
  root: TrieNode;
  charCodeOfA = "a".charCodeAt(0);
  constructor() {
    this.root = new TrieNode();
  }

  insert(word: string): void {
    // O(l)
    let current = this.root;
    for (let index = 0; index < word.length; index++) {
      let charCode = word.charCodeAt(index);
      if (current.children[charCode - this.charCodeOfA] == null) {
        current.children[charCode - this.charCodeOfA] = new TrieNode();
      }
      current = current.children[charCode - this.charCodeOfA];
    }
    current.is_end = true;
  }

  // TC: O(nxl):
  // SC: O(nxl):
  // N = number of words
  // L = max length of the word
  search(word: string): boolean {
    // O(l)
    let current = this.root;
    for (let index = 0; index < word.length; index++) {
      if (current.children[word.charCodeAt(index) - this.charCodeOfA] == null)
        return false;
      current = current.children[word.charCodeAt(index) - this.charCodeOfA];
    }
    return current.is_end;
  }

  startsWith(prefix: string): boolean {
    // O(l)
    let current = this.root;
    for (let index = 0; index < prefix.length; index++) {
      if (current.children[prefix.charCodeAt(index) - this.charCodeOfA] == null)
        return false;
      current = current.children[prefix.charCodeAt(index) - this.charCodeOfA];
    }
    return true;
  }
}

describe("Trie Implementation", () => {
  it("Happy Path", () => {
    let trie = new Trie();
    let dictionary: string[] = ["apple", "apple", "app", "app", "app", "app"];
    for (let index = 0; index < dictionary.length; index++) {
      trie.insert(dictionary[index]);
    }
    expect(trie.search("apple")).toStrictEqual(true);
    expect(trie.startsWith("app")).toStrictEqual(true);
    expect(trie.startsWith("b")).toStrictEqual(false);
  });
});
