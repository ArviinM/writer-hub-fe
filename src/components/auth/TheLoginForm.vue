<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMutation } from '@tanstack/vue-query'
import axiosInstance from '../../utils/axiosInstance'
import type { BaseResponse } from '@/types/baseResponse'
import { useUserStore } from '@/stores/userStore'

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const router = useRouter()
const userStore = useUserStore()

const loginMutation = useMutation({
  mutationFn: async (credentials: { email: string; password: string }) => {
    const response = await axiosInstance.post('/auth/login', credentials)
    return response.data
  },
  onSuccess: data => {
    // Store the JWT and refresh token (consider using HTTP-only cookies for better security)
    localStorage.setItem('accessToken', data.data.accessToken)
    localStorage.setItem('refreshToken', data.data.refreshToken)

    // Update user store
    userStore.setUser(data.data)

    // Redirect to the home page or a protected route
    router.push('/')
  },
  onError: (error: { response: BaseResponse<string> }) => {
    errorMessage.value = error.response?.error || 'Failed to log in'
  },
})

const login = async () => {
  loginMutation.mutate({ email: email.value, password: password.value })
}
</script>

<template>
  <form @submit.prevent="login">
    <div>
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required />
    </div>
    <div>
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" required />
    </div>
    <button type="submit">Login</button>
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
  </form>
</template>
