<template>
  <q-page-container fluid class="full-height" v-if="isAuthenticated && !hasPen">
    <!-- pen request form -->
    <article id="request-form-container" class="top-banner full-height">
      <div class="row" justify="center">
        <div class="col" xs="8" sm="8" md="8" lg="8" xl="8">
          <RequestStepper
            :steps="steps"
            :titles="titles"
            stepRoutePrefix="gmp-"
          ></RequestStepper>
        </div>
      </div>
    </article>
  </q-page-container>
</template>

<script>
import RequestStepper from '../RequestStepper';
import {mapState} from "pinia/dist/pinia";
import {authStore} from "../../stores/auth.js";

export default {
  name: 'request-page',
  components: {
    RequestStepper,
  },
  data() {
    return {
      steps: 3,
      titles: ['PEN Request Form', 'Confirm Information', 'PEN Request Status'],
    };
  },
  computed: {
    ...mapState(authStore, ['isAuthenticated','userInfo']),
    hasPen() {
      return !!this.userInfo && !!this.userInfo.pen;
    },
  },
  mounted() {
    if(!(this.isAuthenticated)){
      this.$router.push('home');
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container{
  padding: 0px;
}
.top-banner{
  background-color: aliceblue;
  background-size: cover;
  align-items: center;
  display: flex;
}
.full-height{
  height: 100%;
}
</style>
