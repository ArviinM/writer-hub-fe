<template>
  <div v-if="isLoading">Loading...</div>
  <div v-else-if="error">Error: {{ error }}</div>
  <TheCompanyForm v-else :company="company" @submit="updateCompany" />
</template>

<script lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useQuery, useMutation } from '@tanstack/vue-query'
import axiosInstance from '../../utils/axiosInstance'
import TheCompanyForm from '../../components/companies/TheCompanyForm.vue'
import type { Company } from '@/types/types'

export default {
  components: {
    TheCompanyForm,
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const companyId = parseInt(route.params.id as string)

    const getCompanyQuery = useQuery({
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
        router.push('/companies')
      },
      onError: (error: Error) => {
        console.error('Error updating company:', error)
        // Handle the error, e.g., display an error message
      },
    })

    const updateCompany = (company: Company) => {
      updateCompanyMutation.mutate(company)
    }

    return {
      company: getCompanyQuery.data,
      isLoading: getCompanyQuery.isLoading,
      error: getCompanyQuery.error,
      updateCompany,
    }
  },
}
</script>
