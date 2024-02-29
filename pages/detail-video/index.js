import { getVideoDetail, getVideoUrl } from '../../api/video';
Page({
  data: {
    info: {},
    url: ''
  },

  onLoad(options) {
    const videoId = options.id;
    this.fetchVideoDetail(videoId);
    this.fetchVideoUrl(videoId);
  },

  async fetchVideoDetail(id) {
    const { data = {} } = await getVideoDetail(id);
    this.setData({ info: data });
  },

  async fetchVideoUrl(id, r) {
    const { data = {} } = await getVideoUrl(id, r);
    this.setData({ url: data.url });
  }
});
