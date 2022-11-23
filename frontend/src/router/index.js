import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import {authStore} from '../stores/auth';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    base: process.env.BASE_URL,
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createWebHistory()
  })

  Router.beforeEach((to, _from, next) => {
    if (to.meta.requiresAuth && authStore().isAuthenticated) {
      authStore().getJwtToken().then(() => {
        if (!authStore().isAuthenticated) {
          next('/token-expired');
        } else if(to.meta.notRefreshUserInfo) {
          next();
        } else {
          authStore().getUserInfo().then(() => {
            next();
          }).catch(() => {
            next('error');
          });
        }
      }).catch((e) => {
        next('/token-expired');
      });
    }
    else{
      next();
    }
  });

  return Router
})
