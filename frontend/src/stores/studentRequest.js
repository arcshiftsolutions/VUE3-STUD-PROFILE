import { defineStore } from 'pinia';
import ApiService from '../common/apiService';

export const studentRequestStore = defineStore('studentRequest', {
  namespaced: true,
  state: () => ({
    statusesState: null,
    requestState: null,
  }),
  getters: {
    statuses: state => state.statusesState,
    request: state => state.requestState,
    requestID: (state, getters, rootState, rootGetters) => state.requestState && state.requestState[`${rootGetters.requestType}ID`],
  },
    actions: {
    async setStatuses(statuses) {
      this.statusesState = statuses;
    },
    async setRequest(request = null) {
      this.requestState = request;
    },
    async postRequest({commit, rootGetters}, request){
      try {
        const response = await ApiService.postRequest(request, rootGetters.requestType);
        if(response.status !== 200){
          return false;
        }
        this.requestState = response.data;
        return response.data;
      } catch(e) {
        console.log('Error while accessing API - ' + e);
        return false;
      }
    },
    async getCodes({commit}, requestType) {
      const response = await ApiService.getCodes('studentRequest');
      this.statusesState = response.data.statusCodes;
    }
  }
});
