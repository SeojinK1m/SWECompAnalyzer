import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue'
import OffersView from '../views/OffersView.vue'
import NotFound from '../views/NotFound.vue'
import { getAuth } from 'firebase/auth'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/offers',
    name: 'offers',
    component: OffersView,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requireAuth)) {
    if (getAuth().currentUser) {
      next()
    } else {
      next("/register")
    }
  } else {
    next()
  }
})

export default router
