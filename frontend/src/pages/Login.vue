<template>
    <q-page-container class="login-cards" style="padding-bottom: 1vh">
      <div class="row">
          <q-card>
            <q-card-section>
            You are not logged in. Redirecting to the login page...
            </q-card-section>
          </q-card>
      </div>
    </q-page-container>
</template>

<script>
import { mapState } from 'pinia';
import {authStore} from "../stores/auth.js";
import { AuthRoutes } from '../utils/constants';

export default {
  name: 'Login',
  data() {
    return {
      appTitle: import.meta.env.VUE_APP_TITLE,
      authRoutes: AuthRoutes
    };
  },
  computed: {
    ...mapState(authStore, ['isAuthenticated']),
  },
  methods: {
    clearStorage() {
      authStore().setJwtToken();
    }
  }
};
</script>

<style scoped>
  .v-icon{
    padding-left: 10px;
  }
  .login-card{
      padding-left: 5%;
      max-width: 95%;
  }
  .gov-header{
    color: #003366;
  }
  .q-btn{
    text-transform: none
  }
  .banner-image{
    background-image: url('@/assets/images/bceid_logo.jpg');
  }
  .login-cards{
    max-width:80%;
    margin: 2rem;
  }
  /* .q-card__text{
    padding-top: 0px;
  } */
  .img-card{
    height: auto !important;
    width: 90%;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  .card-bold{
    color: #1a5a96;
  }
  .login-card-text{
    font-size: 0.95rem
  }
  hr{
    margin: 0 1rem;
    color: #ededed
  }
  .q-card__actions{
    padding: 1rem;
    padding-top: 0.3rem;
  }

  .v-application a{
    color: #1a5a96
  }
  .q-card__text{
    font-size: 1.2rem
  }
  .img-holder{
    height: 10rem;
    margin: auto
  }
  .bcsc{
    padding-top: 1rem;
  }

  @media screen and (max-width: 801px){
    .img-holder{
      height: auto;
    }
  }
   @media screen and (max-width: 400px) {
     .login-cards{
       margin-bottom: 7rem;
       margin-top: 2rem;
       max-width:80%;
     }
    .q-card__text{
      height: auto;
    }
    .img-holder{
      height: auto;
    }
   }
</style>
