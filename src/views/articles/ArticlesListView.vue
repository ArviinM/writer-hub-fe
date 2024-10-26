<script setup lang="ts">
import { useQuery, useMutation } from '@tanstack/vue-query'
import axiosInstance from '../../utils/axiosInstance'
import { useUserStore } from '@/stores/userStore'
import { queryClient } from '@/utils/queryClient'

const userStore = useUserStore()

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

const deleteArticleMutation = useMutation({
  mutationFn: async (articleId: number) => {
    await axiosInstance.delete(`/articles/${articleId}`)
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['articles'] })
  },
  onError: (error: Error) => {
    console.error('Error deleting article:', error)
    // Handle the error, e.g., display an error message
  },
})

const publishArticleMutation = useMutation({
  mutationFn: async (articleId: number) => {
    await axiosInstance.patch(`/articles/${articleId}/publish`)
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['articles'] })
  },
  onError: (error: Error) => {
    console.error('Error publishing article:', error)
    // Handle the error, e.g., display an error message
  },
})

const deleteArticle = (articleId: number) => {
  deleteArticleMutation.mutate(articleId)
}

const publishArticle = (articleId: number) => {
  publishArticleMutation.mutate(articleId)
}
</script>

<template>
  <router-link :to="`/articles/create`">Create</router-link>
  <div v-if="isLoading">Loading...</div>
  <div v-else-if="error">Error: {{ error }}</div>
  <table v-else>
    <thead>
      <tr>
        <th>Title</th>
        <th>Image</th>
        <th>Link</th>
        <th>Date</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="article in articles" :key="article.id">
        <td>{{ article.title }}</td>
        <td>
          <img :src="article.image" alt="Article Image" width="50" />
        </td>
        <td>{{ article.link }}</td>
        <td>{{ article.date }}</td>
        <td>{{ article.status }}</td>
        <td>
          <router-link :to="`/articles/${article.id}/edit`">Edit</router-link>
          <button
            v-if="userStore.userType === 'Editor'"
            @click="publishArticle(article.id)"
          >
            Publish
          </button>
          <button @click="deleteArticle(article.id)">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
