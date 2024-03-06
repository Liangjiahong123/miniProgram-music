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
  return new Promise((resolve) => {
    const query = wx.createSelectorQuery();
    query.select('.banner-pic').boundingClientRect();
    query.exec((res) => {
      resolve(res);
    });
  });
}

export function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function isNotEmptyObj(obj) {
  return Object.keys(obj).length > 0;
}

export function parseLyrics(lyricStr) {
  const lyricLines = lyricStr.split('\n');
  const timeReg = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/;

  const lyricList = lyricLines.filter(Boolean).map((item, index) => {
    const timeRes = timeReg.exec(item);
    const m = timeRes[1] * 60 * 1000;
    const s = timeRes[2] * 1000;
    const ms = timeRes[3] * timeRes[3].length === 2 ? 10 : 1;
    const time = m + s + ms;
    const text = item.replace(timeReg, '');
    return { time, text, id: index + 1 };
  });

  const filterLyricList = lyricList.filter((item) => item.text);
  return filterLyricList;
}
