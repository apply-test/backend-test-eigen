function longestWord(string) {
  let word;
  let amount = 0;

  let words = string.split(" ");

  for (let i = 0; i < words.length; i++) {
    if (words[i].length > amount) {
      amount = words[i].length;
      word = words[i];
    }
  }

  return `${word} = ${amount}`;
}

console.log(longestWord("Saya sangat senang mengerjakan soal algoritma"));
console.log(longestWord("Aku sedang belajar bahasa inggris"));
