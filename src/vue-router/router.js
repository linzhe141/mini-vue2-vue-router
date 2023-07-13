import { createMatcher } from './create-matcher';
import { BrowserHistory } from './history/browserHistory';

import { install } from './install';
class VueRouter {
  static install = install;
  beforeHooks = [];
  constructor(options = {}) {
    const routes = options.routes ?? [];
    this.routes = routes;
    this.matcher = createMatcher(routes);
    let mode = options.mode || 'hash';
    this.mode = mode;
    switch (mode) {
      case 'history':
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
    history.listen(route => (app._route = route));
    let mode = this.mode;
    switch (mode) {
      case 'history':
        const popstateHandle = () => {
          const path = location.pathname;
          history.transitionTo(path);
        };
        window.addEventListener('popstate', popstateHandle);
        popstateHandle();
        break;
    }
  }
  beforeEach(fn) {
    this.beforeHooks.push(fn);
  }
}
export default VueRouter;
