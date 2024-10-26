<template>
  <div v-if="userStore.userType === 'Editor'">
    <EditorDashboard />
  </div>
  <div v-else-if="userStore.userType === 'Writer'">
    <WriterDashboard />
  </div>
  <div v-else>Welcome to Writer Hub!</div>
</template>

<script setup lang="ts">
import EditorDashboard from './EditorDashboard.vue'
import { useUserStore } from '@/stores/userStore'
import WriterDashboard from '@/views/WriterDashboard.vue'

const userStore = useUserStore()
</script>
