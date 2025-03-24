

import { createApp } from 'vue'
import Nav from './Nav.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

const app = createApp(Nav)

app.use(router)

app.mount('#app')
