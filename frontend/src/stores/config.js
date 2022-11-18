import { defineStore } from 'pinia';
import ApiService from '../common/apiService';

export const configStore = defineStore('config', {
  namespaced: true,
  state: () => ({
    numDaysAllowedInDraftStatusState: null,
  }),
  getters: {
    numDaysAllowedInDraftStatus: state => state.numDaysAllowedInDraftStatusState
  },
  actions: {
    async setNumDaysAllowedInDraftStatus(state, numDaysAllowedInDraftStatus){
      this.numDaysAllowedInDraftStatusState = numDaysAllowedInDraftStatus;
    },
    async getNumDaysAllowedInDraftStatus({commit}) {
      const response = await ApiService.getConfig('scheduler:numDaysAllowedInDraftStatus');
      this.numDaysAllowedInDraftStatusState = response;
    }
  }
});
