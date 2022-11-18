<template>
  <q-card height="100%" width="100%">
    <q-card-subtitle class="px-1 info-card-title">
      Your Student Record
    </q-card-subtitle>
    <q-page-container fluid class="pt-0 px-1">
      <div class="row">
        <p>
          Below are the details of your student record at the Ministry of Education and Child Care
        </p>
      </div>
      <div class="row">
        <div class="col" xl="4" lg="4" md="4" sm="4">
          <p class="mb-1">PEN:</p>
        </div>
        <div class="col" xl="4" lg="5" md="5" sm="5">
          <p class="mb-1"><strong>{{student.pen}}</strong></p>
        </div>
      </div>
      <div class="row">
        <div class="col" xl="4" lg="4" md="4" sm="4">
          <p class="mb-1">Legal Last Name:</p>
        </div>
        <div class="col" xl="4" lg="5" md="5" sm="5">
          <p class="mb-1"><strong>{{student.legalLastName}}</strong></p>
        </div>
      </div>
      <div class="row">
        <div class="col" xl="4" lg="4" md="4" sm="4">
          <p class="mb-1">Legal First Name(s):</p>
        </div>
        <div class="col" xl="4" lg="5" md="5" sm="5">
          <p class="mb-1"><strong>{{student.legalFirstName}}</strong></p>
        </div>
      </div>
      <div class="row">
        <div class="col" xl="4" lg="4" md="4" sm="4">
          <p class="mb-1">Legal Middle Name(s):</p>
        </div>
        <div class="col" xl="4" lg="5" md="5" sm="5">
          <p class="mb-1"><strong>{{student.legalMiddleNames}}</strong></p>
        </div>
      </div>
      <div class="row">
        <div class="col" xl="4" lg="4" md="4" sm="4">
          <p class="mb-1">Date of Birth:</p>
        </div>
        <div class="col" xl="4" lg="5" md="5" sm="5">
          <p class="mb-1"><strong>{{ student.dob }}</strong></p>
        </div>
      </div>
      <div class="row">
        <p class="mb-1">
          <strong>
            Contact Information
          </strong>
        </p>
      </div>
      <div class="row">
        <div class="col" xl="4" lg="4" md="4" sm="4">
          <p class="mb-1">E-mail:</p>
        </div>
        <div class="col" xl="4" lg="5" md="5" sm="5">
          <p class="mb-1"><strong>{{ student.email }}</strong></p>
        </div>
      </div>
      <div class="row">
        <v-sheet rounded outlined color="#d3d3d3" >
          <div class="col">
            <strong>Not your information?</strong>
            If the information above does not belong to you, please contact us right away at
            <a href="mailto:pens.coordinator@gov.bc.ca">pens.coordinator@gov.bc.ca</a>.
            If only a piece of this information is incorrect, please complete an
            <router-link to="ump">Update my PEN request</router-link>.
          </div>
        </v-sheet>
      </div>
    </q-page-container>
  </q-card>
</template>

<script>
import {mapState} from "pinia";
import {rootStore} from "stores/root";

export default {
  name: 'UserStudentCard',
  computed: {
    ...mapState(rootStore, ['student']),
  },
};
</script>

<style scoped>
.names {
  text-transform: uppercase;
}

.info-card-title {
  font-size: 1.3rem;
  font-weight: bolder;
  color: #333333;
}
</style>
