const publicRoot = process.env.PUBLIC_URL + '/sounds/';

const DAILY_MEAL = `${publicRoot}dailyMeal/`;
const DAILY_MEAL_COUNT = 40;

const SINGLE_MEAL = `${publicRoot}singleMeal/`;
const FAIL = `${publicRoot}fail/`;

const ALERT = `${publicRoot}alert/`;
const ALERT_COUNT = 5;

const play = (file: string, volume: number = 1) => {
  setTimeout(() => audio.pause(), 4000);
  const audio = new Audio(file);
  audio.volume = volume;
  audio.play();
};

export const playDailyMeal = () => {
  const rand = Math.floor(Math.random() * DAILY_MEAL_COUNT);
  const file = `${DAILY_MEAL}${rand}.mp3`;
  play(file, 0.5);
};

export const playAlert = (n: number = 1) => {
  const file = `${ALERT}${n}.mp3`;
  play(file);
};

export const playDing = () => playAlert(3);

export const playSingleMeal = () => play(`${SINGLE_MEAL}0.mp3`);

export const playFailure = () => play(`${FAIL}0.mp3`, 0.2);
