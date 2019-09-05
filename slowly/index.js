/**
 *
 * @param t 当前执行时间
 * @param b 开始值
 * @param c 变化量
 * @param d 时间间隔
 */
function easeInOutQuad(t, b, c, d) {
    // 前半段时间
    if (t < d / 2) {
        // 改变量和时间都除以2
        return easeInQuad(t, b, c / 2, d / 2);
    }

    // 注意时间要减去前半段时间
    let t1 = t - d / 2;

    // 初始量要加上前半段已经完成的
    let b1 = b + c / 2;

    // 改变量和时间都除以2
    return easeOutQuad(t1, b1, c / 2, d / 2);
}

function easeOutQuad(t, b, c, d) {
    // x值
    let x = t / d;

    // y值
    let y = -x * x + 2 * x;

    // 套入最初的公式
    return b + c * y;
}

function easeInQuad(t, b, c, d) {
    let x = t / d;
    let y = x * x;
    return b + c * y;
}

/**
 *
 * @param begin 开始值
 * @param change 变化范围
 * @param callback 回调函数
 * @param duration 从 begin 到 begin + change 执行时间
 */
function slowly(begin, change, callback, duration = 500) {
    let fps = 16.7;
    let i = 0;
    let interval = setInterval(() => {
        const next = Math.floor(easeInOutQuad(fps * i, begin, change, duration));
        if (fps * i >= duration) {
            callback(begin + change);
            clearInterval(interval);
            return true;
        }
        callback(next);
        i++;
    }, fps);
}

export default slowly;
