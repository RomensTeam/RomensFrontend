import {createRouter, createWebHistory} from 'vue-router'

// POST
import ViewPosts from '../views/posts/ViewPosts.vue'
import CreatePost from '../views/posts/CreatePost.vue'

import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import JokeView from "@/views/JokeView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/posts',
            name: 'posts',
            component: ViewPosts
        },
        {
            path: '/posts/create',
            name: 'posts.create',
            component: CreatePost
        },
        {
            name: 'login',
            path: '/login',
            component: LoginView
        },
        {
            name: 'login.telegram',
            path: '/login/telegram',
            component: LoginView
        },
        {
            name: 'register',
            path: '/register',
            component: RegisterView
        },
        {
            name: 'register/telegram',
            path: '/register/telegram',
            component: RegisterView
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/AboutView.vue')
        },
        {
            path: '/',
            name: 'joke_create',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/JokeView.vue')
        },
        {
            path: '/jokes/:uuid',
            name: 'joke_view',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/JokeView.vue')
        },
        {
            path: '/profiles/nickjayrussell',
            name: 'nickjayrussell',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/profiles/ProfilePage.vue')
        },
        {
            path: '/app',
            name: 'romens',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/Romens.vue')
        }
    ]
})

export default router
