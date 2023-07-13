import RouterLink from './components/router-link';
import RouterView from './components/router-view';
let Vue = null;
export function install(_Vue) {
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
        //! 因为在源码中 Object.freeze(this._router.history.current),
        //! 在通过查看defineReactive源码，发现如果对象是Object.isExtensible(value),才能将value的各个属性进行拦截
        //! 因为被冻结了，不能在进行扩展，所以this._router.history.current的属性，就没有加上getter，setter了
        Vue.util.defineReactive(this, '_route', this._router.history.current);
      } else {
        //如果是子组件
        this._root = this.$parent && this.$parent._root;
      }
      Object.defineProperty(this, '$router', {
        get() {
          return this._root._router;
        }
      });
      Object.defineProperty(this, '$route', {
        get() {
          return this._root._route;
        }
      });
    }
  });
  Vue.component('RouterLink', RouterLink);
  Vue.component('RouterView', RouterView);
}
