<script setup lang="ts">
import { toRefs } from 'vue'
import { useForm, useField } from 'vee-validate'
import WInput from '@/components/shared/input/WInput.vue'
import WButton from '@/components/shared/button/WButton.vue'
import WLabel from '@/components/shared/label/WLabel.vue'
import { toTypedSchema } from '@vee-validate/zod'
import { companyFormSchema } from '@/utils/validationSchema'
import type { Company } from '@/types/types'

const props = defineProps({
  company: {
    type: Object as () => Company,
    required: true,
  },
})

const emit = defineEmits(['submit'])

const { company } = toRefs(props)
const initialValues = { ...company.value }

const { handleSubmit, errors } = useForm<Company>({
  validationSchema: toTypedSchema(companyFormSchema),
  initialValues,
})

const onSubmit = handleSubmit(values => {
  emit('submit', values)
})

const { value: name, errorMessage: nameError } = useField<string>('name')
const { value: logo, errorMessage: logoError } = useField<string>('logo')
const { value: status } = useField('status') as unknown as {
  value: Company['status']
}
</script>

<template>
  <div class="p-8">
    <form @submit="onSubmit">
      <div class="grid gap-6">
        <div class="grid gap-3">
          <div class="grid gap-1">
            <WLabel usage="name">Name</WLabel>
            <WInput type="text" id="name" v-model="name" required />
            <span class="error">{{ nameError }}</span>
          </div>
          <div class="grid gap-1">
            <WLabel usage="logo">Logo URL</WLabel>
            <WInput type="text" id="logo" v-model="logo" required />
            <span class="error">{{ logoError }}</span>
          </div>
          <div class="grid gap-1">
            <WLabel usage="status">Status</WLabel>
            <select id="status" v-model="status" required>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <span class="error">{{ errors.status }}</span>
          </div>
          <WButton type="submit" variant="default">Save</WButton>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>
.error {
  color: darkred;
}
</style>
