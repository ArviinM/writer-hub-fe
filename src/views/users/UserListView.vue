<script setup lang="ts">
import { useQuery, useMutation } from '@tanstack/vue-query'
import axiosInstance from '../../utils/axiosInstance'
import { queryClient } from '@/utils/queryClient'
import WTable from '@/components/shared/table/WTable.vue'
import { useToast } from 'vue-toast-notification'

const toast = useToast()

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
    toast.clear()
    toast.success('User deleted successfully!')
    queryClient.invalidateQueries({ queryKey: ['users'] })
  },
  onError: (error: any) => {
    toast.clear()
    console.error('Error deleting user:', error)
    toast.error(error.response?.data?.error || 'Failed to delete user')
  },
})

const deleteUser = (userId: number) => {
  deleteUserMutation.mutate(userId)
}
</script>

<template>
  <div class="p-4">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold text-gray-900">Users</h1>
      <router-link
        :to="`/users/create`"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Create User
      </router-link>
    </div>
    <WTable
      :headers="[
        { key: 'id', label: 'ID' },
        { key: 'firstname', label: 'First Name' },
        { key: 'lastname', label: 'Last Name' },
        { key: 'email', label: 'Email' },
        { key: 'type', label: 'Type' },
        { key: 'status', label: 'Status' },
        { key: 'actions', label: 'Actions' },
      ]"
      :items="users"
      :is-loading="isLoading"
      :error="error"
    >
      <template #default="{ item }">
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="text-sm text-gray-900">{{ item.id }}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="text-sm text-gray-900">{{ item.firstname }}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="text-sm text-gray-900">{{ item.lastname }}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="text-sm text-gray-900">{{ item.email }}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <span
            class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
            :class="{
              'bg-green-100 text-green-800': item.type === 'Editor',
              'bg-blue-100 text-blue-800': item.type === 'Writer',
            }"
          >
            {{ item.type }}
          </span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <span
            class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
            :class="{
              'bg-green-100 text-green-800': item.status === 'Active',
              'bg-red-100 text-red-800': item.status === 'Inactive',
            }"
          >
            {{ item.status }}
          </span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
          <router-link
            :to="`/users/${item.id}/edit`"
            class="text-indigo-600 hover:text-indigo-900 mr-2"
          >
            Edit
          </router-link>
          <button
            @click="deleteUser(item.id)"
            class="text-red-600 hover:text-red-900"
          >
            Delete
          </button>
        </td>
      </template>
    </WTable>
  </div>
</template>
