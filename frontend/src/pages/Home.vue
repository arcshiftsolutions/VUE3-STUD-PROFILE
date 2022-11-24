<!--suppress ALL -->
<template>
<!--  <div v-if="!isAuthenticated && !isLoading">-->

<!--    <ModalJourney/>-->
<!--    &lt;!&ndash; login article &ndash;&gt;-->
<!--    <article name="login-banner">-->
<!--        <div class="row" justify="center" style="margin-right: 0;margin-left: 0">-->
<!--          <Login></Login>-->
<!--        </div>-->
<!--    </article>-->
<!--  </div>-->

<!--  <div v-else-if="isLoading" id="progress-display-container" class="top-banner full-height window-width flex-center">-->
<!--    <div class="floating-label">-->
<!--      <q-circular-progress-->
<!--        size="5em"-->
<!--        :width="7"-->
<!--        color="primary"-->
<!--        indeterminate-->
<!--      ></q-circular-progress>-->
<!--    </div>-->
<!--  </div>-->

  <div class="q-pt-md q-pb-xl">
    <div class="row flex-center">
        <div class="col flex flex-center q-px-md">
            If you are currently attending a K-12 school, please request your PEN or update your personal information by contacting the main office at your school
        </div>
    </div>
    <div class="row flex-center">
      <div class="col flex flex-center">
        <ul>
          <li><a href="http://www.bced.gov.bc.ca/apps/imcl/imclWeb/Home.do" rel="noopener noreferrer" target="_blank">Find your school's contact information</a></li>
        </ul>
      </div>
    </div>

    <div class="row q-mt-lg">
      <div class="col q-px-lg col-xs-12 col-md-6">
        <UserStudentCard v-if="hasBcscLinkageForStudent" class="q-pa-sm"></UserStudentCard>
        <q-card v-else :class="{'q-px-xl': $q.screen.gt.md }" class="q-pa-sm" style="height: 100%;">
          <p style="text-align:center">
            <router-link to="gmp">
              <img id="gmpLink" alt="Find PEN" src="../assets/images/icon-find-pen.svg" style="display:block; float:initial; margin:auto" title="Find PEN">Get your Personal Education<br>Number (PEN)
            </router-link>
          </p>
          <p class="q-my-sm">Former students can send a request via an online form to receive their PEN
          </p>
        </q-card>
      </div>
      <div class="col q-px-lg col-xs-12 col-md-6 " :class="{'q-pt-md q-mb-md': $q.screen.lt.md }">
        <q-card :class="{'q-px-xl': $q.screen.gt.md }" class="q-pa-sm" style="height: 100%;">
          <p style="text-align:center">
            <router-link to="ump">
              <img id="umpLink" alt="Update My PEN" src="../assets/images/updatemypen.svg" style="display:block; float:initial; margin:auto" title="Update My PEN">Update your PEN information
            </router-link>
          </p>
          <p class="q-my-sm">Former students can update their personal information associated with their PEN so that transcripts display current legal name
          </p>
          <ul style="text-align:left; list-style-position: outside;" :class="{'q-px-xl': $q.screen.gt.md }">
            <li>
              You cannot change your Personal Education Number (PEN)
            </li>
          </ul>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import UserStudentCard from './UserStudentCard.vue';
import { mapState } from 'pinia';
import {authStore} from "../stores/auth.js";
import {rootStore} from "../stores/root.js";

export default {
  name: 'home',
  components: {
    UserStudentCard,
  },
  computed: {
    ...mapState(authStore, ['isAuthenticated', 'isLoading', 'userInfo']),
    ...mapState(rootStore, ['student']),

    hasBcscLinkageForStudent() {
      return this.userInfo?.accountType === 'BCSC' && this.student;
    },
  },
};
</script>

<style scoped>
  .top-banner{
    background-color: aliceblue;
    background-size: cover;
    align-items: center;
    display: flex;
  }

  a{
    color: #1976d2;
  }
</style>

