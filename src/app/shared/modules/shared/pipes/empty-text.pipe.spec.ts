import { EmptyTextPipe } from './empty-text.pipe';

describe('EmptyTextPipe', () => {
  const pipe = new EmptyTextPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms "abc" to "abc"', () => {
    expect(pipe.transform('abc')).toBe('abc');
  });

  it('transforms null to "unknown"', () => {
    expect(pipe.transform(null, 'unknown')).toBe('unknown');
  });

  it('transforms undefined to "unknown"', () => {
    expect(pipe.transform(undefined, 'unknown')).toBe('unknown');
  });

  it('transforms "" to "unknown"', () => {
    expect(pipe.transform('', 'unknown')).toBe('unknown');
  });
});
