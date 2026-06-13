/**
 * VUNA-Calc — pure logic engine (no DOM, no window references)
 * Custom feature: factorial(n) — calculates n! (e.g. 5! = 120)
 */

function evaluateExpression(expr) {
  if (!/^[0-9+\-*/.() ]+$/.test(expr)) {
    throw new Error('Invalid characters in expression');
  }

  // Detect explicit division by zero before eval
  if (/\/\s*0(?!\d)/.test(expr)) {
    throw new Error('Division by zero');
  }

  const result = Function('"use strict"; return (' + expr + ')')();

  if (!isFinite(result)) {
    throw new Error('Division by zero');
  }

  return result;
}

/**
 * Custom feature: calculates factorial of n.
 * Example: factorial(5) => 120, factorial(0) => 1
 */
function factorial(n) {
  if (n < 0) {
    throw new Error('Factorial of negative number');
  }
  if (!Number.isInteger(n)) {
    throw new Error('Factorial requires a whole number');
  }
  if (n > 170) {
    throw new Error('Number too large');
  }
  if (n === 0 || n === 1) { return 1; }
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

// Export for Jest (Node environment only)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { evaluateExpression, factorial };
}