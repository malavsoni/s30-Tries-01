import { help } from "yargs";
import { Trie, TrieNode } from "./implement_trie";

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

function longestWord_with_trie_dfs(words: string[]): string {
  let result = "";
  let trie = new Trie();

  for (let index = 0; index < words.length; index++) {
    trie.insert(words[index]);
  }

  function helper(currentWord: string) {
    if (currentWord.length > result.length) {
      result = currentWord;
    }
    for (let index = 0; index < 26; index++) {
      let letterA = "a".charCodeAt(0);
      let charCode = letterA + index;
      let char = String.fromCharCode(charCode);
      if (trie.search(currentWord + char)) {
        helper(currentWord + char);
      }
    }
  }

  helper("");

  return result;
}

function longestWord_with_trie_bfs(words: string[]): string {
  let result = "";
  let trie = new Trie();

  for (let index = 0; index < words.length; index++) {
    trie.insert(words[index]);
  }

  let queue: TrieNode[] = [];
  let wordsQueue: string[] = [];
  queue.push(trie.root);
  wordsQueue.push("");
  while (queue.length != 0) {
    let current = queue.shift()!;
    let parentWord = wordsQueue.shift()!;
    for (let i = 25; i >= 0; i--) {
      if (current.children[i] != null && current.children[i].is_end) {
        queue.push(current.children[i]);
        let char = String.fromCharCode(i + "a".charCodeAt(0));
        wordsQueue.push(parentWord + char);
      }
    }
    result = parentWord;
  }

  return result;
}

// TC: n(log n) + o(n) +  2(nxl)
// SC: o(nxl)
function longestWord_with_trie(words: string[]): string {
  let result = "";
  let trie = new Trie();
  // n(log n)
  words.sort();

  for (let index = 0; index < words.length; index++) {
    // O(n)
    trie.insert(words[index]); // o(nxl)
  }

  for (let index = 0; index < words.length; index++) {
    // O(nxl)
    let word = words[index];

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

  it("Happy Path - With Trie And DFS", () => {
    expect(
      longestWord_with_trie_dfs([
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

  it("Happy Path - With Trie And BFS", () => {
    expect(
      longestWord_with_trie_bfs([
        "a",
        "banana",
        "b",
        "ba",
        "app",
        "appl",
        "ap",
        "apply",
        "apple",
      ])
    ).toStrictEqual("apple");
  });
});
