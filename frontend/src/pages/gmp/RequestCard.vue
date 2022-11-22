<template>
  <q-card height="100%" width="100%">
    <v-toolbar flat color="#036" class="white--text">
      <v-toolbar-title>Data Submitted</v-toolbar-title>
    </v-toolbar>
    <div class="row pt-2 px-2">
      <div class="col" cols="12" xl="5" lg="5" md="5" sm="5">
        <p class="mb-2" color="green">Legal Last Name:</p>
      </div>
      <div class="col" cols="12" xl="6" lg="6" md="6" sm="6">
        <p class="mb-2"><strong>{{ request.legalLastName }}</strong></p>
      </div>
    </div>
    <div class="row pt-2 px-2">
      <div class="col" cols="12" xl="5" lg="5" md="5" sm="5">
        <p class="mb-2" color="green">Legal First Names:</p>
      </div>
      <div class="col" cols="12" xl="6" lg="6" md="6" sm="6">
        <p class="mb-2"><strong>{{ request.legalFirstName }}</strong></p>
      </div>
    </div>
    <div class="row pt-2 px-2 pb-8">
      <div class="col" cols="12" xl="5" lg="5" md="5" sm="5">
        <p class="mb-2" color="green">Legal Middle Names:</p>
      </div>
      <div class="col" cols="12" xl="6" lg="6" md="6" sm="6">
        <p class="mb-2"><strong>{{ request.legalMiddleNames }}</strong></p>
      </div>
    </div>
    <div class="row px-2">
      <div class="col" cols="12" xl="5" lg="5" md="5" sm="5">
        <p class="mb-2">Usual Last Name:</p>
      </div>
      <div class="col" cols="12" xl="6" lg="6" md="6" sm="6">
        <p class="mb-2"><strong>{{ request.usualLastName }}</strong></p>
      </div>
    </div>
    <div class="row px-2">
      <div class="col" cols="12" xl="5" lg="5" md="5" sm="5">
        <p class="mb-2">Usual First Names:</p>
      </div>
      <div class="col" cols="12" xl="6" lg="6" md="6" sm="6">
        <p class="mb-2"><strong>{{ request.usualFirstName }}</strong></p>
      </div>
    </div>
    <div class="row px-2 pb-8">
      <div class="col" cols="12" xl="5" lg="5" md="5" sm="5">
        <p class="mb-2">Usual Middle Names:</p>
      </div>
      <div class="col" cols="12" xl="6" lg="6" md="6" sm="6">
        <p class="mb-2"><strong>{{ request.usualMiddleName }}</strong></p>
      </div>
    </div>
    <div class="row px-2">
      <div class="col" cols="12" xl="5" lg="5" md="5" sm="5">
        <p>Maiden Name:</p>
      </div>
      <div class="col" cols="12" xl="6" lg="6" md="6" sm="6">
        <p><strong>{{ request.maidenName }}</strong></p>
      </div>
    </div>
    <div class="row px-2">
      <div class="col" cols="12" xl="5" lg="5" md="5" sm="5">
        <p class="mb-2" color="green">Past Names:</p>
      </div>
      <div class="col" cols="12" xl="6" lg="6" md="6" sm="6">
        <p class="mb-2"><strong>{{ request.pastNames }}</strong></p>
      </div>
    </div>
    <div class="row px-2">
      <div class="col" cols="12" xl="5" lg="5" md="5" sm="5">
        <p class="mb-2">Date of Birth:</p>
      </div>
      <div class="col" cols="12" xl="6" lg="6" md="6" sm="6">
        <p class="mb-2"><strong>{{ request.dob ? moment(request.dob).format('YYYY-MM-DD'):'' }}</strong></p>
      </div>
    </div>
    <div class="row px-2">
      <div class="col" cols="12" xl="5" lg="5" md="5" sm="5">
        <p class="mb-2" color="green">Current BC School:</p>
      </div>
      <div class="col" cols="12" xl="6" lg="6" md="6" sm="6">
        <p class="mb-2"><strong>{{ request.currentSchool }}</strong></p>
      </div>
    </div>
    <div class="row px-2">
      <div class="col" cols="12" xl="5" lg="5" md="5" sm="5">
        <p class="mb-2">Last BC School:</p>
      </div>
      <div class="col" cols="12" xl="6" lg="6" md="6" sm="6">
        <p class="mb-2"><strong>{{ request.lastBCSchool }}</strong></p>
      </div>
    </div>
    <div class="row px-2">
      <div class="col" cols="12" xl="5" lg="5" md="5" sm="5">
        <p>School Student ID:</p>
      </div>
      <div class="col" cols="12" xl="6" lg="6" md="6" sm="6">
        <p><strong>{{ request.lastBCSchoolStudentNumber }}</strong></p>
      </div>
    </div>
    <div class="row px-2">
      <div class="col" cols="12" xl="5" lg="5" md="5" sm="5">
        <p class="mb-2">Email:</p>
      </div>
      <div class="col" cols="12" xl="6" lg="6" md="6" sm="6">
        <p class="mb-2"><strong>{{ request.email }}</strong></p>
      </div>
    </div>
    <div class="row pb-2 px-2">
      <div class="col" cols="12" xl="5" lg="5" md="5" sm="5">
        <p class="mb-0">ID Type:</p>
      </div>
      <div class="col" cols="12" xl="6" lg="6" md="6" sm="6">
        <p class="mb-0"><strong>{{ userInfo.identityTypeLabel }}</strong></p>
      </div>
    </div>
  </q-card>
</template>

<script>

export default {
  name: 'requestCard',
  props: {
    request: {
      type: Object,
      required: true
    },
  },
  computed: {
    ...mapGetters('auth', ['userInfo']),
  },
};
</script>

<style scoped>
.v-toolbar /deep/ .v-toolbar__content {
  padding-left: 20px !important;
}
</style>
