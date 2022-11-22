<template>
  <div v-if="dataReady">
    <q-card color="#FFECA9" class="pa-3 mb-8 mx-3">
      <h3>Guidance:</h3>
      <ul class="pt-2">
        <li>This form can only be completed by the owner of the PEN</li>
        <li>Enter your legal name exactly as it appears on your Government Photo ID; including any middle names if applicable</li>
        <li>If your name has been legally changed since attending school in British Columbia, please indicate previous
          name(s) in Past Names field
        </li>
      </ul>
    </q-card>
    <q-card-subtitle><span style="font-size: 1.3rem;font-weight: bolder; color: #333333">Student Information</span>
    </q-card-subtitle>

    <v-form autocomplete="6b4437dc-5a5a-11ea-8e2d-0242ac130003"
      ref="form" id="penRequestForm"
      v-model="validForm"
    >

      <q-page-container fluid class="py-0">
        <div class="row">
          <div class="col declaration py-0 px-2 px-sm-2 px-md-3 px-lg-3 px-xl-3">
            <v-checkbox
              v-model="declared"
              color="green"
              class="mt-0"
              :rules="privacyRule('')"
            >
              <template v-slot:label>
                <div class="pl-3">
                  I declare that I am submitting a request for my Personal Education Number on my own behalf. (If you are a parent/guardian go to your child's school to get their PEN.)
                </div>
              </template>
            </v-checkbox>
          </div>
        </div>
        <div class="row">
          <div cols="12" class="col py-0 px-2 px-sm-2 px-md-3 px-lg-3 px-xl-3">
            <q-input
              id='legalLastName'
              :readonly="serviceCardBool"
              v-model.trim="userPost.legalLastName"
              color="#003366"
              outlined
              class="touppercase"
              :rules="requiredRules(legalLastNameHint)"
              :hint="legalLastNameHint"
              label="Legal Last Name"
              :disabled="enableDisableForm.disabled"
              required
              autocomplete="6b4437dc-5a5a-11ea-8e2d-0242ac130003"
              maxlength="25"
              dense
            ></q-input>
          </div>
          <div cols="12" sm="6" class="col py-0 px-2 px-sm-2 px-md-3 px-lg-3 px-xl-3">
            <q-input
              id='legalFirstName'
              :readonly="serviceCardBool"
              v-model.trim="userPost.legalFirstName"
              color="#003366"
              hint="As shown on current Government Photo ID. Note, If you have ONE name only – enter it into the Legal Last Name field and leave Legal First Name blank"
              outlined
              class="touppercase"
              label="Legal First Name(s) (if applicable)"
              :disabled="enableDisableForm.disabled"
              autocomplete="6b4437dc-5a5a-11ea-8e2d-0242ac130003"
              maxlength="25"
              dense
              :rules="charRules"
            ></q-input>
          </div>
          <div cols="12" sm="6" class="col py-0 px-2 px-sm-2 px-md-3 px-lg-3 px-xl-3">
            <q-input
              id='legalMiddleNames'
              :readonly="serviceCardBool"
              v-model.trim="userPost.legalMiddleNames"
              color="#003366"
              hint="As shown on current Government Photo ID"
              outlined
              class="touppercase"
              label="Legal Middle Name(s) (provide if applicable)"
              :disabled="enableDisableForm.disabled"
              autocomplete="6b4437dc-5a5a-11ea-8e2d-0242ac130003"
              maxlength="25"
              dense
              :rules="charRules"
            ></q-input>
          </div>
          <div cols="12" class="col py-0 px-2 px-sm-2 px-md-3 px-lg-3 px-xl-3">
            <q-input
              id='usualLastName'
              v-model.trim="userPost.usualLastName"
              color="#003366"
              outlined
              class="touppercase"
              hint="Only if different from Legal Last Name"
              label="Usual Last Name (optional)"
              :disabled="enableDisableForm.disabled"
              autocomplete="6b4437dc-5a5a-11ea-8e2d-0242ac130003"
              maxlength="25"
              dense
              :rules="charRules"
            ></q-input>
          </div>
          <div cols="12" sm="6" class="col py-0 px-2 px-sm-2 px-md-3 px-lg-3 px-xl-3">
            <q-input
              id='usualFirstName'
              v-model.trim="userPost.usualFirstName"
              color="#003366"
              outlined
              class="touppercase"
              hint="Only if different from Legal First Name"
              label="Usual First Name(s) (optional)"
              :disabled="enableDisableForm.disabled"
              autocomplete="6b4437dc-5a5a-11ea-8e2d-0242ac130003"
              maxlength="25"
              dense
              :rules="charRules"
            ></q-input>
          </div>
          <div  cols="12" sm="6" class="col py-0 px-2 px-sm-2 px-md-3 px-lg-3 px-xl-3">
            <q-input
              id='usualMiddleNames'
              v-model.trim="userPost.usualMiddleName"
              color="#003366"
              outlined
              class="touppercase"
              hint="Only if different from Legal Middle Name"
              label="Usual Middle Name(s) (optional)"
              :disabled="enableDisableForm.disabled"
              autocomplete="6b4437dc-5a5a-11ea-8e2d-0242ac130003"
              maxlength="25"
              dense
              :rules="charRules"
            ></q-input>
          </div>
          <div cols="12" sm="6" class="col py-0 px-2 px-sm-2 px-md-3 px-lg-3 px-xl-3">
            <q-input
              id='maidenName'
              v-model.trim="userPost.maidenName"
              color="#003366"
              class="touppercase"
              hint="List all previous Last names used separated with spaces"
              outlined
              label="Maiden Name (if applicable)"
              :disabled="enableDisableForm.disabled"
              autocomplete="6b4437dc-5a5a-11ea-8e2d-0242ac130003"
              maxlength="40"
              dense
              :rules="charRules"
            ></q-input>
          </div>
          <div cols="12" sm="6" class="col py-0 px-2 px-sm-2 px-md-3 px-lg-3 px-xl-3">
            <q-input
              id='pastNames'
              v-model.trim="userPost.pastNames"
              color="#003366"
              hint="List all previous names used separated with spaces"
              outlined
              class="touppercase"
              label="Past Name(s) (if applicable)"
              :disabled="enableDisableForm.disabled"
              autocomplete="6b4437dc-5a5a-11ea-8e2d-0242ac130003"
              maxlength="255"
              dense
              :rules="charRules"
            ></q-input>
          </div>
          <div cols="12" class="col py-0 px-2 px-sm-2 px-md-3 px-lg-3 px-xl-3">
            <q-input
              color="#003366"
              outlined
              v-model="userPost.dob"
              label="Birthdate"
              readonly
              id="birthdate"
              v-if="serviceCardBool"
              required
              :disabled="enableDisableForm.disabled"
              autocomplete="6b4437dc-5a5a-11ea-8e2d-0242ac130003"
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
              <template v-slot:activator="{}">
                <q-input
                  color="#003366"
                  outlined
                  v-model="userPost.dob"
                  label="Birthdate"
                  readonly
                  id="birthdate"
                  :rules="requiredRules()"
                  :disabled="enableDisableForm.disabled"
                  required
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
                v-model="userPost.dob"
                show-current
                :max="new Date(this.localDate.now().minusYears(5).toString()).toISOString().substr(0, 10)"
                min="1903-01-01"
                @change="save"
              ></v-date-picker>
            </q-menu>
          </div>
          <div cols="12" class="col py-0 px-2 px-sm-2 px-md-3 px-lg-3 px-xl-3">
            <q-input
              id='email'
              v-model="userPost.email"
              :rules="emailRules"
              color="#003366"
              :hint="emailHint"
              class="touppercase"
              outlined
              label="E-mail Address"
              :disabled="enableDisableForm.disabled"
              required
              autocomplete="6b4437dc-5a5a-11ea-8e2d-0242ac130003"
              maxlength="255"
              dense
            ></q-input>
          </div>
          <div cols="12" class="col py-0 px-2 px-sm-2 px-md-3 px-lg-3 px-xl-3">
            <q-input
              id='lastBCSchool'
              v-model.trim="userPost.lastBCSchool"
              color="#003366"
              hint="Last BC K-12 school or Post Secondary Institute attended"
              outlined
              class="touppercase"
              label="Last B.C. School Attended (optional)"
              :disabled="enableDisableForm.disabled"
              autocomplete="6b4437dc-5a5a-11ea-8e2d-0242ac130003"
              maxlength="255"
              dense
              :rules="charRules"
            ></q-input>
          </div>
          <div cols="12" class="col py-0 px-2 px-sm-2 px-md-3 px-lg-3 px-xl-3">
            <q-input
              id='lastBCStudentNumber'
              v-model.trim="userPost.lastBCSchoolStudentNumber"
              color="#003366"
              hint="School Issued Local ID"
              outlined
              class="touppercase"
              label="School Student ID Number (optional)"
              :disabled="enableDisableForm.disabled"
              autocomplete="6b4437dc-5a5a-11ea-8e2d-0242ac130003"
              maxlength="12"
              dense
              :rules="charRules"
            ></q-input>
          </div>
          <div cols="12" class="col py-0 px-2 px-sm-2 px-md-3 px-lg-3 px-xl-3">
            <q-input
              id='currentSchool'
              v-model.trim="userPost.currentSchool"
              color="#003366"
              hint="Current BC K-12 school or Post Secondary Institute"
              outlined
              class="touppercase"
              label="Current B.C. School Attending (optional)"
              :disabled="enableDisableForm.disabled"
              autocomplete="6b4437dc-5a5a-11ea-8e2d-0242ac130003"
              maxlength="255"
              dense
              :rules="charRules"
            ></q-input>
          </div>
        </div>
      </q-page-container>
      <q-page-container fluid noPadding>
        <div class="row">
          <div cols="12" class="col declaration py-0 px-2 px-sm-2 px-md-3 px-lg-3 px-xl-3">
            <v-checkbox id="acceptance_chk"
              v-model="acceptance"
              color="green"
              class="mt-0"
              :rules="acceptanceRule('')"
              @click="clickAcceptance"
            >
              <template v-slot:label>
                <div class="pl-3">
                  The personal demographic data provided above is complete and accurate.
                </div>
              </template>
            </v-checkbox>
          </div>
        </div>
        <div class="row">
          <div id="confidential_information" cols="12" class="col py-0 px-2 px-sm-2 px-md-3 px-lg-3 px-xl-3">
            <q-card height="100%" width="100%" elevation=2
                    class="black--text pa-4">

              <p><strong>Collection Notice:</strong></p>
              <p>
                The information included in this form is collected under ss. 26(c) of the Freedom of Information and Protection of Privacy Act, R.S.B.C. 1996, c. 165.
                The information you provide will be used in confirming your identity and communicating with you.
              </p>
              <p>
                If you have any questions about the collection and use of this information, please contact:
              </p>
              <p>
                <a href="mailto:pens.coordinator@gov.bc.ca">PEN Coordinator</a><br/>
                Data Management Unit, Student Data & Educational Resource Services Branch<br/>
                B.C. Ministry of Education and Child Care<br/>
                PO Box 9886 Stn Prov Govt<br/>
                Victoria BC V8W 9T6<br/>
                OR through Enquiry BC (Victoria): (250) 387-6121
              </p>
            </q-card>
          </div>
        </div>
        <div justify="space-between" class="row pt-2">
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
            <q-card-actions class="justify-end">
              <q-btn
                color="#003366"
                class="white--text align-self-center"
                id="submit_form"
                @click="submitRequestForm"
                :disabled="!validForm"
                :loading="submitting"
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
import {LocalDate} from '@js-joda/core';
import {mapState} from "pinia";
import {authStore} from "stores/auth";
import {gmpStore} from "stores/gmp";

export default {
  data() {
    return {
      localDate:LocalDate,
      legalLastNameHint: 'As shown on current Government Photo ID. Note, If you have ONE name only – enter it in Legal Last Name field and leave Legal First Name blank',
      emailHint: 'Valid Email Required',
      menu: false,
      appTitle: import.meta.env.VUE_APP_TITLE,
      entries: [],
      isLoading: false,
      model: null,
      search: null,
      nameLimit: 80,
      validForm: false,
      submitting: false,
      acceptance: false,
      userPost: {
        digitalID: null,
        legalLastName: null,
        legalFirstName: null,
        legalMiddleNames: null,
        usualLastName: null,
        usualFirstName: null,
        usualMiddleName: null,
        maidenName: null,
        pastNames: null,
        dob: null,
        genderCode: null,
        email: null,
        lastBCSchool: null,
        lastBCSchoolStudentNumber: null,
        currentSchool: null
      },
      enableDisableForm: {
        disabled: true
      },
      serviceCardReadOnlyFields:[
        'legalLastName',
        'legalFirstName',
        'legalMiddleNames',
      ],
    };
  },
  computed: {
    ...mapState(authStore, ['userInfo']),
    ...mapState(gmpStore, ['requestData']),

    dataReady() {
      return !!this.userInfo;
    },
    serviceCardBool() {
      return this.dataReady && this.userInfo.accountType === 'BCSC';
    },
    emailRules() {
      return [
        v => !!v || this.emailHint,
        v => /^[\w!#$%&’*+/=?`{|}~^-]+(?:\.[\w!#$%&’*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}$/.test(v) || this.emailHint,
      ];
    },
    charRules() {
      return [
        v => !(/[\u0590-\u05FF\u0600-\u06FF\u0750-\u077F\u1100-\u11FF\u3040-\u309F\u30A0-\u30FF\u3130-\u318F\u3400-\u4DBF\u4E00-\u9FFF\uAC00-\uD7AF]/.test(v)) || 'Enter English characters only'
      ];
    },
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'));
    },
  },
  mounted() {

    //populate form if user is logged in with BCSC
    if (this.userInfo && this.userInfo.accountType === 'BCSC') {
      this.userPost.legalLastName = this.userInfo.legalLastName;
      this.userPost.legalFirstName = this.userInfo.legalFirstName;
      this.userPost.legalMiddleNames = this.userInfo.legalMiddleNames;
      this.userPost.email = this.userInfo.email;
      this.userPost.usualMiddleName = this.userInfo.usualMiddleNames;
      this.userPost.usualLastName = this.userInfo.usualLastName;
      this.userPost.usualFirstName = this.userInfo.usualFirstName;
      this.userPost.dob = this.userInfo.dob?(this.userInfo.dob).substr(0, 10):'';
    }
    Object.assign(this.userPost, this.requestData);
  },
  methods: {
    requiredRules(hint = 'Required') {
      return [
        v => !!(v && v.trim()) || hint,
        ...this.charRules
      ];
    },
    privacyRule(hint = 'Required') {
      this.enableDisableForm.disabled = !this.declared;
      return [v => !!v || hint];
    },
    acceptanceRule(hint = 'Required') {
      this.validForm = (this.validForm && this.declared && this.acceptance);
      return [v => !!v || hint];
    },
    save(date) {
      this.$refs.menu.save(date);
      this.$refs.birthdate.$el.querySelectorAll('#birthdate')[0].focus();
    },
    validate() {
      this.$refs.form.validate();
    },
    submitRequestForm() {
      this.validate();
      if (this.validForm) {
        gmpStore().setRequestData(this.userPost);
        this.$emit('next');
      }
    },
    maxSelectableDate(){
      return new Date(LocalDate.now().minusYears(5).toString()).toISOString().substr(0, 10);
    },
    clickAcceptance() {
      if(this.acceptance) {
        this.validate();
      }
    },
    focusBirthdateField(event) {
      if(event.key === 'Tab' && event.type === 'keyup') {
        this.menu = true;
      }
    }
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
  .mainCard {
    margin: 20px 0;
    padding: 10px;
    width: 100%;
    /* max-width: 900px; */
  }

  .declaration /deep/ .v-icon {
    padding-left: 2px;
  }

  .noPadding {
    padding-top: 0;
    margin-top: 0;
  }

  .top_group {
    padding-top: 15px;
  }

  .bottom_group {
    padding-bottom: 15px;
  }

  @media screen and (max-width: 300px) {
    .mainCard {
      margin-top: .1vh;
      padding-top: 10px;
      width: 100%;
      margin-bottom: 8rem;
    }
  }

  @media screen and (min-width: 301px) and (max-width: 600px) {
    .mainCard {
      margin-top: .1vh;
      padding-top: 10px;
      width: 100%;
      margin-bottom: 7rem;
    }
  }

  @media screen and (min-width: 601px) and (max-width: 900px) {
    .mainCard {
      margin-top: .1vh;
      padding-top: 10px;
      width: 100%;
      margin-bottom: 7rem;
    }
  }
</style>

<style>
.touppercase.q-input > .v-input__control > .v-input__slot > .q-input__slot input {
  text-transform: uppercase
}
</style>
