<template>
  <div
    class="lg:container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-5 lg:p-0"
  >
    <div
      class="relative hidden h-full flex-col rounded-lg col-span-3 lg:flex bg-cover bg-[url(https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)]"
    />
    <div class="p-8 col-span-2">
      <div
        class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]"
      >
        <div
          class="z-20 flex items-center justify-center text-3xl font-bold font-sans gap-3"
        >
          <img src="@/assets/icons/quill.png" alt="logo" class="w-12 h-12" />
          Writer Hub
        </div>

        <div class="flex flex-col space-y-2 text-center">
          <h1 class="text-2xl font-semibold tracking-tight">
            Login to your account
          </h1>
          <p class="text-sm text-muted-foreground">
            Enter your email below and password
          </p>
        </div>
        <TheLoginForm />
        <p class="px-8 text-center text-sm text-muted-foreground">
          By clicking continue, you agree to our
          <a
            href="/terms"
            class="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </a>
          and
          <a
            href="/privacy"
            class="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </a>
          .
        </p>
        <span class="opacity-75 italic text-sm text-center">
          Please bear with me with the server because i'm only using a free one
          that has 0.1 cpu and 512mb ram. Thanks!
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import TheLoginForm from '../../components/auth/TheLoginForm.vue'

export default {
  components: {
    TheLoginForm,
  },
}
</script>
