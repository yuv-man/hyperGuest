<template>
	<nav class="navbar">
		<router-link to="/" class="hover:text-gray-300">Login</router-link>
		<router-link to="/home" class="hover:text-gray-300">Home</router-link>
		<router-link v-if="isAdmin" to="/admin" class="hover:text-gray-300">Admin</router-link>
		<router-link v-if="isEditor" to="/editor" class="hover:text-gray-300">Editor</router-link>
	</nav>
</template>

<script setup>
import { computed } from "vue"
import { useStore } from "vuex"

const store = useStore()
const user = computed(() => store.getters.user)
const isAdmin = computed(() => store.getters.isAdmin)
const isEditor = computed(() => store.getters.isEditor)
const debug = computed(() => process.env.NODE_ENV === 'development')
</script>

<style scoped>
.navbar {
	display: flex;
	justify-content: space-between;
	width: 250px;
	margin: 0 auto;
}
</style>
