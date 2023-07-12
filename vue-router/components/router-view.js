export default {
  name: "RouterView",
  render(h) {
    // 表示这个组件为RouterView
    this.$data.routerView = true;
    // 渲染matched的第几个组件
    let depth = 0;
    let parent = this.$parent;
    while (parent && parent._root !== parent) {
      const data = parent.$data ?? {};
      if (data.routerView) {
        depth++;
      }
      parent = parent.$parent;
    }
    const matched = this.$route.matched;
    if (matched.length) {
      return h(matched[depth]);
    }
    return h();
  },
};
