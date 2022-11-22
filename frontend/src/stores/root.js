import { defineStore } from 'pinia';

export const rootStore = defineStore('root', {
  state: () => ({
    studentState: null,
    requestTypeState: null,
  }),
  getters: {
    student: state => state.studentState,
    requestType: state => state.requestTypeState,
  },
  actions: {
    async setStudent(student){
      this.studentState = student;
    },
    async setRequestType(requestType) {
      this.requestTypeState = requestType;
    },
  },
});
