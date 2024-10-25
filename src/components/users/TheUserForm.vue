<script setup lang="ts">
import { toRefs, reactive } from 'vue'
import type { User } from '@/types/types'

const props = defineProps({
  user: {
    type: Object as () => User,
    required: true,
  },
})

const emit = defineEmits(['submit'])

const { user } = toRefs(props)
const userCopy = reactive({ ...user.value })
</script>

<template>
  <form @submit.prevent="emit('submit', { ...userCopy })">
    <div>
      <label for="firstname">First Name:</label>
      <input type="text" id="firstname" v-model="userCopy.firstname" required />
    </div>
    <div>
      <label for="lastname">Last Name:</label>
      <input type="text" id="lastname" v-model="userCopy.lastname" required />
    </div>
    <div>
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="userCopy.email" required />
    </div>
    <div>
      <label for="password">Password:</label>
      <input
        type="password"
        id="password"
        v-model="userCopy.password"
        required
      />
    </div>
    <div>
      <label for="type">Type:</label>
      <select id="type" v-model="userCopy.type" required>
        <option value="Writer">Writer</option>
        <option value="Editor">Editor</option>
      </select>
    </div>
    <div>
      <label for="status">Status:</label>
      <select id="status" v-model="userCopy.status" required>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>
    </div>
    <button type="submit">Save</button>
  </form>
</template>
