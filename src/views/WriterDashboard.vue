<script setup lang="ts">
import { computed } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import type { Article } from '@/types/types'
import axiosInstance from '@/utils/axiosInstance'
import TheArticleCard from '@/components/articles/TheArticleCard.vue'

const {
  isLoading,
  error,
  data: articles,
} = useQuery({
  queryKey: ['articles'],
  queryFn: async () => {
    const response = await axiosInstance.get('/articles')
    return response.data.data
  },
})

const forEditArticles = computed(() => {
  return articles.value.filter(
    (article: Article) => article.status === 'For Edit',
  )
})

const publishedArticles = computed(() => {
  return articles.value.filter(
    (article: Article) => article.status === 'Published',
  )
})
</script>

<template>
  <div v-if="isLoading">Loading...</div>
  <div v-else-if="error">Error: {{ error }}</div>
  <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
    <div>
      <h2 class="text-lg font-medium text-gray-900">For Edit</h2>
      <div class="mt-4 space-y-4">
        <TheArticleCard
          v-for="article in forEditArticles"
          :key="article.id"
          :title="article.title"
          :imageUrl="article.image"
          :date="article.date"
          :link="article.link"
          :writerId="article.writerId"
          :editorId="article.editorId"
          :writerName="article.writerName"
          :editorName="article.editorName"
        />
      </div>
    </div>
    <div>
      <h2 class="text-lg font-medium text-gray-900">Published</h2>
      <div class="mt-4 space-y-4">
        <TheArticleCard
          v-for="article in publishedArticles"
          :key="article.id"
          :title="article.title"
          :imageUrl="article.image"
          :date="article.date"
          :link="article.link"
          :writerId="article.writerId"
          :editorId="article.editorId"
          :writerName="article.writerName"
          :editorName="article.editorName"
        />
      </div>
    </div>
  </div>
</template>
