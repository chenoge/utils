/**
 * 格式化时间戳
 * @method formatStamp
 * @param {number} stamp 时间戳
 * @param {boolean} flag 是否返回时分秒
 * */
export const formatStamp = function (stamp, flag = false) {
  let date = new Date(stamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  if (flag) {
    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':');
  }
  return [year, month, day].map(formatNumber).join('-');
};

/**
 * 补全缺省的零
 * @method formatNumber
 * @param {number} n
 * */
const formatNumber = function (n) {
  n = n.toString();
  return n[1] ? n : '0' + n;
};


export default {
  formatStamp,
}
