// pages/music-player/components/song-view/index.js
Component({
  properties: {
    songData: { type: Object, value: {} }
  },
  data: {
    currentTime: 0,
    durationTime: 400000,
    sliderValue: 0,
    playMode: 'random',
    inPlaying: false
  },

  methods: {
    handleTogglePlayMode() {},

    handleToggleSong(e) {},

    handleTogglePlayStatus() {
      this.setData({ inPlaying: !this.data.inPlaying });
    }
  }
});
