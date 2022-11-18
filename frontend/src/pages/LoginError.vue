<template>
  <q-page-container fluid class="full-height">

    <!-- login article -->
    <article name="session-expired-banner" class="top-banner">
      <div class="row" align="center" justify="center">
        <div class="col" xs="10" sm="10" md="8" lg="5" xl="3">
        <q-card class="session-expired-card">
          <q-card-title class="gov-header">
            <h4 id="session-expired-text">Log in Error</h4>
          </q-card-title>
          <q-card-section id="session-expired-descriptor">
            <div class="row" style="margin: .5rem">An error occurred while you were logging in</div>
            <a id="login-button" @click="clearStorage" :href="authRoutes.LOGIN" class="ma-1" dark color='#003366'>Log In</a><span>again to continue.</span>
            <div class="row small-font" style="margin: .5rem">If the error continues, wait a few minutes before logging in again</div>
          </q-card-section>
        </q-card>
        </div>
      </div>
    </article>
  </q-page-container>
</template>

<script>
import {AuthRoutes} from '../utils/constants';

export default {
  name: 'LoginError',

  data() {
    return {
      authRoutes: AuthRoutes
    };
  },
  mounted() {
    this.$store.commit('auth/setJwtToken');
  },
  methods: {
    clearStorage() {
      this.$store.commit('auth/setJwtToken');
    }
  }
};
</script>

<style scoped>
  .full-height{
    height: 100%;
  }
  .session-expired-card{
    margin-top: 15rem;
    width: 100%;
    background: #F2E8D5;
  }

  @media screen and (max-width: 300px) {
    .session-expired-card{
      margin-top: 2rem;
      height: 50%;
      width: 100%;
      background: #F2E8D5;
    }
  }
  @media screen and (min-width: 301px) and (max-width: 350px) {
    .session-expired-card{
      margin-top: 1rem;
      width: 100%;
      background: #F2E8D5;
    }
  }
  @media screen and (min-width: 351px) and (max-width: 450px) {
    .session-expired-card{
      margin-top: 8rem;
      width: 100%;
      background: #F2E8D5;
    }
  }
</style>
