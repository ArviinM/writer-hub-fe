<script setup lang="ts">
import { defineProps, toRefs, reactive, onMounted, ref } from 'vue'
import { QuillyEditor } from 'vue-quilly'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import { useQuery } from '@tanstack/vue-query'
import axiosInstance from '../../utils/axiosInstance'
import type { Article } from '@/types/types'

const props = defineProps({
  article: {
    type: Object as () => Article,
    required: true,
  },
})

const emit = defineEmits(['submit'])

const editor = ref<InstanceType<typeof QuillyEditor>>()
let quill: Quill | undefined = undefined

const { article } = toRefs(props)
const articleCopy = reactive({ ...article.value })

const {
  // isLoading,
  // error,
  data: companies,
} = useQuery({
  queryKey: ['companies'],
  queryFn: async () => {
    const response = await axiosInstance.get('/companies')
    return response.data.data
  },
})

const options = ref({
  theme: 'snow',
  modules: {
    toolbar: [
      [{ font: [] }, { size: [] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      [{ script: 'super' }, { script: 'sub' }],
      [{ header: '1' }, { header: '2' }, 'blockquote', 'code-block'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['direction', { align: [] }],
      ['link', 'image', 'video', 'formula'],
      ['clean'],
    ],
  },
  placeholder: 'Insert text here ...',
  readOnly: false,
})

onMounted(() => {
  quill = editor.value?.initialize(Quill)
})
</script>

<template>
  <form @submit.prevent="emit('submit', { ...articleCopy })">
    <div>
      <label for="title">Title:</label>
      <input type="text" id="title" v-model="articleCopy.title" required />
    </div>
    <div>
      <label for="image">Image URL:</label>
      <input type="text" id="image" v-model="articleCopy.image" required />
    </div>
    <div>
      <label for="link">Link:</label>
      <input type="text" id="link" v-model="articleCopy.link" required />
    </div>
    <div>
      <label for="date">Date:</label>
      <input type="date" id="date" v-model="articleCopy.date" required />
    </div>
    <div>
      <label for="content">Content:</label>
      <QuillyEditor
        ref="editor"
        v-model="articleCopy.content"
        :options="options"
      />
      <!--      <vue-quilly-->
      <!--        v-model:content="articleCopy.content"-->
      <!--        theme="snow"-->
      <!--        :toolbar="toolbarOptions"-->
      <!--        :placeholder="'Write your articles content here...'"-->
      <!--      />-->
    </div>
    <div>
      <label for="companyId">Company:</label>
      <select id="companyId" v-model="articleCopy.companyId" required>
        <option
          v-for="company in companies"
          :key="company.id"
          :value="company.id"
        >
          {{ company.name }}
        </option>
      </select>
    </div>
    <button type="submit">Save</button>
  </form>
</template>
