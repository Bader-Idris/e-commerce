import { createRouter, createWebHistory, useRoute } from 'vue-router'
import Home from "@/views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    alias: "/home",
  },
  {
    path: "/protected",
    name: "protected",
    components: {
      default: () =>
        import("@/views/Protected.vue"),
      LeftSidebar: () =>
        import(
          "@/components/LeftSidebar.vue"
        ),
    },
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/register",
    name: "register",
    component: () =>
      import("@/views/Register.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import("@/views/Login.vue"),
  },
  {
    //! check its meaning
    path: "/example/:id(\\d+)?",
    component: () =>
      import("@/views/Login.vue"),
  },
  {
    path: '/user/verify-email',
    name: 'verifyEmail',
    component: import("@/components/VerifyEmail.vue"),
    props: (route) => ({ token: route.query.token, email: route.query.email })
  },
  {
    // path: "/:catchAll(.*)",
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () =>
      import(
        "@/views/NotFoundView.vue"
      ),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior (to, from, savedPosition) {
    return savedPosition || new Promise((resolve)=>{
      setTimeout(()=> resolve({ top:0 }), 300)
    })
  }
})
router.beforeEach((to, from)=>{
  if(to.meta.requiresAuth && !window.user){
    return {name: 'login', query:{ redirect: to.fullPath }}
  }
})
export default router
