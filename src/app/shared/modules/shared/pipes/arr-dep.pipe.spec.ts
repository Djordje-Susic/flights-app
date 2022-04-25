import { ArrDepPipe } from './arr-dep.pipe';
const pipe = new ArrDepPipe();

describe('ArrDepPipe', () => {
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms "A" to "Arrival"', () => {
    expect(pipe.transform('A')).toBe('Arrival');
  });

  it('transforms "D" to "Departure"', () => {
    expect(pipe.transform('D')).toBe('Departure');
  });

  it('dont transform "a" to "Arrival"', () => {
    expect(pipe.transform('a')).toBe('a');
  });

  it('dont transform "d" to "Departure"', () => {
    expect(pipe.transform('d')).toBe('d');
  });

  it('dont transform "abc" to "Departure"', () => {
    expect(pipe.transform('abc')).toBe('abc');
  });
});
