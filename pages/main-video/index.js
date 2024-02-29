// pages/video/index.js
import { getVideoListApi } from '../../api/video';

Page({
  data: {
    offest: 0,
    hasMore: false,
    videoList: []
  },

  onLoad() {
    this.fetchVideoList();
  },

  onReachBottom() {
    if (!this.data.hasMore) return;
    this.fetchVideoList();
  },

  // 获取视频列表
  async fetchVideoList() {
    const { data = [], hasMore } = await getVideoListApi(20, this.data.offest);
    const newList = [...this.data.videoList, ...data];
    this.setData({ videoList: newList });
    this.data.offest = this.data.videoList.length;
    this.data.hasMore = hasMore;
  }
});
