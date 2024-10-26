<script setup lang="ts">
defineProps({
  usage: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <label
    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    :for="usage"
  >
    <slot />
  </label>
</template>
