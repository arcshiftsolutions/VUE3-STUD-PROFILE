import { defineStore } from 'pinia';
import ApiService from '../common/apiService';
import AuthService from '../common/authService';
import { studentRequestStore } from './studentRequest';
import { penRequestStore } from './penRequest';
import { rootStore } from './root';

function isFollowUpVisit({jwtToken}) {
  return !!jwtToken;
}

function isExpiredToken(jwtToken) {
  const now = Date.now().valueOf() / 1000;
  const jwtPayload = jwtToken.split('.')[1];
  const payload = JSON.parse(window.atob(jwtPayload));
  return payload.exp <= now;
}

async function refreshToken({getters, commit, dispatch}) {
  if (isExpiredToken(getters.jwtToken)) {
    dispatch('logout');
    return;
  }

  const response = await AuthService.refreshAuthToken(getters.jwtToken);
  if (response.jwtFrontend) {
    await this.setJwtToken(response.jwtFrontend);
    ApiService.setAuthHeader(response.jwtFrontend);
  } else {
    throw 'No jwtFrontend';
  }
}

async function getInitialToken({commit}) {
  const response = await AuthService.getAuthToken();

  if (response.jwtFrontend) {
    await this.setJwtToken(response.jwtFrontend);
    ApiService.setAuthHeader(response.jwtFrontend);
  } else {
    throw 'No jwtFrontend';
  }
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
        this.isAuthenticatedState = true;
        this.jwtTokenState = token;
        localStorage.setItem('jwtToken', token);
      } else {
        this.isAuthenticatedState = false;
        this.jwtTokenState = null;
        localStorage.removeItem('jwtToken');
      }
    },
    async logout() {
      await this.setJwtToken();
      await this.setUserInfo();
    },
    async getUserInfo({commit}){
      const userInfoRes = await ApiService.getUserInfo();
      this.userInfoState = userInfoRes.data;
      studentRequestStore().requestState = userInfoRes.data.studentRequest;
      penRequestStore().requestState = userInfoRes.data.penRequest;
      rootStore().student = userInfoRes.data.student;
    },
    //retrieves the json web token from local storage. If not in local storage, retrieves it from API
    async getJwtToken(context) {
      this.errorState = false;
      if (isFollowUpVisit(context.getters)) {
        await refreshToken(context);
      } else {  //inital login and redirect
        await getInitialToken(context);
      }
    },
  }
});
