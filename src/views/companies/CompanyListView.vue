<script setup lang="ts">
import { useMutation, useQuery } from '@tanstack/vue-query'
import axiosInstance from '../../utils/axiosInstance'
import { queryClient } from '@/utils/queryClient'
import WTable from '@/components/shared/table/WTable.vue'
import { useToast } from 'vue-toast-notification'

const toast = useToast()

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
    toast.clear()
    toast.success('Company deleted successfully!')
    queryClient.invalidateQueries({ queryKey: ['companies'] })
  },
  onError: (error: any) => {
    toast.clear()
    console.error('Error deleting company:', error)
    toast.error(error.response?.data?.error || 'Failed to delete company')
  },
})

const deleteCompany = (companyId: number) => {
  deleteCompanyMutation.mutate(companyId)
}
</script>

<template>
  <div class="p-4">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold text-gray-900">Companies</h1>
      <router-link
        :to="`/companies/create`"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Create Company
      </router-link>
    </div>
    <WTable
      :headers="[
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Name' },
        { key: 'logo', label: 'Logo' },
        { key: 'status', label: 'Status' },
        { key: 'actions', label: 'Actions' },
      ]"
      :items="companies"
      :is-loading="isLoading"
      :error="error"
    >
      <template #default="{ item }">
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="text-sm text-gray-900">{{ item.id }}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="text-sm text-gray-900">{{ item.name }}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <img
            :src="item.logo"
            alt="Company Logo"
            class="h-10 w-10 rounded-full"
          />
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
            :to="`/companies/${item.id}/edit`"
            class="text-indigo-600 hover:text-indigo-900 mr-2"
          >
            Edit
          </router-link>
          <!--          <button-->
          <!--            @click="deleteCompany(item.id)"-->
          <!--            class="text-red-600 hover:text-red-900"-->
          <!--          >-->
          <!--            Delete-->
          <!--          </button>-->
        </td>
      </template>
    </WTable>
  </div>
</template>
