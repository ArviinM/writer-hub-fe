<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useQuery, useMutation } from '@tanstack/vue-query'
import axiosInstance from '../../utils/axiosInstance'
import TheArticleForm from '../../components/articles/TheArticleForm.vue'
import type { Article } from '@/types/types'

const route = useRoute()
const router = useRouter()
const articleId = parseInt(route.params.id as string)

const {
  isLoading,
  error,
  data: article,
} = useQuery({
  queryKey: ['article', articleId],
  queryFn: async () => {
    const response = await axiosInstance.get(`/articles/${articleId}`)
    return response.data.data
  },
})

const updateArticleMutation = useMutation({
  mutationFn: async (article: Article) => {
    const formData = new FormData()
    formData.append('image', article.image as File)
    formData.append('title', article.title)
    formData.append('link', article.link)
    formData.append('date', article.date)
    formData.append('content', article.content)
    formData.append('companyId', article.companyId!.toString())

    await axiosInstance.put(`/articles/${articleId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
  onSuccess: () => {
    router.push('/articles')
  },
  onError: (error: Error) => {
    console.error('Error updating article:', error)
    // Handle the error, e.g., display an error message
  },
})

const updateArticle = (article: Article) => {
  updateArticleMutation.mutate(article)
}
</script>

<template>
  <div v-if="isLoading">Loading...</div>
  <div v-else-if="error">Error: {{ error }}</div>
  <TheArticleForm
    v-else
    :article="article"
    @submit="updateArticle"
    :isEdit="true"
  />
</template>
