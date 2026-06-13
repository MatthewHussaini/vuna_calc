const { evaluateExpression, getPi } = require('../src/calculator');

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

describe('getPi (custom feature)', () => {
  it('returns pi', () => expect(getPi()).toBe(Math.PI));
  it('pi starts with 3.14', () => expect(getPi().toString().startsWith('3.14')).toBe(true));
  it('pi is a number', () => expect(typeof getPi()).toBe('number'));
});