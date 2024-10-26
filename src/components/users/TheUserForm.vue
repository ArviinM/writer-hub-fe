<script setup lang="ts">
import { toRefs } from 'vue'
import { useForm, useField } from 'vee-validate'
import WInput from '@/components/shared/input/WInput.vue'
import WButton from '@/components/shared/button/WButton.vue'
import WLabel from '@/components/shared/label/WLabel.vue'
import { toTypedSchema } from '@vee-validate/zod'
import { userFormSchema } from '@/utils/validationSchema'
import type { User } from '@/types/types'

const props = defineProps({
  user: {
    type: Object as () => User,
    required: true,
  },
})

const emit = defineEmits(['submit'])

const { user } = toRefs(props)
const initialValues = { ...user.value }

const { handleSubmit, errors } = useForm<User>({
  validationSchema: toTypedSchema(userFormSchema),
  initialValues,
})

const onSubmit = handleSubmit(values => {
  emit('submit', values)
})

const { value: firstname, errorMessage: firstnameError } =
  useField<string>('firstname')
const { value: lastname, errorMessage: lastnameError } =
  useField<string>('lastname')
const { value: email, errorMessage: emailError } = useField<string>('email')
const { value: password, errorMessage: passwordError } =
  useField<string>('password')
const { value: type } = useField('type') as unknown as { value: User['type'] }
const { value: status } = useField('status') as unknown as {
  value: User['status']
}
</script>

<template>
  <div class="p-8">
    <form @submit="onSubmit">
      <div class="grid gap-6">
        <div class="grid gap-3">
          <div class="grid gap-1">
            <WLabel usage="firstname">First Name</WLabel>
            <WInput type="text" id="firstname" v-model="firstname" required />
            <span class="error">{{ firstnameError }}</span>
          </div>
          <div class="grid gap-1">
            <WLabel usage="lastname">Last Name</WLabel>
            <WInput type="text" id="lastname" v-model="lastname" required />
            <span class="error">{{ lastnameError }}</span>
          </div>
          <div class="grid gap-1">
            <WLabel usage="email">Email</WLabel>
            <WInput type="email" id="email" v-model="email" required />
            <span class="error">{{ emailError }}</span>
          </div>
          <div class="grid gap-1">
            <WLabel usage="password">Password</WLabel>
            <WInput type="password" id="password" v-model="password" required />
            <span class="error">{{ passwordError }}</span>
          </div>
          <div class="grid gap-1">
            <WLabel usage="type">Type</WLabel>
            <select id="type" v-model="type" required>
              <option value="Writer">Writer</option>
              <option value="Editor">Editor</option>
            </select>
            <span class="error">{{ errors.type }}</span>
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
