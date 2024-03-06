import { ComponentWithStore } from 'mobx-miniprogram-bindings';
import throttle from '../../../../utils/throttle';
import { audioContext, playerStore } from '../../../../stores/player';

ComponentWithStore({
  storeBindings: {
    store: playerStore,
    fields: ['durationTime', 'currentTime'],
    actions: ['setCurrentTime']
  },

  data: {
    playTime: 0,
    playProgress: 0,
    sliderChanging: false
  },

  methods: {
    onPlayProgressChange(e) {
      const progress = e.detail.value;
      const currentTime = (progress / 100) * this.data.durationTime;
      this.setData({ playTime: currentTime });
      this.setCurrentTime(currentTime);
      audioContext.seek(currentTime / 1000);
      this.data.sliderChanging = false;
    },

    onPlayProgressChanging(e) {
      this.data.sliderChanging = true;
      // const progress = e.detail.value;
      // const currentTime = (progress / 100) * this.data.durationTime;
      // this.setCurrentTime(currentTime);
      // this.setData({ playTime: currentTime });
      // console.log(this.data.playTime);
  },

  observers: {
    currentTime: throttle(
      function (newVal) {
        if (this.data.sliderChanging) return;
        const progress = (newVal / this.data.durationTime) * 100;
        this.setData({ playProgress: progress, playTime: newVal });
      },
      500,
      { leading: false }
    )
  }
});
