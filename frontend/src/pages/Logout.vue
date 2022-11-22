<template>
  <q-page-container fluid class="full-height">
    <article name="logout-banner" class="top-banner flex-center">
      <div class="row">
        <div class="col">
          <q-card class="session-expired-card">
            <q-card-section>
              <div id="logout_text" class="session-header">Logged Out</div>
            </q-card-section>
            <q-card-section id="logout_descriptor">
              <div class="row" style="margin: .3rem">You have Logged out.</div>
              <a id="login-button" @click="clearStorage" :href="routes.LOGIN" class="q-mx-xs" dark color='#003366'>Log In</a><span>again if you wish to continue.</span>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </article>
    <!-- login article -->

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
.session-header{
  color: rgba(0,0,0,.87);
  flex-wrap: wrap;
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: .0125em;
  line-height: 2rem;
  word-break: break-all;
}

.full-height{
  height: 100%;
}

.session-expired-card{
  margin-top: 15rem;
  width: 100%;
  background: #D9E7D8;
}

</style>
