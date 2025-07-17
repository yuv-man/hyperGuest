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
		component: () => import("../views/Home.vue"),
		meta: { requiresAuth: true },
	},
	{
		path: "/admin",
		name: "Admin",
		component: () => import("../views/AdminView.vue"),
		meta: { requiresAuth: true, requiresAdmin: true },
	},
	{
		path: "/editor",
		name: "Editor",
		component: () => import("../views/EditorView.vue"),
		meta: { requiresAuth: true, requiresEditor: true },
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

router.beforeEach((to, from, next) => {
	const token = localStorage.getItem("token")
	const user = JSON.parse(localStorage.getItem("user") || "null")
	
	console.log("Router guard - to:", to.path, "from:", from.path)
	console.log("Token exists:", !!token)
	console.log("User data:", user)
	
	if (to.path === "/") {
		console.log("Going to login page, allowing")
		next()
		return
	}
	
	if (to.meta.requiresAuth && !token) {
		console.log("No token found, redirecting to login")
		next("/")
		return
	}
	
	if (to.meta.requiresAdmin && (!user || !user.roles?.some(role => role.toLowerCase() === "admin"))) {
		console.log("Not admin, redirecting to home")
		next("/home")
		return
	}
	
	if (to.meta.requiresEditor && (!user || !user.roles?.some(role => 
		role.toLowerCase() === "editor" || role.toLowerCase() === "admin"
	))) {
		console.log("Not editor, redirecting to home")
		next("/home")
		return
	}
	
	console.log("Route guard passed, proceeding to:", to.path)
	next()
})

export default router
