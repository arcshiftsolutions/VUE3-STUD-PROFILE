import { defineStore } from 'pinia';
import ApiService from '../common/apiService';
import AuthService from '../common/authService';
import { studentRequestStore } from './studentRequest';
import { penRequestStore } from './penRequest';
import { rootStore } from './root';

function isExpiredToken(jwtToken) {
  const now = Date.now().valueOf() / 1000;
  const jwtPayload = jwtToken.split('.')[1];
  const payload = JSON.parse(window.atob(jwtPayload));
  return payload.exp <= now;
}

export const authStore = defineStore('auth', {
  namespaced: true,
  state: () => ({
    acronymsState: [],
    isAuthenticatedState: false,
    userInfoState: null,
    errorState: false,
    isLoadingState: true,
    loginErrorState: false,
    jwtTokenState: localStorage.getItem('jwtToken')
  }),
  getters: {
    acronyms: state => state.acronymsState,
    isAuthenticated: state => state.isAuthenticatedState,
    jwtToken: state => state.jwtTokenState,
    userInfo: state => state.userInfoState,
    loginError: state => state.loginErrorState,
    error: state => state.errorState,
    isLoading: state => state.isLoadingState
  },
  actions: {
    async setUserInfo(userInfo) {
      if(userInfo){
        this.userInfoState = userInfo;
      } else {
        this.userInfoState = null;
      }
    },
    async setLoginError() {
      this.loginErrorState = true;
    },
    async setError(error) {
      this.errorState = error;
    },
    async setLoading (isLoading) {
      this.isLoadingState = isLoading;
    },
    async setJwtToken(token = null) {
      if (token) {
        console.log('Setting auth state to true');
        this.isAuthenticatedState = true;
        this.jwtTokenState = token;
        localStorage.setItem('jwtToken', token);
      } else {
        console.log('Setting auth state to false');
        this.isAuthenticatedState = false;
        this.jwtTokenState = null;
        localStorage.removeItem('jwtToken');
      }
    },
    async logout() {
      await this.setJwtToken();
      await this.setUserInfo();
    },
    async getUserInfo(){
      const userInfoRes = await ApiService.getUserInfo();
      this.userInfoState = userInfoRes.data;
      studentRequestStore().requestState = userInfoRes.data.studentRequest;
      penRequestStore().requestState = userInfoRes.data.penRequest;
      rootStore().setStudent(userInfoRes.data.student);
    },
    //retrieves the json web token from local storage. If not in local storage, retrieves it from API
    async getJwtToken() {
      this.errorState = false;
      if (!!this.jwtTokenState) {
        if (isExpiredToken(this.jwtTokenState)) {
          this.logout();
          return;
        }

        const response = await AuthService.refreshAuthToken(this.jwtTokenState);
        if (response.jwtFrontend) {
          this.setJwtToken(response.jwtFrontend);
          ApiService.setAuthHeader(response.jwtFrontend);
        } else {
          throw 'No jwtFrontend';
        }
      } else {  //inital login and redirect
        const response = await AuthService.getAuthToken();
        if (response.jwtFrontend) {
          this.setJwtToken(response.jwtFrontend);
          ApiService.setAuthHeader(response.jwtFrontend);
        } else {
          throw 'No jwtFrontend';
        }
      }
    },
  }
});
