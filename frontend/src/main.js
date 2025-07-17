import { createApp } from "vue"
import "./style.css"
import App from "./App.vue"
import router from "./router"
import store from "./store"

const app = createApp(App)

app.use(router)
app.use(store)

const userData = localStorage.getItem("user")
if (userData) {
	try {
		const user = JSON.parse(userData)
		store.dispatch("setUser", user)
	} catch (error) {
		console.error("Failed to parse user data from localStorage:", error)
		localStorage.removeItem("user")
	}
}

app.mount("#app")
