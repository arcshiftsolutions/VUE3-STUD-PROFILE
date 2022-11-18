<template>
  <q-page-container fluid class="full-height">

    <!-- login article -->
    <article name="logout-banner">
      <div class="row" align="center" justify="center">
        <div class="col" xs="10" sm="10" md="8" lg="4" xl="3">
        <q-card class="session-expired-card">
          <q-card-title class="gov-header">
            <h4 id="logout_text">Logged Out</h4>
          </q-card-title>
          <q-card-section id="logout_descriptor">
            <div class="row" style="margin: .3rem">You have Logged out.</div>
            <a id="login-button" @click="clearStorage" :href="routes.LOGIN" class="ma-1" dark color='#003366'>Log In</a><span>again if you wish to continue.</span>
          </q-card-section>
        </q-card>
        </div>
      </div>
    </article>
  </q-page-container>
</template>

<script>
import { AuthRoutes } from '../utils/constants';
export default {
  name: 'Logout',

  data() {
    return {
      routes: AuthRoutes
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
    background: #D9E7D8;
  }

</style>
