/**
 * Created by RaoulChou on 2017/3/11.
 */
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    };
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + '';
        fmt = fmt.replace(RegExp.$1, (RegExp.$1) ? str : padLeftZero(str));
      }
    }
  }
  return fmt;
}
function padLeftZero(str) {
  // 技巧:在str前边补0,使之成为两位数
  return ('00' + str).substr(str.length);
}
