import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
const routes: RouteRecordRaw[] = [{
    path: '/',
    redirect: 'login'
}, {
    path: '/login',
    component: () => import('../views/login/login.vue')
}, {
    path: '/home',
    component: () => import('../views/home/home.vue')
}, {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/error/404.vue')
}]
const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router