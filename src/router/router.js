import { createRouter, createWebHistory } from 'vue-router';
import AuthorizationComponent from '@/components/authorization/AuthorizationComponent.vue';
import RegisterComponent from '@/components/authorization/RegisterComponent.vue';
import HomePage from '@/components/mainPage/HomePage.vue';
import UserPage from '@/components/user/UserPage.vue';
import CargosPage from '@/components/currentCargos/index.vue';
import {useTransStore} from "@/store/store.js";

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "home",
            meta: {auth: true},
            component: HomePage,
        },
        {
            name: 'Login',
            path: '/login',
            component: AuthorizationComponent
        },
        {
            name: 'registrationPanel',
            path: '/register',
            component: RegisterComponent
        },
        {
            name: 'userPage',
            path: '/user/profile',
            meta: {auth: true},
            component: UserPage
        },
        {
            name: 'cargosPage',
            path: '/cargos',
            meta: {auth: true},
            component: CargosPage
        },
    ]
})

router.beforeEach((to,from,next) => {
    const store = useTransStore()
    if(store.userName === null && to.name !== 'Login') {
        next({ path : '/login'})
    } else {
        next();
    }
})
