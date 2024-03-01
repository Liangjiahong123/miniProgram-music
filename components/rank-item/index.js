import { getRandomNum } from '../../utils/helpers';

Component({
  properties: {
    rankItem: { type: Object, value: {} },
    key: { type: String, value: 'newRankSongs' }
  },

  data: {
    songs: []
  },

  lifetimes: {
    attached() {
      if (!this.properties.rankItem.tracks) return;
      const ramdon = getRandomNum(3, this.properties.rankItem.tracks.length || 10);
      const songs = this.properties.rankItem.tracks.slice(ramdon - 3, ramdon) || [];
      this.setData({ songs });
    }
  },

  methods: {
    handleTapRankItem() {
      wx.navigateTo({
        url: `/pages/detail-song/index?type=${this.properties.key}`
      });
    }
  }
});
