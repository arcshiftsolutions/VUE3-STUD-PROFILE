<template>
  <q-card height="100%" width="100%" elevation=0>
    <q-card-subtitle class="px-1 info-card-title">
      Student Information
    </q-card-subtitle>
    <q-page-container fluid class="pt-0 px-1">
      <slot name="hint"></slot>
      <div class="row">
        <div class="col" xl="2" lg="2" md="2" sm="3" xs="3">
          <p class="mb-0">Name:</p>
        </div>
        <div class="col" xl="9" lg="9" md="9" sm="8" xs="8">
          <p class="ml-2 mb-0 names"><strong>{{fullName}}</strong></p>
        </div>
      </div>
      <div class="row">
        <div class="col" xl="2" lg="2" md="2" sm="3" xs="3">
          <p class="mb-0">Birthdate:</p>
        </div>
        <div class="col" xl="9" lg="9" md="9" sm="8" xs="8">
          <p class="ml-2 mb-0"><strong>{{ request.dob ? moment(request.dob).format('MMMM D, YYYY'):'' }}</strong></p>
        </div>
      </div>
      <slot name="info"></slot>
      <div class="row">
        <p class="mb-0">
          <strong>
            Contact Information
          </strong>
        </p>
      </div>
      <div class="row">
        <div class="col" xl="2" lg="2" md="2" sm="3" xs="3">
          <p class="mb-3">E-mail address:</p>
        </div>
        <div class="col" xl="9" lg="9" md="9" sm="8" xs="8">
          <p class="ml-2 mb-3"><strong>{{ request.email }}</strong></p>
        </div>
      </div>
    </q-page-container>
  </q-card>
</template>

<script>

export default {
  name: 'studentInfoCard',
  props: {
    request: {
      type: Object,
      required: true
    },
  },
  computed: {
    fullName() {
      return [this.request.legalFirstName, this.request.legalMiddleNames, this.request.legalLastName].filter(Boolean).join(' ').toUpperCase();
    }
  },
};
</script>

<style scoped>
.v-toolbar /deep/ .v-toolbar__content {
  padding-left: 20px !important;
}

.names {
  text-transform: uppercase;
}

.info-card-title {
  font-size: 1.3rem;
  font-weight: bolder;
  color: #333333;
}
</style>
