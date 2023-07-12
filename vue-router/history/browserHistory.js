export class BrowserHistory {
  constructor(router) {
    this.router = router;
    this.current = {
      path: "/",
      matched: [],
    };
  }
  push(path) {
    const target = this.router.matcher.match(path);
    if (target) {
      this.update(target);
      window.history.pushState(null, "", path);
    }
  }
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
