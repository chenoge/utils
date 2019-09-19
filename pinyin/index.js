import PYMaps from './map';

/**
 * @description 获取汉字拼音或首字母
 * @param {String} str 待获取拼音的字符串,除汉字外其余字符会直接返回
 * @param {Boolean} extractFirst 只获取汉字拼音首字母
 * @returns {String} 目标的拼音字符串
 **/
export default (str, extractFirst = false) => {

    let result = '';
    let isCh;           // 单个字符是否是中文

    str.split('').forEach(char => {
        isCh = false;
        for (const key in PYMaps) {
            if (PYMaps[key].includes(char)) {
                const firstChar = key.substr(0, 1).toUpperCase();

                if (extractFirst === true) {
                    result += firstChar;
                } else {
                    result += firstChar + key.substr(1, key.length).toLowerCase();
                }

                isCh = true;
                break;
            }
        }

        // 不是中文或者在拼音map中没有找到的情况，直接添加
        if (!isCh) {
            result += char;
        }
    });

    return result;
}
