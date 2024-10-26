<script setup lang="ts">
import { computed } from 'vue'
import { buttonVariants } from '@/components/shared/button/index' // Import cva

const props = defineProps<{
  type?: 'button' | 'submit' | 'reset'
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg'
  disabled?: boolean
  class?: string
}>()

const buttonClasses = computed(() =>
  buttonVariants({
    variant: props.variant,
    size: props.size,
    class: props.class,
  }),
)
</script>

<template>
  <button :type="props.type" :class="buttonClasses" :disabled="props.disabled">
    <slot />
  </button>
</template>
