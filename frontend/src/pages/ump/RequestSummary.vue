<template>
  <div v-if="updateData">
    <v-alert
      dense
      outlined
      dismissible
      v-model="alert"
      class="pa-3 mb-3 mx-3 bootstrap-error"
    >
      {{ alertMessage }}
    </v-alert>

    <v-alert outlined class="pa-3 mb-3 mx-3 bootstrap-warning">
      <h3>Guidance:</h3>
      <ul class="pt-2">
        <li>Please review your information below before completing the request. If requested updates are incorrect or need to be adjusted further, use the <strong>Back</strong> button to return to the UpdateMyPENInfo form</li>
      </ul>
    </v-alert>

    <StudentInfoCard :request="updateData" class="px-3">
      <template v-slot:hint>
        <div class="row">
          <p>
            <strong>
              Please confirm that the information below correctly summarizes the requested changes to your PEN Information
            </strong>
          </p>
        </div>
        <div class="row">
          <p class="mb-0">
            <strong>
              My PEN Information should be changed to:
            </strong>
          </p>
        </div>
      </template>
      <template v-slot:info>
        <div class="row">
          <p class="mb-0">
            <strong>
              Attached Documents
            </strong>
          </p>
        </div>
        <div class="row" v-for="document in unsubmittedDocuments" :key="document.documentID">
          <div class="col" xl="2" lg="2" md="2" sm="3" xs="3">
            <p class="mb-3">{{ documentType(document.documentTypeCode) }}:</p>
          </div>
          <div class="col" xl="9" lg="9" md="9" sm="8" xs="8">
            <p class="ml-2 mb-3"><strong>{{ document.fileName }}</strong></p>
          </div>
        </div>
      </template>
    </StudentInfoCard>
    <div class="row" justify="space-between">
      <div cols="1" sm="2" class="col d-flex justify-left align-self-center py-0 px-0 pl-7">
        <q-btn
          to="home"
          color="#003366"
          class="white--text align-self-center"
          id="cancelButton"
        >
          Cancel
        </q-btn>
      </div>
      <div cols="11" sm="2" class="col d-flex justify-end align-self-center py-0 px-0 pr-6">
        <q-card-actions class="justify-end pr-2">
          <q-btn
            color="#003366"
            class="white--text align-self-center"
            id="previous-step"
            @click="previousStep"
          >
            Back
          </q-btn>
          <q-btn
            color="#003366"
            class="white--text align-self-center"
            id="next-step"
            @click="submitRequest"
            :loading="submitting"
          >
            {{ emailChanged ? 'Next' : 'Submit' }}
          </q-btn>
        </q-card-actions>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex';
import StudentInfoCard from '../StudentInfoCard';
import {mapKeys, pick, find} from 'lodash';

export default {
  name: 'requestSummary',
  components: {
    StudentInfoCard,
  },
  data() {
    return {
      submitting: false,

      alert: false,
      alertMessage: null,
    };
  },
  computed: {
    ...mapGetters('ump', ['recordedData', 'updateData']),
    ...mapGetters('studentRequest', ['documentTypeCodes', 'unsubmittedDocuments']),
    emailChanged() {
      return this.recordedData.email !== this.updateData.email;
    },
  },
  methods: {
    ...mapActions('studentRequest', ['postRequest']),
    ...mapMutations('studentRequest', ['setUnsubmittedDocuments']),
    setErrorAlert() {
      this.alertMessage = 'Sorry, an unexpected error seems to have occured. Please try again later.';
      this.alert = true;
      window.scrollTo(0,0);
    },
    createRequestData() {
      let request = pick(this.updateData, ['legalLastName', 'legalFirstName', 'legalMiddleNames', 'dob', 'genderCode', 'email']);
      let recorded = pick(this.recordedData, ['legalLastName', 'legalFirstName', 'legalMiddleNames', 'dob', 'genderCode', 'email', 'pen']);
      recorded = mapKeys(recorded, (_, key) => {
        return 'recorded' + key.slice(0,1).toUpperCase() + key.slice(1);
      });
      const documentIDs = this.unsubmittedDocuments.map(doc => doc.documentID);
      return { ...request, ...recorded, documentIDs };
    },
    async submitRequest() {
      try {
        this.submitting = true;
        const data = this.createRequestData();
        if (this.emailChanged) {
          data.emailVerified = 'N';
        } else {
          data.emailVerified = 'Y';
        }
        const resData = await this.postRequest(data);
        if (resData) {
          this.setUnsubmittedDocuments();
          if (this.emailChanged) {
            this.nextStep();
          } else {
            this.$router.replace({name: 'ump'});
          }
        } else {
          this.setErrorAlert();
        }
      } catch (e) {
        this.setErrorAlert();
        throw e;
      } finally {
        this.submitting = false;
      }
    },
    nextStep() {
      this.$emit('next');
    },
    previousStep() {
      this.$emit('back');
    },
    documentType(documentTypeCode) {
      const typeCode = find(this.documentTypeCodes, ['documentTypeCode', documentTypeCode]);
      return typeCode && typeCode.label;
    },
  },
};
</script>

<style scoped>
@media screen and (max-width: 600px) {

  .request-display-header {
    display: flex;
    justify-content: center;
  }

  .request-display-header h1 {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
