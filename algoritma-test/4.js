function diagonal(matrix) {
  let firstDiagonal = 0;
  let secondDiagonal = 0;

  for (let i = 0; i < matrix.length; i++) {
    firstDiagonal += matrix[i][i];
    secondDiagonal += matrix[i][matrix.length - 1 - i];
  }

  return Math.abs(firstDiagonal - secondDiagonal);
}

console.log(
  diagonal([
    [1, 2, 0],
    [4, 5, 6],
    [7, 8, 9],
  ])
);

console.log(
  diagonal([
    [1, 9, 6, 4, 7],
    [4, 3, 2, 1, 5],
    [3, 2, 1, 0, 9],
    [1, 2, 3, 4, 5],
    [1, 3, 5, 7, 9],
  ])
);
