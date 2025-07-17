<template>
	<div class="home">
		<h1>Home Page</h1>
		<p>Welcome {{ user.username }}!</p>
	</div>
</template>

<script setup>
import { ref, computed } from "vue"
import { useStore } from "vuex"

const store = useStore()
const user = computed(() => store.getters.user)
</script>

<style scoped>
.home {
	padding: 2rem;
	text-align: center;
}
</style>
