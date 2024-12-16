import { formatDuration } from "../FormatDuration";


describe('formatDuration', () => {
  test('formats duration correctly for whole minutes', () => {
    expect(formatDuration(60000)).toBe('1:00');
    expect(formatDuration(120000)).toBe('2:00');
  });

  test('formats duration correctly for minutes and seconds', () => {
    expect(formatDuration(65000)).toBe('1:05');
    expect(formatDuration(125000)).toBe('2:05');
  });

  test('formats duration correctly for seconds only', () => {
    expect(formatDuration(5000)).toBe('0:05');
    expect(formatDuration(15000)).toBe('0:15');
  });

  test('formats duration for zero milliseconds', () => {
    expect(formatDuration(0)).toBe('0:00');
  });
});
