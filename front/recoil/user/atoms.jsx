import { atom } from 'recoil';

export const DEFAULT_USERGAME = {
  appid: null,
  price: null,
  image: null,
  name: null,
};

export const userGame = atom({
  key: 'userGame',
  default: [],
});
