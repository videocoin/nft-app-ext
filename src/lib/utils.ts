export function toFixedNoRound(value: string, digits: number): string {
  if (digits < 1) return value;
  let s = '';
  for (let i = 0; i < digits; i++) s += '0';
  const x = (value + '.').split('.');
  return x[0] + '.' + (x[1] + s).substr(0, digits);
}
