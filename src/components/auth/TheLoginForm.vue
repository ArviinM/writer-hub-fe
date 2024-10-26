<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMutation } from '@tanstack/vue-query'
import axiosInstance from '../../utils/axiosInstance'
import type { BaseResponse } from '@/types/baseResponse'
import { useUserStore } from '@/stores/userStore'
import WInput from '@/components/shared/input/WInput.vue'
import WButton from '@/components/shared/button/WButton.vue'
import WLabel from '@/components/shared/label/WLabel.vue'

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
    localStorage.setItem('accessToken', data.data.accessToken)
    localStorage.setItem('refreshToken', data.data.refreshToken)

    userStore.setUser(data.data)

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
  <div class="grid gap-6">
    <form @submit.prevent="login">
      <div class="grid gap-3">
        <div class="grid gap-1">
          <WLabel usage="email">Email</WLabel>
          <WInput
            id="email"
            placeholder="name@example.com"
            type="email"
            auto-capitalize="none"
            auto-complete="email"
            auto-correct="off"
            v-model="email"
            required
          />
        </div>
        <div class="grid gap-1">
          <WLabel usage="email">Password</WLabel>
          <WInput
            id="password"
            placeholder="******"
            type="password"
            auto-capitalize="none"
            auto-complete="email"
            auto-correct="off"
            v-model="password"
            required
          />
        </div>
        <WButton type="submit" variant="default">Sign In</WButton>
      </div>
      <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
    </form>
  </div>
</template>
