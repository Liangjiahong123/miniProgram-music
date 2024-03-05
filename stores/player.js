import { observable, action } from 'mobx-miniprogram';
import { getSongDetailApi, getSongLyricApi } from '../api/music';

export const audioContext = wx.createInnerAudioContext();
export const MODE_NAMES = ['order', 'repeat', 'random'];
export const playerStore = observable({
  currentSong: {},
  currentTime: 0,
  durationTime: 0,
  playing: false,
  playModeIndex: 0, // 0: 顺序播放 1:单曲循环 2:随机播放

  fetchSongWithId: action(async function (id) {
    const { songs } = await getSongDetailApi(id);
    this.currentSong = songs[0] || {};
    this.durationTime = songs[0].dt || 0;
  }),

  playSong: action(function () {
    if (!this.currentSong.id) return;
    audioContext.stop();
    audioContext.src = createAudioSrc(this.currentSong.id);
    audioContext.autoplay = true;
    this.playing = true;
    this.bindAudioEvent();
  }),

  bindAudioEvent: action(function () {
    audioContext.onTimeUpdate(() => {
      this.currentTime = audioContext.currentTime * 1000;
    });

    audioContext.onCanplay(() => {
      if (!this.playing) return;
      audioContext.play();
    });

    audioContext.onWaiting(() => {
      audioContext.pause();
    });
  }),

  setCurrentTime: action(function (payload) {
    this.currentTime = payload;
  }),

  setPlayStatus: action(function () {
    if (audioContext.paused) {
      audioContext.play();
      this.playing = true;
    } else {
      audioContext.pause();
      this.playing = false;
    }
  }),

  setPlayModeIndex: action(function () {
    if (this.playModeIndex >= MODE_NAMES.length - 1) {
      this.playModeIndex = 0;
      return;
    }
    this.playModeIndex += 1;
  })
});

function createAudioSrc(id) {
  const url = `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
  return url;
}
