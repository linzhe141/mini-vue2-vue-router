let Vue = null;
import { createMatcher } from "./create-matcher";
import { BrowserHistory } from "./history/browserHistory";
import RouterLink from "./components/router-link";
import RouterView from "./components/router-view";
class VueRouter {
  static install(_Vue) {
    Vue = _Vue;
    Vue.mixin({
      beforeCreate() {
        if (this.$options && this.$options.router) {
          // 如果是根组件
          this._root = this; //把当根实例挂载到_root上
          this._router = this.$options.router;
          // 将router和根实例关联
          // this._router._root = this;
          this._router.init(this);
          //? 源码中this._router.history.current没有递归所有属性加getter，setter，
          //! 因为 Object.freeze(this._router.history.current), 按照defineReactive源码，所有就不会变成响应式了
          Vue.util.defineReactive(this, "_route", this._router.history.current);
        } else {
          //如果是子组件
          this._root = this.$parent && this.$parent._root;
        }
        Object.defineProperty(this, "$router", {
          get() {
            return this._root._router;
          },
        });
        Object.defineProperty(this, "$route", {
          get() {
            return this._root._route;
          },
        });
      },
    });
    Vue.component("RouterLink", RouterLink);
    Vue.component("RouterView", RouterView);
  }
  constructor(options = {}) {
    const routes = options.routes ?? [];
    this.routes = routes;
    this.matcher = createMatcher(routes);
    let mode = options.mode || "hash";
    this.mode = mode;
    switch (mode) {
      case "history":
        this.history = new BrowserHistory(this);
        break;
      // case "hash":
      //   this.history = new HashHistory(this, options.base, this.fallback);
      //   break;
    }
  }
  push(path) {
    this.history.push(path);
  }
  init(app) {
    const history = this.history;
    history.listen((route) => (app._route = route));
    let mode = this.mode;
    switch (mode) {
      case "history":
        const popstateHandle = () => {
          const path = location.pathname;
          const target = this.matcher.match(path);
          if (target) {
            history.update(target);
          }
        };
        window.addEventListener("popstate", popstateHandle);
        popstateHandle();
        break;
    }
  }
}
export default VueRouter;
