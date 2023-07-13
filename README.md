# 实现`Vue2`简易版的`vue-router`插件

### tips

- 路由描述的是 URL 与 UI 之间的映射关系，这种映射是单向的，即 URL 变化引起 UI 更新（**无需刷新页面**）。

### Vue2 简易版 vue-router 的实现，包含如下功能：

- `history 路由`
- `RouterLink`
- `RouterView`
- `router.push`
- `router.addRoute` 如果该路由规则有 name，并且已经存在一个与之相同的名字，则会覆盖它
- `router.beforeEach:(to, from, next)=>void`其中 next(): 进行的下一个钩子。如果全部钩子执行完了，则导航到 to

### TODO

- hash 路由

### history 路由大致原理：

- 利用 h5 的 history API 的 pushState,这个方法改变 URL 的 path 部分不会引起页面刷新
- 并通过 popstate 事件，监听用户点击浏览器前进后退,来改变 `_route`
- 当调用 router.push 时，手动改变 `_route`
- 把路由的状态(`_route`)，通过 `Vue.util.defineReactive` 定义成响应式数据
  ```js
  Vue.util.defineReactive(this, '_route', this._router.history.current);
  ```
- 这样当改变这个`_route` 的时候，RouterView 组件就可以响应式更新了，即 URL 变化引起 UI 更新（**无需刷新页面**）
