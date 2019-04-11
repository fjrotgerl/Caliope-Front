import Vue from 'vue'
import VueRouter from 'vue-router'
import constants from '../statics/js/configuration'
import axios from 'axios'

import routes from './routes'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  function existToken() {
    return !!localStorage.token;
  }

  Router.beforeEach((to, from, next) => {
    if(to.path === '/user' ) {
      if (existToken()) {
        axios.post(constants.AUTH_API_URL + "/verify-token", {}, {
          headers: {
            'Authorization': localStorage.getItem("token"),
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
          .then(response => console.log(response))
          .catch(error => console.error(error));
        next();
      } else {
        next("/")
      }
    } else {
      next();
    }
  });

  return Router
}
