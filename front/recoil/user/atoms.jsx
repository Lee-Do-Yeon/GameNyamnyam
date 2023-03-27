import { atom } from 'recoil';

export const DEFAULT_USERGAME = {
  id: null,
  name: null,
  price: null,
};

export const userGame = atom({
  key: 'userGame',
  default: [],
});
