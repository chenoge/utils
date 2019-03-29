// vue 自定义指令
export default {
    bind(el, binding) {
        function handle() {
            if (el.scrollHeight === el.clientHeight
                && el.scrollWidth > el.clientWidth) {
                // 向下
                if (event.deltaY > 0) {
                    el.scrollLeft += el.__step__;
                }

                // 向上
                if (event.deltaY < 0) {
                    el.scrollLeft -= el.__step__;
                }

                // 禁止事件传播和取消默认行为
                event.preventDefault();
                event.stopPropagation();
            }
        }

        el.__step__ = 120;
        el.__horizontalScroll__ = handle;
        el.addEventListener("wheel", handle); // 非标准事件：mousewheel
    },

    // 解除绑定的时候，移除该事件
    unbind(el) {
        el.removeEventListener("wheel", el.__horizontalScroll__);
        delete el.__horizontalScroll__;
        delete el.__step__;
    }
};
