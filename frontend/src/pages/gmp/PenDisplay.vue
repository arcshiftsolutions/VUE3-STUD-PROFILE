<template>
     <q-card>
       <q-card-title>
         <h3>Your PEN</h3>
        </q-card-title>
       <q-card-section>
         <div class="row card-row">
            <q-input
              :value="student.pen"
              outlined
              readonly
              id="penContainer"
              append-icon="$copy"
              color="#003366"
              @click:append="copyClipboard"
            ></q-input>

        <v-snackbar v-model="clipboard" color="info" :timeout="2000">
          PEN Copied to Clipboard!
        </v-snackbar>

         </div>
         <q-separator></q-separator>
         <div class="row card-row">
          <h4>Where can I use my PEN?</h4>
          <p>The following links lead to applications where you can use your PEN</p>
          <ul>
            <div class="row">
              <div class="col list-col">
                <li><a href="https://www2.gov.bc.ca/gov/content/education-training/k-12/support/transcripts-and-certificates">Student Transcript Service</a></li>
              </div>
              <div class="col list-col">
                <li><a href="https://studentaidbc.ca/">Student Aid B.C.</a></li>
              </div>
            </div>
            <!-- student financial aid, and education planner bc , info page/help -->
            <div class="row">
              <div class="col list-col">
                <li><a href="https://www.educationplannerbc.ca/">Education Planner B.C.</a></li>
              </div>
              <div class="col list-col">
                <li><a href="/quasar-project/public">Help</a></li>
              </div>
            </div>
          </ul>
        </div>
      </q-card-section>
     </q-card>
</template>

<script>
import {mapState} from "pinia/dist/pinia";
import {penRequestStore} from "stores/penRequest";
export default {
  data() {
    return {
      clipboard: false
    };
  },
  computed: {
    ...mapState(penRequestStore, ['request'])
  },
  methods: {
    async copyClipboard() {
      /* Get the text field */
      const copyText = document.getElementById('penContainer');

      /* Select the text field */
      copyText.select();
      copyText.setSelectionRange(0, 99999); /*For mobile devices*/

      document.execCommand('copy');
      this.clipboard = true;
    }
  },
};
</script>

<style scoped>
.card-row{
  padding: 0 15px;
}

p{
  padding-top: 10px
}
ul{
  width: 100%;
}


</style>
