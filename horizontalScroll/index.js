// 使用方式 ：
// v-horizontalScroll
// v-horizontalScroll="{step: 100, selector: '.el-table__body-wrapper'}"
export default {
    bind(el, binding) {
        el.__step__ = 100; // 滑动一次滚轮，默认移动的距离，单位px
        el.__scrollEl__ = el; // 真正滚动的元素
        el.__horizontalScroll__ = handle;

        // 初始化
        if (binding.value) {
            // 设置移动步长
            if (binding.value.step) {
                el.__step__ = binding.value.step;
            }

            // 真正滚动的元素选择器
            if (binding.value.selector) {
                el.__scrollEl__ = getElementFromChildren(el.children, binding.value.selector) || el;
            }
        }

        // 注册监听事件
        el.__scrollEl__.addEventListener("wheel", handle); // 非标准事件：mousewheel

        function handle(event) {
            let realEl = el.__scrollEl__;
            // 存在水平滚动 && 没有垂直滚动 && 没有按下shift键
            if (realEl.scrollWidth > realEl.clientWidth
                && realEl.scrollHeight === realEl.clientHeight
                && !event.shiftKey) {

                // 向下
                if (event.deltaY > 0) {
                    realEl.scrollLeft += el.__step__;
                }

                // 向上
                if (event.deltaY < 0) {
                    realEl.scrollLeft -= el.__step__;
                }

                // 禁止事件传播和取消默认行为
                event.preventDefault();
                event.stopPropagation();
            }
        }
    },

    // 解除绑定的时候，移除该事件
    unbind(el) {
        el.__scrollEl__.removeEventListener("wheel", el.__horizontalScroll__);
        delete el.__step__;
        delete el.__scrollEl__;
        delete el.__horizontalScroll__;
    }
};

// selector 只支持标签、ID、类
// 按照深度优先原则，寻找到匹配的元素，找到第一个标签便会返回
function getElementFromChildren(children, selector) {
    let el = null;
    [...children].some(child => {
        // ID 选择器
        if (selector.startsWith('#') && child.id === selector.split('#')[1]) {
            el = child;
            return true;
        }

        // 类选择器
        if (selector.startsWith('.')) {
            let classList = [...child.classList];
            if (classList.includes(selector.split('.')[1])) {
                el = child;
                return true;
            }
        }

        // 标签选择器
        if (selector.toLowerCase() === child.tagName.toLowerCase()) {
            el = child;
            return true;
        }

        // 递归
        if (child.children.length) {
            el = getElementFromChildren(child.children, selector);
            return el;
        }
    });

    return el;
}
