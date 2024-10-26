<template>
  <div v-if="userStore.isAuthenticated">
    <TheNavbar />
    <div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 sm:py-6 lg:py-8">
      <router-view />
    </div>
  </div>
  <div v-else>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import TheNavbar from './components/navbar/TheNavBar.vue'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
</script>
