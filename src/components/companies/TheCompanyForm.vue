<script setup lang="ts">
import { toRefs, reactive } from 'vue'
import type { Company } from '@/types/types'

const props = defineProps({
  company: {
    type: Object as () => Company,
    required: true,
  },
})

const emit = defineEmits(['submit'])

const { company } = toRefs(props)
const companyCopy = reactive({ ...company.value })
</script>

<template>
  <form @submit.prevent="emit('submit', { ...companyCopy })">
    <div>
      <label for="name">Name:</label>
      <input type="text" id="name" v-model="companyCopy.name" required />
    </div>
    <div>
      <label for="logo">Logo URL:</label>
      <input type="text" id="logo" v-model="companyCopy.logo" required />
    </div>
    <div>
      <label for="status">Status:</label>
      <select id="status" v-model="companyCopy.status" required>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>
    </div>
    <button type="submit">Save</button>
  </form>
</template>
