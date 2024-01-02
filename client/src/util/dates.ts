import moment, { Moment } from 'moment';

export const getDayStart3 = (mom = moment()): Moment => {
  const start = mom.clone();
  start.set('hour', 3).startOf('hour');
  return start;
};

const midnight4amMs = moment().endOf('day').add(1, 'day').hour(4).valueOf();
export const msTo4am = midnight4amMs - Date.now();
