<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMutation } from '@tanstack/vue-query'
import axiosInstance from '../../utils/axiosInstance'
import TheArticleForm from '../../components/articles/TheArticleForm.vue'
import type { Article } from '@/types/types'
import { useToast } from 'vue-toast-notification'

const toast = useToast()
const router = useRouter()

const newArticle = ref<Article>({
  image: '',
  title: '',
  link: '',
  date: new Date().toISOString().slice(0, 10), // Set default date to today
  content: '',
  companyId: 1, // Set a default company ID or fetch from API
  status: 'For Edit',
})

const createArticleMutation = useMutation({
  mutationFn: async (article: Article) => {
    const formData = new FormData()
    formData.append('image', article.image as File)
    formData.append('title', article.title)
    formData.append('link', article.link)
    formData.append('date', article.date)
    formData.append('content', article.content)
    formData.append('companyId', article.companyId!.toString())

    const response = await axiosInstance.post('/articles', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },
  onSuccess: () => {
    toast.clear()
    toast.success('Article created successfully!')
    router.push('/articles')
  },
  onError: (error: any) => {
    toast.clear()
    console.error('Error creating article:', error)
    toast.error(error.response?.data?.error || 'Failed to create article')
  },
})

const createArticle = (article: Article) => {
  createArticleMutation.mutate(article)
}
</script>

<template>
  <TheArticleForm :article="newArticle" @submit="createArticle" />
</template>
