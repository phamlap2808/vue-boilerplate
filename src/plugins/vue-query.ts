import { VueQueryPlugin } from '@tanstack/vue-query'

export function setupVueQuery(app: any) {
  app.use(VueQueryPlugin, {
    enableDevtoolsV6Plugin: true,
  })
}