const { evaluateExpression, factorial } = require('../src/calculator');

describe('arithmetic', () => {
  it('adds', () => expect(evaluateExpression('2+3')).toBe(5));
  it('subtracts', () => expect(evaluateExpression('10-4')).toBe(6));
  it('multiplies', () => expect(evaluateExpression('3*4')).toBe(12));
  it('divides', () => expect(evaluateExpression('10/2')).toBe(5));
  it('precedence', () => expect(evaluateExpression('2+3*4')).toBe(14));
  it('throws on division by zero',
    () => expect(() => evaluateExpression('5/0')).toThrow());
  it('throws on invalid chars',
    () => expect(() => evaluateExpression('2&3')).toThrow());
});

describe('factorial (custom feature)', () => {
  it('0! is 1',  () => expect(factorial(0)).toBe(1));
  it('1! is 1',  () => expect(factorial(1)).toBe(1));
  it('5! is 120', () => expect(factorial(5)).toBe(120));
  it('10! is 3628800', () => expect(factorial(10)).toBe(3628800));
  it('throws on negative', () => expect(() => factorial(-1)).toThrow());
  it('throws on decimal', () => expect(() => factorial(2.5)).toThrow());
  it('throws on too large', () => expect(() => factorial(171)).toThrow());
});