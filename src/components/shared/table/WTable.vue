<script setup lang="ts">
defineProps<{
  headers: {
    key: string
    label: string
  }[]
  items: any[]
  isLoading: boolean
  error: any
}>()
</script>

<template>
  <div v-if="isLoading" class="text-center">Loading...</div>
  <div v-else-if="error" class="text-center text-red-500">
    Error: {{ error }}
  </div>
  <div v-else class="overflow-x-auto">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th
            v-for="header in headers"
            :key="header.key"
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            {{ header.label }}
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="(item, index) in items" :key="index">
          <slot :item="item" :index="index"></slot>
        </tr>
      </tbody>
    </table>
  </div>
</template>
