class Request {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  request(config) {
    return new Promise((resolve, reject) => {
      wx.request({
        ...config,
        url: this.baseUrl + config.url,
        success: res => {
          resolve(res.data);
        },
        fail: reject
      });
    });
  }

  get(config) {
    return this.request({ ...config, method: 'GET' });
  }

  post(config) {
    return this.request({ ...config, method: 'POST' });
  }
}

export const request = new Request('http://codercba.com:9002');
