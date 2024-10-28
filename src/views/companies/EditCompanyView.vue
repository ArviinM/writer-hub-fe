<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useQuery, useMutation } from '@tanstack/vue-query'
import axiosInstance from '../../utils/axiosInstance'
import TheCompanyForm from '../../components/companies/TheCompanyForm.vue'
import type { Company } from '@/types/types'
import { useToast } from 'vue-toast-notification'
import { queryClient } from '@/utils/queryClient'

const toast = useToast()
const route = useRoute()
const router = useRouter()
const companyId = parseInt(route.params.id as string)

const {
  isLoading,
  error,
  data: companies,
} = useQuery({
  queryKey: ['company', companyId],
  queryFn: async () => {
    const response = await axiosInstance.get(`/companies/${companyId}`)
    return response.data.data
  },
})

const updateCompanyMutation = useMutation({
  mutationFn: async (company: Company) => {
    await axiosInstance.put(`/companies/${companyId}`, company)
  },
  onSuccess: () => {
    toast.clear()
    toast.success('Company updated successfully!')
    queryClient.invalidateQueries({ queryKey: ['companies'] })
    router.push('/companies')
  },
  onError: (error: any) => {
    toast.clear()
    console.error('Error updating company:', error)
    toast.error(error.response?.data?.error || 'Failed to update company')
  },
})

const updateCompany = (company: Company) => {
  updateCompanyMutation.mutate(company)
}
</script>

<template>
  <div class="px-8 pt-8">
    <h1 class="text-2xl font-bold text-gray-900">Edit Company</h1>
  </div>
  <div v-if="isLoading">Loading...</div>
  <div v-else-if="error">Error: {{ error }}</div>
  <TheCompanyForm v-else :company="companies" @submit="updateCompany" />
</template>
