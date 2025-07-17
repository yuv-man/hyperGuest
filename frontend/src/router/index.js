import { createRouter, createWebHistory } from "vue-router"
import Login from "../views/Login.vue"

const routes = [
	{
		path: "/",
		name: "Login",
		component: Login,
	},
	{
		path: "/home",
		name: "Home",
		// Lazy loading for better performance
		component: () => import("../views/Home.vue"),
	},
	{
		path: "/admin",
		name: "Admin",
		component: () => import("../views/AdminView.vue"),
	},
	{
		path: "/editor",
		name: "Editor",
		component: () => import("../views/EditorView.vue"),
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router
