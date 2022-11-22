<template>
    <div class="row" justify="center">
      <div class="col" xs="4" sm="4" md="4" lg="4" xl="4">
      <q-card class="error-card">
        <q-card-section class="gov-header">
          <h4 id="error_text">System Error</h4>
        </q-card-section>
        <q-card-section id="error_message">
          You have encountered a System Error. Close your Web browser, open a new session, then try again.
        </q-card-section>
      </q-card>
      </div>
  </div>
</template>

<script>

import {authStore} from "../stores/auth.js";

export default {
  data() {
    return {
      errorMessage: this.$route.query.message
    };
  },
  async created(){
    if(this.errorMessage === 'Unable_to_authenticate'){
      authStore().setLoginError();
    }
  }
};
</script>

<style scoped>
  .v-icon{
    padding-left: 10px;
  }
  .error-card{
    margin-top: 5%;
    min-width: 30%;
  }
  .gov-header{
    color: #003366;
  }
  .q-btn{
    text-transform: none
  }
  .blue-back{
    background-color: aliceblue;
    height: 100%;
  }
  .detail-text{
    color: rgba(0, 0, 0, 0.54);
    font-size: 0.875rem;
  }
</style>
