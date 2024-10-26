<template>
  <TheNavbar v-if="userStore.isAuthenticated" />
  <router-view />
</template>

<script setup lang="ts">
import TheNavbar from './components/navbar/TheNavBar.vue'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
</script>
