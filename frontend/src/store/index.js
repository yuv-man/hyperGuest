import { createStore } from "vuex"
import { userApi } from "../services/api"

export default createStore({
	state: {
		user: null,
		error: null,
		loading: false,
	},
	getters: {
		user: (state) => state.user,
		isEditor: (state) => {
			const userRoles = state.user?.roles || []
			const result = userRoles.some(role => 
				role.toLowerCase() === "editor" || role.toLowerCase() === "admin"
			)
			console.log("isEditor getter - user:", state.user, "result:", result)
			return result
		},
		isAdmin: (state) => {
			const userRoles = state.user?.roles || []
			const result = userRoles.some(role => role.toLowerCase() === "admin")
			console.log("isAdmin getter - user:", state.user, "result:", result)
			return result
		},
		error: (state) => state.error,
		loading: (state) => state.loading,
	},
	mutations: {
		setUser(state, user) {
			state.user = user
		},
		setError(state, error) {
			state.error = error
		},
		setLoading(state, loading) {
			state.loading = loading
		},
		clearError(state) {
			state.error = null
		},
	},
	actions: {
		setUser({ commit }, user) {
			commit("setUser", user)
		},
		clearError({ commit }) {
			commit("clearError")
		},
		async login({ commit, dispatch }, username) {
			try {
				commit("setLoading", true)
				commit("clearError")
				
				const response = await userApi.login(username)
				console.log("API response:", response)
				
				if (response.data) {
					commit("setUser", response.data)
					
					localStorage.setItem("user", JSON.stringify(response.data))
					
					if (response.data.token) {
						localStorage.setItem("token", response.data.token)
					} else if (response.headers?.authorization) {
						const authHeader = response.headers.authorization
						const token = authHeader.replace('Bearer ', '')
						localStorage.setItem("token", token)
					} else {
						const mockToken = `mock-token-${username}-${Date.now()}`
						localStorage.setItem("token", mockToken)
						console.log("Created mock token:", mockToken)
					}
					
					console.log("Stored in localStorage - token:", localStorage.getItem("token"))
					console.log("Stored in localStorage - user:", localStorage.getItem("user"))
					
					return response.data
				}
			} catch (error) {
				const errorMessage = error.response?.data?.message || "Login failed. Please try again."
				commit("setError", errorMessage)
				throw error
			} finally {
				commit("setLoading", false)
			}
		},
		async logout({ commit }) {
			localStorage.removeItem("token")
			localStorage.removeItem("user")
			
			commit("setUser", null)
			commit("clearError")
		},
		async getUsers({ commit }) {
			try {
				commit("setLoading", true)
				commit("clearError")
				
				const response = await userApi.getUsers()
				return response.data
			} catch (error) {
				const errorMessage = error.response?.data?.message || "Failed to fetch users."
				commit("setError", errorMessage)
				throw error
			} finally {
				commit("setLoading", false)
			}
		},
		async getUser({ commit }, username) {
			try {
				commit("setLoading", true)
				commit("clearError")
				
				const response = await userApi.getUser(username)
				return response.data
			} catch (error) {
				const errorMessage = error.response?.data?.message || "Failed to fetch user."
				commit("setError", errorMessage)
				throw error
			} finally {
				commit("setLoading", false)
			}
		},
		async register({ commit }, { username, password }) {
			try {
				commit("setLoading", true)
				commit("clearError")
				
				const response = await userApi.register(username, password)
				return response.data
			} catch (error) {
				const errorMessage = error.response?.data?.message || "Registration failed."
				commit("setError", errorMessage)
				throw error
			} finally {
				commit("setLoading", false)
			}
		},
	},
	modules: {},
})
