<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMutation } from '@tanstack/vue-query'
import axiosInstance from '../../utils/axiosInstance'
import TheUserForm from '../../components/users/TheUserForm.vue'
import type { User } from '@/types/types'

const router = useRouter()
const newUser = ref<User>({} as User)

const createUserMutation = useMutation({
  mutationFn: async (user: User) => {
    const response = await axiosInstance.post('/users', user)
    return response.data
  },
  onSuccess: () => {
    // Redirect to the user list page
    router.push('/users')
  },
  onError: (error: Error) => {
    console.error('Error creating user:', error)
    // Handle the error, e.g., display an error message
  },
})

const createUser = (user: User) => {
  createUserMutation.mutate(user)
}
</script>

<template>
  <TheUserForm :user="newUser" @submit="createUser" />
</template>
