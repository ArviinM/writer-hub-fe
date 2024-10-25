<script setup lang="ts">
import { useQuery, useMutation } from '@tanstack/vue-query'
import axiosInstance from '../../utils/axiosInstance'
import { queryClient } from '@/utils/queryClient'

const {
  isLoading,
  error,
  data: users,
} = useQuery({
  queryKey: ['users'],
  queryFn: async () => {
    const response = await axiosInstance.get('/users')
    return response.data.data
  },
})

const deleteUserMutation = useMutation({
  mutationFn: async (userId: number) => {
    await axiosInstance.delete(`/users/${userId}`)
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['users'] })
  },
  onError: (error: Error) => {
    console.error('Error deleting user:', error)
    // Handle the error, e.g., display an error message
  },
})

const deleteUser = (userId: number) => {
  deleteUserMutation.mutate(userId)
}
</script>

<template>
  <div v-if="isLoading">Loading...</div>
  <div v-else-if="error">Error: {{ error }}</div>
  <table v-else>
    <thead>
      <tr>
        <th>ID</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Email</th>
        <th>Type</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.id }}</td>
        <td>{{ user.firstname }}</td>
        <td>{{ user.lastname }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.type }}</td>
        <td>{{ user.status }}</td>
        <td>
          <router-link :to="`/users/${user.id}/edit`">Edit</router-link>
          <button @click="deleteUser(user.id)">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
