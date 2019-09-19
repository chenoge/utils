/**
 * 基本数据类型检测
 * */
export const isNull = function (variable) {
    return variable === null;
};


export const isUndefined = function (variable) {
    return typeof variable === 'undefined';
};


export const isNaN = function (variable) {
    return Number.isNaN(variable);
};


export const isNumber = function (variable) {
    return Number.isFinite(variable);
};


export const isString = function (variable) {
    return typeof variable === 'string';
};


export const isBoolean = function (variable) {
    return typeof variable === 'boolean';
};


export const isFunction = function (variable) {
    return typeof variable === 'function';
};


export const isArray = function (variable) {
    return Array.isArray(variable);
};


export const isObject = function (variable) {
    return typeof variable === 'object' && !isArray(variable) && !isNull(variable);
};


/**
 * 应用数据类型检测
 * */
export const isChinese = function (variable) {
    return /^[\u4e00-\u9FA5]+$/.test(variable);
};


export const isPhone = function (variable) {
    return /^\d{11}$/.test(variable);
};


export const isEmail = function (variable) {
    return /^\w+([-_.]\w+)*@(\w+([-]\w+)*)(\.\w+([-]\w+)*)+$/.test(variable);
};


/**
 * https://www.cnblogs.com/lzrabbit/archive/2011/10/23/2221643.html
 * 身份证号码有15位和18位两种，15位的身份证号码没有校验位以及年份只有两位数
 * 排列顺序从左至右依次为：六位数字地址码，八位数字出生日期码，三位数字顺序码和一位数字校验码
 *
 *
 * 地址码表示编码对象常住户口所在县(市、旗、区)的行政区划代码
 * 出生日期码表示编码对象出生的年、月、日
 * 顺序码表示同一地址码所标识的区域范围内，顺序码的奇数分给男性，偶数分给女性
 * 校验码是根据前面十七位数字码，按照ISO 7064:1983.MOD 11-2校验码计算出来的检验码
 *
 *
 * 出生日期1800-2099  (18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])
 * 身份证正则表达式 /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i
 * 15位校验规则 6位地址编码+6位出生日期+3位顺序号
 * 18位校验规则 6位地址编码+8位出生日期+3位顺序号+1位校验位
 *
 *
 *
 *  校验位规则     公式:∑(ai×Wi)(mod 11)……………………………………(1)
 *  公式(1)中：
 *  i----表示号码字符从由至左包括校验码在内的位置序号；
 *  ai----表示第i位置上的号码字符值；
 *  Wi----示第i位置上的加权因子，其数值依据公式Wi=2^(n-1）(mod 11)计算得出。
 *  i 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1
 *  Wi 7 9 10 5 8 4 2 1 6 3 7 9 10 5 8 4 2 1
 *
 * */
export const isIDCard = function (variable) {
    let flag = /^\d{6}(18|19|2\d)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)?$/.test(variable);
    if (flag) {
        let code = variable.split('');
        let factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        var parity = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
        if (code.length === 18) {
            let sum = 0;
            for (let i = 0; i < 17; i++) {
                sum += code[i] * factor[i];
            }
            flag = parity[sum % 11] === code[17];
        }
    }
    return flag;
};


export const isEquals = function (x, y) {

    let in1 = x instanceof Object;
    let in2 = y instanceof Object;
    if (!in1 || !in2) {
        return x === y;
    }
    if (Object.keys(x).length !== Object.keys(y).length) {
        return false;
    }
    for (let p in x) {
        let a = x[p] instanceof Object;
        let b = y[p] instanceof Object;
        if (a && b) {
            if (!isEquals(x[p], y[p])) {
                return false;
            }
        }
        else if (x[p] !== y[p]) {
            return false;
        }
    }
    return true;
};


export default {
    isNull,
    isUndefined,
    isNaN,
    isNumber,
    isString,
    isBoolean,
    isFunction,
    isArray,
    isObject,
    isChinese,
    isPhone,
    isEmail,
    isIDCard,
    isEquals,
}
