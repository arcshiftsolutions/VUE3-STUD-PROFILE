<template>
  <q-layout view="hHh lpR fFf">

    <Header/>

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

export default defineComponent({
  name: 'MainLayout',

  components: {
    Header,
    Footer
  },

  setup () {
    return {
    }
  }
})
</script>
