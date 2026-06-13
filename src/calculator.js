/**
 * VUNA-Calc — pure logic engine (no DOM, no window references)
 * Custom feature: percentOf(value, total) — calculates what percentage value is of total
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
 * Custom feature: calculates what percentage `value` is of `total`.
 * Example: percentOf(25, 200) => 12.5  (25 is 12.5% of 200)
 */
function percentOf(value, total) {
  if (total === 0) {
    throw new Error('Total cannot be zero');
  }
  return (value / total) * 100;
}

// Export for Jest (Node environment only)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { evaluateExpression, percentOf };
}
