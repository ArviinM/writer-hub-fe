// src/components/auth/TheLoginForm.vue
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

<script lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMutation } from '@tanstack/vue-query'
import { useUserStore } from '@/stores/userStore'
import type { BaseResponse } from '@/types/baseResponse'
import type { User } from '@/types/types'
import axiosInstance from '@/utils/axiosInstance'

export default {
  setup() {
    const email = ref('')
    const password = ref('')
    const errorMessage = ref('')
    const router = useRouter()
    const userStore = useUserStore()

    const loginMutation = useMutation({
      mutationFn: async (credentials: {
        email: string
        password: string
      }): Promise<BaseResponse<User>> => {
        const response = await axiosInstance.post('/auth/login', credentials)
        return response.data
      },
      onSuccess: (data: BaseResponse<User>) => {
        localStorage.setItem('accessToken', data.data.accessToken)
        localStorage.setItem('refreshToken', data.data.refreshToken)

        userStore.setUser(data.data)

        router.push('/')
      },
      onError: (error: any) => {
        errorMessage.value = error.response?.data?.error || 'Failed to log in'
      },
    })

    const login = async () => {
      loginMutation.mutate({ email: email.value, password: password.value })
    }

    return { email, password, errorMessage, login }
  },
}
</script>
