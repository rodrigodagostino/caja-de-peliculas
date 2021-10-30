import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Search from '@/views/Search.vue'
import Title from '@/views/Title.vue'

const routes = [
	{ path: '/', name: 'Home', component: Home },
	{ path: '/search', name: 'Search', component: Search },
	{ path: '/title/:id', name: 'Title', component: Title },
	{ path: '/title', redirect: { name: 'Home' } },
	{ path: '/:pathMatch(.*)*', redirect: { name: 'Home' } },
]

const router = createRouter( {
	history: createWebHistory( import.meta.env.BASE_URL ),
	routes,
} )

export default router