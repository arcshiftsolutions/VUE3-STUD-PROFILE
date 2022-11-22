<template>
  <div v-if="request">
    <v-alert
      dense
      outlined
      dismissible
      v-model="alert"
      :class="`pa-3 mb-3 mx-3 ${alertType}`"
    >
      {{ alertMessage }}
    </v-alert>

    <v-alert outlined class="pa-3 mb-3 mx-3 bootstrap-warning">
      <p><strong>You are almost finished. To complete your request for the changes below, you must verify the email address you provided by completing the following steps:</strong></p>
      <ol class="pt-2">
        <li>Go to your email for {{request.email}} and look for an email from the Ministry of Education and Child Care.  You may need to check your spam folder</li>
        <li>Within 24 hours you must click on the link in the email to complete your request</li>
      </ol>
      <br/>
      <p>If the email has expired or is not in your Inbox (or spam folder) click on the "Resend Verification Email" button below to receive a new email and the follow the 2 steps listed above.</p>
    </v-alert>

    <q-card height="100%" width="100%" elevation=0>
      <div justify="end" class="row pb-5 mx-3">
        <q-btn color="#38598a" dark class="ml-2 text-none" @click.stop="resendVerificationEmail" :loading="sending">Resend Verification Email</q-btn>
      </div>
    </q-card>

    <StudentInfoCard :request="request" class="px-3">
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
    </StudentInfoCard>
  </div>
</template>

<script>
import ApiService from '../common/apiService';
import StudentInfoCard from '../StudentInfoCard';
import {mapState} from "pinia";
import {rootStore} from "../../stores/root.js";
import {studentRequestStore} from "../../stores/studentRequest.js";

export default {
  name: 'requestSubmission',
  components: {
    StudentInfoCard,
  },
  data() {
    return {
      alert: false,
      alertMessage: null,
      alertType: null,

      sending: false,
    };
  },
  computed: {
    ...mapState(rootStore, ['requestType']),
    ...mapState(studentRequestStore, ['request'])
  },
  methods: {
    setSuccessAlert(alertMessage) {
      this.alertMessage = alertMessage;
      this.alertType = 'bootstrap-success';
      this.alert = true;
    },
    setErrorAlert(alertMessage) {
      this.alertMessage = alertMessage;
      this.alertType = 'bootstrap-error';
      this.alert = true;
    },
    resendVerificationEmail() {
      this.sending = true;
      ApiService.resendVerificationEmail(this.request.studentRequestID, this.requestType).then(() => {
        this.setSuccessAlert('Your verification email has been sent successfully.');
      }).catch(() => {
        this.setErrorAlert('Sorry, an unexpected error seems to have occurred. You can click on the resend button again later.');
      }).finally(() =>
        this.sending = false
      );
    },
  }
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
