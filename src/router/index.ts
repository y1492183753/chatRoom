import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
const routes: RouteRecordRaw[] = [{
    path: '/',
    redirect: 'login'
}, {
    path: '/login',
    component: () => import('../views/login/login.vue')
}, {
    path: '/home',
    component: () => import('../views/home/home.vue'),
    children: [
        {
		    name: "Chat",
		    path: "/home/chat",
		    component: () => import('../views/home/chat.vue'),
		  },
          {
		    name: "Friend",
		    path: "/home/friend",
		    component: () => import('../views/home/friend.vue'),
		  },
          {
		    name: "Friends",
		    path: "/home/group",
		    component: () => import('../views/home/group.vue'),
		  },
    ]
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