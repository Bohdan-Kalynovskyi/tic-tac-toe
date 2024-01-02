export const toCamelCase = (s: string) =>
  s ? s.replace(/([_][a-z])/gi, $1 => $1.toUpperCase().replace('_', '')) : '';

export const insertIfNotAtPos = (pos: number, char: string[1], str: string): string => {
  if (str.length > pos && str[pos] !== char) {
    return str.substring(0, pos) + char + str.substring(pos);
  }
  return str;
};

export const up = (str: string): string => str[0].toUpperCase() + str.substring(1);

export const last = str => {
  const spacePos = str.lastIndexOf(' ');
  return spacePos === -1 ? str : str.slice(spacePos + 1);
};

export const capitalize = (str: string): string => str.split(' ').map(up).join(' ');

export const displayDate = (s: string) => s.split('-').slice(1).reverse().join('.');
