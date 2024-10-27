<script setup lang="ts">
import { useQuery, useMutation } from '@tanstack/vue-query'
import axiosInstance from '../../utils/axiosInstance'
import { useUserStore } from '@/stores/userStore'
import { queryClient } from '@/utils/queryClient'
import WTable from '@/components/shared/table/WTable.vue'
import { useToast } from 'vue-toast-notification'
import type { Article } from '@/types/types'

const userStore = useUserStore()
const baseUrl = import.meta.env.VITE_API_BASE_URL
const toast = useToast()

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
    toast.info('Deleting article...')
    await axiosInstance.delete(`/articles/${articleId}`)
  },
  onSuccess: () => {
    toast.clear()
    toast.success('Article deleted successfully!')
    queryClient.invalidateQueries({ queryKey: ['articles'] })
  },
  onError: (error: any) => {
    toast.clear()
    console.error('Error deleting article:', error)
    toast.error(error.response?.data?.error || 'Failed to delete article')
  },
})

const publishArticleMutation = useMutation({
  mutationFn: async (articleId: number) => {
    toast.info('Publishing article...')
    await axiosInstance.patch(`/articles/${articleId}/publish`)
  },
  onSuccess: () => {
    toast.clear()
    toast.success('Article published successfully!')
    queryClient.invalidateQueries({ queryKey: ['articles'] })
  },
  onError: (error: any) => {
    toast.clear()
    console.error('Error publishing article:', error)
    toast.error(error.response?.data?.error || 'Failed to publish article')
  },
})

const deleteArticle = (articleId: number) => {
  deleteArticleMutation.mutate(articleId)
}

const publishArticle = (articleItem: Article) => {
  if (articleItem.status === 'Published') {
    toast.warning('Article is already published!')
  }

  if (articleItem.id && articleItem.status !== 'Published') {
    publishArticleMutation.mutate(articleItem.id)
  }
}
</script>

<template>
  <div class="p-4">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold text-gray-900">Articles</h1>
      <router-link
        :to="`/articles/create`"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Create Article
      </router-link>
    </div>
    <WTable
      :headers="[
        { key: 'title', label: 'Title' },
        { key: 'image', label: 'Image' },
        { key: 'link', label: 'Link' },
        { key: 'date', label: 'Date' },
        { key: 'status', label: 'Status' },
        { key: 'actions', label: 'Actions' },
      ]"
      :items="articles"
      :is-loading="isLoading"
      :error="error"
    >
      <template #default="{ item }">
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="text-sm text-gray-900">{{ item.title }}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <img
            :src="`${baseUrl + '/' + item.image}`"
            alt="Article Image"
            class="h-12 w-24 object-cover rounded-md"
          />
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="text-sm text-gray-900">{{ item.link }}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="text-sm text-gray-900">{{ item.date }}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <span
            class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
            :class="{
              'bg-yellow-100 text-yellow-800': item.status === 'For Edit',
              'bg-green-100 text-green-800': item.status === 'Published',
            }"
          >
            {{ item.status }}
          </span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <router-link
            :to="`/articles/${item.id}/edit`"
            class="text-indigo-600 hover:text-indigo-900 mr-2"
          >
            Edit
          </router-link>
          <button
            v-if="userStore.userType === 'Editor'"
            @click="publishArticle(item)"
            class="text-green-600 hover:text-green-900 mr-2"
          >
            Publish
          </button>
          <button
            @click="deleteArticle(item.id)"
            class="text-red-600 hover:text-red-900"
          >
            Delete
          </button>
        </td>
      </template>
    </WTable>
  </div>
</template>
