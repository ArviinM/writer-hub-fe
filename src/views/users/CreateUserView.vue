<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMutation } from '@tanstack/vue-query'
import axiosInstance from '../../utils/axiosInstance'
import TheUserForm from '../../components/users/TheUserForm.vue'
import type { User } from '@/types/types'
import { useToast } from 'vue-toast-notification'

const toast = useToast()
const router = useRouter()
const newUser = ref<User>({} as User)

const createUserMutation = useMutation({
  mutationFn: async (user: User) => {
    const response = await axiosInstance.post('/users', user)
    return response.data
  },
  onSuccess: () => {
    toast.clear()
    toast.success('User created successfully!')
    router.push('/users')
  },
  onError: (error: any) => {
    toast.clear()
    console.error('Error creating user:', error)
    toast.error(error.response?.data?.error || 'Failed to create user')
  },
})

const createUser = (user: User) => {
  createUserMutation.mutate(user)
}
</script>

<template>
  <TheUserForm :user="newUser" @submit="createUser" />
</template>
