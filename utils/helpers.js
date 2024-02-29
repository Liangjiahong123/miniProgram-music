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
