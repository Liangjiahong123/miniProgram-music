export function getTerminalType() {
  const sysInfo = wx.getSystemInfoSync();
  const model = sysInfo.model;

  return model.includes('iPhone')
    ? 'ios'
    : model.includes('Window')
    ? 'pc'
    : model.includes('iPad')
    ? 'ipad'
    : 'android';
}

export function querySelector(selector) {
  return new Promise(resolve => {
    const query = wx.createSelectorQuery();
    query.select('.banner-pic').boundingClientRect();
    query.exec(res => {
      resolve(res);
    });
  });
}

export function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
