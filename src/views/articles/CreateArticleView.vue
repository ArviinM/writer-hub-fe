<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMutation } from '@tanstack/vue-query'
import axiosInstance from '../../utils/axiosInstance'
import TheArticleForm from '../../components/articles/TheArticleForm.vue'
import type { Article } from '@/types/types'

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
    router.push('/articles')
  },
  onError: (error: Error) => {
    console.error('Error creating article:', error)
    // Handle the error, e.g., display an error message
  },
})

const createArticle = (article: Article) => {
  createArticleMutation.mutate(article)
}
</script>

<template>
  <TheArticleForm :article="newArticle" @submit="createArticle" />
</template>
