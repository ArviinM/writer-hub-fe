import { defineStore } from 'pinia';
import type { User } from '@/types/types'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
    userType: (state) => state.user?.type,
  },
  actions: {
    setUser(user: User) {
      this.user = user;
    },
    clearUser() {
      this.user = null;
    },
  },
  persist: true,
});
