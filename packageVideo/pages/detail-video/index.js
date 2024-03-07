import { getVideoDetailApi, getVideoUrlApi, getVideoListApi } from '../../../api/video';
Page({
  data: {
    id: '',
    info: {},
    url: '',
    relatedVideos: []
  },

  onLoad(options) {
    this.data.id = options.id;

    this.fetchVideoUrl();
    this.fetchVideoDetail();
    this.fetchRelevantVideo();
  },

  async fetchVideoDetail() {
    const { data = {} } = await getVideoDetailApi(this.data.id);
    this.setData({ info: data });
  },

  async fetchVideoUrl() {
    const { data = {} } = await getVideoUrlApi(this.data.id);
    this.setData({ url: data.url });
  },

  async fetchRelevantVideo() {
    const { data = [] } = await getVideoListApi(10);
    this.setData({ relatedVideos: data });
  }
});
