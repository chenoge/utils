// scrollBy
// scrollTo

export default {
    bind(el, binding) {
        let delay = binding.value || 20;
        let prev = new Date();
        let scrollTop = el.scrollTop;
        el.addEventListener('scroll', () => {
            let now = new Date();

            // 不让动
            if (now - prev < delay) {
                el.scrollTop = scrollTop;
                return true;
            }

            // 向下滚动一个单位容器高度
            if (el.scrollTop > scrollTop) {
                el.scrollTop += el.offsetHeight;
            }

            // 向上滚动一个单位容器高度
            if (el.scrollTop < scrollTop) {
                el.scrollTop -= el.offsetHeight;
            }

            prev = now;
            scrollTop = el.scrollTop;
        });
    }
}
