export const imageDefaultWidth = 100;
export const imageDefaultHeight = 100;

export const scaleImage = (width: number = imageDefaultWidth, height: number = imageDefaultHeight) => {};

/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

const insertStr = (s: string, newSubStr) => {
  const start = s.length * Math.random();
  return s.slice(0, start) + newSubStr + s.slice(start);
};
