import { observable, action } from 'mobx-miniprogram';
import { getRecommendSongApi } from '../api/music';
import { getRandomNum } from '../utils/helpers';

const rankingIdsMap = {
  newRankSongs: 3779629,
  originRankSongs: 2884035,
  soarRankSongs: 19723756,
  recommendRankSongs: 3778678
};

export const songStore = observable({
  recommendRankSongs: {},
  newRankSongs: {},
  originRankSongs: {},
  soarRankSongs: {},

  get getAllRecommendSongs() {
    return this.recommendRankSongs.tracks || [];
  },

  get getPeakRankData() {
    return {
      newRanks: this.newRankSongs,
      originRanks: this.originRankSongs,
      soarRanks: this.soarRankSongs
    };
  },

  get getRandomRecSongs() {
    const recLength = this.recommendRankSongs?.tracks?.length || 0;
    if (recLength <= 0) return [];
    const random = getRandomNum(6, recLength);
    const recommendSongs = this.recommendRankSongs.tracks.slice(random - 6, random);
    return recommendSongs;
  },

  fetchRankSongs: action(function () {
    for (const key in rankingIdsMap) {
      const songId = rankingIdsMap[key];
      getRecommendSongApi(songId).then(res => {
        this[key] = res.playlist;
      });
    }
  })
});
