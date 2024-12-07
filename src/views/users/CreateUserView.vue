<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMutation } from '@tanstack/vue-query'
import axiosInstance from '../../utils/axiosInstance'
import TheUserForm from '../../components/users/TheUserForm.vue'
import type { User } from '@/types/types'
import { useToast } from 'vue-toast-notification'
import { queryClient } from '@/utils/queryClient'

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
    queryClient.invalidateQueries({ queryKey: ['users'] })
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
  <div class="px-8 pt-8">
    <h1 class="text-2xl font-bold text-gray-900">Create User</h1>
  </div>
  <TheUserForm :user="newUser" @submit="createUser" />
</template>
