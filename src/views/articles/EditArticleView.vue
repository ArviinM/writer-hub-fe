<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useQuery, useMutation } from '@tanstack/vue-query'
import axiosInstance from '../../utils/axiosInstance'
import TheArticleForm from '../../components/articles/TheArticleForm.vue'
import type { Article } from '@/types/types'
import { useToast } from 'vue-toast-notification'

const toast = useToast()
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
    toast.clear()
    toast.success('Article updated successfully!')
    router.push('/articles')
  },
  onError: (error: any) => {
    toast.clear()
    console.error('Error updating article:', error)
    toast.error(error.response?.data?.error || 'Failed to update article')
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
