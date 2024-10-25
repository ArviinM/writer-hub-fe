<template>
  <div v-if="isLoading">Loading...</div>
  <div v-else-if="error">Error: {{ error }}</div>
  <TheUserForm v-else :user="user" @submit="updateUser" />
</template>

<script lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useQuery, useMutation } from '@tanstack/vue-query'
import axiosInstance from '../../utils/axiosInstance'
import TheUserForm from '../../components/users/TheUserForm.vue'
import type { User } from '@/types/types'

export default {
  components: {
    TheUserForm,
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const userId = parseInt(route.params.id as string)

    const getUserQuery = useQuery({
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
        router.push('/users')
      },
      onError: (error: Error) => {
        console.error('Error updating user:', error)
        // Handle the error, e.g., display an error message
      },
    })

    const updateUser = (user: User) => {
      updateUserMutation.mutate(user)
    }

    return {
      user: getUserQuery.data,
      isLoading: getUserQuery.isLoading,
      error: getUserQuery.error,
      updateUser,
    }
  },
}
</script>
