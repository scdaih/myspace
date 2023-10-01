import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import userlist from '../views/UserList.vue'
import Login from '../views/LoginView.vue'
import Register from '../views/RegisterView.vue'
import NotFound from '../views/NotFoundView.vue'
import UserProfile from '../views/UserProfile.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/userlist/',
    name: 'userlist',
    component: userlist
  },
  {
    path: '/login/',
    name: 'login',
    component: Login
  },
  {
    path: '/register/',
    name: 'register',
    component: Register
  },
  {
    path: '/404/',
    name: '404',
    component: NotFound
  },
  {
    path: '/:catchAll(.*)',
    redirect: "/404/",
  },
  {
    path: '/userprofile/:userId/',
    name: 'userprofile',
    component: UserProfile
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
