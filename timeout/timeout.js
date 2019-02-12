/**
 * 防抖动
 * @method debounce
 * @param {function} callback 回调函数
 * @param {number} delay 时间间隔
 * */
export const debounce = function (callback, delay) {
  let timer = null;
  return function () {
    let context = this;
    let args = arguments;

    clearTimeout(timer);

    timer = setTimeout(function () {
      callback.apply(context, args);
    }, delay);
  }
};


/**
 * 节流
 * @method throttle
 * @param {function} callback 回调函数
 * @param {number} delay 时间间隔
 * */
export const throttle = function (callback, delay) {
  let prev = Date.now();
  return function () {
    let context = this;
    let args = arguments;
    let now = Date.now();
    if (now - prev >= delay) {
      callback.apply(context, args);
      prev = Date.now();
    }
  }
};


export default {
  debounce,
  throttle,
}
