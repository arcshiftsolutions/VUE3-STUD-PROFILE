<!--suppress ALL -->
<template>
  <q-page-container fluid v-if="!isAuthenticated && !isLoading">
    <ModalJourney/>
    <!-- login article -->
    <article name="login-banner">
        <div class="row" align="center" justify="center" style="margin-right: 0;margin-left: 0">
          <Login></Login>
        </div>
    </article>
  </q-page-container>

  <q-page-container fluid class="full-height" v-else-if="isLoading || (hasRequest && loadingDocuments)">
    <article id="progress-display-container" class="top-banner full-height">
      <div class="row" align="center" justify="center">
        <q-circular-progress
                size="60"
                :width="7"
                color="primary"
                indeterminate
        ></q-circular-progress>
      </div>
    </article>
  </q-page-container>

  <q-page-container fluid class="full-height" v-else-if="isAuthenticated && hasRequest && !loadingDocuments">
    <article id="request-display-container" class="top-banner full-height">
        <div class="row" align="center" justify="center" style="width: 1vw;margin-right: 0;margin-left: 0;margin-bottom: 5rem;">
          <v-alert
            dense
            outlined
            dismissible
            v-model="alert"
            class="bootstrap-error mb-5"
            width="100%"
          >
            {{ alertMessage }}
          </v-alert>
          <div class="col pt-1 pt-sm-3" xs="11" sm="11" md="10" lg="8" xl="6">
            <RequestDisplay 
              :title="requestTitle"
              :can-create-request="canCreateRequest"
              :new-request-text="newRequestText"
              :commentDocuments="commentDocuments"
            >
              <template v-slot:message>
                <MessageCard></MessageCard>
              </template>
              <template v-slot:request>
                <StudentInfoCard :request="request">
                  <template v-slot:info>
                    <div class="row">
                      <p class="mb-0">
                        <strong>
                          Attached Documents
                        </strong>
                      </p>
                    </div>
                    <div class="row mb-2">
                      <DocumentChip
                        v-for="document in initialDocuments"
                        :document="document"
                        :key="document.documentID"
                        :undeletable="true"
                      ></DocumentChip>
                    </div>
                  </template>
                </StudentInfoCard>
              </template>
            </RequestDisplay>
          </div>
        </div>

    </article>
  </q-page-container>

  <q-page-container fluid class="full-height" v-else-if="isAuthenticated && hasInflightGMPRequest">
    <article id="request-display-container" class="top-banner full-height">
        <div class="row" align="center" justify="center" style="width: 1vw;margin-right: 0;margin-left: 0;margin-bottom: 5rem;">
          <div class="col pt-1 pt-sm-3" xs="10" sm="8" md="6" lg="5" xl="3">
            <q-card class="student-request-card">
              <q-card-section>
                <p class="ma-0"><strong>You have a PEN request in progress. Please wait for it to be completed before requesting updates to you PEN information.</strong></p>
              </q-card-section>
              <q-card-actions>
                <div class="row" align="center" justify="center">
                  <q-btn id="home-button" @click="$router.push('home')" class="mb-2" dark color="#003366">Home</q-btn>
                </div>
              </q-card-actions>
            </q-card>
          </div>
        </div>
    </article>
  </q-page-container>


  <q-page-container fluid class="full-height" v-else-if="isAuthenticated && !hasRequest">
    <!-- request form -->
    <article id="request-form-container" class="top-banner full-height">
        <div class="row" align="center" justify="center" style="width: 1vw;margin-right: 0;margin-left: 0;margin-bottom: 5rem;">
          <div class="col" xs="10" sm="10" md="10" lg="10" xl="10">
            <router-view></router-view>
          </div>
        </div>
    </article>
  </q-page-container>


  <q-page-container fluid class="full-height" v-else>
    <article id="request-form-container" class="top-banner full-height">
      <div class="row" align="center" justify="center">
        <q-skeleton type="image"></q-skeleton>
      </div>
    </article>
  </q-page-container>
</template>

<script>
import Login from '../Login';
import RequestDisplay from '../RequestDisplay';
import ModalJourney from '../ModalJourney';
import MessageCard from './MessageCard';
import StudentInfoCard from '../StudentInfoCard';
import DocumentChip from '../DocumentChip.vue';
import { PenRequestStatuses, StudentRequestStatuses } from '@/utils/constants';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { pick, values, partition } from 'lodash';
import ApiService from '@/common/apiService';

export default {
  name: 'Ump',
  components: {
    Login,
    RequestDisplay,
    ModalJourney,
    MessageCard,
    StudentInfoCard,
    DocumentChip,
  },
  data() {
    return {
      loadingDocuments: true,
      initialDocuments: null,
      commentDocuments: null,

      alert: false,
      alertMessage: 'Sorry, an unexpected error seems to have occurred. You can refresh the page later.',
      requestType: 'studentRequest'
    };
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'userInfo', 'isLoading']),
    ...mapGetters('penRequest', {penRequest: 'request'}),
    ...mapGetters('studentRequest', ['request']),
    ...mapGetters(['student']),
    hasStudentRecord() {
      return !!this.student;
    },
    hasRequest() {
      return !!this.request;
    },
    requestTitle() {
      return this.request && this.request.studentRequestStatusCode === StudentRequestStatuses.RETURNED ? 'Provide More Info for UpdateMyPENInfo Request' : 'UpdateMyPENInfo Request Status';
    },
    hasInflightGMPRequest() {
      return this.penRequest && values(pick(PenRequestStatuses, ['DRAFT', 'INITREV', 'RETURNED', 'SUBSREV'])).some(status => status === this.penRequest.penRequestStatusCode);
    },
    newRequestText() {
      return 'Create a new Request';
    },
    requestID() {
      return this.request && this.request.studentRequestID;
    }
  },
  created() {
    this.setRequestType('studentRequest');
    if(this.hasRequest) {
      this.getInitialDocuments();
    }
  },
  watch: {
    isLoading(val) {
      if(!val) {
        if(!this.hasRequest && !this.hasInflightGMPRequest) {
          this.$router.push({ name: 'step1' });
        } else if(this.hasRequest) {
          this.getInitialDocuments();
        }
      }
    }
  },
  methods: {
    ...mapMutations(['setRequestType']),
    ...mapActions('studentRequest',['getDocumentTypeCodes']),
    canCreateRequest(status) {
      return status === StudentRequestStatuses.REJECTED || status === StudentRequestStatuses.COMPLETED || status === StudentRequestStatuses.ABANDONED;
    },
    getInitialDocuments() {
      this.getDocumentTypeCodes();
      ApiService.getDocumentList(this.requestID, this.requestType).then((documentRes) => {
        if(this.request.studentRequestStatusCode === 'DRAFT') {
          this.initialDocuments = documentRes.data;
          this.commentDocuments = [];
        } else {
          [this.initialDocuments, this.commentDocuments] = partition(documentRes.data, doc => doc.createDate < this.request.initialSubmitDate);
        }
      }).catch(error => {
        console.log(error);
        this.alert = true;
      }).finally(() => {
        this.loadingDocuments = false;
      });
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

