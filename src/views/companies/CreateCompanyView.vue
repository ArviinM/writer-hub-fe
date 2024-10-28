<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMutation } from '@tanstack/vue-query'
import axiosInstance from '../../utils/axiosInstance'
import TheCompanyForm from '../../components/companies/TheCompanyForm.vue'
import type { Company } from '@/types/types'
import { useToast } from 'vue-toast-notification'
import { queryClient } from '@/utils/queryClient'

const toast = useToast()
const router = useRouter()
const newCompany = ref({} as Company)

const createCompanyMutation = useMutation({
  mutationFn: async (company: Company) => {
    const response = await axiosInstance.post('/companies', company)
    return response.data
  },
  onSuccess: () => {
    toast.clear()
    toast.success('Company created successfully!')
    queryClient.invalidateQueries({ queryKey: ['companies'] })
    router.push('/companies')
  },
  onError: (error: any) => {
    toast.clear()
    console.error('Error creating company:', error)
    toast.error(error.response?.data?.error || 'Failed to create company')
  },
})

const createCompany = (company: Company) => {
  createCompanyMutation.mutate(company)
}
</script>

<template>
  <div class="px-8 pt-8">
    <h1 class="text-2xl font-bold text-gray-900">Create Company</h1>
  </div>
  <TheCompanyForm :company="newCompany" @submit="createCompany" />
</template>
