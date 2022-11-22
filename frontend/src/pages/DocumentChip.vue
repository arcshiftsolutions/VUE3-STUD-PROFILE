<template>
  <q-menu
    v-model="menu"
    bottom
    right
    transition="scale-transition"
    origin="top left"
  >
    <template v-slot:activator="{ on }">
      <q-chip
        class="chip-overflow ma-1 px-2 align-self-center"
        close
        :close-icon="disabled ? '' : 'fa-chevron-down' "
        :color="disabled ? 'black' : '#0C7CBA' "
        :disabled="disabled"
        label
        outlined
        v-on="on"
        @click:close="menu = true"
      >
        {{ document.fileName }}
      </q-chip>
    </template>

    <q-card width="380px" class="pa-1 pa-sm-2">
      <q-list>
        <q-item class="pa-0 pa-sm-0">
          <q-item-avatar>
            <v-icon>fa-id-card</v-icon>
          </q-item-avatar>
          <q-item-content>
            <q-item-label>{{ documentType }}</q-item-label>
          </q-item-content>
        </q-item>

        <q-item class="px-0 pa-sm-0">
          <q-item-avatar>
            <v-icon>fa-file</v-icon>
          </q-item-avatar>
          <q-item-content>
            <q-item-label>
              <router-link :to="{ path: documentUrl }" target="_blank">{{ document.fileName }}</router-link>
            </q-item-label>
          </q-item-content>
        </q-item>

        <q-item class="px-0 pa-sm-0">
          <q-item-avatar>
            <v-icon>fa-hdd</v-icon>
          </q-item-avatar>
          <q-item-content>
            <q-item-label>{{ fileSize }}</q-item-label>
          </q-item-content>
        </q-item>

        <q-item class="px-0 pa-sm-0">
          <q-item-avatar>
            <v-icon>fa-clock</v-icon>
          </q-item-avatar>
          <q-item-content>
            <q-item-label>{{ humanCreateDate }}</q-item-label>
          </q-item-content>
        </q-item>
      </q-list>

      <v-alert dense outlined dismissible v-model="alert" :class="alertType" class="mx-3 my-1">
        {{ alertMessage }}
      </v-alert>

      <q-card-actions>
        <v-spacer></v-spacer>
        <q-btn color="#003366" @click.stop="deleteDocument()" class="white--text" id="delete-document"
               :loading="deleting" v-if="!undeletable">Delete
        </q-btn>
        <q-btn id="documentUploadCancel" color="#003366" @click="menu = false" class="white--text">Cancel</q-btn>
      </q-card-actions>
    </q-card>
  </q-menu>
</template>

<script>
import {humanFileSize} from '../utils/file';
import {ApiRoutes} from '../utils/constants';
import {find} from 'lodash';
import {mapState} from "pinia";
import {rootStore} from "../stores/root.js";

export default {
  props: {
    document: {
      type: Object,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    undeletable: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      deleting: false,
      menu: false,

      alert: false,
      alertMessage: null,
      alertType: null
    };
  },
  computed: {
    ...mapState(rootStore, ['requestType']),
    documentTypeCodes() {
      return this.$store.getters[`${this.requestType}/documentTypeCodes`];
    },
    requestID() {
      return this.$store.getters[`${this.requestType}/requestID`];
    },
    documentType() {
      const typeCode = find(this.documentTypeCodes, ['documentTypeCode', this.document.documentTypeCode]);
      return typeCode && typeCode.label;
    },
    fileSize() {
      return humanFileSize(this.document.fileSize);
    },
    humanCreateDate() {
      return this.document.createDate.replace(/T/, ', ').replace(/\..+/, '');
    },
    documentUrl() {
      if(this.requestID) {
        return `${ApiRoutes[this.requestType].REQUEST}/${this.requestID}/documents/${this.document.documentID}/download/${this.document.fileName}`;
      } else {
        return `${ApiRoutes[this.requestType].REQUEST}/documents/${this.document.documentID}/download/${this.document.fileName}`;
      }
    },
  },
  methods: {
    deleteFile(documentData) {
      return this.$store.dispatch(`${this.requestType}/deleteFile`, documentData);
    },
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
    deleteDocument() {
      this.deleting = true;
      this.deleteFile({
        requestID: this.requestID,
        documentID: this.document.documentID
      }).then(() => {
        this.setSuccessAlert('Your document has been deleted successfully.');
      }).catch(() => {
        this.setErrorAlert('Sorry, an unexpected error seems to have occured. You can click on the delete button again later.');
      }).finally(() => {
        this.deleting = false;
      });
    },
  },
};
</script>

<style scoped>

.chip-overflow /deep/ .q-chip__content {
  line-height: 28px;
  display: inline-block !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: 38px !important;
  position: relative;
}

.chip-overflow /deep/ .q-chip__close {
  border-left: 1px solid #0C7CBA;
  position: absolute;
  top: 5px;
  right: 8px;
  width: 24px;
  padding-left: 7px !important;
  max-width: 24px;
}

.q-item {
  min-height: 0;
}

.q-item__content {
  padding: 8px 0;
}

.q-avatar {
  margin: 4px 16px 4px 0 !important;
  height: 36px !important;
  min-width: 36px !important;
  width: 36px !important;
}

@media screen and (max-width: 320px) {
  .q-item /deep/ .q-item__title {
    font-size: 0.85rem;
  }

  .q-avatar {
    margin-right: 0 !important;
  }

  .v-icon {
    padding-left: 0 !important;
    font-size: 1.2rem;
  }
}

@media screen and (min-width: 321px) and (max-width: 410px) {
  .q-item /deep/ .q-item__title {
    font-size: 0.9rem;
  }

  .q-avatar {
    margin-right: 12px !important;
  }

  .v-icon {
    padding-left: 10px !important;
  }
}

</style>
