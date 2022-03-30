import Vue from 'vue'
import VueRouter from 'vue-router'
import layou from '@/layout/layoutIndex'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: layou,
        redirect: '/choose',
        children: [
            {
                path: 'choose',
                name: 'ChooseView',
                component: () => import('@/views/ChooseView')
            },
            {
                path: 'home',
                name: 'HomeView',
                component: () => import('@/views/HomeView')
            },
            {
                path: 'results',
                name: 'ResultsView',
                component: () => import('@/views/ResultsView')
            }
        ]
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
