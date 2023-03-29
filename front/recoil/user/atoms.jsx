import { atom } from 'recoil';

export const DEFAULT_USERGAME = {
  index: null,
  appid: null,
  price: null,
  about_the_game: null,
  categories: null,
  developers: null,
  genres: null,
  image: null,
  metacritic: null,
  name: null,
  recommendations: null,
  release_date: null,
  screenshots: null,
  short_description: null,
};

export const userGame = atom({
  key: 'userGame',
  default: [],
});
