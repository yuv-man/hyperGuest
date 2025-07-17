import axios from "axios"

const api = axios.create({
	baseURL: "/api",
})

const loginApi = axios.create({
	baseURL: "/api",
})

api.interceptors.request.use((config) => {
	const token = localStorage.getItem("token")
	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}
	return config
})

api.interceptors.response.use(
	(response) => {
		return response
	},
	(error) => {
		return Promise.reject(error)
	}
)

const errorHandler = (error) => {
	if (error.response.status === 401) {
		localStorage.removeItem("token")
		window.location.href = "/login"
	}
	return Promise.reject(error)
}

const excuteRequest = async (request) => {
	try {
		const response = await request
		return response
	} catch (error) {
		return errorHandler(error)
	}
}

export const userApi = {
	getUsers: async () => excuteRequest(api.get("/users")),
	getUser: async (username) => excuteRequest(api.get(`/users/${username}`)),
	login: async (username) => {
		try {
			const response = await loginApi.post(`/users/login/${username}`)
			return response
		} catch (error) {
			return Promise.reject(error)
		}
	},
	register: async (username, password) =>
	    excuteRequest(api.post(`/users/register`, { username, password })),
}
