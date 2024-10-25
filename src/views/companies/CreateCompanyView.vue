<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMutation } from '@tanstack/vue-query'
import axiosInstance from '../../utils/axiosInstance'
import TheCompanyForm from '../../components/companies/TheCompanyForm.vue'
import type { Company } from '@/types/types'

const router = useRouter()
const newCompany = ref({} as Company)

const createCompanyMutation = useMutation({
  mutationFn: async (company: Company) => {
    const response = await axiosInstance.post('/companies', company)
    return response.data
  },
  onSuccess: () => {
    // Redirect to the company list page
    router.push('/companies')
  },
  onError: (error: Error) => {
    console.error('Error creating company:', error)
    // Handle the error, e.g., display an error message
  },
})

const createCompany = (company: Company) => {
  createCompanyMutation.mutate(company)
}
</script>

<template>
  <TheCompanyForm :company="newCompany" @submit="createCompany" />
</template>
