<template>
  <q-page-container class="full-height">
    <article name="session-expired-banner" class="top-banner flex-center">
      <div class="row">
        <div class="col">
          <q-card class="session-expired-card">
            <q-card-section>
              <div class="session-header" id="session-expired-text">Session Expired</div>
            </q-card-section>
            <q-card-section class="session-content" id="session-expired-descriptor">
              <div class="row" style="margin: .3rem">Your secure session has ended as a result of inactivity.</div>
              <a id="login-button" @click="clearStorage" :href="routes.LOGIN" class="q-mx-xs" dark color='#003366'>Log In</a><span>again to continue.</span>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </article>
  </q-page-container>
</template>

<script>
import {AuthRoutes} from '../utils/constants';
import { authStore } from '../stores/auth';

export default {
  name: 'SessionExpired',
  data() {
    return {
      routes: AuthRoutes
    };
  },
  mounted() {
    authStore().setJwtToken();
  },
  methods: {
    clearStorage() {
      authStore().setJwtToken();
    }
  }
};
</script>

<style scoped>
  .full-height{
    height: 100%;
  }

  #login-button {
    color: #1976d2;
  }

  .session-content{
    color: rgba(0,0,0,.6);
    font-size: .875rem;
    font-weight: 400;
    line-height: 1.375rem;
    letter-spacing: .0071428571em;
  }

  .session-header{
    color: rgba(0,0,0,.87);
    flex-wrap: wrap;
    font-size: 1.25rem;
    font-weight: 600;
    letter-spacing: .0125em;
    line-height: 2rem;
    word-break: break-all;
  }
  .session-expired-card{
    margin-top: 15rem;
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
