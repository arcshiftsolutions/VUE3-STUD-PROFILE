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
    console.log('Meta ' + JSON.stringify(to.meta));
    console.log('Auth ' + authStore().isAuthenticated);
    console.log('Here1');
    if (to.meta.requiresAuth && authStore().isAuthenticated) {
      console.log('Here2');
      authStore().getJwtToken().then(() => {
        console.log('Here3');
        if (!authStore().isAuthenticated) {
          console.log('Here4');
          next('/token-expired');
        } else if(to.meta.notRefreshUserInfo) {
          console.log('Here5');
          next();
        } else {
          console.log('Here6');
          authStore().getUserInfo().then(() => {
            console.log('Here7');
            next();
          }).catch(() => {
            console.log('Here8');
            next('error');
          });
        }
      }).catch((e) => {
        console.log('Here9' + e);
        next('/token-expired');
      });
    }
    else{
      console.log('Here10');
      next();
    }
  });

  return Router
})
