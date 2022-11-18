const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Home.vue') }
    ]
  },

  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'home',
        path: '', component: () => import('pages/Home.vue')
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
        path: '', component: () => import('pages/ErrorPage.vue')
      }
    ],
  },
  {
    path: '/logout',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'logout',
        path: '', component: () => import('pages/Logout.vue')
      }
    ],
  },
  {
    path: '/session-expired',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'session-expired',
        path: '', component: () => import('pages/SessionExpired.vue')
      }
    ],
  },
  {
    path: '/login-error',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'login-error',
        path: '', component: () => import('pages/LoginError.vue')
      }
    ],
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

export default routes
