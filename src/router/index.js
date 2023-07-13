import Vue from "vue";
// import VueRouter from "vue-router";
import VueRouter from "../../vue-router";
import Home from "../views/home/index.vue";
import HomeA from "../views/home/home-a.vue";
import HomeB from "../views/home/home-b.vue";
import HomeC from "../views/home/home-c.vue";
import About from "../views/about/index.vue";
import AboutA from "../views/about/about-a.vue";
import AboutB from "../views/about/about-b.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "a",
        name: "HomeA",
        component: HomeA,
      },
      {
        path: "b",
        name: "HomeB",
        component: HomeB,
      },
    ],
  },
  {
    path: "/about",
    name: "About",
    component: About,
    children: [
      {
        path: "a",
        name: "AboutA",
        component: AboutA,
      },
      {
        path: "b",
        name: "AboutB",
        component: AboutB,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  // base: process.env.BASE_URL,
  routes,
});
//! next(): 进行的下一个钩子。如果全部钩子执行完了，则导航到to
//! 比如下面 2s 后才会导航到 to
// router.beforeEach((to, from, next) => {
//   console.log("1 to--->", to);
//   console.log("1 from--->", from);
//   setTimeout(() => {
//     next();
//   }, 1000);
// });
// router.beforeEach((to, from, next) => {
//   console.log("2 to--->", to);
//   console.log("2 from--->", from);
//   setTimeout(() => {
//     next();
//   }, 1000);
// });
// test router.matcher.addRoute
window.__test_route = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "c",
        name: "HomeC",
        component: HomeC,
      },
    ],
  },
];
window.__vue__router = router;
export default router;
