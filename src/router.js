import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import store from "./store";

Vue.use(Router);

function isLoggedIn(from, to, next) {
  store
    .dispatch("auth/authenticate")
    .then(() => {
      next();
    })
    .catch(e => {
      console.log("Auth error " + JSON.stringify(e));
      console.log("redirecting to home page");
      next("/login");
    });
}

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/dashboard",
      name: "dashboard",
      beforeEnter: isLoggedIn,
      component: () =>
        import(/* webpackChunkName: "dashboard" */ "./views/Dashboard.vue")
    },
    {
      path: "/meter",
      name: "wMeter",
      beforeEnter: isLoggedIn,
      component: () =>
        import(/* webpackChunkName: "wMeters" */ "./views/Meter.vue")
    },
    {
      path: "/meterd/:id",
      name: "meterDetail",
      beforeEnter: isLoggedIn,

      component: () =>
        import(/* webpackChunkName: "meterDetail" */ "./views/MeterDetail.vue")
    },
    {
      path: "/login",
      name: "login",

      component: () =>
        import(/* webpackChunkName: "login" */ "./views/Login.vue")
    },
    {
      path: "/signup",
      name: "signup",

      component: () =>
        import(/* webpackChunkName: "signup" */ "./views/Signup.vue")
    },
    {
      path: "/settings",
      name: "settings",

      component: () =>
        import(/* webpackChunkName: "settings" */ "./views/Settings.vue")
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
