import './assets/styles/css/main.css'
import './assets/styles/scss/index.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { i18n } from './plugins/i18n'
import { getTooltip } from './plugins/tooltip'
import { vFocus } from './plugins/focus'
import { setupVueQuery } from './plugins/vue-query'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.directive('tooltip', getTooltip())
app.directive('focus', vFocus)
setupVueQuery(app)

app.mount('#app')
