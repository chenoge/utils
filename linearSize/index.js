// 线性切分大小
function linearSize(list, maxSize, minSize) {
    let max = Math.max(...list);
    let min = Math.min(...list);
    let unit = (maxSize - minSize) / (max - min);
    return list.map(el => (el - min) * unit + minSize);
}

export default linearSize;
