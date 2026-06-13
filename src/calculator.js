/**
 * VUNA-Calc — pure logic engine (no DOM, no window references)
 * Custom feature: getPi() — returns the value of Pi (3.141592653589793)
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
 * Custom feature: returns the value of Pi.
 * Example: getPi() => 3.141592653589793
 */
function getPi() {
  return Math.PI;
}

// Export for Jest (Node environment only)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { evaluateExpression, getPi };
}