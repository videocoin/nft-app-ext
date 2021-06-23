const cutString = (
  val: string | null | undefined = '',
  start: number,
  end: number
): string => {
  if (!val) return '';
  return [val.slice(0, start), '...', val.slice(-end)].join('');
};

export default cutString;
