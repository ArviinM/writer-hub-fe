<template>
  <TheUserForm :user="newUser" @submit="createUser" />
</template>

<script lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMutation } from '@tanstack/vue-query'
import axiosInstance from '../../utils/axiosInstance'
import TheUserForm from '../../components/users/TheUserForm.vue'
import type { User } from '@/types/types'
import type { BaseResponse } from '@/types/baseResponse'

export default {
  components: {
    TheUserForm,
  },
  setup() {
    const router = useRouter()
    const newUser = ref({} as User)

    const createUserMutation = useMutation({
      mutationFn: async (user: User): Promise<BaseResponse<User>> => {
        const response = await axiosInstance.post('/users', user)
        return response.data
      },
      onSuccess: () => {
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

    return { newUser, createUser }
  },
}
</script>
