import { Moment } from 'moment';

export type IMap = { [key: string]: any };
export type IStringNumberMap = { [key: string]: string | number };
export type IStringMap = { [key: string]: string };
export type INumberMap = { [key: string]: number };
export type IBoolMap = { [key: string]: boolean };

export enum DbAction {
  Checkin,
  Checkout,
  TopUp,
  MealDays,
  StayDays,
  Buy,
  Meal,
  UserUpdate,
  Cancelled,
  Any = -1,
}

// @ compatibility

export const DbActionLabel = {
  [DbAction.Checkin]: 'Check In',
  [DbAction.Checkout]: 'Check Out',
  [DbAction.TopUp]: 'Top Up',
  [DbAction.MealDays]: 'Meal Days',
  [DbAction.StayDays]: 'Stay Days',
  [DbAction.Buy]: 'Buy',
  [DbAction.Meal]: 'Meal',
  [DbAction.UserUpdate]: 'User Update',
  [DbAction.Cancelled]: 'Cancelled',
  [DbAction.Any]: 'All',
};

// todo hidden stay types
export enum StayType {
  Tent = 1,
  YurtHostel = 2,
  Yurt2 = 3,
  Yurt3 = 4,
  YurtFull = 5,
  Komnata1 = 6,
  Komnata2 = 7,
  Komnata3 = 8,
  Komnata4 = 9,
  Dom = 10,
  Kovcheg = 11,
}

export const StayLabel = {
  [StayType.Tent]: 'Палатка',
  [StayType.YurtHostel]: 'Юрта-хостел',
  [StayType.Yurt2]: 'Юрта на двоих',
  [StayType.Yurt3]: 'Юрта на троих',
  [StayType.YurtFull]: 'Целая юрта',
  [StayType.Komnata1]: 'Комната 1',
  [StayType.Komnata2]: 'Комната 2',
  [StayType.Komnata3]: 'Комната 3',
  [StayType.Komnata4]: 'Комната 4',
  [StayType.Dom]: 'Дом',
  [StayType.Kovcheg]: 'Ковчег',
};

export const StayPrice = {
  [StayType.Tent]: 130,
  [StayType.YurtHostel]: 180,
  [StayType.Yurt2]: 225,
  [StayType.Yurt3]: 200,
  [StayType.YurtFull]: 450,
  [StayType.Komnata1]: 550,
  [StayType.Komnata2]: 600,
  [StayType.Komnata3]: 650,
  [StayType.Komnata4]: 700,
  [StayType.Dom]: 800,
  [StayType.Kovcheg]: 1500,
};

export enum Role {
  Guest,
  Volunteer,
  SuperAdmin,
}

export const UserRoleLabel = {
  [Role.Guest]: 'Guest',
  [Role.Volunteer]: 'Volunteer',
  [Role.SuperAdmin]: 'SuperAdmin',
};

export type IOptRange = null | [Moment, Moment];
export type IRange = [Moment, Moment];
