<template>
  <q-card class="mx-0 mt-2 mb-5 px-6 py-2 px-sm-10 py-sm-5">
    <div class="row flex-grow-0 pb-5">
      <q-card height="100%" width="100%" elevation=0 color="#036" class="white--text">
        <q-card-title class="request-display-header px-1 px-sm-5">
          <h1>{{title}}</h1>
        </q-card-title>
      </q-card>
    </div>
    <div class="row">
      <v-alert
        dense
        outlined
        dismissible
        v-model="alert"
        :class="alertType"
        class="mb-5"
        width="100%"
      >
        {{ alertMessage }}
      </v-alert>
    </div>
    <div class="row pb-5">
      <slot name="message"></slot>
    </div>
    <div class="row">
      <StatusCard
        :can-create-request="canCreateRequest"
        :new-request-text="newRequestText"
        @success-alert="setSuccessAlert" 
        @error-alert="setErrorAlert"
      ></StatusCard>
    </div>
    <div class="row">
      <Chat 
        v-if="status !== requestStatuses.DRAFT && status !== requestStatuses.INITREV && status !== requestStatuses.ABANDONED"
        :commentDocuments = "commentDocuments"
      ></Chat>
    </div>
    <div class="row">
      <slot name="request" v-if="status !== requestStatuses.ABANDONED"></slot>
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
  </q-card>
</template>

<script>
import { mapGetters } from 'vuex';
import { RequestStatuses } from '@/utils/constants';
import Chat from './Chat';
import StatusCard from './StatusCard';

export default {
  name: 'requestDisplay',
  components: {
    Chat,
    StatusCard
  },
  props: {
    title: {
      type: String,
      required: true
    },
    canCreateRequest: {
      type: Function,
      required: true
    },
    newRequestText: {
      type: String,
      required: true
    },
    commentDocuments: {
      type: Array,
    },
  },
  data() {
    return {
      submitting: false,

      alert: false,
      alertMessage: null,
      alertType: null
    };
  },
  computed: {
    ...mapGetters(['requestType']),
    status() {
      return this.request[`${this.requestType}StatusCode`];
    },
    request() {
      return this.$store.getters[`${this.requestType}/request`];
    },
    requestStatuses() {
      return RequestStatuses;
    },
  },
  mounted() {
    window.scrollTo(0,0);
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
