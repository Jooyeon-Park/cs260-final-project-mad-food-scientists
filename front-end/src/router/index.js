import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import MyPage from '../views/MyPage.vue'
import Recipe from '../views/RecipePage.vue'
import RandomView from '../views/RandomView.vue'
import RecipesView from '../views/RecipesView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/mypage',
    name: 'MyPage',
    component: MyPage
  },
  {
    path: '/recipe/:id',
    name: 'recipe',
    component: Recipe
  },
  {
    path: '/random',
    name: 'RandomView',
    component: RandomView
  },
  {
    path: '/recipes',
    name: 'RecipesView',
    component: RecipesView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
