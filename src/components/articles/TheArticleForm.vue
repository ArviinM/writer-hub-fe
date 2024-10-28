<script setup lang="ts">
import { defineProps, toRefs, onMounted, ref } from 'vue'
import { QuillyEditor } from 'vue-quilly'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import { useQuery } from '@tanstack/vue-query'
import axiosInstance from '../../utils/axiosInstance'
import { useForm, useField } from 'vee-validate'
import WInput from '@/components/shared/input/WInput.vue'
import WButton from '@/components/shared/button/WButton.vue'
import WLabel from '@/components/shared/label/WLabel.vue'
import { toTypedSchema } from '@vee-validate/zod'
import { articleFormSchema } from '@/utils/validationSchema'
import type { Article } from '@/types/types'

const props = defineProps({
  article: {
    type: Object as () => Article,
    required: true,
  },
  isEdit: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['submit'])

const editor = ref<InstanceType<typeof QuillyEditor>>()
let quill: Quill | undefined = undefined

const { article } = toRefs(props)
const initialValues = { ...article.value }

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(articleFormSchema),
  initialValues,
})

const onSubmit = handleSubmit(values => {
  emit('submit', values) // Emit the values directly
})

const { data: companies } = useQuery({
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
      ['blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ header: '1' }, { header: '2' }],
      [{ align: [] }],
      ['link', 'image'],
      ['clean'],
    ],
  },
  placeholder: 'Insert text here ...',
  readOnly: false,
})

onMounted(() => {
  quill = editor.value?.initialize(Quill)
})

const { value: title, errorMessage: titleError } = useField<string>('title')
const { value: image, errorMessage: imageError } = useField<File | null>(
  'image',
)
const { value: link, errorMessage: linkError } = useField<string>('link')
const { value: date, errorMessage: dateError } = useField<string>('date')
const { value: content, errorMessage: contentError } =
  useField<string>('content')
const { value: companyId, errorMessage: companyIdError } =
  useField<number>('companyId')
</script>

<template>
  <div class="p-8">
    <form @submit="onSubmit">
      <div class="grid gap-6">
        <div class="grid gap-3">
          <div class="grid gap-1">
            <WLabel usage="title">Title</WLabel>
            <WInput type="text" id="title" v-model="title" required />
            <span class="error">{{ titleError }}</span>
          </div>
          <div class="grid gap-1">
            <WLabel usage="image">Image</WLabel>
            <input
              type="file"
              id="image"
              @change="image = ($event as any).target.files[0] as File"
              :required="!isEdit"
            />
            <span class="error">{{ imageError }}</span>
          </div>
          <div class="grid gap-1">
            <WLabel usage="link">Link</WLabel>
            <WInput type="text" id="link" v-model="link" required />
            <span class="error">{{ linkError }}</span>
          </div>
          <div class="grid gap-1">
            <WLabel usage="date">Date</WLabel>
            <WInput type="date" id="date" v-model="date" required />
            <span class="error">{{ dateError }}</span>
          </div>
          <div class="grid gap-1">
            <WLabel usage="content">Content</WLabel>
            <QuillyEditor ref="editor" v-model="content" :options="options" />
            <span class="error">{{ contentError }}</span>
          </div>
          <div class="grid gap-1">
            <WLabel usage="companyId">Company</WLabel>
            <select id="companyId" v-model="companyId" required>
              <option
                v-for="(company, index) in companies"
                :key="company.id"
                :value="company.id"
                :selected="index === 0"
              >
                {{ company.name }}
              </option>
            </select>
            <span class="error">{{ companyIdError }}</span>
          </div>
          <WButton type="submit" variant="default">Save</WButton>
        </div>
      </div>
    </form>
  </div>
</template>
