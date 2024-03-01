import { observable, action } from 'mobx-miniprogram';

export const songStore = observable({
  recommendSongs: [],

  get getRecommendSongs() {
    return this.recommendSongs;
  },

  setRecommendSongs: action(function (payload) {
    this.recommendSongs = payload;
  })
});
