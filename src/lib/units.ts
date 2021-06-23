import { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import { formatUnits, parseUnits } from '@ethersproject/units';
import numeral from 'numeral';

export function parseToken(value: string): BigNumber {
  return parseUnits(value, 18);
}

export function formatToken(value: BigNumberish): string {
  return formatUnits(value, 18);
}

export function formatNumber(value: string | number): string {
  if (typeof value === 'string') {
    value = parseFloat(value);
  }
  return numeral(value).format('0.0a');
}
