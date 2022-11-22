<template>
  <div>
    <v-alert outlined class="pa-3 mb-3 mx-3 bootstrap-warning">
      <h3>Guidance:</h3>
      <ul class="pt-2">
        <li>This process can only be completed by the owner of the PEN</li>
        <li>This process can only be completed if you have already left high school. If you are still attending a K-12 school, request changes at your school</li>
      </ul>
    </v-alert>
    <q-card-subtitle>
      <span style="font-size: 1.3rem;font-weight: bolder; color: #333333">{{subtitle}}</span>
    </q-card-subtitle>

    <v-form
      autocomplete="6b4437dc-5a5a-11ea-8e2d-0242ac130003"
      ref="form"
      id="requestForm"
      v-model="validForm"
    >
      <q-page-container fluid class="py-0">
        <div class="row">
          <div cols="12" sm="6" class="col py-0 px-2 px-sm-2 px-md-3 px-lg-3 px-xl-3">
            <q-input
              id='recordedPen'
              v-model="recordedData.pen"
              :rules="penRules"
              color="#003366"
              outlined
              :hint="penHint"
              persistent-hint
              :readonly="hasStudentRecord"
              maxlength="9"
              autocomplete="6b4437dc-5a5a-11ea-8e2d-0242ac130003"
              dense
            ></q-input>
          </div>
        </div>
        <div class="row">
          <div cols="12" sm="6" class="col py-0 px-2 px-sm-2 px-md-3 px-lg-3 px-xl-3">
            <q-input
              id='recordedLegalFirstName'
              v-model.trim="recordedData.legalFirstName"
              :rules="charRules"
              color="#003366"
              outlined
              class="touppercase"
              :hint="firstNameHint"
              persistent-hint
              :readonly="hasStudentRecord"
              maxlength="25"
              autocomplete="6b4437dc-5a5a-11ea-8e2d-0242ac130003"
              dense
            ></q-input>
          </div>
          <div cols="12" sm="6" class="col py-0 px-2 px-sm-2 px-md-3 px-lg-3 px-xl-3">
            <q-input
              id='recordedLegalMiddleNames'
              v-model.trim="recordedData.legalMiddleNames"
              :rules="charRules"
              color="#003366"
              outlined
              class="touppercase"
              :hint="middleNameHint"
              persistent-hint
              :readonly="hasStudentRecord"
              maxlength="25"
              autocomplete="6b4437dc-5a5a-11ea-8e2d-0242ac130003"
              dense
            ></q-input>
          </div>
          <div cols="12" class="col py-0 px-2 px-sm-2 px-md-3 px-lg-3 px-xl-3">
            <q-input
              id='recordedLegalLastName'
              v-model.trim="recordedData.legalLastName"
              :rules="requiredRules(lastNameHint)"
              color="#003366"
              outlined
              class="touppercase"
              :hint="lastNameHint"
              persistent-hint
              :readonly="hasStudentRecord"
              maxlength="25"
              autocomplete="6b4437dc-5a5a-11ea-8e2d-0242ac130003"
              dense
            ></q-input>
          </div>
          <div cols="12" class="col py-0 px-2 px-sm-2 px-md-3 px-lg-3 px-xl-3">
            <q-input
              id='recordedDob'
              color="#003366"
              outlined
              :value="moment(recordedData.dob).format('MMMM D, YYYY')"
              :hint="birthdateHint"
              persistent-hint
              readonly
              v-if="hasStudentRecord"
              dense
            ></q-input>
            <q-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="290px"
              v-else
            >
              <template v-slot:activator="{ on }">
                <q-input
                  color="#003366"
                  outlined
                  :value="recordedData.dob ? moment(recordedData.dob).format('MMMM D, YYYY'):''"
                  :rules="requiredRules(birthdateHint)"
                  :hint="birthdateHint"
                  persistent-hint
                  readonly
                  v-on="on"
                  id="birthdate"
                  @keyup="focusBirthdateField"
                  ref="birthdate"
                  autocomplete="6b4437dc-5a5a-11ea-8e2d-0242ac130003"
                  dense
                ></q-input>
              </template>
              <v-date-picker
                id='dob'
                color="#003366"
                ref="picker"
                v-model="recordedData.dob"
                show-current
                :max="new Date(this.localDate.now().minusYears(5).toString()).toISOString().substr(0, 10)"
                min="1903-01-01"
                @change="save"
              ></v-date-picker>
            </q-menu>
          </div>
          <div cols="12" class="col py-0 px-2 px-sm-2 px-md-3 px-lg-3 px-xl-3" v-if="hasStudentRecord">
            <q-input
              id='recordedEmail'
              v-model="recordedData.email"
              color="#003366"
              outlined
              class="touppercase"
              hint="Recorded E-mail Address"
              persistent-hint
              readonly
              dense
            ></q-input>
          </div>
        </div>

        <div class="row" justify="space-between">
          <div cols="1" sm="2" class="col d-flex justify-left align-self-center py-0 px-0 pl-4">
              <q-btn
                to="home"
                color="#003366"
                class="white--text align-self-center"
                id="cancelButton"
              >
                Cancel
              </q-btn>
          </div>
          <div cols="11" sm="2" class="col d-flex justify-end align-self-center py-0 px-0 pr-3">
            <q-card-actions>
              <q-btn
                color="#003366"
                class="white--text align-self-center"
                id="next-step"
                @click="nextStep"
              >
                Next
              </q-btn>
            </q-card-actions>
          </div>
        </div>
      </q-page-container>
    </v-form>
  </div>
</template>

<script>
import { LocalDate } from '@js-joda/core';
import { pick } from 'lodash';
import {mapState} from "pinia";
import {rootStore} from "stores/root";
import {umpStore} from "stores/ump";

export default {
  name: 'currentInfo',
  data() {
    return {
      localDate: LocalDate,
      validForm: false,
      menu: false,
      recordedData: {
        legalLastName: null,
        legalFirstName: null,
        legalMiddleNames: null,
        dob: null,
        genderCode: null,
        email: null,
      },
    };
  },
  computed: {
    ...mapState(rootStore, ['student']),
    ...mapState(umpStore, { previousData: 'recordedData' }),
    hasStudentRecord() {
      return !!this.student;
    },
    charRules() {
      return [
        v => !(/[\u0590-\u05FF\u0600-\u06FF\u0750-\u077F\u1100-\u11FF\u3040-\u309F\u30A0-\u30FF\u3130-\u318F\u3400-\u4DBF\u4E00-\u9FFF\uAC00-\uD7AF]/.test(v)) || 'Enter English characters only'
      ];
    },
    penRules() {
      return [
        v => !!(v && v.trim()) || this.penHint,
        v => (v && this.checkDigit(v)) || this.penHint
      ];
    },
    subtitle() {
      return this.hasStudentRecord ? 'Below is your current information as it appears in your school record' :
        'Enter current information as it appears on your highschool transcript or school record';
    },
    penHint() {
      return 'Personal Education Number (PEN), EG 123456789';
    },
    firstNameHint() {
      return `Recorded Legal First Name(s)${this.hasStudentRecord ? '' :'; leave blank if you do not have a first name'}`;
    },
    middleNameHint() {
      return `Recorded Legal Middle Name(s) ${this.hasStudentRecord ? '' : 'if applicable'}`;
    },
    lastNameHint() {
      return 'Recorded Legal Last Name';
    },
    birthdateHint() {
      return 'Recorded Birthdate';
    },
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'));
    },
  },
  mounted() {
    if (this.student) {
      this.recordedData = pick(this.student, ['legalLastName', 'legalFirstName', 'legalMiddleNames', 'dob', 'email', 'pen']);
    }
    Object.assign(this.recordedData, this.previousData);
  },
  methods: {
    requiredRules(hint = 'Required') {
      return [
        v => !!(v && v.trim()) || hint,
        ...this.charRules
      ];
    },
    save(date) {
      this.$refs.menu.save(date);
      this.$refs.birthdate.$el.querySelectorAll('#birthdate')[0].focus();
    },
    focusBirthdateField(event) {
      if(event.key === 'Tab' && event.type === 'keyup') {
        this.menu = true;
      }
    },
    validate() {
      this.$refs.form.validate();
    },
    nextStep() {
      if(this.hasStudentRecord || this.validateForm()) {
        umpStore().setRecordedData(this.recordedData);
        this.$emit('next');
      }
    },
    validateForm() {
      this.validate();
      return this.validForm;
    },
    checkDigit(pen) {
      const parsedPen = parseInt(pen);
      if(!pen || pen.length !== 9 || parsedPen === 0 || isNaN(parsedPen)) {
        return false;
      }

      const penDigits = [];
      for(let i = 0; i < pen.length; i++) {
        penDigits[i] = parseInt(pen.charAt(i), 10);
      }
      const S1 = penDigits.slice(0,-1).filter((element,index) => {return index % 2 === 0;}).reduce((a,b) => a+b,0);
      const A = parseInt(penDigits.slice(0,-1).filter((element,index) => {return index % 2 === 1;}).join(''), 10);
      const B = 2 * A;
      let S2 = B.toString().split('').map(Number).reduce(function (a, b) {return a + b;}, 0);
      const S3 = S1 + S2;
      if((S3 % 10) === 0) {
        return penDigits.pop() === 0;
      }
      return penDigits.pop() === (10 - (S3%10));
    },
  }
};
</script>

<style scoped>
  input[autocomplete="6b4437dc-5a5a-11ea-8e2d-0242ac130003"]::-webkit-contacts-auto-fill-button {
    visibility: hidden;
    display: none !important;
    pointer-events: none;
    height: 0;
    width: 0;
    margin: 0;
  }
</style>

<style>
  .touppercase.q-input > .v-input__control > .v-input__slot > .q-input__slot input {
    text-transform: uppercase
  }
</style>

