import axios from "axios"

const api = axios.create({
	baseURL: "http://localhost:3000",
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
	getUsers: async () => excuteRequest(api.get("/api/users")),
	getUser: async (username) => excuteRequest(api.get(`/api/users/${username}`)),
	login: async (username) => excuteRequest(api.post(`/api/users/login/${username}`)),
	register: async (username, password) =>
	    excuteRequest(api.post(`/api/users/register`, { username, password })),
}
