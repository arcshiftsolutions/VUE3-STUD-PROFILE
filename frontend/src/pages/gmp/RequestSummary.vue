<template>
  <div v-if="requestData">
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
        <li>Please review your information and email below before completing the request. If anything is incorrect, use the <strong>Back</strong> button to return to the GetMyPEN form</li>
        <li>If we are unable to locate your PEN based on the information provided below;</li>
        <div class="pl-16">
          <li>identification may be requested or,</li>
          <li>your PEN request may be rejected</li>
        </div>
      </ul>
    </v-alert>

    <StudentInfoCard :request="requestData" class="px-3">
      <template v-slot:hint>
        <div class="row">
          <p>
            <strong>
              Please confirm the information below correctly summarizes your legal names, demographic information and contact information before continuing.
            </strong>
          </p>
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
            Next
          </q-btn>
        </q-card-actions>
      </div>
    </div>
  </div>
</template>

<script>
import StudentInfoCard from '../StudentInfoCard';
import {mapState} from "pinia";
import {gmpStore} from "stores/gmp";
import {penRequestStore} from "stores/penRequest";

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
    ...mapState(gmpStore, ['requestData']),
  },
  methods: {
    setErrorAlert() {
      this.alertMessage = 'Sorry, an unexpected error seems to have occured. Please try again later.';
      this.alert = true;
      window.scrollTo(0,0);
    },
    async submitRequest() {
      try {
        this.submitting = true;
        const resData = await penRequestStore().postRequest(this.requestData);
        if (resData) {
          await penRequestStore().setRequest(resData);
          this.nextStep();
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
    }
  },
};
</script>
