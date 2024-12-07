<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useQuery, useMutation } from '@tanstack/vue-query'
import axiosInstance from '../../utils/axiosInstance'
import TheUserForm from '../../components/users/TheUserForm.vue'
import type { User } from '@/types/types'
import { useToast } from 'vue-toast-notification'
import { queryClient } from '@/utils/queryClient'

const toast = useToast()
const route = useRoute()
const router = useRouter()
const userId = parseInt(route.params.id as string)

const {
  isLoading,
  error,
  data: user,
} = useQuery({
  queryKey: ['user', userId],
  queryFn: async () => {
    const response = await axiosInstance.get(`/users/${userId}`)
    return response.data.data
  },
})

const updateUserMutation = useMutation({
  mutationFn: async (user: User) => {
    await axiosInstance.put(`/users/${userId}`, user)
  },
  onSuccess: () => {
    toast.clear()
    toast.success('User updated successfully!')
    queryClient.invalidateQueries({ queryKey: ['users'] })
    router.push('/users')
  },
  onError: (error: any) => {
    toast.clear()
    console.error('Error updating user:', error)
    toast.error(error.response?.data?.error || 'Failed to update user')
  },
})

const updateUser = (user: User) => {
  updateUserMutation.mutate(user)
}
</script>

<template>
  <div class="px-8 pt-8">
    <h1 class="text-2xl font-bold text-gray-900">Edit User</h1>
  </div>
  <div v-if="isLoading">Loading...</div>
  <div v-else-if="error">Error: {{ error }}</div>
  <TheUserForm v-else :user="user" @submit="updateUser" />
</template>
