import { defineStore } from 'pinia';

export const rootStore = defineStore('root', {
  state: {
    studentState: null,
    requestTypeState: null,
  },
  getters: {
    student: state => state.studentState,
    requestType: state => state.requestTypeState,
  },
  actions: {
    async setStudent(state, student){
      this.studentState = student;
    },
    async setRequestType(state, requestType) {
      this.requestTypeState = requestType;
    },
  },
});
