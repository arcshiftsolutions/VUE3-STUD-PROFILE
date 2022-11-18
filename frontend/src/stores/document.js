import { defineStore } from 'pinia';
import ApiService from '../common/apiService';

export const documentStore = defineStore('document', {
  state: {
    documentTypeCodesState: null,
    unsubmittedDocumentsState: [],
  },
  getters: {
    documentTypeCodes: state => state.documentTypeCodesState,
    unsubmittedDocuments: state => state.unsubmittedDocumentsState,
  },
  actions: {
    async setDocumentTypeCodes(documentTypeCodes){
      this.documentTypeCodesState = documentTypeCodes;
    },
    async setUnsubmittedDocuments(unsubmittedDocuments){
      this.unsubmittedDocumentsState = unsubmittedDocuments || [];
    },
    async setUploadedDocument(document){
      this.unsubmittedDocumentsState = [...this.unsubmittedDocumentsState, document];
    },
    async getDocumentTypeCodes({commit, rootGetters}) {
      if(!this.documentTypeCodes) {
        const response = await ApiService.getDocumentTypeCodes(rootGetters.requestType);
        this.documentTypeCodes = response.data;
      }
    },
    async deleteFile({commit, getters, rootGetters}, {requestID, documentID}){
      await ApiService.deleteDocument(requestID, documentID, rootGetters.requestType);
      const documents = getters.unsubmittedDocuments.filter(document => document.documentID !== documentID);
      this.unsubmittedDocuments = documents;
    }
  }
});
