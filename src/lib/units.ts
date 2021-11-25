import { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import { formatUnits, parseUnits } from '@ethersproject/units';

export function parseToken(value: string): BigNumber {
  return parseUnits(value, 18);
}

export function formatToken(value: BigNumberish): string {
  return formatUnits(value, 18);
}
