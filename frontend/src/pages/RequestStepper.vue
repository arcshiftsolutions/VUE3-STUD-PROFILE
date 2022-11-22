<template>
  <q-stepper
    v-model="step"
    ref="stepper"
    color="primary"
    animated
  >
    <q-step
      :name="1"
      title="Select campaign settings"
      icon="settings"
      :done="step > 1"
    >
      For each ad campaign that you create, you can control how much you're willing to
      spend on clicks and conversions, which networks and geographical locations you want
      your ads to show on, and more.
    </q-step>

    <q-step
      :name="2"
      title="Create an ad group"
      caption="Optional"
      icon="create_new_folder"
      :done="step > 2"
    >
      An ad group contains one or more ads which target a shared set of keywords.
    </q-step>

    <q-step
      :name="3"
      title="Ad template"
      icon="assignment"
      disable
    >
      This step won't show up because it is disabled.
    </q-step>

    <q-step
      :name="4"
      title="Create an ad"
      icon="add_comment"
    >
      Try out different ad text to see what brings in the most customers, and learn how to
      enhance your ads using features like ad extensions. If you run into any problems with
      your ads, find out how to tell if they're running and how to resolve approval issues.
    </q-step>

    <template v-slot:navigation>
      <q-stepper-navigation>
        <q-btn @click="$refs.stepper.next()" color="primary" :label="step === 4 ? 'Finish' : 'Continue'"></q-btn>
        <q-btn v-if="step > 1" flat color="primary" @click="$refs.stepper.previous()" label="Back" class="q-ml-sm"></q-btn>
      </q-stepper-navigation>
    </template>
  </q-stepper>
<!--    <q-stepper class="mainCard" v-model="stepCount" v-if="dataReady">-->
<!--      <v-row align-content="center" class="flex-grow-0 pb-5">-->
<!--        <q-card style="margin-right: 1.4rem;margin-left: 1.4rem" height="100%" width="100%" elevation=0 color="#036"-->
<!--                class="white&#45;&#45;text">-->
<!--          <q-card-title class="py-3 pl-5"><h1>{{titles[stepCount-1]}}</h1></q-card-title>-->
<!--        </q-card>-->
<!--      </v-row>-->

<!--      <v-stepper-header class="mx-3">-->
<!--        <template>-->
<!--          <span v-for="n in steps" :key="`${n}-step`" :name="`${n}`" :done="stepCount > n" :step="n">-->
<!--              <v-stepper-step>-->
<!--                Step {{ n }}-->
<!--              </v-stepper-step>-->

<!--              <v-divider-->
<!--                v-if="n !== steps"-->
<!--                :key="n"-->
<!--              ></v-divider>-->
<!--            </span>-->
<!--        </template>-->
<!--      </v-stepper-header>-->

<!--      <v-stepper-items>-->
<!--        <v-stepper-content v-for="index in 4" :step="index" :key="index" class="px-0">-->
<!--          <router-view v-if="stepCount===index" @next="nextStep" @back="previousStep"></router-view>-->
<!--        </v-stepper-content>-->
<!--      </v-stepper-items>-->
<!--    </q-stepper>-->
</template>

<script>

import {mapState} from "pinia";
import {authStore} from "stores/auth";

export default {
  name: 'requestStepper',
  props: {
    steps: {
      type: Number,
      required: true
    },
    titles: {
      type: Array,
      required: true
    },
    stepRoutePrefix: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      step: 1,
      stepCount: 1,
    };
  },
  computed: {
    ...mapState(authStore, ['userInfo']),
    dataReady() {
      return !!this.userInfo;
    },
  },
  watch: {
    $route: {
      handler() {
        const stepName = this.$route.name.replace(this.stepRoutePrefix, '');
        switch (stepName) {
        case 'step1':
          this.stepCount = 1;
          break;
        case 'step2':
          this.stepCount = 2;
          break;
        case 'step3':
          this.stepCount = 3;
          break;
        case 'step4':
          this.stepCount = 4;
        }
        window.scrollTo(0,0);
      }
    }
  },
  methods: {
    goToRoute(name) {
      this.$router.push({ name: name });
    },
    nextStep() {
      this.goToRoute(`${this.stepRoutePrefix}step${this.stepCount + 1}`);
      window.scrollTo(0,0);
    },
    previousStep() {
      this.goToRoute(`${this.stepRoutePrefix}step${this.stepCount - 1}`);
      window.scrollTo(0,0);
    }
  }
};
</script>

<style scoped>
  .mainCard {
    margin: 20px 0;
    padding: 10px;
    width: 100%;
    /* max-width: 900px; */
  }

  .v-stepper /deep/ .v-icon {
    padding-left: 2px;
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
