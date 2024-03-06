import { storeBindingsBehavior } from 'mobx-miniprogram-bindings';
import { playerStore, MODE_NAMES, audioContext } from '../../../../stores/player';
import throttle from '../../../../utils/throttle';

Component({
  behaviors: [storeBindingsBehavior],
  storeBindings: {
    store: playerStore,
    fields: ['currentSong', 'currentTime', 'durationTime', 'playing', 'playModeIndex','currentLyric'],
    actions: ['playSong', 'setPlayStatus', 'setPlayModeIndex', 'setCurrentTime']
  },

  data: {
    playMode: 'order',
    playProgress: 0,
    sliderChanging: false,
    playTime: 0
  },

  methods: {
    handleTogglePlayMode() {
      this.setPlayModeIndex();
    },

    handleToggleSong(e) {},

    handleTogglePlayStatus() {
      this.setPlayStatus();
    },

    onPlayProgressChange(e) {
      const progress = e.detail.value;
      const currentTime = (progress / 100) * this.data.durationTime;
      this.setData({ playTime: currentTime, sliderChanging: false });
      this.setCurrentTime(currentTime);
      audioContext.seek(currentTime / 1000);
    },

    onPlayProgressChanging(e) {
      const progress = e.detail.value;
      const currentTime = (progress / 100) * this.data.durationTime;
      this.setData({ playTime: currentTime, sliderChanging: true });
      this.setCurrentTime(currentTime);
    }
  },

  observers: {
    currentSong(newVal) {
      if (!newVal.id) return;
      this.playSong();
    },
    playModeIndex(newVal) {
      if (newVal == undefined || newVal == null) return;
      this.setData({ playMode: MODE_NAMES[newVal] });
    },
    currentTime: throttle(
      function (newVal) {
        if (this.data.sliderChanging) return;
        const progress = (newVal / this.data.durationTime) * 100;
        this.setData({ playProgress: progress, playTime: newVal });
      },
      500,
      { leading: false, trailing: false }
    )
  }
});
