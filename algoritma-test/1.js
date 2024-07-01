function reverseString(input) {
  let letters = input.match(/[a-zA-Z]/g);
  let numbers = input.match(/\d/g);

  if (letters) {
    letters.reverse();
  }

  let reversed = letters ? letters.join("") : "";
  if (numbers) {
    reversed += numbers.join("");
  }

  return reversed;
}

console.log(reverseString("NEGIE1"));
console.log(reverseString("GNALAM99"));
