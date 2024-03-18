/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import SurveyEditor from '../apps/survey-builder/pages/SurveyBuilder.vue'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/editor/:id',
      component: SurveyEditor
    },
    {
      path: '/',
      component: HomePage
    }
  ]
})

export default router
