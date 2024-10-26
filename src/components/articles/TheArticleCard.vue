<script setup lang="ts">
const baseUrl = import.meta.env.VITE_API_BASE_URL
defineProps<{
  title: string
  imageUrl: string
  date: string
  link: string
  writerId?: number
  editorId?: number
  writerName?: string
  editorName?: string
}>()
</script>

<template>
  <div class="border rounded-lg p-4 shadow-md">
    <img
      :src="`${baseUrl + '/' + imageUrl}`"
      alt="Article Image"
      class="mb-2 rounded-md h-56 w-full object-cover"
    />
    <h3 class="text-lg font-medium text-gray-900">{{ title }}</h3>
    <h4 class="text-md font-medium text-gray-900">{{ link }}</h4>
    <p class="text-gray-500">
      {{ date }} - <span v-if="writerId">Writer: {{ writerName }}</span>
      <span v-if="editorId"> Editor: {{ editorName }}</span>
    </p>
  </div>
</template>
