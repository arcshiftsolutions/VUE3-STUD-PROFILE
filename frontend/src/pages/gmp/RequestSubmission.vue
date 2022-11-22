<template>
  <div v-if="request" class="px-6">
    <div class="row">
      <v-alert
        dense
        outlined
        dismissible
        v-model="alert"
        width="100%"
        :class="`pa-3 mb-3 ${alertType}`"
      >
        {{ alertMessage }}
      </v-alert>
    </div>

    <div class="row pb-5">
      <MessageCard></MessageCard>
    </div>
    <div class="row">
      <StatusCard
        @success-alert="setSuccessAlert"
        @error-alert="setErrorAlert"
      ></StatusCard>
    </div>
    <div class="row">
      <RequestCard :request="request"></RequestCard>
    </div>
    <div justify="end" class="row py-1">
      <div cols="12" sm="2" class="col d-flex justify-end align-self-center py-0 px-0 pr-4 pt-3">
        <q-btn
          color="#003366"
          class="white--text align-self-center"
          id="Home"
          to="home"
        >
          Home
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex';
import StatusCard from '../StatusCard';
import MessageCard from './MessageCard';
import RequestCard from './RequestCard';

export default {
  name: 'requestSubmission',
  components: {
    StatusCard,
    MessageCard,
    RequestCard
  },
  data() {
    return {
      alert: false,
      alertMessage: null,
      alertType: null,
    };
  },
  computed: {
    ...mapGetters('penRequest', ['request']),
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
  }
};
</script>
