export default {
  name: 'RouterView',
  data() {
    return {
      //! 递归组件 tips
      //! 表示这个组件为RouterView
      //! 用于在递归组件中，确定渲染的index
      routerView: true
    };
  },
  render(h) {
    // 渲染matched的第几个组件
    let depth = 0;
    let parent = this.$parent;
    //! 递归组件 tips
    while (parent) {
      const routerView = parent.routerView ?? false;
      if (routerView) {
        depth++;
      }
      parent = parent.$parent;
    }
    const matched = this.$route.matched;
    if (matched.length) {
      return h(matched[depth]);
    }
    return h();
  }
};
