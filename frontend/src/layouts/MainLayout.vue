<template>
  <q-layout view="hHh lpR fFf">

    <Header/>
<!--    <q-bar v-if="bannerColor !== ''"-->
<!--           style="color:white;"-->
<!--           :color="bannerColor"-->
<!--           sticky-->
<!--           dense-->
<!--    ><div><h3>{{ bannerEnvironment }} Environment</h3></div></q-bar>-->
    <ModalIdle v-if="isAuthenticated"/>
    <q-page-container class="full-height window-height window-width row justify-center items-center">
      <router-view />
    </q-page-container>

    <Footer/>

  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue';
import Header from './Header.vue';
import Footer from './Footer.vue';
import StaticConfig from '../common/staticConfig';
import ModalIdle from '../pages/ModalIdle.vue';
import {mapState} from 'pinia';
import {authStore} from '../stores/auth.js';

export default defineComponent({
  name: 'MainLayout',

  data() {
    return {
      bannerEnvironment: StaticConfig.BANNER_ENVIRONMENT,
      bannerColor: StaticConfig.BANNER_COLOR
    };
  },

  components: {
    Header,
    ModalIdle,
    Footer
  },

  computed: {
    ...mapState(authStore, ['isAuthenticated']),
  },

  setup () {
    return {
    }
  }
})
</script>
