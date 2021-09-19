function fibonacci(n) {
  if (n <= 0) return 0;
  if (n === 1) return 1;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

function wrongFibonacci(n) {
  if (n <= 0) return 0;
  if (n === 1) return 1;
  return fibonacci(n - 1) * 2;
}

exports.default = fibonacci
exports.wrongFibonacci = wrongFibonacci
