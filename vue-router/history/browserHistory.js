export class BrowserHistory {
  constructor(router) {
    this.router = router;
    this.current = {
      path: "/",
      // RouterView中依次渲染的组件
      matched: [],
    };
  }
  push(path) {
    this.transitionTo(path);
  }
  transitionTo(path) {
    const target = this.router.matcher.match(path);
    if (target) {
      const from = this.current;
      const to = {
        path: target.path,
        matched: target.matched,
      };
      const queue = [...this.router.beforeHooks];
      this.runQueue(queue, to, from, () => {
        window.history.pushState(null, "", path);
        this.update(target);
      });
    }
  }
  runQueue(queue, to, from, cb) {
    function next(index) {
      if (index >= queue.length) return cb();
      const hook = queue[index];
      hook(to, from, () => {
        next(index + 1);
      });
    }
    next(0);
  }
  //! 当update后,需要手动this._route($route) = histroy.current,触发响应式更新
  //! 因为在RouterView组件的render中，使用了$route,所以会进行依赖收集，当改变这个$route时,当然就会进行重新渲染了
  //! cb = (route)=> (app._route = route)
  listen(cb) {
    this.cb = cb;
  }
  update(target) {
    this.current = {
      path: target.path,
      matched: target.matched,
    };
    this.cb && this.cb(this.current);
  }
}
