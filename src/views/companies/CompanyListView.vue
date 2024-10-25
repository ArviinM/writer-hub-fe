<script setup lang="ts">
import { useMutation, useQuery } from '@tanstack/vue-query'
import axiosInstance from '../../utils/axiosInstance'
import { queryClient } from '@/utils/queryClient'

const {
  isLoading,
  data: companies,
  error,
} = useQuery({
  queryKey: ['companies'],
  queryFn: async () => {
    const response = await axiosInstance.get('/companies')
    return response.data.data
  },
})

const deleteCompanyMutation = useMutation({
  mutationFn: async (companyId: number) => {
    await axiosInstance.delete(`/companies/${companyId}`)
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['companies'] })
  },
  onError: (error: Error) => {
    console.error('Error deleting company:', error)
    // Handle the error, e.g., display an error message
  },
})

const deleteCompany = (companyId: number) => {
  deleteCompanyMutation.mutate(companyId)
}
</script>

<template>
  <div v-if="isLoading">Loading...</div>
  <div v-else-if="error">Error: {{ error }}</div>
  <table v-else>
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Logo</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="company in companies" :key="company.id">
        <td>{{ company.id }}</td>
        <td>{{ company.name }}</td>
        <td>
          <img :src="company.logo" alt="Company Logo" width="50" />
        </td>
        <td>{{ company.status }}</td>
        <td>
          <router-link :to="`/companies/${company.id}/edit`">Edit</router-link>
          <button @click="deleteCompany(company.id)">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
