import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SeriesView from '../views/SeriesView.vue'
import DetailsView from '../views/DetailsView.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/series', name: 'Series', component: SeriesView },
  { path: '/details/:type/:id', name: 'Details', component: DetailsView, props: true }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
