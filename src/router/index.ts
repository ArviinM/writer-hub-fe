import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useUserStore } from '@/stores/userStore'
import UserListView from '@/views/users/UserListView.vue'
import CreateUserView from '@/views/users/CreateUserView.vue'
import EditUserView from '@/views/users/EditUserView.vue'
import EditCompanyView from '@/views/companies/EditCompanyView.vue'
import CompanyListView from '@/views/companies/CompanyListView.vue'
import CreateCompanyView from '@/views/companies/CreateCompanyView.vue'
import CreateArticleView from '@/views/articles/CreateArticleView.vue'
import EditArticleView from '@/views/articles/EditArticleView.vue'
import ArticlesListView from '@/views/articles/ArticlesListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/LoginView.vue'),
    },
    {
      path: '/users',
      name: 'users',
      component: UserListView,
      meta: { requiresAuth: true, requiredRole: 'Editor' },
    },
    {
      path: '/users/create',
      name: 'createUser',
      component: CreateUserView,
      meta: { requiresAuth: true, requiredRole: 'Editor' },
    },
    {
      path: '/users/:id/edit',
      name: 'editUser',
      component: EditUserView,
      meta: { requiresAuth: true, requiredRole: 'Editor' },
    },
    {
      path: '/companies',
      name: 'companies',
      component: CompanyListView,
      meta: { requiresAuth: true, requiredRole: 'Editor' },
    },
    {
      path: '/companies/create',
      name: 'createCompany',
      component: CreateCompanyView,
      meta: { requiresAuth: true, requiredRole: 'Editor' },
    },
    {
      path: '/companies/:id/edit',
      name: 'editCompany',
      component: EditCompanyView,
      meta: { requiresAuth: true, requiredRole: 'Editor' },
    },
    {
      path: '/articles',
      name: 'articles',
      component: ArticlesListView,
      meta: { requiresAuth: true },
    },
    {
      path: '/articles/create',
      name: 'createArticle',
      component: CreateArticleView,
      meta: { requiresAuth: true, requiredRole: 'Writer' },
    },
    {
      path: '/articles/:id/edit',
      name: 'editArticle',
      component: EditArticleView,
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  if (to.name === 'login' && userStore.isAuthenticated) {
    next('/')
  } else if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    next('/login')
  } else if (
    to.meta.requiredRole &&
    userStore.userType !== to.meta.requiredRole
  ) {
    next('/')
  } else {
    next()
  }
})

export default router
