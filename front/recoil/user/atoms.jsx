import { atom } from 'recoil';

export const DEFAULT_USERGAME = {
  appid: null,
  price: null,
  image: null,
  name: null,
};

export const DEFAULT_USERGAMECOUNT = {
  isFive: null,
}

export const userGame = atom({
  key: 'userGame',
  default: [],
});

export const userGameCount = atom({
  key: 'userGameCount',
  default: null,
})