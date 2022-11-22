<template>
  <q-header elevated class="bg-primary text-white">
    <q-toolbar class="toolbar_header" dense width="100%">
      <!-- Navbar content -->
        <img
                src="../assets/images/bc-gov-logo.svg"
                class="img-theme"
                alt="B.C. Government Logo"
        >
      <q-toolbar-title><span class="span-title">{{ appTitle }}</span></q-toolbar-title>

      <q-space></q-space>
      <div v-if="isAuthenticated && dataReady">
        <q-chip clickable tabindex="0" icon="account_circle" pill style="background-color: #003366" dark>
          {{ userInfo.displayName }}
          <q-menu fit style="background-color: #003366" name="user_options" offset-y>
            <q-list dark color="#003366">
              <q-item id="home_button" :href='authRoutes.LOGIN'>
                <q-item-section>Home</q-item-section>
              </q-item>
              <q-item id="logout_button" :href='authRoutes.LOGOUT'>
                <q-item-section>Logout</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-chip>
      </div>
      <div v-else-if="isAuthenticated && !dataReady">
        <q-skeleton type="QChip">
        </q-skeleton>
      </div>
    </q-toolbar>
  </q-header>
</template>

<script>
import {AuthRoutes} from '../utils/constants';
import { authStore } from '../stores/auth';
import { mapState } from 'pinia';

export default {
  data() {
    return {
      appTitle: import.meta.env.VUE_APP_TITLE,
      authRoutes: AuthRoutes
    };
  },
  computed: {
    ...mapState(authStore, ['isAuthenticated']),
    ...mapState(authStore, ['userInfo']),
    dataReady: function () {
      return this.userInfo;
    }
  },
};
</script>

<style>
  .v-icon {
    padding-left: 10px;
  }

  a {
    text-decoration: none;
  }

  .v-toolbar__content {
    padding: 4px 10px 4px 65px;
  }

  .title {
    width: 50%;
    height: auto;
    max-height: 50px !important;
  }
  .span-title{
    color: white;
    text-align: center !important;
  }
  @media screen and (min-width: 601px) {
    .span-title {
      font-size: 20px;
    }
    .img-theme {
      width: 20%;
      max-height: 40px !important;
    }
    .display-name{
      display: inline-block;
    }
  }

  @media screen and (min-width: 301px) and (max-width: 600px) {
    .span-title {
      padding-left: 2px !important;
      font-size: 12px;
    }
    .img-theme {
      align-content: center;
      width: 35%;
      max-height: 100px !important;
      padding-right: inherit;
    }
    .display-name{
      display: none;
    }
  }

  @media screen and (max-width: 300px) {
    .span-title {
      padding-left: 2px !important;
      font-size: 15px;
    }
    .img-theme {
      width: 15%;
      max-height: 100px !important;
      padding-right: inherit;
    }
    .display-name{
      display: none;
    }
  }
  .toolbar_header {
    background-color: rgb(0, 51, 102) !important;
    border-bottom: 2px solid rgb(252, 186, 25) !important;
    max-height: 3.5rem;
  }

  .gov-header .q-btn,
  .q-btn--active.title:before,
  .q-btn.title:focus:before,
  .q-btn.title:hover:before {
    color: #fff;
    background: none;
  }

  .top-down {
    padding-top: 20px;
    height: 80%;
  }

</style>
