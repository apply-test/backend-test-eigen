function sameWordAmount(input, query) {
  let result = [];

  for (let i = 0; i < query.length; i++) {
    let count = 0;

    for (let j = 0; j < input.length; j++) {
      if (query[i] === input[j]) {
        count++;
      }
    }

    result.push(count);
  }

  return result;
}

let input = ["dog", "cat", "dog", "bird", "dog", "rabbit", "cat"];
let query = ["dog", "gg", "cat"];

console.log(sameWordAmount(input, query));

input = ["xc", "dz", "bbb", "dz"];
query = ["bbb", "ac", "dz"];

console.log(sameWordAmount(input, query));
