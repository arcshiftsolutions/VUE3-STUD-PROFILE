<!--suppress ALL -->
<template>
  <q-page-container fluid v-if="!isAuthenticated && !isLoading">
    <ModalJourney/>
    <!-- login article -->
    <article name="login-banner">
        <div class="row" justify="center" style="margin-right: 0;margin-left: 0">
          <Login></Login>
        </div>
    </article>
  </q-page-container>

  <q-page-container fluid class="full-height" v-else-if="isLoading || hasCompletedPenRequestButNoStudentLinkage">
    <article id="progress-display-container" class="top-banner full-height">
      <div class="row" justify="center">
        <q-circular-progress
                size="60"
                :width="7"
                color="primary"
                indeterminate
        ></q-circular-progress>
      </div>
    </article>
  </q-page-container>

  <q-page-container fluid class="full-height" v-else-if="isAuthenticated && hasPenRequest && requestType === 'penRequest'">
    <article id="request-display-container" class="top-banner full-height">
        <div class="row" justify="center" style="width: 1vw;margin-right: 0;margin-left: 0;margin-bottom: 5rem;">
          <div class="col pt-1 pt-sm-3" xs="11" sm="11" md="10" lg="8" xl="6">
            <RequestDisplay
              :title="requestTitle"
              :can-create-request="canCreateRequest"
              :new-request-text="newRequestText"
            >
              <template v-slot:message>
                <MessageCard></MessageCard>
              </template>
              <template v-slot:request>
                <RequestCard :request="request"></RequestCard>
              </template>
            </RequestDisplay>
          </div>
        </div>
    </article>
  </q-page-container>

  <q-page-container fluid class="full-height" v-else-if="isAuthenticated && (hasInflightStudentRequest || hasCompletedStudentRequest)">
    <article id="request-display-container" class="top-banner full-height">
        <div class="row" justify="center" style="width: 1vw;margin-right: 0;margin-left: 0;margin-bottom: 5rem;">
          <div class="col pt-1 pt-sm-3" xs="10" sm="8" md="6" lg="5" xl="3">
            <q-card class="student-request-card">
              <q-card-section>
                <p v-if="hasInflightStudentRequest" class="ma-0"><strong>You have an UpdateMyPEN request in progress.</strong></p>
                <p v-else class="ma-0"><strong>Hi {{student.legalFirstName || ''}}, you have been provided your PEN and don't need to request it again. Your PEN is {{student.pen}}.</strong></p>
              </q-card-section>
              <q-card-actions>
                <div class="row" justify="center">
                  <q-btn id="home-button" @click="$router.push('home')" class="mb-2" dark color="#003366">Home</q-btn>
                </div>
              </q-card-actions>
            </q-card>
          </div>
        </div>
    </article>
  </q-page-container>

  <q-page-container fluid class="full-height" v-else-if="isAuthenticated">
    <!-- pen request form -->
    <article id="request-form-container" class="top-banner full-height">
        <div class="row" justify="center" style="width: 1vw;margin-right: 0;margin-left: 0;margin-bottom: 5rem;">
          <div class="col" xs="10" sm="10" md="10" lg="10" xl="10">
            <router-view></router-view>
          </div>
        </div>
    </article>
  </q-page-container>


  <q-page-container fluid class="full-height" v-else>
    <article id="request-form-container" class="top-banner full-height">
      <div class="row" justify="center">
        <q-skeleton type="image"></q-skeleton>
      </div>
    </article>
  </q-page-container>
</template>

<script>
import Login from '../Login.vue';
import RequestDisplay from '../RequestDisplay.vue';
import ModalJourney from '../ModalJourney.vue';
import MessageCard from './MessageCard.vue';
import RequestCard from './RequestCard.vue';
import { PenRequestStatuses, StudentRequestStatuses } from '../../utils/constants';
import { pick, values } from 'lodash';
import {mapState} from "pinia";
import {rootStore} from "stores/root";
import {penRequestStore} from "stores/penRequest";
import {studentRequestStore} from "stores/studentRequest";
import {authStore} from "stores/auth";
export default {
  name: 'home',
  components: {
    Login,
    RequestDisplay,
    ModalJourney,
    MessageCard,
    RequestCard,
  },
  computed: {
    ...mapState(authStore, ['isAuthenticated','userInfo', 'isLoading']),
    ...mapState(penRequestStore, ['request']),
    ...mapState(studentRequestStore, {studentRequest: 'request'}),
    ...mapState(rootStore, ['requestType','student']),
    hasPen() {
      return !!this.student && !!this.student.pen;
    },
    hasPenRequest() {
      return !!this.request;
    },
    requestTitle() {
      return this.request && this.request.penRequestStatusCode === PenRequestStatuses.RETURNED ? 'Provide More Info for PEN Request' : 'PEN Request Status';
    },
    newRequestText() {
      return 'Create a new PEN Request';
    },
    hasInflightStudentRequest() {
      return this.studentRequest && values(pick(StudentRequestStatuses, ['DRAFT', 'INITREV', 'RETURNED', 'SUBSREV'])).some(status => status === this.studentRequest.studentRequestStatusCode);
    },
    hasCompletedStudentRequest() {
      return this.studentRequest && this.studentRequest.studentRequestStatusCode === StudentRequestStatuses.COMPLETED;
    },
    hasCompletedPenRequestButNoStudentLinkage() {
      return this.request && this.request.penRequestStatusCode === PenRequestStatuses.MANUAL && !this.student;
    },
    hasBcscLinkageForStudent() {
      return this.userInfo?.accountType === 'BCSC' && this.student;
    },
  },
  created() {
    rootStore().setRequestType('penRequest');
  },
  watch: {
    isLoading(val) {
      if(!val) {
        if(this.hasBcscLinkageForStudent) {
          this.$router.push({ name: 'home' });
        } else if((!this.hasPenRequest && !this.hasInflightStudentRequest) || this.hasCompletedPenRequestButNoStudentLinkage) {
          this.$router.push({ name: 'gmp-step1' });
        }
      }
    }
  },
  methods: {
    canCreateRequest(status) {
      return status === PenRequestStatuses.REJECTED || status === PenRequestStatuses.ABANDONED;
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container{
    padding: 0px;
  }
  .top-banner{
    background-color: aliceblue;
    background-size: cover;
    align-items: center;
    display: flex;
  }
  .full-height{
    height: 100%;
  }
  .infoTab{
    padding: 10px 0px;
    background-color: #fafafa
  }
  .bottomContainer{
    padding-bottom: 30px
  }

  .student-request-card{
    background: #F2E8D5;
  }
</style>

