import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Discount from '../views/Discount.vue'
import Deposit from '../views/Deposit.vue'
import Withdraw from '../views/Withdraw.vue'
import Profile from '../views/Profile.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/discount', component: Discount },
  { path: '/deposit', component: Deposit },
  { path: '/withdraw', component: Withdraw },
  { path: '/profile', component: Profile }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
