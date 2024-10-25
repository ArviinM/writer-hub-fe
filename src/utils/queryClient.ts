import type { VueQueryPluginOptions } from '@tanstack/vue-query'
import { QueryClient } from '@tanstack/vue-query'

export const myClient = new QueryClient()
export const vueQueryPluginOptions: VueQueryPluginOptions = {
  queryClient: myClient,
}
