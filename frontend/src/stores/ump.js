import { defineStore } from 'pinia';

export const umpStore = defineStore('ump', {
  namespaced: true,
  state: () => ({
    recordedDataState: {},
    updateDataState: {
      legalLastName: null,
      legalFirstName: null,
      legalMiddleNames: null,
      dob: null,
      genderCode: null,
      email: null,
    },
    declaredState: false,
    acceptanceState: false,
    isEditableState: {
      editLegalLastName: false,
      editLegalFirstName: false,
      editLegalMiddleNames: false,
      editBirthdate: false,
      editEmail: false
    }
  }),
  getters: {
    recordedData: state => state.recordedDataState,
    updateData: state => state.updateDataState,
  },
  actions: {
    async setRecordedData(recordedData){
      this.recordedDataState = recordedData;
    },
    async setUpdateData(updateData){
      this.updateDataState = updateData;
    },
    clearUser() {
      this.$reset()
    }
  },
});
