<template>
  <nav class="bg-white border-b border-gray-200">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 justify-between">
        <div class="flex">
          <div class="flex flex-shrink-0 items-center">
            <router-link
              to="/"
              class="font-bold text-2xl flex flex-row items-center gap-1"
              ><img src="@/assets/icons/quill.png" alt="logo" class="w-7 h-7" />
              Writer Hub
            </router-link>
          </div>
          <div class="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
            <router-link
              to="/"
              class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
              >Home
            </router-link>
            <router-link
              to="/articles"
              class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
              >Articles
            </router-link>
            <router-link
              v-if="userStore.userType === 'Editor'"
              to="/users"
              class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
              >Users
            </router-link>
            <router-link
              v-if="userStore.userType === 'Editor'"
              to="/companies"
              class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
              >Companies
            </router-link>
          </div>
        </div>
        <div class="flex items-center">
          <div class="relative ml-3">
            <div>
              <button
                type="button"
                class="flex rounded-full bg-blue-500 items-center text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
                id="user-menu-button"
                aria-expanded="false"
                aria-haspopup="true"
                @click="isOpen = !isOpen"
              >
                <span class="sr-only">Open user menu</span>
                <span
                  class="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-100"
                >
                  {{ userStore.user?.firstname }} {{ userStore.user?.lastname }}
                </span>
                <svg
                  class="mr-1 h-5 w-5 text-gray-100"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div
              v-show="isOpen"
              class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu-button"
              tabindex="-1"
            >
              <button
                @click="logout"
                class="block px-4 py-2 text-sm text-gray-700"
                role="menuitem"
                tabindex="-1"
                id="user-menu-item-2"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="isOpen" class="sm:hidden">
      <div class="pt-2 pb-3 space-y-1">
        <router-link
          to="/"
          class="block px-3 py-2 text-base font-medium text-gray-900"
          >Home
        </router-link>
        <router-link
          v-if="userStore.userType === 'Editor'"
          to="/users"
          class="block px-3 py-2 text-base font-medium text-gray-900"
          >Users
        </router-link>
        <router-link
          v-if="userStore.userType === 'Editor'"
          to="/companies"
          class="block px-3 py-2 text-base font-medium text-gray-900"
          >Companies
        </router-link>
        <router-link
          to="/articles"
          class="block px-3 py-2 text-base font-medium text-gray-900"
          >Articles
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
const router = useRouter()
const isOpen = ref(false)

const logout = () => {
  userStore.clearUser()
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
  router.push('/login')
}
</script>
