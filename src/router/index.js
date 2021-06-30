import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/search',
		name: 'Search',
		// route level code-splitting
		// this generates a separate chunk (search.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import( /* webpackChunkName: "search" */ '../views/Search.vue' ),
	},
	{
		path: '/title/:id',
		name: 'Title',
		// route level code-splitting
		// this generates a separate chunk (title.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import( /* webpackChunkName: "title" */ '../views/Title.vue' ),
	},
	{ path: '/title', redirect: { name: 'Home' } },
]

const router = createRouter( {
	history: createWebHistory( process.env.BASE_URL ),
	routes,
} )

export default router