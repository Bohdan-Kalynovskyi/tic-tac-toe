export const formatNumber = (num: number): string => {
  const si = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  let i;
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break;
    }
  }
  return (num / si[i].value).toFixed(1).replace(rx, '$1') + si[i].symbol;
};

export const commafyNumber = value => String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const parseNumberWithCommas = value => Number(String(value).replace(',', ''));

export const sign = (val: number) => (val > 0 ? '+' : val < 0 ? '-' : '');
