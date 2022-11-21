import {pick, values} from 'lodash';
import { umpStore } from '../stores/ump.js';
import { authStore } from '../stores/auth.js';
import { penRequestStore } from '../stores/penRequest.js';
import { studentRequestStore } from '../stores/studentRequest.js';
import { rootStore } from '../stores/root.js';
import { PenRequestStatuses, StudentRequestStatuses } from '../utils/constants';

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'home',
        path: '',
        component: () => import('pages/Home.vue')
      }
    ],
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/error',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'error',
        path: '',
        component: () => import('pages/ErrorPage.vue')
      }
    ],
  },
  {
    path: '/logout',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'logout',
        path: '',
        component: () => import('pages/Logout.vue')
      }
    ],
  },
  {
    path: '/session-expired',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'session-expired',
        path: '',
        component: () => import('pages/SessionExpired.vue')
      }
    ],
  },
  {
    path: '/login-error',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'login-error',
        path: '',
        component: () => import('pages/LoginError.vue')
      }
    ],
  },
  {
    path: '/ump',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '',
        component: () => import('pages/ump/Ump.vue'),
        name: 'ump',
        meta: {
          requiresAuth: true
        },
        beforeEnter: (to, from, next) => {
          umpStore().clearUmpState();
          const hasInflightGMPRequest = penRequestStore().request && values(pick(PenRequestStatuses, ['DRAFT', 'INITREV', 'RETURNED', 'SUBSREV'])).some(status => status === penRequestStore().request.penRequestStatusCode);
          if(authStore().isAuthenticated && !studentRequestStore().request && !hasInflightGMPRequest) {
            rootStore().setRequestType('studentRequest');
            next('ump/request');
          } else {
            next();
          }
        },
      },
      {
        path: 'request',
        component: () => import('pages/ump/RequestPage.vue'),
        meta: {
          requiresAuth: true
        },
        children: [
          {
            path: '',
            name: 'step1',
            component: () => import('pages/ump/CurrentInfo.vue'),
            beforeEnter: checkStudentRequestExists,
            meta: {
              requiresAuth: true,
              notRefreshUserInfo: true
            },
          },
          {
            path: 'requestForm',
            name: 'step2',
            component: () => import('pages/ump/StudentRequestForm.vue'),
            beforeEnter: checkStudentRequestExists,
            meta: {
              requiresAuth: true,
              notRefreshUserInfo: true
            },
          },
          {
            path: 'requestSummary',
            name: 'step3',
            component: () => import('pages/ump/StudentRequestSummary.vue'),
            beforeEnter: checkStudentRequestExists,
            meta: {
              requiresAuth: true,
              notRefreshUserInfo: true
            },
          },
          {
            path: 'requestSubmission',
            name: 'step4',
            component: () => import('pages/ump/StudentRequestSubmission.vue'),
            meta: {
              requiresAuth: true,
              notRefreshUserInfo: true
            },
          }
        ]
      },
      {
        path: 'verification/:status',
        name: 'student-request-verification',
        component: () => import('pages/ump/StudentRequestVerification.vue')
      },
    ]
  },
  {
    path: '/gmp',
    component: () => import('layouts/MainLayout.vue'),

    children: [
      {
        path: '',
        name: 'gmp',
        component: () => import('pages/gmp/Gmp.vue'),
        meta: {
          requiresAuth: true
        },
        beforeEnter: (to, from, next) => {
          gmpStore().clearGmpState();
          const hasInflightOrCompletedUMPRequest = studentRequestStore().request && values(pick(StudentRequestStatuses, ['DRAFT', 'INITREV', 'RETURNED', 'SUBSREV', 'COMPLETED'])).some(status => status === studentRequestStore().request.studentRequestStatusCode);
          if(authStore().isAuthenticated && ((!penRequestStore().request && !hasInflightOrCompletedUMPRequest) || hasCompletedPenRequestButNoStudentLinkage())) {
            rootStore().setRequestType('penRequest');
            next('gmp/request');
          } else {
            next();
          }
        },
      },
      {
        path: 'request',
        component: () => import('pages/gmp/PenRequestPage.vue'),
        meta: {
          requiresAuth: true
        },
        children: [
          {
            path: '',
            name: 'gmp-step1',
            component: () => import('pages/gmp/PenRequestForm.vue'),
            beforeEnter: checkPenRequestExists,
            meta: {
              requiresAuth: true
            },
          },
          {
            path: 'requestSummary',
            name: 'gmp-step2',
            component: () => import('pages/gmp/PenRequestSummary.vue'),
            beforeEnter: checkPenRequestExists,
            meta: {
              requiresAuth: true
            },
          },
          {
            path: 'requestSubmission',
            name: 'gmp-step3',
            component: () => import('pages/gmp/PenRequestSubmission.vue'),
            meta: {
              requiresAuth: true
            },
          }
        ]
      },
      {
        path: 'verification/:status',
        name: 'pen-request-verification',
        component: () => import('pages/gmp/PenRequestVerification.vue'),
        meta: {
          requiresAuth: true
        },
      },
    ]
  },
  {
    path: '/login',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'login',
        path: '', component: () => import('pages/Login.vue')
      }
    ],
  },
  {
    path: '/:catchAll(.*)',
    name: 'notfound',
    redirect: '/',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/token-expired',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'backend-session-expired',
        path: '', component: () => import('pages/BackendSessionExpired.vue')
      }
    ],
  }
]

function checkStudentRequestExists(to, from, next) {
  if(authStore().isAuthenticated && (!studentRequestStore().request || ['COMPLETED', 'ABANDONED', 'REJECTED'].includes(studentRequestStore().request.studentRequestStatusCode))) {
    rootStore().setRequestType('studentRequest');
    next();
  } else {
    next('/ump');
  }
}

function hasCompletedPenRequestButNoStudentLinkage() {
  return store.getters['penRequest/request'] && store.getters['penRequest/request'].penRequestStatusCode === PenRequestStatuses.MANUAL && !store.getters['student'];
}

function checkPenRequestExists(to, from, next) {
  if(authStore().isAuthenticated && (!penRequestStore().request || ['ABANDONED', 'REJECTED'].includes(penRequestStore().request.penRequestStatusCode) || hasCompletedPenRequestButNoStudentLinkage())) {
    rootStore().setRequestType('penRequest');
    next();
  } else {
    next('/gmp');
  }
}

export default routes
