<template>
  <q-page-container fluid class="full-height" v-if="isAuthenticated && hasInflightGMPRequest">
    <article id="request-display-container" class="top-banner full-height">
        <div class="row" justify="center" style="width: 1vw;margin-right: 0;margin-left: 0;margin-bottom: 5rem;">
          <div class="col pt-1 pt-sm-3" xs="10" sm="8" md="6" lg="5" xl="3">
            <q-card class="student-request-card">
              <q-card-section>
                <p class="ma-0"><strong>You have a PEN request in progress. Please wait for it to be completed before requesting updates to you PEN information.</strong></p>
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
    <!-- request form -->
    <article id="request-form-container" class="top-banner full-height">
      <div class="row" justify="center">
        <div class="col" xs="10" sm="10" md="10" lg="10" xl="10">
        <RequestStepper
          :steps="steps"
          :titles="titles"
        ></RequestStepper>
        </div>
      </div>
    </article>
  </q-page-container>
</template>

<script>
import RequestStepper from '../RequestStepper';
import { PenRequestStatuses } from '../utils/constants';
import { pick, values } from 'lodash';
import {mapState} from "pinia";
import {penRequestStore} from "stores/penRequest";
import {authStore} from "stores/auth.js";
import {umpStore} from "stores/ump.js";
export default {
  name: 'requestPage',
  components: {
    RequestStepper,
  },
  data() {
    return {
      steps: 3,
      titles: ['Current Student Information', 'Requested Changes to Student Information', 'Confirm Changes', 'Submit Changes'],
    };
  },
  computed: {
    ...mapState(authStore, ['isAuthenticated','userInfo']),
    ...mapState(penRequestStore, {penRequest: 'request'}),
    ...mapState(umpStore, ['recordedData','updateData']),
    hasPen() {
      return !!this.userInfo && !!this.userInfo.pen;
    },
    hasInflightGMPRequest() {
      return this.penRequest && values(pick(PenRequestStatuses, ['DRAFT', 'INITREV', 'RETURNED', 'SUBSREV'])).some(status => status === this.penRequest.penRequestStatusCode);
    },
  },
  watch: {
    'updateData.email': function(newVal) {
      if(newVal && this.updateData.email !== this.recordedData.email) {
        this.steps = 4;
      } else if(newVal && this.updateData.email === this.recordedData.email) {
        this.steps = 3;
      }
    },
  },
  mounted() {
    if(!(this.isAuthenticated)){
      this.$router.push('home');
    }
    studentRequestStore().setRequest();
    studentRequestStore().setUnsubmittedDocuments();
  },
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
.student-request-card{
  background: #F2E8D5;
}
</style>
