<template>
  <q-layout view="hHh lpR fFf">

    <Header/>

    <ModalIdle v-if="isAuthenticated"/>
    <q-page-container class="full-height window-height window-width row justify-center">
      <router-view />
    </q-page-container>

    <Footer/>

  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue';
import Header from './Header.vue';
import Footer from './Footer.vue';
import ModalIdle from '../pages/ModalIdle.vue';
import {mapState} from 'pinia';
import {authStore} from '../stores/auth.js';

export default defineComponent({
  name: 'MainLayout',

  data() {
    return {

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
