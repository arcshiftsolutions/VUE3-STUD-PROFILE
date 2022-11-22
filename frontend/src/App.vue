<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'
import { authStore } from './stores/auth.js';
import { penRequestStore } from './stores/penRequest.js';
import { studentRequestStore } from './stores/studentRequest.js';
import HttpStatus from 'http-status-codes';
import router from './router/index.js'

export default defineComponent({
  name: 'App',
  async created() {
    authStore().setLoading(true);
    authStore().getJwtToken().then(() =>
      Promise.all([penRequestStore().getCodes(), studentRequestStore().getCodes(), authStore().getUserInfo()])
    ).catch(e => {
      if(! e.response || e.response.status !== HttpStatus.UNAUTHORIZED) {
        authStore().logout();
        router.replace({name: 'error', query: { message: `500_${e.data || 'ServerError'}` } });
      }
    }).finally(() => {
      authStore().setLoading(false);
    });
  }
})
</script>

<style>
.q-layout {
  font-family: 'BCSans', Verdana, Arial, sans-serif !important;
}

.top-banner{
  background-size: cover;
  align-items: center;
  display: flex;
}
.full-height{
  height: 100%;
}
</style>
