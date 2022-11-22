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

  <div >
    <div justify=center class="row" :class="{'px-16': $q.screen.xl, 'mx-16': $q.screen.xl }">
        <div class="col" cols="10" xl="8" lg="8" md="10" sm="10" xs="10" :class="{'px-16': $q.screen.xl }">
            <div>If you are currently attending a K-12 school, please request your PEN or update your personal information by contacting the main office at your school
               <ul class="pl-8" style="list-style-position: outside;">
                 <li><a href="http://www.bced.gov.bc.ca/apps/imcl/imclWeb/Home.do" rel="noopener noreferrer" target="_blank">Find your school's contact information</a></li>
               </ul>
            </div>
        </div>
    </div>
    <div class="row" justify=center>
      <div cols="12" lg="6" class="col px-8">
        <UserStudentCard v-if="hasBcscLinkageForStudent" class="px-4 py-4"></UserStudentCard>
        <q-card v-else :class="{'px-16': $q.screen.gt.md }" class="px-4 py-4" style="height: 100%;">
          <p style="text-align:center">
            <router-link to="gmp">
              <img id="gmpLink" alt="Find PEN" src="../assets/images/icon-find-pen.svg" style="display:block; float:initial; margin:auto" title="Find PEN">Get your Personal Education<br>Number (PEN)
            </router-link>
          </p>
          <p class="my-1">Former students can send a request via an online form to receive their PEN
          </p>
        </q-card>
      </div>
      <div cols="12" lg="6" class="col px-8">
        <q-card :class="{'px-16': $q.screen.gt.md }" class="px-4 py-4" style="height: 100%;">
          <p style="text-align:center">
            <router-link to="ump">
              <img id="umpLink" alt="Update My PEN" src="../assets/images/updatemypen.svg" style="display:block; float:initial; margin:auto" title="Update My PEN">Update your PEN information
            </router-link>
          </p>
          <p class="my-1">Former students can update their personal information associated with their PEN so that transcripts display current legal name
          </p>
          <ul style="text-align:left; list-style-position: outside;" :class="{'px-16': $q.screen.gt.md }">
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
</style>

