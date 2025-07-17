<template>
	<nav class="navbar">
		<router-link to="/" class="nav-link">Login</router-link>
		<router-link to="/home" class="nav-link">Home</router-link>
		<router-link v-if="isAdmin" to="/admin" class="nav-link">Admin</router-link>
		<router-link v-if="isEditor" to="/editor" class="nav-link">Editor</router-link>
	</nav>
</template>

<script setup>
import { computed } from "vue"
import { useStore } from "vuex"

const store = useStore()
const isAdmin = computed(() => store.getters.isAdmin)
const isEditor = computed(() => store.getters.isEditor)
</script>

<style scoped>
.navbar {
	display: flex;
	justify-content: center;
	gap: 1rem;
	background-color: #f5f5f5;
	padding: 0.75rem 1.5rem;
	border-radius: 12px;
	box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
	margin: 1rem auto;
	max-width: 600px;
}

.nav-link {
	text-decoration: none;
	color: #333;
	font-weight: 500;
	padding: 0.5rem 1rem;
	border-radius: 8px;
	transition: background-color 0.2s ease, color 0.2s ease;
}

.nav-link:hover {
	background-color: #e0e0e0;
	color: #000;
}

.nav-link.router-link-active {
	background-color: #007bff;
	color: white;
	font-weight: 600;
}

.nav-link.router-link-active:hover {
	background-color: #0056b3;
	color: white;
}

.nav-link:active {
	background-color: #d0d0d0;
}
</style>
