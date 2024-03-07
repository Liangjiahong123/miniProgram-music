import { observable, action } from 'mobx-miniprogram';
import { getSongDetailApi, getSongLyricApi } from '../api/music';
import { parseLyrics } from '../utils/helpers';

export const audioContext = wx.createInnerAudioContext();
export const MODE_NAMES = ['order', 'repeat', 'random'];

export const playerStore = observable({
  currentSong: {},
  currentTime: 0,
  durationTime: 0,
  lyricData: [],
  playSongList: [],
  playSongIndex: 0,
  firstPlay: true,
  currentLyric: { text: '', index: -1 },
  playing: false,
  playModeIndex: 0, // 0: 顺序播放 1:单曲循环 2:随机播放

  fetchSongWithId: action(async function (id) {
    const { songs } = await getSongDetailApi(id);
    this.currentSong = songs[0] || {};
    this.durationTime = songs[0].dt || 0;
    this.playSong(id);
  }),

  fetchSongLyric: action(async function (id) {
    const { lrc } = await getSongLyricApi(id);
    const lyricData = parseLyrics(lrc.lyric) || [];
    this.lyricData = lyricData;
  }),

  playSong: action(function (id) {
    audioContext.stop();
    audioContext.src = createAudioSrc(id);
    audioContext.autoplay = true;
    this.playing = true;

    if (this.firstPlay) {
      this.firstPlay = false;
      this.bindAudioEvent();
    }
  }),

  matchLyric: action(function () {
    if (!this.lyricData.length) return;
    let index = this.lyricData.length - 1;
    for (let i = 0; i < this.lyricData.length; i++) {
      const lyric = this.lyricData[i];
      if (lyric.time > audioContext.currentTime * 1000) {
        index = i - 1;
        break;
      }
    }
    if (index === this.currentLyric.index || index === -1) return;
    const playLyric = this.lyricData[index];
    this.currentLyric = { text: playLyric.text, index };
  }),

  bindAudioEvent: action(function () {
    audioContext.onTimeUpdate(() => {
      this.currentTime = audioContext.currentTime * 1000;
      this.matchLyric();
    });

    audioContext.onCanplay(() => {
      if (!this.playing) return;
      audioContext.play();
    });

    audioContext.onWaiting(() => {
      audioContext.pause();
    });

    audioContext.onEnded(() => {
      this.changeCurrentSong('next');
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
  }),

  setPlaySongList: action(function (payload) {
    this.playSongList = payload;
  }),

  setPlaySongIndex: action(function (payload) {
    this.playSongIndex = payload;
  }),

  changeCurrentSong: action(function (payload) {
    let index = this.playSongIndex,
      length = this.playSongList.length;

    switch (this.playModeIndex) {
      case 0:
        index += payload === 'prev' ? -1 : 1;
        if (index === -1) index = length - 1;
        if (index === length) index = 0;
        break;
      case 1:
        break;
      case 2:
        index = Math.floor(Math.random() * length);
        break;
    }

    this.clearStore();
    const currentSongId = this.playSongList[index].id;
    this.playSongIndex = index;
    this.fetchSongWithId(currentSongId);
    this.fetchSongLyric(currentSongId);
  }),

  clearStore: action(function () {
    this.currentSong = {};
    this.currentTime = 0;
    this.durationTime = 0;
    this.playing = false;
    this.currentLyric = { text: '', index: -1 };
    this.lyricData = [];
  })
});

function createAudioSrc(id) {
  const url = `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
  return url;
}
