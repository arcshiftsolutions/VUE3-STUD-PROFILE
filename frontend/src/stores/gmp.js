import { defineStore } from 'pinia';

export const gmpStore = defineStore('gmp', {
  namespaced: true,
  state: () => ({
    requestDataState: {},
    declaredState: false,
  }),
  getters: {
    requestData: state => state.requestDataState,
    declared: state => state.declaredState
  },
  actions: {
    async setRequestData(requestData) {
      this.requestDataState = requestData;
    },
    clearUser() {
      this.$reset()
    }
  }
});
